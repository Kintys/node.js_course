const carsSchema = {
    title: {
        notEmpty: {
            errorMessage: 'Назва авто не може бути порожньою!'
        },
        isLength: {
            options: { min: 4 },
            errorMessage: 'Довжина назви має бути >= 4!'
        },
        trim: true,
        escape: true
    },
    year: {
        notEmpty: {
            errorMessage: 'Рік не може бути порожнім!'
        },
        isNumeric: {
            errorMessage: 'Рік повинен бути числом!'
        },
        isInt: {
            options: { min: 1900, max: 2026 },
            errorMessage: 'Рік має бути в діапазоні 1900-2026!'
        },
        trim: true,
        escape: true
    },
    plateNumber: {
        notEmpty: {
            errorMessage: 'Номерний знак не може бути порожнім!'
        },
        isLength: {
            options: { min: 8 },
            errorMessage: 'Довжина номерного знаку має бути >= 8!'
        },
        trim: true,
        escape: true
    },
    description: {
        notEmpty: {
            errorMessage: 'Опис не може бути порожнім!'
        },
        trim: true,
        escape: true
    }
}

class CarValidatorSchema {
    constructor(schema) {
        this._schema = schema
    }
    get schema() {
        return this._schema
    }
}
const CarsValidator = new CarValidatorSchema(carsSchema)
export default CarsValidator
