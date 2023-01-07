<template>
    <v-row class="search-row pt-5 pb-5">
        <v-col cols="6">
            <v-btn
                v-if="showNew && (!adminNew || managerUser())"
                depressed
                color="primary"
                @click="$emit('new')">
                Novo
            </v-btn>

            <slot name="buttons"/>
        </v-col>

        <v-col cols="6" v-if="advancedSearch">
            <slot/>
        </v-col>

        <v-col cols="6" v-else>
            <v-text-field
                v-model="value"
                append-icon="search"
                class="pr-3 elevation-0"
                maxlength="100"
                clearable
                hide-details
                label="Pesquisa"
                single-line
                slot="simpleSearch"
                solo
                flat
                shaped
                @input="$emit('input', $event)"/>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: {
        value: {
            default: null
        },
        showNew: {
            type: Boolean,
            default: false
        },
        adminNew: {
            type: Boolean,
            default: false
        },
        advancedSearch: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="stylus">
.search-row
    .az-search .btn-advanced-search
        right 0
        position absolute
        top 40px
</style>
