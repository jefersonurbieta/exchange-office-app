<template>
    <div class="field-view pt-3">
        <span class="text-sm text-body">
            {{ prefix }} {{ text | blankText}}
        </span>
    </div>
</template>

<script>
    export default {
        props: {
            text: {
                default: null
            },
            prefix: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style lang="stylus">

.text-sm {
    font-size: .875rem!important;
    line-height: 1.5;
}

</style>
