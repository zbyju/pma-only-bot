# POB Bot (PMA Only Bot, Bot)

POB is a Discord bot. Very pma.

## Setup

- `pnpm install` - to install dependecies

You need to create and fill these files before running the bot:

- Create `.env` (`cp .template.env .env`) and paste in your bot tokens etc.
- Create `database.json` (`cp /config/database.template.json /config/database.json`) and fill in your db setup.

- `pnpm start` - to compile and run
- `pnpm dev` - to run in development mode (with hot-reload)
- `pnpm dev:debug` - to run in debug mode

## Modules

To create a new module you need to create a folder in modules and a class that extends `BaseModule` class (preferably one of the more explicit verion of it - `CommandModule, MessageModule, etc.`). Then add the new type of module to the registerer' (`modules/module-registerer.ts`) collection of types (`moduleTypes`). That's it.

- GM - sends gm when someone sends gm
- BatChest - sends BatChest emote when someone sends a message containing "I heckin love"
- Message Saver - saves all the messages from chosen channels
