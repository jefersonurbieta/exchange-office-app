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
                @click="openDialog">
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

            <v-dialog
                v-model="dialog"
                persistent
                content-class="dialog-with-title"
                max-width="50%"
            >
                <container-card :title="confirmationModalName">
                    <movement-confirm
                        v-model="value"/>

                    <v-row justify="center" class="mb-8">
                        <v-spacer></v-spacer>
                        <form-buttons
                            :editable="true"
                            @cancel="cancel"
                            @save="save"/>
                    </v-row>
                </container-card>
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script>

    import MovementConfirm from "@/modules/movement/view/edit/MovementConfirm.vue";
    import {movementTypes} from "@/core/constants";

    export default {
        components: {MovementConfirm},
        props: {
            value: {
                required: true,
                default: {}
            },
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
        },
        data() {
            return {
                dialog: false,
            }
        },
        computed: {
            confirmationModalName() {
                const name = "Confirmação de movimentação de "
                return name + movementTypes.getName(this.value.type)
            }
        },
        methods: {
            cancel() {
                this.dialog = false
            },
            async save() {
                this.dialog = false
                this.$emit('save')
            },
            async openDialog() {
                if (!await this.$validator._base.validateAll()) {
                    this.showErrorNotification('Preecha todos os campos!')
                    return
                }

                this.dialog = true
            }
        },
    }
</script>
