$files = @(
    "c:\Users\manav\OneDrive\Desktop\BUILDER\client\pages\SchoolTransport.tsx",
    "c:\Users\manav\OneDrive\Desktop\BUILDER\client\pages\Infrastructure.tsx",
    "c:\Users\manav\OneDrive\Desktop\BUILDER\client\pages\Index.tsx",
    "c:\Users\manav\OneDrive\Desktop\BUILDER\client\pages\Emergency.tsx",
    "c:\Users\manav\OneDrive\Desktop\BUILDER\client\pages\Drainage.tsx",
    "c:\Users\manav\OneDrive\Desktop\BUILDER\client\pages\BloodBank.tsx",
    "c:\Users\manav\OneDrive\Desktop\BUILDER\client\pages\AirQuality.tsx"
)

foreach ($file in $files) {
    $content = Get-Content $file -Raw -Encoding UTF8
    $content = $content -replace 'import Layout from "@/components/Layout";', 'import PublicLayout from "@/components/PublicLayout";'
    $content = $content -replace '<Layout>', '<PublicLayout>'
    $content = $content -replace '</Layout>', '</PublicLayout>'
    $content | Set-Content $file -Encoding UTF8 -NoNewline
}

Write-Host "All files updated successfully!"
