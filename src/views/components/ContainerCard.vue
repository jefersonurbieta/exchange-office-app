<template>
    <v-card class="container-card pa-0" outlined shaped>
        <v-card-title v-if="title">
            <v-icon v-if="icon" class="mr-2">{{ icon }}</v-icon>
            {{ title }}
        </v-card-title>
        <div class="az-form-content">
            <slot/>
        </div>
    </v-card>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: null
            },
            icon: {
                type: String,
                default: null
            }
        }
    }
</script>

<style lang="stylus">

</style>
