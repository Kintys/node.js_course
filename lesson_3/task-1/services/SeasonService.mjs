class SeasonService {
    constructor(dateProvider = () => new Date()) {
        this.dateProvider = dateProvider
    }

    getSeason() {
        const month = this.dateProvider().getMonth() + 1

        if (month === 12 || month === 1 || month === 2) return 'Зима'
        if (month >= 3 && month <= 5) return 'Весна'
        if (month >= 6 && month <= 8) return 'Літо'
        if (month >= 9 && month <= 11) return 'Осінь'

        return 'Невідомо'
    }
}

export default SeasonService
