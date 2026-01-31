export function carValidationMiddleware(validationSchema) {
    return (req, res, next) => {
        const result = validationSchema.safeParse(req.body)
        if (!result.success) {
            console.log(result.error.issues)
            return res.render('cars/carForm', {
                car: req.body,
                errors: result.error.issues,
                user: req.user || null
            })
        }

        req.validatedCarData = result.data

        next()
    }
}
