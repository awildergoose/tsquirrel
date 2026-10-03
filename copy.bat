@echo off
setlocal
xcopy /Y ^
    "out.nut" ^
    "G:\Programs\Steam\steamapps\common\Left 4 Dead 2\left4dead2\addons\slenderman\scripts\vscripts\director_base_addon.nut" ^
    >nul 2>&1
