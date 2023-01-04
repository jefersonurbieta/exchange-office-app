import {AuthoritiesUtils} from '@/core/utils'

export default {
    methods: {
        adminUser() {
            return AuthoritiesUtils.userHasAdminRole(this.$store.state.loki.user)
        },
        managerUser() {
            return AuthoritiesUtils.userHasManagerRole(this.$store.state.loki.user)
        },
        operatorUser() {
            return AuthoritiesUtils.userHasOperatorRole(this.$store.state.loki.user)
        }
    }
}
