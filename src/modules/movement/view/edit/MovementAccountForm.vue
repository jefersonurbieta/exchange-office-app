<template>
    <container-card class="mb-5">
        <v-row>
            <v-col cols="12" md="4">
                <field-label>Conta</field-label>
                <v-autocomplete
                    v-if="editable"
                    v-model="value.account"
                    :error-messages="errors.first('Conta')"
                    :items="accounts"
                    class="required"
                    item-text="name"
                    name="Conta"
                    placeholder="Ex: Dinheiro"
                    required
                    return-object
                    v-validate="'required'"
                    solo
                    flat
                    shaped
                    @change="accountChanged"/>
                <field-view
                    v-else
                    :text="value.account.name"/>
            </v-col>

            <v-col cols="12" md="4" v-if="value.account && editable">
                <field-label>Valor disponível</field-label>
                <field-view :text="value.account.value"/>
            </v-col>

            <v-col cols="12" md="4">
                <field-label>Valor</field-label>
                <field-money
                    v-if="editable"
                    v-model="value.value"
                    id="valor"
                    class="required"
                    name="valor"
                    placeholder="Ex. 100"
                    required
                    v-validate="'required'"/>
                <field-view
                    v-else
                    :text="value.value"/>
            </v-col>

            <v-col cols="12" md="4"
                   v-if="value.type && value.type === movementTypes.TRANSFER">
                <field-label>Destino</field-label>
                <v-autocomplete
                    v-if="editable"
                    v-model="value.targetAccount"
                    :error-messages="errors.first('Conta')"
                    :items="targetAccounts"
                    class="required"
                    item-text="name"
                    name="Conta Destino"
                    placeholder="Ex: Dinheiro"
                    required
                    return-object
                    v-validate="'required'"
                    solo
                    flat
                    shaped
                    @change="targetAccountChanged"/>
                <field-view
                    v-else
                    :text="value.targetAccount.name"/>
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
            accounts: {
                type: Array,
                default: () => []
            }
        },
        computed: {
            targetAccounts() {
                if (!this.value.account) return this.accounts
                return this.accounts.filter(obj => obj.id !== this.value.account.id)
            }
        },
        methods: {
            accountChanged(value) {
                this.value.accountId = value.id
                this.value.targetAccount = undefined
                this.value.targetAccountId = value.id
            },
            targetAccountChanged(value) {
                this.value.targetAccountId = value.id
            }
        }
    }
</script>
