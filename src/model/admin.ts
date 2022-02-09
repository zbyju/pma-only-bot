import { model, Schema } from "mongoose"
import { POBAdmin } from "./../types/admin.types"

const schema = new Schema<POBAdmin>(
    {
        user: { type: String, required: true },
        guild: { type: String, required: true },
        added: { type: Date, required: true },
    },
    { timestamps: true }
)

export const AdminModel = model<POBAdmin>("Admin", schema)
