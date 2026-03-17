---
title: "Terminal Setup Wiki - Dev Lỏ Nhưng Terminal Phải Đẹp"
pubDatetime: 2026-03-17T09:00:00.000+07:00
description: "Hướng dẫn biến terminal mặc định thành công cụ đẹp, nhanh, thông minh trong 30 phút. Zsh + Oh My Zsh + Powerlevel10k + fzf + eza + bat."
tags: [linux, terminal, zsh, shell, productivity]
lang: "vi"
subject: "other"
difficulty: "beginner"
draft: false
featured: false
---

# 🚀 Pro Terminal Setup Wiki — From Zero to Hero on Linux

> **Mục tiêu:** Biến terminal mặc định thành công cụ đẹp, nhanh, thông minh — khoảng 30 phút. Không cần kinh nghiệm. Làm theo từng bước là xong. Không cần search thêm chỗ khác.

## Table of contents

## 1. Tổng quan — Cài gì, tại sao

|Thành phần|Vai trò|Tại sao|
|---|---|---|
|**Zsh**|Shell thay thế Bash|Tương thích ~99% Bash script, autocomplete thông minh hơn|
|**Oh My Zsh**|Framework quản lý config|Plugin/theme ecosystem lớn nhất|
|**Powerlevel10k**|Theme|Đẹp, cực nhanh, hiện git/docker/k8s/time|
|**zsh-autosuggestions**|Gợi ý command từ history|Gõ vài ký tự → hint mờ → nhấn → accept|
|**zsh-syntax-highlighting**|Tô màu command real-time|Đúng = xanh, sai = đỏ|
|**fzf**|Fuzzy finder|Tìm history/file/folder cực nhanh|
|**z**|Smart cd|Nhớ folder hay dùng, gõ tên ngắn là nhảy tới|
|**bat**|Thay `cat`|Syntax highlighting + line number|
|**eza**|Thay `ls`|Icon, màu sắc, git status|

**Thứ tự cài:** Font → Zsh + Oh My Zsh → Powerlevel10k → Plugins → Tools → Config

> ⚠️ **Cài Font TRƯỚC** — Powerlevel10k cần Nerd Font để hiển thị icon. Không có → hiện ô vuông □.

---

## 2. Cài đặt Nerd Font (LÀM TRƯỚC)

Nerd Font = font chữ được patch thêm hàng nghìn icon (git branch, folder, docker,...).

### Tải và cài JetBrainsMono Nerd Font

```bash
mkdir -p ~/.local/share/fonts && cd ~/.local/share/fonts \
  && curl -fLo "JetBrainsMono.zip" https://github.com/ryanoasis/nerd-fonts/releases/latest/download/JetBrainsMono.zip \
  && unzip JetBrainsMono.zip && rm JetBrainsMono.zip && fc-cache -fv
```

