@echo off
chcp 65001 >nul
cd /d "%~dp0"
title HUSHMIC 本地开发
echo.
echo 正在启动 HUSHMIC（请保持本窗口打开）
echo 浏览器应会自动打开。若白屏，等 2~3 秒后按 F5 刷新。
echo 本机请用: http://127.0.0.1:5173
echo 若 5173 被占用，请看窗口里新端口号
echo.
npm run dev
pause
