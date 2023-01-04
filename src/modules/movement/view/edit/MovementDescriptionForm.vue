<template>
    <container-card class="mb-5">
        <v-row>
            <v-col cols="12">
                <field-label>Descrição</field-label>
                <v-text-field
                    v-if="editable"
                    v-model="value.description"
                    maxlength="255"
                    name="Descrição"
                    placeholder="Ex. Saida de valores"
                    solo
                    flat
                    shaped/>
                <field-view
                    v-else
                    :text="value.description"/>
            </v-col>
        </v-row>
    </container-card>
</template>

<script>

    export default {
        inject: ['$validator'],
        props: {
            value: {
                required: true,
                default: {}
            },
            editable: {
                type: Boolean,
                default: false
            },
        }
    }
</script>


<style lang="stylus">
</style>
