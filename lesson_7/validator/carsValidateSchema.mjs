import { z } from 'zod'

const carsZODSchema = z.object({
    title: z.string().min(1, 'Назва авто не може бути порожньою!').min(4, 'Довжина назви має бути >= 4!').trim(),

    year: z
        .string()
        .min(1, 'Рік не може бути порожнім!')
        .regex(/^\d+$/, 'Рік повинен бути числом!')
        .transform(Number)
        .refine((val) => val >= 1900 && val <= 2026, {
            message: 'Рік має бути в діапазоні 1900-2026!'
        }),

    plateNumber: z
        .string()
        .min(1, 'Номерний знак не може бути порожнім!')
        .min(8, 'Довжина номерного знаку має бути >= 8!')
        .trim(),

    description: z.string().min(1, 'Опис не може бути порожнім!').trim()
})

export default carsZODSchema
