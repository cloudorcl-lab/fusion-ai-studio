# Authoring dispatch length failure

Worker /root/create_integration reported Windows error206(command too long) before process creation while attempting long inline PowerShell script staging. No script or product mutation occurred. Original error is in worker tool conversation; this summary records the failure before retry. Correct by staging owned literal script in small line-aligned chunks then invoking the file path; preserve whole script content and use supported literal-file CLI patches.
