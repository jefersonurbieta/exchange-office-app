import {AuthoritiesUtils, DateUtils} from '@/core/utils/index'

export default class MovementUtils {
    static allowEdit(user, createdAt) {
        return AuthoritiesUtils.userHasAdminRole(user) && DateUtils.isToday(createdAt)
    }
}
