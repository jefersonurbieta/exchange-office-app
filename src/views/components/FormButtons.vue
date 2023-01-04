<template>
    <v-row class="mt-2" v-if="editable" :class="editable ? 'show': 'hide'">
        <v-col>
            <v-btn
                class="mr-2"
                depressed
                color="primary"
                shaped
                large
                @click="$emit('save')">
                Salvar
            </v-btn>
            <v-btn
                depressed
                color="error"
                shaped
                plain
                large
                @click="$emit('cancel')">
                Cancelar
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
            }
        }
    }
</script>
