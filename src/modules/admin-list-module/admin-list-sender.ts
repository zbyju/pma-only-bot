import {
    APIApplicationCommandOption,
    ApplicationCommandOptionType,
} from "discord-api-types"
import Discord, {
    ApplicationCommandPermissionData,
    MessageEmbed,
} from "discord.js"
import { ApplicationCommandPermissionTypes } from "discord.js/typings/enums"
import CommandModule from "../command-module"
import {
    getAllAdmins,
    removeAdmin,
    saveAdminPOB,
} from "./../../repositories/admin-repository"

export default class AdminListSender extends CommandModule {
    options: APIApplicationCommandOption[] = [
        {
            name: "action",
            description: "Action type",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "Add",
                    value: "add",
                },
                {
                    name: "List",
                    value: "list",
                },
                {
                    name: "Remove",
                    value: "remove",
                },
            ],
        },
        {
            name: "user",
            description: "User to add or remove",
            type: ApplicationCommandOptionType.User,
            required: false,
        },
    ]
    hasPermission: boolean = false
    permissions?: ApplicationCommandPermissionData[] = [
        {
            type: ApplicationCommandPermissionTypes.ROLE,
            id: process.env.ADMIN_ROLE_ID,
            permission: true,
        },
    ]
    moduleName: string = "AdminListModule"
    name: string = "admin"
    description: string = "List of bot administrators"

    constructor(client: Discord.Client<boolean>) {
        super(client)
        this.registerCommand()
    }

    async onCommand(
        command: Discord.CommandInteraction<Discord.CacheType>
    ): Promise<void> {
        if (command.commandName != this.Name) {
            return null
        }

        const action = command.options.getString("action")
        const user = command.options.getUser("user")
        if (user && user.bot) {
            command.reply({
                content: "Cannot add bot as an admin",
                ephemeral: true,
            })
        }

        if (action == "add") {
            const added = await saveAdminPOB({
                guild: command.guildId,
                user: user.id,
                added: new Date(),
            })

            if (added) {
                await command.reply({
                    content: `Added admin ${user.username}`,
                    ephemeral: true,
                })
            } else {
                await command.reply({
                    content: `No admin was added`,
                    ephemeral: true,
                })
            }
        } else if (action == "list") {
            const admins = await getAllAdmins(command.guildId)

            //@TODO Move creating embeds elsewhere to unify their style?
            const adminsEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setTitle("Bot Admins")
                .setTimestamp()

            if (admins.length > 0) {
                for (const admin of admins) {
                    const adminUser = await command.guild.members.fetch({
                        user: admin.user,
                    })
                    adminsEmbed.addField(
                        adminUser.displayName,
                        `Added on ${admin.added}`
                    )
                }
            } else {
                adminsEmbed.addField(
                    "No admins yet",
                    "Add a new admin via the /admin command"
                )
            }
            await command.reply({
                embeds: [adminsEmbed],
                ephemeral: true,
            })
        } else if (action == "remove") {
            const remove = await removeAdmin(user.id, command.guildId)
            if (remove) {
                await command.reply({
                    content: `Removed admin ${user.username}`,
                    ephemeral: true,
                })
            } else {
                await command.reply({
                    content: `No admin was removed`,
                    ephemeral: true,
                })
            }
        } else {
            await command.reply({
                content: `Unrecognized action ${action}`,
                ephemeral: true,
            })
            throw new Error(`Unrecognized action ${action}`)
        }
    }
}
