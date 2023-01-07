<template>
    <template-default showMainAction show-main-header>
        <v-row
            slot="main-action"
            align="center"
            class="main-action">
            <v-col class="text-center" cols="12">
                <v-btn
                    v-if="!this.$store.state.loki.asideClosed"
                    depressed
                    color="secondary"
                    class="text-capitalize"
                    @click="newMovement">
                    Nova Movimentação
                </v-btn>
                <v-btn
                    v-else
                    depressed
                    fab
                    small
                    color="secondary"
                    @click="newMovement">
                    <v-icon>fas fa-plus</v-icon>
                </v-btn>
            </v-col>
        </v-row>

        <change-current-company slot="main-header"/>

        <router-view/>
    </template-default>
</template>

<script>
    export default {
        methods: {
            newMovement() {
                const reload = window.location.href.indexOf('/movement/') !== -1
                window.location.assign(`${window.location.origin}/#/movement/new`)
                if (reload) {
                    window.location.reload()
                }
            }
        }
    }
</script>

<style lang="stylus">
html, body, .application
    font-family 'Open Sans', sans-serif

.az-template-default .container
    background-color #f0f4f8
    padding 12px

    .v-btn
        text-transform capitalize !important

.main-action
    border-bottom: 1px solid rgba(255, 255, 255, 0.1)
    margin 0

.v-text-field--shaped
    border-radius 16px

.v-app-bar
    border-bottom 1px solid rgb(222, 228, 233) !important
    box-shadow: 0 0 0 0 rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 14%), 0px 0px 0px 0px rgb(0 0 0 / 12%) !important;

.notification i.white--text
    color rgb(119, 119, 119) !important

.main-action .v-btn
    border-radius 12px !important

.az-table-list tbody tr
    border-bottom 1px solid #e9e9e9

    td
        font-weight 400
        height 40px
        color #777
        font-size 13px

.az-menu .v-list-item__action i
    font-size 15px

.az-container .v-card
    background rgb(255, 255, 255)
    border-radius 16px
    box-shadow rgba(32, 32, 32, 0.06) 0 8px 16px !important
    padding 16px 0
    border: 0

    .az-table-list thead tr:first-child th
        white-space normal

.table-actions
    text-align center !important

    a
        color #777

    i
        font-size 16px

.v-tooltip__content
    padding 10px
    font-size 12px
    opacity 1 !important
    background #333333 !important
    text-align justify !important
    line-height 1.4

.v-tooltip__content.menuable__content__active
    max-width 500px

.az-search
    .simple-search
        display none

.az-logo .main
    width 125px
    transition all .2s linear

.symbol
    width 45px !important
    transition all .2s linear

.az-about__version
    font-size 9px

.az-checkbox
    .v-icon.material-icons.theme--light
        margin-left 1.8px
        margin-top 1.8px

    .v-input--selection-controls__ripple
        margin-top 0
        margin-left 0

.az-form-content
    margin-top 0

    .v-text-field
        .v-label
            font-size 14px !important

    .az-date
        .v-text-field
            .v-label
                top 0

    .v-input--radio-group__input
        .v-label
            font-size 14px !important

    .col
        padding 8px 12px !important

    .v-textarea textarea
        max-height 100px
        overflow-y auto

    .v-input--selection-controls legend
        margin-bottom auto !important

.area-conteudo .v-stepper
    box-shadow none

    &__header
        align-items center
        flex-wrap nowrap
        position relative
        box-shadow none

    &__step
        text-align center
        flex-direction column

    &__step__step
        height 40px
        min-width 40px
        width 40px
        font-size 16px
        margin 0 0 5px

    &__step--active .v-stepper__label, &__step--complete .v-stepper__label
        color var(--v-primary-base) !important
        font-weight 600
        text-shadow none !important

.az-table-list .v-text-field > .v-input__control > .v-input__slot:before
    border-color transparent

.v-data-table tbody tr.v-data-table__expanded__content
    box-shadow inset 0 4px 8px -5px rgba(50, 50, 50, 0.1), inset 0px -4px 8px -5px rgba(50, 50, 50, 0.1)

.simple-table
    th, td
        border 1px solid #e7e7e7
        border-left none

    td
        border-top none

    th:first-child, td:first-child
        border-left 1px solid #e7e7e7

    th
        height 38px

    tr:hover
        background unset !important

@media (max-width 500px)
    .area-conteudo__linha
        .v-stepper__header
            height 102px

        .v-stepper__step
            padding 0

    .az-container
        margin 0

    .az-pagination .az-select-pagination
        height 50px

    .az-form-content, .az-form
        padding 10px

    .v-content
        padding-bottom 0

.btn-disabled
    cursor not-allowed

.erro-inicializacao
    width 100%
    padding 0
    text-align center
    color #555
    height 80vh
    display flex
    justify-content center
    align-items center

    i
        font-size 36px

    p
        font-size 18px
        margin 10px 0 0
        font-weight 600

.v-sheet.v-card.v-sheet--shaped
    border-radius 8px

.v-sheet.v-sheet--shaped
    border-radius 8px

.v-application .text-typo
    color: #344767 !important;

.az-form-content
    .theme--light.v-text-field--solo > .v-input__control > .v-input__slot
        background-color #f0f4f8

.advanced-search-bar
    .theme--light.v-text-field--solo > .v-input__control > .v-input__slot
        background-color #f0f4f8

.az-ops
    background transparent !important;

.clickable tbody tr
    cursor pointer

</style>
