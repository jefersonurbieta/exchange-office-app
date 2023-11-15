<template>
    <div class="az-loading">
        <v-overlay :value="isLoading">
            <v-progress-circular indeterminate :size="100"></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
    export default {
        name: 'Loading',
        computed: {
            isLoading() {
                return this.$store.state.loki.isLoading
            },
            loadingMessage() {
                return this.$store.state.loki.loadingMessage
            }
        }
    }
</script>

<style lang="stylus">
    .az-loading
        z-index 100
</style>
