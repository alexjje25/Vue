<template>
     <div class="name">{{ name }}</div>
</template>

<script>
export default {
    props: {
        name: {
            default: "",
            type: String
        }
    }
}
</script>

<style lang="scss" scoped></style>