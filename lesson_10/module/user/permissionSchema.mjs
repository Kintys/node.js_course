import mongoose from 'mongoose'

const permissionSchema = new mongoose.Schema(
    {
        create: {
            type: Boolean
        },
        update: {
            type: Boolean
        },
        read: {
            type: Boolean
        },
        delete: {
            type: Boolean
        },
        isAdmin: {
            type: Boolean
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Permission', permissionSchema)
