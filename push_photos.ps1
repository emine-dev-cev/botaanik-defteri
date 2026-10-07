$files = Get-ChildItem "backend\uploads" -File
$batchSize = 100
$count = $files.Count

for ($i = 0; $i -lt $count; $i += $batchSize) {
    $end = [Math]::Min($i + $batchSize, $count)
    Write-Host "Yükleniyor: $i - $end / $count..."
    
    for ($j = $i; $j -lt $end; $j++) {
        $filePath = $files[$j].FullName
        git add "$filePath"
    }
    
    git commit -m "Orijinal bitki fotoğrafları ($i - $end)"
    git push origin main
    Start-Sleep -Seconds 2
}
Write-Host "TÜM FOTOĞRAFLAR BAŞARIYLA YÜKLENDİ!"
