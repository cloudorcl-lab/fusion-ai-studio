[CmdletBinding()]
param(
  [Parameter(Mandatory)][string]$RepositoryRoot,
  [Parameter(Mandatory)][string]$BaseRef,
  [Parameter(Mandatory)][string]$BranchName,
  [Parameter(Mandatory)][string]$WorktreePath
)

$repo = (Resolve-Path -LiteralPath $RepositoryRoot -ErrorAction Stop).Path
& git -C $repo rev-parse --is-inside-work-tree | Out-Null
if ($LASTEXITCODE -ne 0) { throw "RepositoryRoot is not a Git worktree: $repo" }
& git check-ref-format --branch $BranchName | Out-Null
if ($LASTEXITCODE -ne 0) { throw "Invalid branch name: $BranchName" }

$container = [IO.Path]::GetFullPath((Join-Path $repo '.worktrees'))
$target = [IO.Path]::GetFullPath($WorktreePath)
$prefix = $container.TrimEnd([IO.Path]::DirectorySeparatorChar) + [IO.Path]::DirectorySeparatorChar
if (-not $target.StartsWith($prefix, [StringComparison]::OrdinalIgnoreCase)) {
  throw "WorktreePath must be inside $container"
}
if (Test-Path -LiteralPath $target) { throw "WorktreePath already exists: $target" }
if (-not (Test-Path -LiteralPath $container)) { New-Item -ItemType Directory -Path $container | Out-Null }

& git -C $repo worktree add -b $BranchName $target $BaseRef
if ($LASTEXITCODE -ne 0) { throw "git worktree add failed" }
Write-Output "Created worktree: $target"
