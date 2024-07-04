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

            <v-col cols="12" md="4" v-if="editable">
                <field-label>Valor disponível</field-label>
                <field-view v-if="value.account" :text="value.account.value"/>
                <field-view v-if="!value.account" :text="defaultText"/>
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
                   v-if="value.type && value.type === movementTypes.TRANSFER && value.targetType === movementTargetTypes.ACCOUNT_TO_ACCOUNT">
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

            <v-col cols="12" md="4" v-if="value.type && value.type === movementTypes.TRANSFER && value.targetType === movementTargetTypes.ACCOUNT">
                <field-label>Usuário</field-label>
                <v-autocomplete
                    v-if="editable"
                    v-model="value.targetUser"
                    :error-messages="errors.first('Usuário')"
                    :items="targetUsers"
                    class="required"
                    item-text="name"
                    name="Usuário"
                    placeholder="Ex: Sandra"
                    required
                    return-object
                    v-validate="'required'"
                    solo
                    flat
                    shaped
                    @change="targetUserChanged"/>
                <field-view
                    v-else
                    :text="value.targetUser.name"/>
            </v-col>
        </v-row>
    </container-card>
</template>

<script>

    import {rolesTypes} from "@/core/constants";

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
            },
            users: {
                type: Array,
                default: () => []
            },
        },
        data() {
            return {
                defaultText: '--'
            }
        },
        computed: {
            targetAccounts() {
                if (!this.value.account) return this.accounts
                return this.accounts.filter(obj => obj.id !== this.value.account.id)
            },
            targetUsers() {
                return this.users.filter(obj => obj.id !== this.$store.state.loki.user.id
                    && obj.role !== rolesTypes.MANAGER
                    && obj.role !== rolesTypes.ADMIN)
            }
        },
        methods: {
            accountChanged(value) {
                this.value.accountId = value.id
                this.value.targetAccount = undefined
                this.value.targetAccountId = undefined
            },
            targetAccountChanged(value) {
                this.value.targetAccountId = value.id
            },
            targetUserChanged() {
                this.value.targetUserId = this.value.targetUser.id
            }
        }
    }
</script>
