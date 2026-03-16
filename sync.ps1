# sync.ps1 — Copy publishable articles from Obsidian vault to blog
# Usage: .\sync.ps1
# Usage (dry run): .\sync.ps1 -DryRun

param([switch]$DryRun)

$VaultDir  = "D:\bestlife\article"
$BlogDir   = "D:\project\astro\src\data\blog"

Write-Host "`n=== Obsidian → Blog Sync ===" -ForegroundColor Cyan
if ($DryRun) { Write-Host "[DRY RUN — no files will be copied]`n" -ForegroundColor Yellow }

$copied  = 0
$skipped = 0
$errors  = 0

Get-ChildItem -Path $VaultDir -Filter "*.md" -File | ForEach-Object {
    $file    = $_
    $content = Get-Content $file.FullName -Raw -Encoding UTF8

    # Must have frontmatter
    if ($content -notmatch "^---") {
        Write-Host "  SKIP (no frontmatter): $($file.Name)" -ForegroundColor DarkGray
        $skipped++
        return
    }

    # Extract draft field — skip if draft: true or missing
    if ($content -match "draft:\s*(true)") {
        Write-Host "  SKIP (draft): $($file.Name)" -ForegroundColor DarkGray
        $skipped++
        return
    }

    # Build destination path (kebab-case filename preserved)
    $dest = Join-Path $BlogDir $file.Name

    # Skip if already identical
    if (Test-Path $dest) {
        $srcHash  = (Get-FileHash $file.FullName -Algorithm MD5).Hash
        $destHash = (Get-FileHash $dest          -Algorithm MD5).Hash
        if ($srcHash -eq $destHash) {
            Write-Host "  OK (unchanged): $($file.Name)" -ForegroundColor DarkGray
            $skipped++
            return
        }
    }

    # Copy
    if (-not $DryRun) {
        try {
            Copy-Item $file.FullName -Destination $dest -Force
            Write-Host "  COPIED: $($file.Name)" -ForegroundColor Green
            $copied++
        } catch {
            Write-Host "  ERROR: $($file.Name) — $_" -ForegroundColor Red
            $errors++
        }
    } else {
        Write-Host "  WOULD COPY: $($file.Name)" -ForegroundColor Green
        $copied++
    }
}

Write-Host "`nDone. Copied: $copied  |  Skipped: $skipped  |  Errors: $errors" -ForegroundColor Cyan

if ($copied -gt 0 -and -not $DryRun) {
    Write-Host "`nNext step:" -ForegroundColor Yellow
    Write-Host "  cd D:\project\astro"
    Write-Host "  git add src/data/blog"
    Write-Host "  git commit -m `"post: sync from vault`""
    Write-Host "  git push"
}
