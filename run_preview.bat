@echo off
REM ================================================================
REM   作品集 生产构建 + 预览服务器
REM   用于本地模拟上线效果（端口 4173）
REM ================================================================
setlocal
cd /d "%~dp0"

echo.
echo =======================================================
echo   Portfolio · Build + Preview (port 4173)
echo =======================================================
echo.

if not exist "node_modules\.bin\vite.cmd" (
    echo [!] 正在安装依赖...
    call npm install || goto :err
)

echo [>] 正在构建生产版本...
call npm run build || goto :err

echo.
echo [OK] 构建完成
echo [>] 启动预览服务器：http://localhost:4173
echo.
call npm run preview
pause
exit /b 0

:err
echo.
echo [X] 构建失败
pause
exit /b 1
endlocal
