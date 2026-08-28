$ErrorActionPreference = "Stop"
$siteRoot = Join-Path $PSScriptRoot "dist"

if (-not (Test-Path -LiteralPath (Join-Path $siteRoot "index.html"))) {
  Write-Host "Prototype files are incomplete: dist/index.html was not found." -ForegroundColor Red
  exit 1
}

$mimeTypes = @{
  ".html" = "text/html; charset=utf-8"; ".js" = "text/javascript; charset=utf-8"
  ".css" = "text/css; charset=utf-8"; ".json" = "application/json; charset=utf-8"
  ".svg" = "image/svg+xml"; ".png" = "image/png"; ".jpg" = "image/jpeg"
  ".jpeg" = "image/jpeg"; ".webp" = "image/webp"; ".ico" = "image/x-icon"
  ".woff" = "font/woff"; ".woff2" = "font/woff2"
}

$server = $null
$port = $null
foreach ($candidatePort in 4173..4183) {
  $candidate = $null
  try {
    $candidate = [Net.Sockets.TcpListener]::new([Net.IPAddress]::Loopback, $candidatePort)
    $candidate.Start()
    $server = $candidate
    $port = $candidatePort
    break
  } catch {
    if ($candidate) { $candidate.Stop() }
  }
}

if (-not $server) {
  Write-Host "Unable to start the prototype. Ports 4173-4183 are unavailable." -ForegroundColor Red
  exit 1
}

$url = "http://127.0.0.1:$port/"
Write-Host "PCBasic prototype is running at $url" -ForegroundColor Green
Write-Host "Keep this window open. Press Ctrl+C to stop."
if ($env:PCBASIC_NO_BROWSER -ne "1") { Start-Process $url }

try {
  while ($true) {
    $client = $server.AcceptTcpClient()
    try {
      $stream = $client.GetStream()
      $reader = [IO.StreamReader]::new($stream, [Text.Encoding]::ASCII, $false, 1024, $true)
      $requestLine = $reader.ReadLine()
      while ($reader.ReadLine()) { }

      $requestTarget = if ($requestLine -match '^GET\s+([^\s]+)') { $Matches[1] } else { "/" }
      $requestPath = ([Uri]::UnescapeDataString(($requestTarget -split '\?')[0])).TrimStart("/")
      $candidatePath = if ($requestPath) { Join-Path $siteRoot $requestPath } else { Join-Path $siteRoot "index.html" }
      $resolvedRoot = [IO.Path]::GetFullPath($siteRoot)
      $resolvedPath = [IO.Path]::GetFullPath($candidatePath)

      if (-not $resolvedPath.StartsWith($resolvedRoot, [StringComparison]::OrdinalIgnoreCase) -or
          -not (Test-Path -LiteralPath $resolvedPath -PathType Leaf)) {
        $resolvedPath = Join-Path $siteRoot "index.html"
      }

      $body = [IO.File]::ReadAllBytes($resolvedPath)
      $extension = [IO.Path]::GetExtension($resolvedPath).ToLowerInvariant()
      $contentType = if ($mimeTypes.ContainsKey($extension)) { $mimeTypes[$extension] } else { "application/octet-stream" }
      $header = "HTTP/1.1 200 OK`r`nContent-Type: $contentType`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
      $headerBytes = [Text.Encoding]::ASCII.GetBytes($header)
      $stream.Write($headerBytes, 0, $headerBytes.Length)
      $stream.Write($body, 0, $body.Length)
      $stream.Flush()
    } finally {
      $client.Close()
    }
  }
} finally {
  $server.Stop()
}
