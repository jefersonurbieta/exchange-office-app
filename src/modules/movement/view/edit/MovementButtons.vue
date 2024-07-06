<template>
    <v-row>
        <v-col>
            <v-btn
                class="mr-2"
                depressed
                color="primary"
                shaped
                large
                v-if="editable"
                @click="$emit('save')">
                Salvar
            </v-btn>
            <v-btn
                v-if="editable && showFinishButton"
                class="mr-2"
                depressed
                color="info"
                shaped
                large
                @click="$emit('finish')">
                Finalizar
            </v-btn>
            <v-btn
                class="mr-2"
                depressed
                color="error"
                shaped
                large
                v-if="editable"
                @click="$emit('cancel')">
                Cancelar
            </v-btn>
            <v-btn
                class="mr-2"
                depressed
                color="warning"
                shaped
                large
                v-if="showPrint"
                @click="$emit('print')">
                Imprimir Boleto
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>

    export default {
        props: {
            editable: {
                type: Boolean,
                default: false
            },
            showPrint: {
                type: Boolean,
                default: false
            },
            showFinishButton: {
                type: Boolean,
                default: false
            }
        }
    }
</script>
