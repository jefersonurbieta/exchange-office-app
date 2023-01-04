export default {
    methods: {
        getNameById(list, id) {
            const object =  list.find(obj => obj.id === id)
            if(!object) return ''
            return object.name
        },
        getObjectById(list, id) {
            const object =  list.find(obj => obj.id === id)
            if(!object) return undefined
            return object
        }
    }
}
