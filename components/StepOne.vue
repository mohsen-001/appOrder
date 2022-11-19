<template>
    <div>
        <CountrySelection />
        <CompanySelection />

        <div class="p40">
            <b-form-checkbox v-model="checked" class="cus_switch" switch size="lg">Non Ad Order</b-form-checkbox>
        </div>

        <div class="p40 m20">
            <b-form-group id="input-group-1" label="Add Link" label-for="input-1">
                <b-form-input id="input-1" v-model="form.link" type="text" placeholder="Link" required>
                </b-form-input>
            </b-form-group>
        </div>
    </div>
</template>

<script>
export default {
    name: "StepOne",
    data() {
        return {
            checked: false,
            form: {
                link: "",
            }
        }
    },

}
</script>

<style scoped>
.p40 {
    padding: 0 40px;
}

.m20 {
    margin-top: 20px;
}
</style>