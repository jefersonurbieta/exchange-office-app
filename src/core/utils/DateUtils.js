import moment from 'moment'

export default class FormattingUtils {

    static formatDate(date) {
        return moment(date).format('DD/MM/YYYY')
    }

    static formatDateTime(date) {
        return moment(date).format('DD/MM/YYYY HH:mm')
    }

    static isToday(data) {
        return this.formatDate(data) === this.formatDate(new Date())
    }
}
