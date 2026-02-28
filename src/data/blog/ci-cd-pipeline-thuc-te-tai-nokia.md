---
title: "CI/CD Pipeline thực tế: Những gì tôi học được khi quản lý pipeline cho hệ thống viễn thông"
description: "Từ kinh nghiệm thực tế quản lý CI/CD pipeline tại Nokia FNMS — những bài học, sai lầm và best practices khi deploy phần mềm telecom."
pubDatetime: 2026-02-10T09:00:00.000+07:00
tags:
  - devops
  - ci-cd
  - jenkins
  - java
  - thuc-te
featured: true
draft: false
lang: "vi"
---

Khi tôi tiếp quản CI/CD pipeline tại Nokia FNMS, thứ tôi nhận được là một đống Jenkins jobs chồng chất, build time 45 phút, và tỷ lệ flaky test khoảng 15%. Sau 6 tháng, chúng tôi đưa build time xuống còn 18 phút và flaky test về dưới 2%.

Đây là những gì tôi học được.

## Table of contents

## Bối cảnh: Hệ thống FNMS là gì?

Fixed Network Management System (FNMS) là phần mềm quản lý thiết bị mạng viễn thông — routers, switches, OLTs — cho các nhà mạng lớn. Tưởng tượng một dashboard cho phép kỹ sư mạng cấu hình hàng nghìn thiết bị cùng lúc thông qua giao thức NETCONF/YANG.

Điểm đặc biệt: phần mềm này **không được có downtime**. Khi nó lỗi, kỹ sư mạng không quản lý được thiết bị. Điều đó có nghĩa là CI/CD pipeline phải cực kỳ đáng tin cậy.

---

## Vấn đề 1: Build time 45 phút

Build time 45 phút nghe có vẻ ổn, nhưng với team 8 người commit thường xuyên, mỗi ngày có thể có 15-20 lần trigger pipeline. Developer phải chờ gần 1 tiếng để biết code của mình có pass không — đây là productivity killer.

### Nguyên nhân

Sau khi analyze pipeline, tôi phát hiện:

1. **Maven dependencies download mỗi lần build** — cache không được cấu hình đúng
2. **Test chạy tuần tự** — 800 unit tests chạy single-threaded
3. **Docker image build từ đầu** — không có layer caching

### Giải pháp

**1. Maven cache với Jenkins:**

```groovy
pipeline {
    agent any
    options {
        // Cache ~/.m2 giữa các builds
        withFolderProperties()
    }
    environment {
        MAVEN_OPTS = "-Dmaven.repo.local=${WORKSPACE}/.m2/repository"
    }
    stages {
        stage('Build') {
            steps {
                sh 'mvn -B package -DskipTests'
            }
        }
    }
}
```

**2. Parallel test execution với Maven Surefire:**

```xml
<!-- pom.xml -->
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <configuration>
        <!-- Chạy parallel theo method, tối đa 4 threads -->
        <parallel>methods</parallel>
        <threadCount>4</threadCount>
        <forkCount>1</forkCount>
    </configuration>
</plugin>
```

> **Cảnh báo:** Parallel test chỉ work tốt khi test thực sự isolated. Test nào dùng shared state (static fields, database không được mock đúng) sẽ bị flaky.

**3. Docker layer caching:**

```dockerfile
# Tách dependencies ra layer riêng — layer này thay đổi ít hơn code
FROM maven:3.9-eclipse-temurin-21 AS dependencies
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Layer code thay đổi thường xuyên hơn
FROM dependencies AS build
COPY src ./src
RUN mvn package -DskipTests -B

FROM eclipse-temurin:21-jre-alpine
COPY --from=build /app/target/*.jar /app/app.jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
```

**Kết quả:** Build time giảm từ 45 phút xuống 18 phút.

---

## Vấn đề 2: Flaky Tests (15% fail rate)

15% flaky test rate nghĩa là cứ 7 lần build thì có 1 lần fail vì lý do ngẫu nhiên. Developer phải "retry" liên tục, mất niềm tin vào pipeline.

### Tìm nguồn gốc flaky test

Tôi thêm log để track test nào fail nhiều nhất:

