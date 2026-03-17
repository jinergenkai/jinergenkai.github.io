---
title: "Một cậu sinh viên, Cursor, và 4 triệu USD"
pubDatetime: 2026-03-17T09:00:00.000+07:00
description: "Tôi đào sâu vào 2 repo 60k stars của BaiFu — sinh viên Trung Quốc vừa được tỷ phú rót 30 triệu RMB — và phát hiện câu chuyện thú vị hơn nhiều so với cái tiêu đề clickbait."
tags: [ai, startup, llm, agent, vibecoding]
lang: "vi"
audience: ["tech", "business"]
featured: true
draft: false
ogImage: "/images/baifu.png"
---
# Một cậu sinh viên, Cursor, và 4 triệu USD: Câu chuyện "làm giàu không khó" (với người khác)

*Hôm nay tôi lướt feed và thấy cùng một bài post 4 lần. Nội dung gần như giống hệt nhau: một sinh viên Trung Quốc tên BaiFu, vibecoding bằng Cursor, đạt 60k stars trên GitHub, được tỷ phú Chen Tianqiao rót 4 triệu USD. Câu chuyện ngọt đến mức ai cũng muốn share.*

*Tôi là một backend engineer ở môi trường enterprise. Thay vì share tiếp, tôi quyết định đào sâu xem 2 cái repo đó thực sự làm gì — và phát hiện ra câu chuyện thú vị hơn nhiều so với cái tiêu đề clickbait.*

## Table of contents

## Bên trong 2 repo "khủng"

### BettaFish (~37k stars) — "Phá vỡ bong bóng thông tin"

Tên đầy đủ là "微舆" (Wēi Yú — Vi Dư), nghĩa là "dư luận nhỏ." BettaFish là loài cá nhỏ nhưng cực kỳ hiếu chiến — tượng trưng cho "nhỏ mà mạnh, không sợ thách thức."

Về bản chất, đây là hệ thống multi-agent phân tích dư luận xã hội, build từ scratch không dùng framework nào. Hãy tưởng tượng bạn thuê 4 "nhân viên AI" làm việc song song:

- **Query Agent** — crawl 30+ nền tảng mạng xã hội (Weibo, Douyin, Twitter, Reddit...), thu thập tin tức
- **Media Agent** — phân tích video, ảnh, nội dung đa phương tiện liên quan
- **Insight Agent** — đào sâu vào database, phân tích xu hướng từ hàng triệu bình luận
- **Report Agent** — tổng hợp tất cả thành báo cáo PDF/Markdown chuyên nghiệp

Có thêm một cơ chế gọi là **Forum Engine** — nơi các agent "tranh luận" với nhau trước khi đưa ra kết luận. Giống như một phòng họp mà mỗi AI có quan điểm riêng.

Người dùng chỉ cần gõ: "Phân tích dư luận về Đại học Vũ Hán" — hệ thống tự chạy hoàn toàn.

### MiroFish (~8k stars) — "Cho tương lai diễn ra trước"

Đây mới là thứ thực sự "điên rồ," và là lý do Chen Tianqiao rót tiền.

MiroFish là một engine dự đoán dựa trên multi-agent. Nhưng nó không dự đoán theo cách truyền thống (lấy data quá khứ → extrapolate tương lai). Nó làm ngược: **tạo ra một thế giới thu nhỏ rồi bấm nút Play.**

Cụ thể: bạn đưa cho nó một "hạt giống" — có thể là báo cáo dư luận (output từ BettaFish), tin nóng, chính sách mới, hoặc thậm chí... 80 hồi đầu của Hồng Lâu Mộng.

MiroFish sẽ:

1. **Xây knowledge graph** — trích xuất thực thể và quan hệ
2. **Tạo "cư dân" ảo** — hàng ngàn agent, mỗi agent có nhân cách riêng, ký ức dài hạn, logic hành vi riêng
3. **Chạy mô phỏng** — các agent tương tác tự do, tạo ra hiện tượng "social evolution"
4. **Cho bạn "God's-eye view"** — bạn inject biến số mới giữa chừng để xem kịch bản thay đổi
5. **Xuất báo cáo dự đoán** và cho phép chat với bất kỳ "cư dân" nào trong thế giới mô phỏng

