@echo off
REM ================================================================
REM   作品集 Vite 开发服务器一键启动脚本
REM   双击此文件即可运行 · 无需配置 PowerShell 策略
REM ================================================================
setlocal
cd /d "%~dp0"

echo.
echo =======================================================
echo   Portfolio Vite Dev Server (port 5174)
echo   Project: %cd%
echo =======================================================
echo.

REM Step 1: 检查 node_modules 是否存在
if not exist "node_modules\.bin\vite.cmd" (
    echo [!] node_modules 未找到，正在安装依赖（首次运行需要 1~3 分钟）...
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo [X] npm install 失败，请检查网络或手动执行 npm install
        pause
        exit /b 1
    )
    echo.
    echo [OK] 依赖安装完成
    echo.
)

REM Step 2: 启动 Vite 开发服务器
echo [>] 正在启动 Vite Dev Server（http://localhost:5174）
echo     按 Ctrl+C 停止
echo.
call npm run dev

pause
endlocal
