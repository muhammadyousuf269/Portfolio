# Temporary minimal static server (used only for local preview verification)
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add('http://127.0.0.1:8097/')
$listener.Start()
Write-Output "Serving $root on http://127.0.0.1:8097/"
while ($true) {
    $ctx = $listener.GetContext()
    try {
        $path = $ctx.Request.Url.LocalPath.TrimStart('/')
        if ($path -eq '') { $path = 'index.html' }
        $full = Join-Path $root ($path -replace '/', [IO.Path]::DirectorySeparatorChar)
        if (Test-Path $full -PathType Leaf) {
            $bytes = [IO.File]::ReadAllBytes($full)
            $mime = switch ([IO.Path]::GetExtension($full)) {
                '.html' { 'text/html' }
                '.css'  { 'text/css' }
                '.js'   { 'application/javascript' }
                '.png'  { 'image/png' }
                '.jpg'  { 'image/jpeg' }
                '.jpeg' { 'image/jpeg' }
                '.webp' { 'image/webp' }
                '.svg'  { 'image/svg+xml' }
                default { 'application/octet-stream' }
            }
            $ctx.Response.ContentType = $mime
            $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
        }
        else {
            $ctx.Response.StatusCode = 404
        }
    }
    catch {
        $ctx.Response.StatusCode = 500
    }
    finally {
        $ctx.Response.Close()
    }
}