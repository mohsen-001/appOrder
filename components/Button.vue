<template>
    <div>
        <b-button @click="$emit('clicked')" variant="primary" class="btn">{{ btnText }}</b-button>
    </div>
</template>

<script>
export default {
  props: ["btnText"]
}
</script>


<style scoped>
    .btn {
        padding: 20px !important;
        width: 100%;
        border-radius: 50px;
        /* background-color: #115598; */
    }
</style>