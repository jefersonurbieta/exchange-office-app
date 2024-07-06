import { rolesTypes } from '@/core/constants'

export default class AuthoritiesUtils {

    static authoritiesByRole(role) {
        switch (role) {
            case rolesTypes.OWNER:
                return [
                    {
                        name: rolesTypes.OWNER,
                        hasAccess: true
                    },
                    {
                        name: rolesTypes.MANAGER,
                        hasAccess: true
                    },
                    {
                        name: rolesTypes.ADMIN,
                        hasAccess: false
                    },
                    {
                        name: rolesTypes.OPERATOR,
                        hasAccess: true
                    }
                ]
            case rolesTypes.MANAGER:
                return [
                    {
                        name: rolesTypes.OWNER,
                        hasAccess: false
                    },
                    {
                        name: rolesTypes.MANAGER,
                        hasAccess: true
                    },
                    {
                        name: rolesTypes.ADMIN,
                        hasAccess: false
                    },
                    {
                        name: rolesTypes.OPERATOR,
                        hasAccess: true
                    }
                ]
            case rolesTypes.ADMIN:
                return [
                    {
                        name: rolesTypes.OWNER,
                        hasAccess: true
                    },
                    {
                        name: rolesTypes.MANAGER,
                        hasAccess: true
                    },
                    {
                        name: rolesTypes.ADMIN,
                        hasAccess: true
                    },
                    {
                        name: rolesTypes.OPERATOR,
                        hasAccess: true
                    }
                ]
            default:
                return [
                    {
                        name: rolesTypes.OWNER,
                        hasAccess: false
                    },
                    {
                        name: rolesTypes.MANAGER,
                        hasAccess: false
                    },
                    {
                        name: rolesTypes.ADMIN,
                        hasAccess: false
                    },
                    {
                        name: rolesTypes.OPERATOR,
                        hasAccess: true
                    }
                ]
        }
    }

    static userHasAdminRole(user) {
        return user.role === rolesTypes.ADMIN
    }

    static userHasManagerRole(user) {
        return user.role === rolesTypes.MANAGER || user.role === rolesTypes.OWNER || user.role === rolesTypes.ADMIN
    }

    static userHasOperatorRole(user) {
        return user.role === rolesTypes.OPERATOR || user.role === rolesTypes.ADMIN
    }
}
