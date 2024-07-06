import {AuthoritiesUtils, DateUtils} from '@/core/utils/index'

export default class MovementUtils {
    static allowEdit(user, createdAt) {
        return AuthoritiesUtils.userHasManagerRole(user) && DateUtils.isToday(createdAt)
    }
}
