# backup.ps1 - Manual backup script for Supabase database

# Configuration - replace with your actual connection string
$connectionString = "postgresql://postgres:YOUR_PASSWORD_HERE@db.YOUR_PROJECT_REF.supabase.co:5432/postgres"

# Where to save backups (change this to your preferred backup directory)
$backupDir = "C:\Users\dell\Desktop\database_backups"

# Create backup directory if it doesn't exist
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir -Force
}

# Generate filename with timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd_HHmmss"
$backupFile = Join-Path $backupDir "scale_edge_backup_$timestamp.sql"

# Run pg_dump
Write-Host "Starting database backup to: $backupFile"
pg_dump $connectionString > $backupFile

if ($LASTEXITCODE -eq 0) {
    Write-Host "Backup completed successfully!" -ForegroundColor Green
    
    # Optional: compress the backup
    Compress-Archive -Path $backupFile -DestinationPath "$backupFile.zip" -CompressionLevel Optimal
    Remove-Item $backupFile  # remove the uncompressed file
    
    Write-Host "Compressed backup saved as: $backupFile.zip" -ForegroundColor Green
} else {
    Write-Host "Backup failed. Check your connection string and ensure pg_dump is installed." -ForegroundColor Red
}