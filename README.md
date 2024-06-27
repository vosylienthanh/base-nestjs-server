# KMO SERVICE

## How to setup

1. How to generate project

Use following command

```bash
nest new <project_name> --strict
```

2. How to create symlinks

Run this command on windows

```bash
new-item -itemtype junction -path "./node_modules" -target "../lib/server/node_modules"
```

## Setup typeORM

1. Install package