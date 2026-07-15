# 🌊 巧克力海 (Chocolate Ocean)

> **巧克力海 (Chocolate Ocean)** 是一款专为国内创作者打造的「剪映 (JianYing)」开源社区替代版。基于 WebAssembly 与本地渲染技术，主打极致的“深色巧克力”质感美学。

[![GitHub License](https://img.shields.io/github/license/yourusername/chocolate-ocean?color=d4a373)](LICENSE)
[![Beta Stage](https://img.shields.io/badge/status-beta-orange)](#)

---

## ✨ 核心特性 / Features

*   **🍫 浓郁朱古力美学 (Chocolate Aesthetic):** 彻底告别传统剪辑软件冷冰冰的工业灰，全界面采用温暖柔和的暗色巧克力微调设计。
*   **📂 本地优先与隐私安全 (Local First):** 视频渲染与剪辑全部在本地（浏览器 WebAssembly / Electron 线程）完成，素材无需上传，拒绝隐私泄露。
*   **🎙️ 智能字幕与本地语音 (Smart Captions):** 内置本地轻量化语音识别，一键将人声视频生成中文字幕。
*   **⚡ 极速切片 (Fast Cutting):** 专为抖音/快手短视频创作者优化的 9:16 竖屏时间轴布局。

---

## 🛠️ 技术栈 / Tech Stack

*   **Frontend:** React 18 + Tailwind CSS + Vite
*   **Desktop Wrapper:** Electron / Tauri
*   **Engine Core:** `ffmpeg.wasm` / WebAssembly
*   **State Management:** Redux Toolkit

---

## 🚀 快速启动 / Quick Start

本项采用 Monorepo 架构进行管理：

```bash
# 1. 克隆仓库
git clone [https://github.com/yourusername/chocolate-ocean.git](https://github.com/yourusername/chocolate-ocean.git)
cd chocolate-ocean

# 2. 安装全部依赖
npm install

# 3. 启动 Web 端开发服务器
npm run dev --workspace=apps/web

# 4. 启动 Desktop 桌面端
npm run start --workspace=apps/desktop