```groovy
post {
    failure {
        script {
            // Parse Surefire XML reports
            def failedTests = []
            findFiles(glob: '**/surefire-reports/TEST-*.xml').each { file ->
                def xml = readFile(file.path)
                if (xml.contains('failures="') || xml.contains('errors="')) {
                    failedTests << file.name
                }
            }
            echo "Failed tests: ${failedTests.join(', ')}"
            // Gửi vào Slack/Teams để track
        }
    }
}
```

Sau 2 tuần tracking, tôi có danh sách top 10 flaky tests. Nguyên nhân phổ biến:

1. **Thread sleep hardcoded** — `Thread.sleep(1000)` thay vì wait condition
2. **Port binding conflicts** — integration test dùng fixed port
3. **Time-dependent logic** — test fail khi chạy gần midnight

### Fix pattern phổ biến

**Thay sleep bằng Awaitility:**

```java file=java
// ❌ Không tốt
Thread.sleep(2000);
assertThat(result).isNotNull();

// ✅ Tốt hơn
await()
    .atMost(5, TimeUnit.SECONDS)
    .pollInterval(100, TimeUnit.MILLISECONDS)
    .until(() -> result.get() != null);
assertThat(result.get()).isNotNull();
```

**Random port cho integration tests:**

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class IntegrationTest {
    @LocalServerPort
    private int port;

    // Không còn conflict khi parallel
}
```

**Kết quả:** Flaky test rate giảm từ 15% xuống 1.8%.

---

## Vấn đề 3: Không có quality gate

Trước đây, code có thể merge vào main dù coverage thấp hay có code smell. Chúng tôi tích hợp SonarQube để tạo quality gate:

```groovy
stage('Quality Gate') {
    steps {
        withSonarQubeEnv('SonarQube') {
            sh 'mvn sonar:sonar'
        }
    }
    post {
        always {
            script {
                def qg = waitForQualityGate()
                if (qg.status != 'OK') {
                    error "Pipeline aborted due to quality gate failure: ${qg.status}"
                }
            }
        }
    }
}
```

Quality gate rules của chúng tôi:

- Coverage: ≥ 70% cho code mới
- Duplications: < 3%
- Zero critical/blocker issues
- Zero security vulnerabilities

---

## Bài học rút ra

**1. Đo lường trước khi optimize**

Đừng tối ưu bằng cảm tính. Tôi mất 2 tuần tracking data trước khi bắt đầu fix. Không có data, tôi có thể waste time optimize thứ không phải bottleneck.

**2. Flaky tests là technical debt**

Mỗi flaky test là một "tax" mà cả team phải trả mỗi ngày. Fix chúng ngay khi phát hiện, đừng để tích tụ.

**3. Fast feedback loop > Perfect pipeline**

Build 18 phút với đủ safety checks tốt hơn build 5 phút không có quality gate. Nhưng build 45 phút thì developer không muốn chạy.

**4. Cache mọi thứ có thể cache**

Maven dependencies, Docker layers, test results — bất cứ thứ gì deterministic (cùng input → cùng output) đều có thể cache.

---

## Cấu trúc pipeline hiện tại

```
┌─────────────────────────────────────────────┐
│  git push → PR trigger                       │
├─────────────────────────────────────────────┤
│  Stage 1: Build (3 min)                      │
│  └── Maven compile + package                 │
├─────────────────────────────────────────────┤
│  Stage 2: Unit Tests (8 min, parallel)       │
│  └── 800+ tests trên 4 threads               │
├─────────────────────────────────────────────┤
│  Stage 3: Code Quality (2 min)               │
│  └── SonarQube analysis + quality gate       │
├─────────────────────────────────────────────┤
│  Stage 4: Docker Build (3 min)               │
│  └── Layer-cached build                      │
├─────────────────────────────────────────────┤
│  Stage 5: Integration Tests (2 min)          │
│  └── Smoke tests với Docker compose          │
├─────────────────────────────────────────────┤
│  Total: ~18 min                              │
└─────────────────────────────────────────────┘
```

Pipeline này không phải điểm cuối — còn nhiều thứ để cải thiện (test parallelization tốt hơn, incremental builds...). Nhưng đây là trạng thái "đủ tốt để không cản trở development".

---

_Nếu bạn đang gặp vấn đề tương tự với CI/CD pipeline của mình, hãy comment bên dưới. Rất vui được trao đổi về các case cụ thể._
