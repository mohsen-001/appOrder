<template>
    <div>
        <b-form-group id="input-group-2" label="Password" label-for="input-2">
            <b-form-input id="input-2" v-model="form.password" type="password" placeholder="Password" required>
            </b-form-input>
        </b-form-group>
    </div>
</template>

<script>
export default {
    name: "input",

}
</script>

<style scoped>
input {
    width: 300px !important;
    height: 50px;
    border-radius: 50px;
}
</style>