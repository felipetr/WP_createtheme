@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe" "%~dp0\node_modules\wptheme-cli\bin\wptheme.js" %*
) ELSE (
  node "%~dp0\node_modules\wptheme-cli\bin\wptheme.js" %*
)