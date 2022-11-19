<template>
  <div>
    <!-- <b-form-input id="input-1" v-model="form.link" type="text" placeholder="Link" required>
      
    </b-form-input> -->
    <!-- <i class="fa-solid fa-user"></i> -->

    <b-input-group size="sm" class="mb-2 cus-input">
      <b-input-group-prepend is-text>
        <b-icon icon="search"></b-icon>
      </b-input-group-prepend>
      <b-form-input type="search" placeholder="Search terms"></b-form-input>
    </b-input-group>
    
  </div>
</template>

<script>

export default {
  props: [],
  data() {
    return {
      form: {
        link: ''
      }
    }
  }
}
</script>


<style scoped>
.form-group::v-deep input {
  width: 100%;
  height: 50px;
  border-radius: 50px;
}

.form-control::v-deep {
  padding: 0.375rem 3rem;
}
</style>