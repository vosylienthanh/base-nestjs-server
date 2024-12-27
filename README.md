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

## Run migration

- Create empty migration file:

```bash
npx typeorm-ts-node-commonjs migration:create ./src/migrations/name
```

- Generate migration file:

```bash
npx typeorm-ts-node-commonjs -d ./src/modules/config/postgres.config.ts migration:generate ./src/migrations/init_schema
```

- Run migration:

```bash
npx typeorm-ts-node-commonjs -d ./src/modules/config/postgres.config.ts migration:run
```

- Revert migration:

```bash
npx typeorm-ts-node-commonjs -d ./src/modules/config/postgres.config.ts migration:revert
```
