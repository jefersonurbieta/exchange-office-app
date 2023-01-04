<template>
    <v-row class="search-row pt-5 pb-5">
        <v-col cols="8">
            <v-btn
                depressed
                class="mr-2 text-capitalize"
                rounded
                shaped
                :outlined="types.indexOf(movementTypes.PURCHASE_SALE) == -1"
                :color="types.indexOf(movementTypes.PURCHASE_SALE) >= 0 ? 'primary' : ''"
                @click="changeMovementType(movementTypes.PURCHASE_SALE)">
                Compra/Venda
            </v-btn>
            <v-btn
                depressed
                class="mr-2"
                rounded
                shaped
                :outlined="types.indexOf(movementTypes.TRANSFER) == -1"
                :color="types.indexOf(movementTypes.TRANSFER) >= 0 ? 'primary' : ''"
                @click="changeMovementType(movementTypes.TRANSFER)">
                Transferência
            </v-btn>
            <v-btn
                depressed
                class="mr-2"
                rounded
                shaped
                :outlined="types.indexOf(movementTypes.INPUT) == -1"
                :color="types.indexOf(movementTypes.INPUT) >= 0 ? 'primary' : ''"
                @click="changeMovementType(movementTypes.INPUT)">
                Entrada
            </v-btn>
            <v-btn
                depressed
                class="mr-2"
                rounded
                shaped
                :outlined="types.indexOf(movementTypes.OUTPUT) == -1"
                :color="types.indexOf(movementTypes.OUTPUT)  >= 0 ? 'primary' : ''"
                @click="changeMovementType(movementTypes.OUTPUT)">
                Saida
            </v-btn>
        </v-col>

        <v-col cols="4">
            <slot/>
        </v-col>
    </v-row>
</template>

<script>

    export default {
        props: {
            filter: {
                type: Object
            },
        },
        data() {
            return {
                types: []
            }
        },
        methods: {
            changeMovementType(value) {
                if (this.types.indexOf(value) >= 0) {
                    this.types = this.types.filter(type => type !== value)
                } else {
                    this.types.push(value)
                }
                this.filter.types.value = this.types
                this.$emit('advancedSearch')
            }
        }
    }
</script>

<style lang="stylus">
.operacaoBusca
    .az-toolbar
        .search
            top 10px !important
            width auto !important

    .totalizador-ativado:before
        opacity 0.24 !important
</style>
