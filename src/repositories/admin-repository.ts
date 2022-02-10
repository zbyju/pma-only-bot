import { CallbackError } from "mongoose"
import Discord from "discord.js"
import { POBAdmin } from "./../types/admin.types"
import { AdminModel } from "../model/admin"
import Log from "../log"

export const saveAdminPOB = (admin: POBAdmin): Promise<POBAdmin> => {
    return new Promise((resolve, reject) => {
        try {
            AdminModel.create(admin, (err: CallbackError, m: POBAdmin) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(m)
                }
            })
        } catch (err) {
            reject(err)
        }
    })
}

export const removeAdmin = (
    userID: string,
    guildID: string
): Promise<boolean> => {
    Log.debug(userID, guildID)
    return new Promise((resolve, reject) => {
        try {
            AdminModel.deleteOne({ user: userID, guild: guildID }).exec(
                (err: CallbackError) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(true)
                    }
                }
            )
        } catch (err) {
            reject(err)
        }
    })
}

export const getAdmin = (
    userID: string,
    guildID: string
): Promise<POBAdmin> => {
    return new Promise((resolve, reject) => {
        try {
            AdminModel.findOne({ user: userID, guild: guildID }).exec(
                (err: CallbackError, m: POBAdmin) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(m)
                    }
                }
            )
        } catch (err) {
            reject(err)
        }
    })
}

export const getAllAdmins = (guildID: string): Promise<POBAdmin[]> => {
    return new Promise((resolve, reject) => {
        try {
            AdminModel.find({ guild: guildID }).exec(
                (err: CallbackError, m: POBAdmin[]) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(m)
                    }
                }
            )
        } catch (err) {
            reject(err)
        }
    })
}
