import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import Permission from './permissionSchema.mjs'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Ім'я користувача обов'язкове"],
            minlength: [3, "Ім'я має бути не менше 3 символів"],
            maxlength: [50, "Ім'я не може перевищувати 50 символів"],
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Пароль обов"язковий!'],
            minlength: [6, 'Довжина паролю має бути принаймні 6 символів!'],
            validate: [
                {
                    validator: (v) => /[0-9]/.test(v),
                    message: 'У паролі має бути принаймні одна цифра'
                },
                {
                    validator: (v) => /[a-zA-Z]/.test(v),
                    message: 'У паролі має бути принаймні одна літера'
                },
                {
                    validator: (v) => /[^0-9a-zA-Z]/.test(v),
                    message: 'У паролі має бути принаймні один спец-символ'
                }
            ],
            trim: true
        },
        permission: {
            type: Schema.Types.ObjectId,
            ref: 'Permission'
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.pre('save', async function () {
    if (this.isNew && !this.permission) {
        const newPermission = await Permission.create({
            create: true,
            update: true,
            read: true,
            delete: true,
            isAdmin: false
        })

        this.permission = newPermission._id
    }
})

export default mongoose.model('User', userSchema)