Bạn muốn biết "nếu Mỹ tăng thuế chip 50% thì chuyện gì xảy ra?" — thay vì chạy regression, MiroFish tạo ra CEO công ty chip, nhà đầu tư, chính trị gia, KOL mạng xã hội... mỗi người có tính cách riêng, rồi cho họ react. Những pattern mà không ai thiết kế trước sẽ **tự nổi lên** từ tương tác. Đó là concept **emergence** — trí tuệ bầy đàn.

---

## Tại sao một tỷ phú quyết trong 24 giờ?

Chen Tianqiao không phải nhà đầu tư bình thường. Ông từng xây đế chế game online lớn nhất Trung Quốc (Shanda), bỏ 1 tỷ USD vào nghiên cứu khoa học não bộ tại Caltech. Ông hiểu **emergence** rất sâu — trong não người, không có neuron nào "biết" nó đang nghĩ gì, nhưng hàng tỷ neuron tương tác thì ý thức xuất hiện.

MiroFish nằm chính xác ở giao điểm mọi thứ Chen theo đuổi cả đời: virtual worlds + behavior modeling + prediction.

Và đây là chi tiết quan trọng nhất: **Chen nói thẳng rằng trình độ kỹ thuật của BettaFish không đặc biệt xuất sắc.** Điều ông đánh giá cao là tầm nhìn tổng thể — pipeline end-to-end từ thu thập dữ liệu đến phân tích đến dự đoán — và tốc độ execution.

30 triệu RMB mua vision và momentum. Không phải mua code.

---

## Đối chiếu: Khi "model tinh vi nhất thế giới" vẫn sập

Nói đến dự đoán, phải nhắc đến quant model — thứ mà Wall Street đã chơi từ 30 năm trước.

Câu chuyện kinh điển: **LTCM (Long-Term Capital Management)**, quỹ hedge fund do 2 người đoạt giải Nobel Kinh tế sáng lập. Toàn PhD toán và vật lý. Model tinh vi nhất thời đại. Return 43% năm 1995, 41% năm 1996.

Rồi tháng 8/1998, Nga vỡ nợ. Ngày 21/8, LTCM mất 550 triệu USD trong MỘT NGÀY. Tổng thiệt hại: 4.6 tỷ USD. Cục Dự trữ Liên bang phải huy động 14 ngân hàng góp 3.6 tỷ USD cứu, vì sợ sụp đổ hệ thống tài chính toàn cầu.

Nguyên nhân cốt lõi: model VaR của LTCM chỉ dùng 5 năm data. Nếu họ nhìn lại 80 năm thì đã thấy lần Nga vỡ nợ trước đó. Như ai đó đã nói: **"Các nhà Nobel biết rất nhiều toán, nhưng không đủ lịch sử."**

Quant model mạnh ở precision — dự đoán "giá lên 0.3% trong 47 phút tới." MiroFish mạnh ở chỗ khác — dự đoán phản ứng xã hội trước **sự kiện chưa từng xảy ra** (black swan), vì LLM đã "đọc" mọi thứ con người từng viết nên có thể reason about novel situations.

Nếu ai đó kết hợp quant precision + MiroFish-style simulation... đó mới là thứ thực sự đáng sợ. Và gần như chắc chắn đã có team đang làm điều này — chỉ là không open source.

---

## Manus: Minh chứng rõ nhất cho "wrapper đáng 2 tỷ USD"

Để hiểu tại sao BaiFu viral, phải hiểu bối cảnh: Manus.

Manus là AI agent autonomous, ra mắt tháng 3/2025. Không giống chatbot — bạn giao việc, nó tự lên kế hoạch và thực thi. "Phân tích đối thủ và tạo business report" — nó tự browse web, phân tích data, viết report, gửi lại.

Tốc độ scale: 100 triệu USD doanh thu thường niên chỉ sau 8 tháng — nhanh nhất lịch sử AI consumer apps, vượt cả Cursor.

Chi tiết thú vị: Manus được xây trên nền **Claude Sonnet của Anthropic.** Critics chê "chỉ là wrapper." Nhưng "wrapper" đó được Meta mua lại với giá hơn 2 tỷ USD vào tháng 12/2025, vì nó giải quyết "last mile problem" — biến LLM từ "trả lời hay" thành "làm việc được."

