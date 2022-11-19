<template>
    <div>
        <div class="p40 m20">
            <b-form-group id="input-group-1" label="Name" label-for="input-1">
                <b-form-input id="input-1" v-model="stepTwoform.name" type="text" placeholder="Name" required>
                </b-form-input>
            </b-form-group>
        </div>
        <div class="p40 m20">
            <b-form-group id="input-group-2" label="Phone Number" label-for="input-2">
                <b-form-input id="input-2" v-model="stepTwoform.number" type="text" placeholder="Number" required>
                </b-form-input>
            </b-form-group>
        </div>
        <div class="p40 m20">
            <b-form-group id="input-group-3" label="City" label-for="input-3">
                <b-form-input id="input-3" v-model="stepTwoform.city" type="text" placeholder="Choose city" required>
                </b-form-input>
            </b-form-group>
        </div>
        <div class="p40 m20">
            <b-form-group id="input-group-4" label="Area" label-for="input-4">
                <b-form-input id="input-4" v-model="stepTwoform.area" type="text" placeholder="Choose area" required>
                </b-form-input>
            </b-form-group>
        </div>
        <div class="p40 m20">
            <b-form-group id="input-group-5" label="Address Information" label-for="textarea">
                <b-form-textarea id="textarea" v-model="stepTwoform.address" placeholder="Address" rows="5" max-rows="6">
                </b-form-textarea>
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
            stepTwoform: {
                name: "",
                number: "",
                city: "",
                area: "",
                address: "",
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