> Các font phổ biến khác: [MesloLGS NF](https://github.com/romkatv/powerlevel10k#meslo-nerd-font-patched-for-powerlevel10k), [FiraCode Nerd Font](https://github.com/ryanoasis/nerd-fonts/releases/latest). Tải về → giải nén vào `~/.local/share/fonts` → `fc-cache -fv`.

### Set font trong Terminal Emulator

|Terminal|Cách set|
|---|---|
|**GNOME Terminal**|Hamburger menu ☰ → Preferences → chọn Profile → Text → tick Custom font → chọn `JetBrainsMono Nerd Font`|
|**Konsole (KDE)**|Settings → Edit Current Profile → Appearance → Font → `JetBrainsMono Nerd Font`|
|**Tilix**|Hamburger menu ☰ → Preferences → chọn Profile → General → Font → `JetBrainsMono Nerd Font`|
|**Windows Terminal**|Settings → chọn Profile → Appearance → Font face → `JetBrainsMono Nerd Font`|
|**VS Code Terminal**|Settings → tìm `terminal font` → Terminal > Integrated: Font Family → gõ `'JetBrainsMono Nerd Font'`|

> 📸 **Hình minh hoạ:** Mở terminal settings → tìm mục Font → chọn font có chữ "Nerd" trong tên.

### Kiểm tra font

```bash
echo -e "\uf115 \uf09b \ue0b0 \uf013 \uf0e7"
```

✅ Thấy 5 icon (folder, github, arrow, gear, lightning) → OK. ❌ Thấy ô vuông □ → chưa set font đúng, kiểm tra lại bước trên.

---

## 3. Cài Zsh + Oh My Zsh

### 3.1 Cài Zsh

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install zsh -y

# Fedora
sudo dnf install zsh -y

# Arch
sudo pacman -S zsh

# Kiểm tra
zsh --version
```

### 3.2 Cài Oh My Zsh

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Installer sẽ hỏi 2 câu — **chọn Y cho cả hai:**

```
Do you want to overwrite it with the Oh My Zsh template? [Y/n] y
→ Backup file cũ thành ~/.zshrc.pre-oh-my-zsh, tạo .zshrc mới.

Do you want to change your default shell to zsh? [Y/n] y
→ Đổi default shell sang Zsh luôn (không cần chạy chsh riêng).

Shell successfully changed to '/usr/bin/zsh'.
```

> 💡 Nếu lỡ chọn N ở câu đổi shell, chạy riêng: `chsh -s $(which zsh)` rồi logout/login lại.

---

## 4. Cài Powerlevel10k theme

### 4.1 Clone theme

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git \
  ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

### 4.2 Set theme (tự động, không cần mở editor)

```bash
sed -i 's/^ZSH_THEME=.*/ZSH_THEME="powerlevel10k\/powerlevel10k"/' ~/.zshrc
```

### 4.3 Apply và chạy wizard

```bash
source ~/.zshrc
```

Powerlevel10k **Configuration Wizard** tự chạy, bắt đầu bằng:

```
Does this look like a diamond (rotated square)? [y/n]
   ◆
```

> ⚠️ **Nếu KHÔNG thấy hình diamond ◆** → font chưa set đúng. Quay lại [Mục 2](#2-cài-đặt-nerd-font-làm-trước) kiểm tra lại trước khi tiếp tục.

> 📸 **Hình minh hoạ:** Wizard hỏi lần lượt về icon, style, layout. Chọn theo sở thích, không có đáp án sai.

Wizard tạo file `~/.p10k.zsh`. Muốn chạy lại wizard bất cứ lúc nào: `p10k configure`.

---

## 5. Cài plugins

### 5.1 zsh-autosuggestions — gợi ý từ history

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

### 5.2 zsh-syntax-highlighting — tô màu command

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

### 5.3 fzf — fuzzy finder

```bash
# Khuyên dùng cách này (mới hơn apt, keybindings đầy đủ)
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
~/.fzf/install
# → Trả lời Yes cho tất cả câu hỏi
```

### 5.4 bat — better `cat`

```bash
# Ubuntu/Debian
sudo apt install bat -y
```

> ⚠️ Trên Ubuntu binary tên là `batcat` (không phải `bat`) do conflict tên package. Config file sẽ alias tự động.

### 5.5 eza — better `ls`

Cài thủ công (không cần thêm repo bên ngoài, chạy được trên mọi máy):

```bash
mkdir -p ~/.local/bin && cd /tmp \
  && wget https://github.com/eza-community/eza/releases/latest/download/eza_x86_64-unknown-linux-gnu.tar.gz \
  && tar -xzf eza_x86_64-unknown-linux-gnu.tar.gz \
  && mv eza ~/.local/bin/ \
  && chmod +x ~/.local/bin/eza \
  && rm eza_x86_64-unknown-linux-gnu.tar.gz
```

> ⚠️ `~/.local/bin` phải nằm trong `$PATH`. File config ở [Mục 7](#7-file-config-hoàn-chỉnh) đã xử lý. Nếu sau restart mà `eza` mất màu → xem [Troubleshooting](#eza-mất-màu--không-nhận-sau-restart).

### 5.6 Bật plugins trong `.zshrc` (tự động)

```bash
sed -i 's/^plugins=(.*/plugins=(git z zsh-autosuggestions sudo command-not-found extract copypath docker kubectl zsh-syntax-highlighting)/' ~/.zshrc
```

> ⚠️ `zsh-syntax-highlighting` **PHẢI ở cuối cùng** trong list plugins.

Apply:

```bash
source ~/.zshrc
```

---

## 6. Cài công cụ bổ trợ (Optional)

Các tool ở mục 5 là đủ cho hầu hết người dùng. Nếu muốn thêm:

|Tool|Mô tả|Cài|
|---|---|---|
|**fd**|Thay `find`, nhanh hơn, tự bỏ qua `.gitignore`|`sudo apt install fd-find -y && mkdir -p ~/.local/bin && ln -s $(which fdfind) ~/.local/bin/fd`|
|**ripgrep**|Thay `grep`, nhanh hơn nhiều lần|`sudo apt install ripgrep -y` — dùng: `rg "pattern"`|

---

## 7. File config hoàn chỉnh

Dùng **một file custom duy nhất** `~/.zsh/custom.zsh` chứa tất cả config cho các tool mới cài. File `.zshrc` chính chỉ source file này.

### 7.1 Cấu trúc

```
~/.zshrc              ← file chính (Oh My Zsh tạo), source mọi thứ
~/.zsh/custom.zsh     ← TẤT CẢ config custom: alias, export, function
~/.p10k.zsh           ← config Powerlevel10k (wizard tạo)
~/.bashrc             ← giữ nguyên, được source bởi .zshrc
```

```bash
mkdir -p ~/.zsh
```

### 7.2 File `~/.zshrc`

Backup rồi thay thế:

```bash
cp ~/.zshrc ~/.zshrc.backup.$(date +%Y%m%d)
```

Nội dung `~/.zshrc`:

```bash
# ╔══════════════════════════════════════════════════════════════╗
# ║                        ~/.zshrc                              ║
# ║  Zsh + Oh My Zsh + Powerlevel10k                             ║
# ╚══════════════════════════════════════════════════════════════╝

# ── Powerlevel10k Instant Prompt (PHẢI ĐỂ ĐẦU FILE) ──────────
# Cho phép prompt hiện ngay trong khi config đang load.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# ── Oh My Zsh ─────────────────────────────────────────────────
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="powerlevel10k/powerlevel10k"

# Plugins — zsh-syntax-highlighting PHẢI ở cuối
plugins=(
  git
  z
  zsh-autosuggestions
  sudo
  command-not-found
  extract
  copypath
  docker
  kubectl
  zsh-syntax-highlighting
)

source $ZSH/oh-my-zsh.sh

# ── Source .bashrc ────────────────────────────────────────────
# Nếu bạn có alias/export/function trong .bashrc → vẫn hoạt động.
# Sửa .bashrc → mở terminal mới là apply, không cần biết Zsh.
# Khi nào quen Zsh rồi thì chuyển dần sang ~/.zsh/custom.zsh.
if [[ -f "$HOME/.bashrc" ]]; then
  emulate bash -c 'source "$HOME/.bashrc"' 2>/dev/null
fi

# ── Load custom config ───────────────────────────────────────
# Tất cả alias, export, function nằm trong ~/.zsh/*.zsh
for f in ~/.zsh/*.zsh(N); do source "$f"; done

# ── fzf ──────────────────────────────────────────────────────
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

# ── Powerlevel10k (PHẢI ĐỂ CUỐI) ────────────────────────────
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh
```

### 7.3 File `~/.zsh/custom.zsh`

Đây là **file duy nhất bạn cần sửa** sau khi setup xong:

```bash
# ╔══════════════════════════════════════════════════════════════╗
# ║                  ~/.zsh/custom.zsh                           ║
# ║  Tất cả custom config — alias, export, function              ║
# ╚══════════════════════════════════════════════════════════════╝

# ══════════════════════════════════════════════════════════════
# PATH — đặt ở đây để đảm bảo tool trong ~/.local/bin luôn nhận
# ══════════════════════════════════════════════════════════════
export PATH="$HOME/.fzf/bin:$HOME/.local/bin:$PATH"
typeset -U path PATH

# ══════════════════════════════════════════════════════════════
# HISTORY — lưu nhiều, loại trùng, share giữa các tab
# ══════════════════════════════════════════════════════════════
export HISTFILE="$HOME/.zsh_history"
export HISTSIZE=50000
export SAVEHIST=50000
setopt HIST_IGNORE_ALL_DUPS     # bỏ lệnh trùng hoàn toàn
setopt HIST_FIND_NO_DUPS        # tìm history không hiện trùng
setopt HIST_SAVE_NO_DUPS        # không ghi trùng vào file
setopt SHARE_HISTORY            # share history giữa các tab/session
setopt INC_APPEND_HISTORY       # ghi history ngay, không đợi exit

# ══════════════════════════════════════════════════════════════
# EDITOR
# ══════════════════════════════════════════════════════════════
export EDITOR="vim"
export VISUAL="$EDITOR"

# ══════════════════════════════════════════════════════════════
# FZF — tuỳ chỉnh giao diện fuzzy finder
# ══════════════════════════════════════════════════════════════
export FZF_DEFAULT_OPTS="--height=40% --layout=reverse --border --info=inline"

# Dùng fd thay find nếu có (nhanh hơn, bỏ qua .gitignore)
if command -v fd &> /dev/null; then
  export FZF_DEFAULT_COMMAND='fd --type f --hidden --follow --exclude .git'
  export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"
  export FZF_ALT_C_COMMAND='fd --type d --hidden --follow --exclude .git'
fi

# ══════════════════════════════════════════════════════════════
# ALIASES — cho các tool đã cài
# ══════════════════════════════════════════════════════════════

# ── eza (thay ls) ─────────────────────────────────────────────
if command -v eza &> /dev/null; then
  alias ls="eza --icons --color=always"
  alias ll="eza -lah --icons --color=always --git"
  alias la="eza -a --icons --color=always"
  alias lt="eza --tree --level=2 --icons --color=always"
else
  alias ls="ls --color=auto"
  alias ll="ls -lah"
fi

# ── bat (thay cat) ────────────────────────────────────────────
if command -v batcat &> /dev/null; then
  alias cat="batcat --paging=never"
  alias bat="batcat"
elif command -v bat &> /dev/null; then
  alias cat="bat --paging=never"
fi

# ── Navigation ────────────────────────────────────────────────
alias ..="cd .."
alias ...="cd ../.."
alias -- -="cd -"

# ── Git ───────────────────────────────────────────────────────
alias gs="git status"
alias gd="git diff"
alias gl="git log --oneline -20"
alias gla="git log --oneline --all --graph -20"
alias gp="git pull"
alias gpush="git push"

# ── Docker & K8s ──────────────────────────────────────────────
alias dk="docker"
alias dkc="docker compose"
alias dkps="docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'"
alias k="kubectl"
alias kgp="kubectl get pods"

# ── Quick config ──────────────────────────────────────────────
alias zshconfig="$EDITOR ~/.zshrc"
alias customconfig="$EDITOR ~/.zsh/custom.zsh"
alias reload="source ~/.zshrc && echo '✅ Config reloaded'"

# ── Safety ────────────────────────────────────────────────────
alias rm="rm -i"
alias mv="mv -i"
alias cp="cp -i"

# ══════════════════════════════════════════════════════════════
# FUNCTIONS
# ══════════════════════════════════════════════════════════════

# mkcd: tạo folder rồi cd vào luôn
mkcd() { mkdir -p "$1" && cd "$1"; }

# backup: tạo bản sao có timestamp
backup() { cp "$1" "$1.bak.$(date +%Y%m%d_%H%M%S)"; }

# cheat: tra cứu cheatsheet (cần internet)
# Ví dụ: cheat tar, cheat git-rebase, cheat curl
cheat() { curl -s "cheat.sh/$1"; }

# ══════════════════════════════════════════════════════════════
# NVM LAZY LOAD (tránh terminal mở chậm)
# Uncomment nếu bạn cài nvm và terminal mở > 2 giây:
# ══════════════════════════════════════════════════════════════
# export NVM_DIR="$HOME/.nvm"
# nvm()  { unfunction nvm node npm npx 2>/dev/null; [ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"; nvm "$@"; }
# node() { nvm use default &>/dev/null; command node "$@"; }
# npm()  { nvm use default &>/dev/null; command npm "$@"; }
# npx()  { nvm use default &>/dev/null; command npx "$@"; }
```

---

## 8. Hướng dẫn sử dụng + Mẹo

### 8.1 Autosuggestions — không cần nhớ command

Khi gõ, text màu xám mờ xuất hiện — gợi ý từ history:

```
$ docker compose up    ← gõ "doc" → hint mờ hiện "ker compose up -d"
                         nhấn → accept toàn bộ
                         nhấn Ctrl+→ accept từng word
                         gõ tiếp để bỏ qua
```

**Mẹo:** Gõ 2-3 ký tự → hint hiện command dài 50+ ký tự → nhấn → → xong. Không cần nhớ gì.

### 8.2 Syntax Highlighting — phát hiện lỗi ngay

```
$ docker compose up     ← "docker" XANH LÁ = command tồn tại
$ dockr compose up      ← "dockr" ĐỎ = sai / không tồn tại
$ cat /etc/hostname     ← path có GẠCH CHÂN = tồn tại thật
$ cat /etc/fakefile     ← không gạch chân = không tồn tại
```

### 8.3 Tab Completion — thông minh hơn Bash rất nhiều

Zsh hỗ trợ **partial matching** — không cần gõ từ đầu tên file:

```
$ cd /etc/sy[Tab]           → /etc/systemd/
$ cd soft[Tab]              → software-mgmt-impl/  (match ở giữa tên!)
$ cd impl[Tab]              → software-mgmt-impl/  (match ở cuối tên!)
$ cd s-m-i[Tab]             → software-mgmt-impl/  (match chữ cái đầu mỗi phần!)

$ git checkout fea[Tab]     → feature/campaign-retry  (autocomplete git branch)
$ kubectl get po[Tab]       → pods  (autocomplete k8s resource)
$ kill [Tab]                → hiện danh sách process để chọn!
$ ssh [Tab]                 → hiện list host từ ~/.ssh/config!
```

**Nhiều kết quả?** Nhấn Tab lần nữa → hiện menu → dùng ↑↓←→ hoặc Tab di chuyển → Enter chọn.

### 8.4 z — smart jump

```bash
# z tự học khi bạn cd:
cd ~/projects/nokia-fnms/campaign-service
cd ~/projects/chicky/backend
cd /var/log

# Sau đó, từ BẤT KỲ đâu:
z campaign      # → ~/projects/nokia-fnms/campaign-service
z chicky        # → ~/projects/chicky/backend
z log           # → /var/log
z nokia camp    # → nhiều từ = chính xác hơn
```

> 💡 z cần "học" vài ngày. Ngày đầu chưa biết folder nào — cứ `cd` bình thường.

### 8.5 fzf — 3 phím tắt thần thánh

#### `Ctrl+R` — tìm history (dùng nhiều nhất)

```
Nhấn Ctrl+R → popup xuất hiện → gõ "kafka" → filter tất cả command kafka
↑↓ chọn → Enter chạy lại

Cũ:  history | grep kafka → copy → paste
Mới: Ctrl+R → kafka → Enter  (nhanh hơn 5x)
```

#### `Ctrl+T` — tìm file, chèn path vào command đang gõ

```
vim [Ctrl+T] → popup file → gõ "docker" → chọn docker-compose.yml → Enter
→ thành: vim ./docker-compose.yml
```

#### `Alt+C` — tìm folder rồi cd vào

```
Alt+C → gõ "src" → chọn → Enter → cd vào luôn
```

### 8.6 bat — đọc file có highlight

```bash
bat server.py               # syntax color + line number
bat -l json data.json       # chỉ định ngôn ngữ
bat --diff file1 file2      # so sánh 2 file
```

### 8.7 eza — list file đẹp

```bash
ls      # list cơ bản + icon file type
ll      # chi tiết: permission, size, date, git status
la      # bao gồm hidden files
lt      # tree view 2 cấp
```

### 8.8 Plugin `sudo` — Double ESC

```bash
apt update          # gõ xong, nhận ra cần sudo
# Nhấn ESC ESC
sudo apt update     # tự thêm sudo
```

### 8.9 Apply config sau khi sửa

```bash
source ~/.zshrc     # apply ngay, không cần đóng terminal
reload              # alias = source ~/.zshrc + thông báo ✅
```

---

## 9. Kịch bản demo quay video

> Quay GIF/video giới thiệu tất cả tính năng. Tool quay: [asciinema](https://asciinema.org/) (record terminal → share link), hoặc screen recorder + crop.

### Scene 1: First Impression (10s)

```
Mục tiêu: Terminal đẹp ngay từ đầu.
Action:
  1. Mở terminal → Powerlevel10k prompt với icon, git branch, time
  2. cd vào git repo → prompt hiện branch + trạng thái
  3. Dừng 2 giây
```

### Scene 2: Autosuggestions (15s)

```
Mục tiêu: Gợi ý tự động.
Action:
  1. Gõ "doc" → hint mờ "docker compose up -d" → nhấn → accept
  2. Ctrl+C (không chạy thật)
  3. Gõ "git p" → hint "git push origin main"
  4. Nhấn Ctrl+→ 2 lần → accept "git push" → gõ tiếp phần khác
```

### Scene 3: Syntax Highlighting (10s)

```
Mục tiêu: Xanh = đúng, đỏ = sai.
Action:
  1. Gõ "docker" → xanh lá
  2. Xoá, gõ "dockr" → đỏ
  3. Sửa lại "docker" → xanh
  4. Gõ "cat /etc/hostname" → path gạch chân
  5. Gõ "cat /etc/fakefile" → không gạch chân
```

### Scene 4: Tab Completion (15s)

```
Mục tiêu: Partial match — không cần gõ từ đầu.
Action:
  1. Trong folder có software-mgmt-impl/
  2. "cd soft[Tab]" → complete
  3. "cd impl[Tab]" → cũng complete!
  4. "cd s-m-i[Tab]" → complete!
  5. "git checkout fea[Tab]" → hiện branch
  6. "kill [Tab]" → menu process
```

### Scene 5: fzf — Ctrl+R (15s)

```
Mục tiêu: Tìm history siêu nhanh.
Action:
  1. Ctrl+R → popup fzf
  2. Gõ "kafka" → filter command kafka
  3. ↑↓ chọn → Enter
  4. Ctrl+R lại → gõ "ssh" → thấy server đã connect
  5. Caption: "Không cần history | grep nữa"
```

### Scene 6: fzf — Ctrl+T & Alt+C (10s)

```
Mục tiêu: Tìm file và folder.
Action:
  1. "vim " + Ctrl+T → chọn file → path chèn vào
  2. Alt+C → gõ "src" → cd vào
```

### Scene 7: z — smart jump (10s)

```
Action:
  1. "z project" → nhảy tới ~/projects/something
  2. "z log" → nhảy tới /var/log
  3. Caption: "z tự học folder bạn hay dùng"
```

### Scene 8: eza + bat (10s)

```
Action:
  1. "ll" → list file + icon + git status
  2. "lt" → tree view
  3. "cat server.py" → syntax highlight + line number
```

### Scene 9: Double ESC = sudo (5s)

```
Action:
  1. "apt update" → Enter → lỗi permission
  2. ↑ → ESC ESC → "sudo" tự thêm
```

### Scene 10: Closing (5s)

```
  1. Prompt đẹp
  2. Text: "Setup 30 phút. Link wiki trong description."
```

**Tổng: ~100 giây (~1:40)**

---

## 10. Phím tắt cần nhớ

```
┌───────────────────────────────────────────────────────┐
│              PRO TERMINAL CHEATSHEET                   │
├───────────────────────────────────────────────────────┤
│                                                       │
│  NAVIGATION                                           │
│    z <keyword>     Nhảy tới folder hay dùng           │
│    Alt+C           fzf tìm folder + cd                │
│    cd -            Quay lại folder trước               │
│    ..  ...         Lên 1 / 2 cấp                      │
│                                                       │
│  SEARCH                                               │
│    Ctrl+R          fzf tìm history                    │
│    Ctrl+T          fzf tìm file, chèn path           │
│                                                       │
│  EDIT COMMAND                                         │
│    Ctrl+A / E      Nhảy đầu / cuối dòng              │
│    Ctrl+U / K      Xoá tới đầu / cuối dòng           │
│    Ctrl+W          Xoá 1 word phía trước              │
│    ESC ESC         Thêm sudo                          │
│                                                       │
│  AUTOSUGGESTIONS                                      │
│    →               Accept toàn bộ gợi ý               │
│    Ctrl+→          Accept 1 word                      │
│                                                       │
│  TAB COMPLETION                                       │
│    Tab              Autocomplete                      │
│    Tab Tab          Menu chọn khi nhiều kết quả       │
│    impl[Tab]        Match ở giữa/cuối tên file        │
│    s-m-i[Tab]       Match chữ cái đầu mỗi phần       │
│                                                       │
│  FILES                                                │
│    ls / ll / lt    List / detail / tree (eza)         │
│    cat <file>      View + syntax highlight (bat)      │
│                                                       │
│  CONFIG                                               │
│    reload          Apply config ngay                  │
│    customconfig    Sửa config custom                  │
│    p10k configure  Chạy lại theme wizard              │
│                                                       │
│  GIT                                                  │
│    gs / gd / gl    status / diff / log                │
│    gp / gpush      pull / push                        │
│                                                       │
└───────────────────────────────────────────────────────┘
```

---

## 11. Backup & Restore dotfiles

### Backup

```bash
mkdir -p ~/dotfiles && cd ~/dotfiles && git init
cp ~/.zshrc .
cp ~/.p10k.zsh .
cp -r ~/.zsh .

# Tạo install script
cat > install.sh << 'SCRIPT'
#!/bin/bash
DIR="$(cd "$(dirname "$0")" && pwd)"
ln -sf "$DIR/.zshrc" ~/.zshrc
ln -sf "$DIR/.p10k.zsh" ~/.p10k.zsh
ln -sf "$DIR/.zsh" ~/.zsh
echo "✅ Dotfiles linked!"
echo "Còn cần cài: zsh, oh-my-zsh, p10k, plugins, fzf, bat, eza"
SCRIPT
chmod +x install.sh

git add . && git commit -m "dotfiles"
# git remote add origin git@github.com:YOU/dotfiles.git && git push -u origin main
```

### Restore trên máy mới (one-liner)

```bash
sudo apt update && sudo apt install zsh git curl wget unzip bat -y \
  && sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended \
  && git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k \
  && git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions \
  && git clone https://github.com/zsh-users/zsh-syntax-highlighting ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting \
  && git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf && ~/.fzf/install --all \
  && mkdir -p ~/.local/bin && cd /tmp \
  && wget -q https://github.com/eza-community/eza/releases/latest/download/eza_x86_64-unknown-linux-gnu.tar.gz \
  && tar -xzf eza_x86_64-unknown-linux-gnu.tar.gz && mv eza ~/.local/bin/ && chmod +x ~/.local/bin/eza && rm eza_x86_64-unknown-linux-gnu.tar.gz \
  && mkdir -p ~/.local/share/fonts && cd ~/.local/share/fonts \
  && curl -fLo "JetBrainsMono.zip" https://github.com/ryanoasis/nerd-fonts/releases/latest/download/JetBrainsMono.zip \
  && unzip -o JetBrainsMono.zip && rm JetBrainsMono.zip && fc-cache -fv

# Sau đó: clone dotfiles repo → ./install.sh → set font trong terminal → chsh -s $(which zsh) → logout/login
```

---

## 12. Troubleshooting

### Icon hiện ô vuông □

**Nguyên nhân:** Chưa cài/set Nerd Font. **Fix:** Kiểm tra:

1. `fc-list | grep -i jetbrains` có kết quả
2. Terminal emulator đã chọn đúng font name

### eza mất màu / không nhận sau restart

**Nguyên nhân:** `~/.local/bin` không trong `$PATH` hoặc bị ghi đè.

```bash
which eza           # phải trả về ~/.local/bin/eza
echo $PATH | tr ':' '\n' | head   # ~/.local/bin phải trước /usr/bin
alias ls            # phải hiện: eza --icons --color=always
```

**Fix:** Đảm bảo `~/.zsh/custom.zsh` có `export PATH="$HOME/.local/bin:$PATH"` và file đó được source trong `.zshrc`.

### Terminal mở chậm (> 2 giây)

```bash
time zsh -i -c exit     # đo thời gian
```

Thủ phạm thường gặp: **nvm**. Fix: uncomment block NVM LAZY LOAD trong `custom.zsh`.

### Bash script bị lỗi khi chạy trong Zsh

```bash
# Cách 1: chạy bằng Bash rõ ràng
bash script.sh

# Cách 2: tạm quay về Bash để debug
bash                    # vào Bash session
./script.sh             # chạy thử
exit                    # quay lại Zsh

# Cách 3: đảm bảo script có shebang:
#!/bin/bash
# → Zsh tự gọi Bash để chạy file này
```

> 💡 Hầu hết script có `#!/bin/bash` chạy đúng dù đang ở Zsh. Lỗi chỉ khi `source script.sh` (chạy trong Zsh context) thay vì `bash script.sh` (Bash riêng).

### fzf Ctrl+R không hoạt động

```bash
which fzf               # kiểm tra đã cài
~/.fzf/install           # chạy lại, chọn Yes hết
source ~/.zshrc
```

### Autosuggestions không hiện

```bash
ls ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions/    # đã clone?
grep "autosuggestions" ~/.zshrc     # đã thêm vào plugins?
```

### Quay về Bash hoàn toàn

```bash
chsh -s $(which bash)
# Logout + login. Config Zsh vẫn còn, chỉ không active.
```

---

## Tài liệu tham khảo

|Resource|Link|
|---|---|
|Oh My Zsh|https://github.com/ohmyzsh/ohmyzsh|
|Oh My Zsh Plugins|https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins|
|Powerlevel10k|https://github.com/romkatv/powerlevel10k|
|zsh-autosuggestions|https://github.com/zsh-users/zsh-autosuggestions|
|zsh-syntax-highlighting|https://github.com/zsh-users/zsh-syntax-highlighting|
|fzf|https://github.com/junegunn/fzf|
|bat|https://github.com/sharkdp/bat|
|eza|https://github.com/eza-community/eza|
|Nerd Fonts|https://www.nerdfonts.com|

---

## 13. Tiếp theo — Roadmap nâng cấp terminal

Bản wiki này bao gồm nền tảng đủ dùng hàng ngày. Dưới đây là lộ trình nếu muốn đi xa hơn, chia thành các bài riêng:

### Phase 2 — TUI Tools *(bài tiếp theo)*

Công cụ giao diện text thay thế hoàn toàn GUI cho các tác vụ dev thường gặp:

| Tool | Thay thế | Mô tả |
|---|---|---|
| **lazygit** | `git` CLI / GitKraken | Git TUI — stage, commit, rebase bằng phím tắt |
| **lazydocker** | `docker` CLI / Portainer | Docker TUI — xem container, log, restart |
| **k9s** | `kubectl` CLI / Lens | Kubernetes TUI — xem pod, exec, log realtime |
| **fzf advanced** | — | Pipe patterns: `fzf \| xargs`, `fshow` (git log fuzzy) |
| **tldr** | `man` | Man page tóm tắt — ví dụ thực tế thay vì lý thuyết |
| **ncdu** | `du` | Xem dung lượng disk dạng tree, xoá nhanh |
| **btop** | `htop` / `top` | Monitor CPU/RAM/disk/network đẹp, realtime |

### Phase 3 — Editor + Multiplexer

- **Neovim + LazyVim** — từ `gedit`/VSCode terminal sang editor trong terminal. Đủ lớn để thành bài riêng: LSP, treesitter, keymap.
- **tmux** — session/window/pane management. Kết hợp với Powerlevel10k cần config thêm. Topics: prefix key, copy mode, resurrect plugin, tmux + SSH persistent session.

### Phase 4 — AI-powered Terminal

- **Claude Code** — AI agent chạy trong terminal, thao tác file/git/shell
- **aider** — pair programming với LLM trực tiếp từ CLI
- **sgpt** — `sgpt "explain this error"` ngay trong terminal
