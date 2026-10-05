@echo off
chcp 65001 >nul
title Sunsiree Bitki Dünyası - Başlatıcı
color 0A

set "ROOT_DIR=%~dp0"
cd /d "%ROOT_DIR%"

:: ZIP İçinden Çalıştırılma Kontrolü
echo %ROOT_DIR% | findstr /i "Temp\\ Temp/ \AppData\Local\Temp" >nul
if %errorlevel% equ 0 (
    color 0C
    echo =================================================================
    echo  [UYARI] ZIP DOSYASINI CIKARMADAN ACMAYA CALISTINIZ!
    echo =================================================================
    echo.
    echo  Lutfen ZIP dosyasina sag tiklayip "Tumunu Ayikla" secenegine basin
    echo  ve cikan klasorun icindeki BASLAT dosyasina tiklayin.
    echo.
    echo =================================================================
    pause
    exit /b
)

echo ===================================================
echo     🌸 Sunsiree Bitki Dünyası Başlatılıyor...
echo ===================================================
echo.

:: Node.js Kontrolü
where node >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo [HATA] Bilgisayarınızda Node.js kurulu bulunamadı!
    echo Projenin çalışabilmesi için lütfen Node.js kurun:
    echo 👉 https://nodejs.org/ (LTS sürümünü indirip kurabilirsiniz)
    echo.
    pause
    exit /b
)

:: 1. Backend Bağımlılık Kontrolü
if not exist "%ROOT_DIR%backend\node_modules" (
    echo [1/4] Backend paketleri kuruluyor (ilk açılışta 1-2 dk sürebilir)...
    cd /d "%ROOT_DIR%backend"
    call npm install
    call npx prisma generate
    cd /d "%ROOT_DIR%"
)

:: 2. Frontend Bağımlılık Kontrolü
if not exist "%ROOT_DIR%frontend\node_modules" (
    echo [2/4] Frontend paketleri kuruluyor (ilk açılışta 1-2 dk sürebilir)...
    cd /d "%ROOT_DIR%frontend"
    call npm install
    cd /d "%ROOT_DIR%"
)

:: 3. Backend Kontrolü ve Başlatma
netstat -ano | findstr ":3001 " >nul
if %errorlevel% neq 0 (
    echo [3/4] Backend Sunucusu başlatılıyor...
    start /min "Sunsiree Backend" cmd /c "cd /d ""%ROOT_DIR%backend"" && npm run dev"
) else (
    echo [3/4] Backend Sunucusu zaten çalışıyor.
)

:: 4. Frontend Kontrolü ve Başlatma
netstat -ano | findstr ":3000 " >nul
if %errorlevel% neq 0 (
    echo [4/4] Frontend Sunucusu başlatılıyor...
    start /min "Sunsiree Frontend" cmd /c "cd /d ""%ROOT_DIR%frontend"" && npm run dev"
) else (
    echo [4/4] Frontend Sunucusu zaten çalışıyor.
)

:: 5. Port 3000 Açılana Kadar Bekle ve Tarayıcıyı Aç
echo.
echo [Lütfen Bekleyin] Uygulama yükleniyor, tarayıcı otomatik açılacak...
powershell -NoProfile -Command "
$ready = $false
for ($i=0; $i -lt 30; $i++) {
    Start-Sleep -Seconds 1
    try {
        $tcp = New-Object System.Net.Sockets.TcpClient
        $tcp.Connect('127.0.0.1', 3000)
        $tcp.Close()
        $ready = $true
        break
    } catch { }
}
if ($ready) {
    Start-Process 'http://localhost:3000'
} else {
    Start-Process 'http://localhost:3000'
}
"

echo.
echo ✨ Sunsiree Bitki Dünyası başarıyla açıldı!
echo Tarayıcınızda http://localhost:3000 adresinden kullanabilirsiniz.
echo (Bu pencereyi kapatabilirsiniz, arka planda çalışmaya devam edecektir.)
echo.
timeout /t 5 >nul
exit
