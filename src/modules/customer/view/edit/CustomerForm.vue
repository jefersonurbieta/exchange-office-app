<template>
    <div>
        <container-card class="mt-5">
            <v-row>
                <v-col cols="12" md="4" sm="6" xs="12">
                    <field-label>Nome</field-label>
                    <v-text-field
                        v-model="value.name"
                        :disabled="!editable"
                        :error-messages="errors.first('Nome')"
                        class="required"
                        maxlength="100"
                        name="Nome"
                        placeholder="Ex. Geovanna"
                        required
                        v-validate="'required'"
                        solo
                        flat
                        shaped/>
                </v-col>

                <v-col cols="12" md="4" sm="6" xs="12">
                    <field-label>E-mail</field-label>
                    <v-text-field
                        v-model="value.email"
                        :disabled="!editable"
                        :error-messages="errors.first('Email')"
                        maxlength="100"
                        name="Email"
                        placeholder="Ex. geovanna@email.com"
                        :required="!reservation"
                        v-validate="reservation ? '' : 'required'"
                        solo
                        flat
                        shaped/>
                </v-col>

                <v-col cols="12" md="4" sm="6" xs="12">
                    <field-label>Tipo Pessoa</field-label>
                    <v-select
                        v-model="value.kindPerson"
                        :disabled="!editable"
                        :items="kindPersons"
                        name="Tipo"
                        placeholder="Ex. Física"
                        solo
                        flat
                        shaped/>
                </v-col>

                <v-col cols="12" md="4" sm="6" xs="12">
                    <field-label v-if="value.kindPerson === 'Física' || !value.kindPerson">CPF</field-label>
                    <v-text-field
                        v-model="value.cpfCnpj"
                        :disabled="!editable"
                        v-mask="'###.###.###-##'"
                        maxlength="14"
                        name="CPF"
                        placeholder="000.000.000-00"
                        v-if="value.kindPerson === 'Física' || !value.kindPerson"
                        solo
                        flat
                        shaped/>

                    <field-label v-if="value.kindPerson === 'Jurídica'">CNPJ</field-label>
                    <v-text-field
                        v-if="value.kindPerson === 'Jurídica'"
                        v-model="value.cpfCnpj"
                        :disabled="!editable"
                        v-mask="'##.###.###/####-##'"
                        maxlength="18"
                        name="CNPJ"
                        placeholder="00.000.000/0000-00"
                        solo
                        flat
                        shaped/>

                    <field-label v-if="value.kindPerson === 'Estrangeira'">Documento</field-label>
                    <v-text-field
                        v-model="value.cpfCnpj"
                        :disabled="!editable"
                        label=""
                        maxlength="25"
                        name="Documento"
                        placeholder="Ex: número passaporte"
                        v-if="value.kindPerson === 'Estrangeira'"
                        solo
                        flat
                        shaped/>
                </v-col>

                <v-col cols="12" md="4" sm="6" xs="12">
                    <field-label>Telefone</field-label>
                    <v-text-field
                        v-model="value.phone"
                        :disabled="!editable"
                        :error-messages="errors.first('Telefone')"
                        v-mask="'(##) #####-####'"
                        maxlength="15"
                        name="Telefone"
                        placeholder="(00) 00000-0000"
                        :required="!reservation"
                        v-validate="reservation ? '' : 'required'"
                        solo
                        flat
                        shaped/>
                </v-col>

                <v-col cols="12" md="4" sm="6" xs="12" v-if="value.id">
                    <field-label>Situação</field-label>
                    <v-select
                        :disabled="!editable"
                        :error-messages="errors.first('Situação')"
                        :items="statusTypes.list"
                        item-text="name"
                        item-value="value"
                        name="Situação"
                        placeholder="Ex: Ativo"
                        required
                        v-model="value.status"
                        v-validate="'required'"
                        solo
                        flat
                        shaped/>
                </v-col>

                <v-col cols="12" md="4" sm="6" xs="12">
                    <field-label>Data de Nascimento</field-label>
                    <field-date
                        v-model="value.birthDate"
                        name-date="Data"/>
                </v-col>
            </v-row>

        </container-card>
        <container-card class="mt-15 mb-10" title="Endereço">
            <v-row>
                <v-col cols="12" md="4" sm="6" xs="12">
                    <field-label>CEP</field-label>
                    <v-text-field
                        v-model="value.zipCode"
                        :disabled="!editable"
                        @blur="findZipCodeInCorreios"
                        v-mask="'#####-###'"
                        maxlength="9"
                        placeholder="00000-000"
                        return-masked-value
                        solo
                        flat
                        shaped/>
                </v-col>

                <v-col cols="12" md="8" sm="6" xs="12">
                    <field-label>Rua</field-label>
                    <v-text-field
                        v-model="value.street"
                        :disabled="!editable"
                        maxlength="100"
                        placeholder="Ex: Afonso pena"
                        solo
                        flat
                        shaped/>
                </v-col>

                <v-col cols="12" md="4" sm="6" xs="12">
                    <field-label>Número</field-label>
                    <v-text-field
                        v-model="value.number"
                        :disabled="!editable"
                        maxlength="100"
                        placeholder="Ex: 123"
                        solo
                        flat
                        shaped/>
                </v-col>

                <v-col cols="12" md="4" sm="6" xs="12">
                    <field-label>Complemento</field-label>
                    <v-text-field
                        v-model="value.complement"
                        :disabled="!editable"
                        maxlength="100"
                        placeholder="Ex: Ap. 341"
                        solo
                        flat
                        shaped/>
                </v-col>

                <v-col cols="12" md="4" sm="6" xs="12">
                    <field-label>Bairro</field-label>
                    <v-text-field
                        v-model="value.district"
                        :disabled="!editable"
                        maxlength="100"
                        placeholder="Ex: Centro"
                        solo
                        flat
                        shaped/>
                </v-col>

                <v-col cols="12" md="4" sm="6" xs="12">
                    <field-label>País</field-label>
                    <v-autocomplete
                        v-model="value.country"
                        :disabled="!editable"
                        :items="paises"
                        item-text="nome_pais"
                        item-value="nome_pais"
                        placeholder="Ex: Brasil"
                        solo
                        flat
                        shaped/>
                </v-col>

                <v-col cols="12" md="4" sm="6" xs="12">
                    <field-label v-if="!value.country || value.country === 'Brasil'">Estado</field-label>
                    <v-autocomplete
                        v-if="!value.country || value.country === 'Brasil'"
                        v-model="estadoSelecionado"
                        :disabled="!editable"
                        :items="estados"
                        item-text="nome"
                        placeholder="Ex: São Paulo"
                        return-object
                        solo
                        flat
                        shaped
                        @change="stateChanged"/>

                    <field-label v-if="value.country && value.country !== 'Brasil'">Estado</field-label>
                    <v-text-field
                        v-if="value.country && value.country !== 'Brasil'"
                        v-model="value.state"
                        :disabled="!editable"
                        maxlength="100"
                        placeholder="Ex: Estado ou Distrito do pais"
                        solo
                        flat
                        shaped/>
                </v-col>

                <v-col cols="12" md="4" sm="6" xs="12">
                    <field-label v-if="!value.country || value.country === 'Brasil'">Cidade</field-label>
                    <v-autocomplete
                        v-if="!value.country || value.country === 'Brasil'"
                        v-model="value.city"
                        :disabled="!editable"
                        :items="estadoSelecionado.cidades"
                        placeholder="Ex: São Paulo"
                        solo
                        flat
                        shaped/>

                    <field-label v-if="value.country && value.country !== 'Brasil'">Cidade</field-label>
                    <v-text-field
                        v-if="value.country && value.country !== 'Brasil'"
                        v-model="value.city"
                        :disabled="!editable"
                        maxlength="100"
                        placeholder="Ex: Nova York"
                        solo
                        flat
                        shaped/>
                </v-col>
            </v-row>
        </container-card>
    </div>
