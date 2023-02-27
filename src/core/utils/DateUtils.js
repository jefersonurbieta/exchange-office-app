import moment from 'moment-timezone'

export default class FormattingUtils {

    static formatDate(date) {
        return moment(date).tz('America/Sao_Paulo').format('DD/MM/YYYY')
    }

    static formatDateTime(date) {
        return moment(date).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm')
    }

    static isToday(data) {
        return this.formatDate(data) === this.formatDate(new Date())
    }
}
