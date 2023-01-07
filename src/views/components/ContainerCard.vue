<template>
    <material-card :color="color">
        <template v-if="title" v-slot:heading>
            <v-row>
                <v-col v-if="icon" sm="1" align-self="center">
                    <v-icon class="mr-2">{{ icon }}</v-icon>
                </v-col>
                <v-col :sm="icon ? 11 : 12">
                    <div class="title font-weight-light">
                        {{ title }}
                    </div>

                    <div v-if="subtitle" class="body-1 font-weight-light">
                        {{subtitle}}
                    </div>
                </v-col>
            </v-row>

        </template>
        <div class="az-form-content">
            <slot/>

        </div>
            <template v-if="$slots.actions" v-slot:actions>
                <slot name="actions"/>
            </template>
    </material-card>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: null
            },
            subtitle: {
                type: String,
                default: null
            },
            icon: {
                type: String,
                default: null
            },
            color: {
                type: String,
                default: 'primary'
            }
        }
    }
</script>

<style lang="stylus">

</style>
