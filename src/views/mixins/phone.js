export default {
    methods: {
        removePhoneMask(phone) {
            return phone ? phone.replace(/\D/g, '') : ''
        }
    }
}
