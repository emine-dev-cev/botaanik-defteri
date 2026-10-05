Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
currentDir = fso.GetParentFolderName(WScript.ScriptFullName)

batPath = chr(34) & currentDir & "\BASLAT.bat" & chr(34)
WshShell.Run batPath, 1, False
