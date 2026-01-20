export function carValidationMiddleware(validationSchema) {
    return (req, res, next) => {
        const result = validationSchema.safeParse(req.body)
        if (!result.success) {
            return res.render('cars/carForm', {
                car: req.body,
                errors: result.error.issues
            })
        }

        req.validatedCarData = result.data

        next()
    }
}
