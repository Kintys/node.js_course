import { z } from 'zod'

const carsZODSchema = z.object({
    title: z.string().min(1, 'Назва авто не може бути порожньою!').min(4, 'Довжина назви має бути >= 4!').trim(),

    year: z
        .number({ required_error: 'Рік не може бути порожнім!', invalid_type_error: 'Рік повинен бути числом!' })
        .int('Рік повинен бути цілим числом!')
        .min(1900, 'Рік має бути >= 1900!')
        .max(2026, 'Рік має бути <= 2026!'),

    plateNumber: z
        .string()
        .min(1, 'Номерний знак не може бути порожнім!')
        .min(8, 'Довжина номерного знаку має бути >= 8!')
        .trim(),

    description: z.string().min(1, 'Опис не може бути порожнім!').trim()
})

export default carsZODSchema