---

## Pattern: Không ai tạo technology mới

Nhìn lại: BaiFu gọi LLM API + crawling → "AI public opinion analyst." Manus dùng Claude API + browser automation → "digital employee." Cả hai đều không phát minh gì mới về mặt kỹ thuật.

Cùng một stack (LLM + agent + RAG), giá trị không nằm ở code. Giá trị nằm ở:

- **Product thinking** — nhìn thấy bài toán thực tế và thiết kế pipeline end-to-end
- **Execution speed** — ship trong 10 ngày, đủ polish để demo
- **Timing** — multi-agent đang là narrative nóng nhất, ship đúng lúc market đói
- **Narrative** — "sinh viên năm cuối, 10 ngày, vibecoding, tỷ phú rót tiền" — câu chuyện mà ai cũng *muốn* tin và *muốn* share

Concept "simulated society" của MiroFish không mới — Stanford đã publish paper "Generative Agents" từ tháng 4/2023 về 25 agent sống trong thị trấn ảo. Nhưng năm 2023 chưa ai quan tâm vì còn là "academic curiosity." BaiFu productize cái academic concept đó đúng thời điểm market sẵn sàng.

---

## Bài học cho người đang quan sát

Tôi dành cả buổi tối phân tích BaiFu, Manus, quant model, LTCM. Và cái insight đáng giá nhất không phải kiến thức kỹ thuật nào.

Nó là thế này: **khoảng cách giữa "biết AI tồn tại" và "hiểu cách leverage AI" — khoảng cách đó là nơi tiền được tạo ra.**

Hàng triệu developer biết ChatGPT, nhưng không phân biệt Claude vs GPT vs Gemini khi nào dùng cái nào. Họ dùng AI như dùng Google — gõ câu hỏi, chờ đáp án. Và vì dùng như thế nên nghĩ "AI cũng thường thôi." Tôi hỏi một anh dev senior: "Anh dùng Claude chưa?" Anh bảo: "Chưa, đang tính thử." Claude viral đã lâu rồi.

Đó không phải lỗi của anh ấy. Đó là **default mode của con người** — đủ bận với công việc, đủ thoải mái với status quo, không có urgency để explore. Não người được thiết kế để tiết kiệm năng lượng, không phải để liên tục đặt câu hỏi.

Những người "tạo luật chơi" không thông minh hơn. Họ chỉ đủ bất mãn hoặc đủ tò mò để không chấp nhận default mode. BaiFu đủ bất mãn với việc "chờ tốt nghiệp rồi xin việc." Xiao Hong (Manus) ship trước khi người khác còn đang "tính thử."

Có một câu nổi tiếng trong startup: **"Being right too early is the same as being wrong."** Đúng nhưng sớm quá cũng như sai. BaiFu không đi trước thời đại — cậu ấy đi **đúng** thời đại. Và điều đó đòi hỏi phải quan sát market sentiment, không chỉ quan sát technology.

---

## Vậy bước tiếp theo là gì?

Tôi viết bài này không phải để truyền cảm hứng kiểu "cứ ship đi rồi thành triệu phú." Phần lớn lời khuyên đó là survivorship bias — người ta chỉ kể story thành công, không kể hàng ngàn repo cũng ship, cũng 10 ngày, nhưng 12 stars rồi chìm.

Tôi viết vì tôi nhận ra: quan sát không tạo ra thay đổi. Hành động mới tạo ra thay đổi.

Và bước nhỏ nhất không phải launch startup hay kiếm 4 triệu USD. Bước nhỏ nhất là biến quan sát thành thứ người khác đọc được — một bài phân tích, một góc nhìn, một câu hỏi hay. Bài blog này là bước đầu tiên của tôi.

Vì cuối cùng, giá trị không nằm ở code. **Giá trị nằm ở cách bạn nhìn thế giới và đặt câu hỏi.** BaiFu hỏi: "Dư luận không chỉ cần phân tích — nó cần được mô phỏng lại." Câu hỏi đó đáng 4 triệu USD.

Câu hỏi của bạn là gì?