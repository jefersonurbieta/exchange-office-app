export default {
  methods: {
    toCapitaliseCase(message) {
      return message.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
    }
  }
}
