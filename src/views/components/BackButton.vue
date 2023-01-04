<template>
    <v-row class="az-back-button mb-3">
        <v-btn color="primary" text depressed @click="back"> <v-icon>fa-light fa-chevron-left</v-icon>{{ text }} </v-btn>
        <v-spacer/>
        <v-menu offset-y v-if="showOptions">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                    text
                >
                    <v-icon>fa-light fa-ellipsis-vertical</v-icon>
                </v-btn>
            </template>
            <v-list v-if="showRemove">
                <v-list-item
                    v-if="showRemove"
                    @click="$emit('remove')">
                    <v-list-item-title>Remover</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-row>
</template>

<script>
export default {
    name: 'AzBackButton',
    props: {
        route: {
            type: Object,
            required: true
        },
        text: {
            type: String,
            default: 'Voltar para listagem'
        },
        showOptions: {
            type: Boolean,
            default: false
        },
        showRemove: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        items: [
            { title: 'Click Me' },
            { title: 'Click Me' },
            { title: 'Click Me' },
            { title: 'Click Me 2' },
        ],
    }),
    methods: {
        back() {
            this.$router.push(this.route)
        }
    }
}
</script>

<style scoped lang="stylus">
.az-back-button
    margin-left: 12px
    top: 10px
    position: relative
    font-weight: bold
    font-size: 14px
    .v-btn
        padding: 0
        margin: 0
        text-transform: none
    .v-icon
        font-size: 16px
        margin-right: 6px
</style>
