class DayService {
    constructor(dateProvider = () => new Date()) {
        this.dateProvider = dateProvider
    }

    getCurrentDay() {
        return this.dateProvider().getDate()
    }
}

export default DayService
