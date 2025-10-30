# Base nestjs server

## How to setup

1. How to generate project

Use following command

```bash
nest new <project_name> --strict
```

2. How to create symlinks (Deprecated - only use for package manager that need node_modules)

Run this command on windows

```bash
new-item -itemtype junction -path "./node_modules" -target "../lib/server/node_modules"
```

3. How to enable yarn sdk for VSCode

```bash
yarn dlx @yarnpkg/sdks vscode
```

For other code editor, please check at [this page](https://yarnpkg.com/getting-started/editor-sdks#vscode)

## How to update all libs

```bash
yarn upgrade-interactive
```
