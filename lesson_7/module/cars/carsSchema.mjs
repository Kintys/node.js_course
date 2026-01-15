import mongoose from 'mongoose'

const carSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Назва автомобіля обов'язкова"],
            minlength: [2, 'Довжина назви має бути принаймні 2 символи'],
            maxlength: [100, 'Довжина назви не може перевищувати 100 символів'],
            trim: true
        },
        year: {
            type: Number,
            required: [true, "Рік випуску обов'язковий"],
            min: [1900, 'Рік не може бути менше 1900'],
            max: [new Date().getFullYear() + 1, `Рік не може бути більше ${new Date().getFullYear() + 1}`],
            validate: {
                validator: Number.isInteger,
                message: 'Рік має бути цілим числом'
            }
        },
        plateNumber: {
            type: String,
            required: [true, "Номерний знак обов'язковий"],
            unique: true,
            match: [/^[A-Z]{2}\s\d{4}\s[A-Z]{2}$/, 'Невірний формат номерного знаку (приклад: AA 1234 BB)'],
            trim: true,
            uppercase: true
        },
        description: {
            type: String,
            required: [true, "Опис автомобіля обов'язковий"],
            minlength: [4, 'Опис має містити принаймні 4 символів'],
            maxlength: [1000, 'Опис не може перевищувати 1000 символів'],
            trim: true
        },
        image: {
            type: String,
            required: [true, "Зображення обов'язкове"],
            match: [/^\/images\/[\w\-\.]+\.(jpg|jpeg|png|webp|jfif)$/, 'Невірний формат шляху до зображення'],
            trim: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export default mongoose.model('Car', carSchema)
