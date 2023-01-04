import {statusTypes} from '@/core/constants'

export default (value) => {
    const status = statusTypes.list.find(status => status.value === value)
    if(status) {
        return status.name
    }
    return value
}