</template>

<script>

    import {actionTypes} from '@/core/constants'

    export default {
        inject: ['$validator'],
        props: {
            value: {
                required: true
            },
            editable: {
                type: Boolean,
                default: false
            },
            reservation: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                valid: true,
                kindPersons: ['Física', 'Jurídica', 'Estrangeira'],
                estadoSelecionado: {}
            }
        },
        updated() {
            this.loadData()
        },
        methods: {
            findZipCodeInCorreios() {
                if (this.value.zipCode.length === 9) {
                    this.loader = true
                    this.$store.dispatch(actionTypes.CUSTOMER.FIND_ZIP_CODE, this.value.zipCode).then((response) => {
                        this.value.street = response.logradouro
                        this.value.complement = response.complemento
                        this.value.district = response.bairro

                        this.value.country = this.paises.find(obj => obj.nome_pais === 'Brasil').nome_pais
                        this.estadoSelecionado = this.estados.find(obj => obj.sigla === response.uf)
                        this.stateChanged()
                        this.value.city = response.localidade
                    })
                }
            },
            loadData() {
                if (this.value.state) {
                    this.estadoSelecionado = this.estados.find(obj => obj.nome === this.value.state)
                }
            },
            stateChanged() {
                if (this.estadoSelecionado) {
                    this.value.state = this.estadoSelecionado.nome
                }
            }
        }
    }
</script>
