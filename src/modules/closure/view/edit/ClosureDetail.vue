<template>
    <container-card class="mt-5 mb-15">
        <v-row>
            <v-col cols="12" md="3" class="pt-3">
                <field-label>Usuário</field-label>
                <field-view :text="value.user.name"/>
            </v-col>

            <v-col cols="12" md="3" class="pt-3">
                <field-label>Data</field-label>
                <field-view :text="value.createdAt | datetime"/>
            </v-col>
        </v-row>
    </container-card>
</template>

<script>
    export default {
        props: {
            value: {
                required: true,
                default: {
                    user: {
                        name: 'das'
                    }
                }
            }
        }
    }
</script>
