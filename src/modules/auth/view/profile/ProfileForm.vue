<template>
    <div class="az-form-content">
        <v-row>
            <v-col cols="12" md="4" sm="6" xs="12">
                <field-label>Nome</field-label>
                <v-text-field
                    :disabled="!editable"
                    :error-messages="errors.first('Nome')"
                    class="required"
                    maxlength="100"
                    name="Nome"
                    placeholder="Ex: Thalita"
                    required
                    v-model="value.name"
                    v-validate="'required'"
                    solo
                    flat
                    shaped/>
            </v-col>
            <v-col cols="12" md="4" sm="6" xs="12">
                <field-label>E-mail</field-label>
                <v-text-field
                    :disabled="!editable"
                    :error-messages="errors.first('Email')"
                    class="required"
                    maxlength="100"
                    name="Email"
                    placeholder="Ex: thalita@email.com"
                    required
                    v-model="value.email"
                    v-validate="'required'"
                    solo
                    flat
                    shaped/>
            </v-col>
            <v-col cols="12" md="4" sm="6" xs="12">
                <field-label>Papel</field-label>
                <field-view :text="rolesTypes.getName(value.role)"/>
            </v-col>
            <v-col cols="12" md="4" sm="6" xs="12">
                <field-label>Login</field-label>
                <field-view :text="value.login"/>
            </v-col>
        </v-row>
    </div>
</template>

<script>

    export default {
        inject: ['$validator'],
        props: {
            value: {
                required: true
            },
            editable: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                valid: true
            }
        }
    }
</script>
