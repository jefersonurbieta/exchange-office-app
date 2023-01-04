<template>
    <div>

    </div>
</template>

<script>

    export default {
        async mounted() {
            this.$keycloak.logout({
                redirectUri: process.env.VUE_APP_URL
            })
        }
    }
</script>

