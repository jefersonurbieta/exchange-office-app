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
                :class="{ 'font-color-white': types.indexOf(movementTypes.PURCHASE_SALE) >= 0 }"
                @click="changeMovementType(movementTypes.PURCHASE_SALE)">
                Compra/Venda
            </v-btn>
            <v-btn
                depressed
                class="mr-2"
                rounded
                shaped
                :outlined="types.indexOf(movementTypes.TRANSFER) == -1"
                :color="types.indexOf(movementTypes.TRANSFER) >= 0 ? '#2EB0AA' : ''"
                :class="{ 'font-color-white': types.indexOf(movementTypes.TRANSFER) >= 0 }"
                @click="changeMovementType(movementTypes.TRANSFER)">
                Transferência
            </v-btn>
            <v-btn
                depressed
                class="mr-2"
                rounded
                shaped
                :outlined="types.indexOf(movementTypes.INPUT) == -1"
                :color="types.indexOf(movementTypes.INPUT) >= 0 ? 'accent' : ''"
                :class="{ 'font-color-white': types.indexOf(movementTypes.INPUT) >= 0 }"
                @click="changeMovementType(movementTypes.INPUT)">
                Entrada
            </v-btn>
            <v-btn
                depressed
                class="mr-2"
                rounded
                shaped
                :outlined="types.indexOf(movementTypes.OUTPUT) == -1"
                :color="types.indexOf(movementTypes.OUTPUT)  >= 0 ? '#E82C0C' : ''"
                :class="{ 'font-color-white': types.indexOf(movementTypes.OUTPUT) >= 0 }"
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
            types: {
                type: Array
            }
        },
        methods: {
            changeMovementType(value) {
                let typesLocal = []
                if (this.types.indexOf(value) >= 0) {
                    typesLocal = this.types.filter(type => type !== value)
                } else {
                    if(this.filter.types.value)
                        typesLocal = this.filter.types.value

                    typesLocal.push(value)
                }
                this.$emit('advancedSearch', typesLocal)
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

.font-color-white
    color white !important
</style>
