import { z } from 'zod'

const userZODSchema = z
    .object({
        name: z
            .string({ required_error: "Ім'я обов'язкове!" })
            .min(1, "Ім'я не може бути порожнім!")
            .min(3, "Ім'я має бути не менше 3 символів!")
            .trim(),

        password: z
            .string({ required_error: "Пароль обов'язковий!" })
            .min(1, 'Пароль не може бути порожнім!')
            .min(6, 'Пароль має бути не менше 6 символів!')
            .regex(/[0-9]/, 'У паролі має бути принаймні одна цифра')
            .regex(/[a-zA-Z]/, 'У паролі має бути принаймні одна літера')
            .regex(/[^0-9a-zA-Z]/, 'У паролі має бути принаймні один спец-символ')
            .trim(),

        confirmPass: z
            .string({ required_error: "Підтвердження паролю обов'язкове!" })
            .min(1, 'Підтвердження паролю не може бути порожнім!')
            .trim()
    })
    // Багато валідації не буває ))
    .refine((data) => data.password === data.confirmPass, {
        message: 'Паролі не співпадають!',
        path: ['confirmPass']
    })

export default userZODSchema
