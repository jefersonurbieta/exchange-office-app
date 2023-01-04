<template>
    <div class="page-container">
        <div v-if="!managerView || managerUser()">
            <slot/>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            managerView: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="stylus">
.page-container
    margin 20px 5%

    .v-card
        border 0 !important
</style>
