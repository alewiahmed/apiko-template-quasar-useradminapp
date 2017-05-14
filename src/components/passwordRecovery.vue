<template>
  <div>
    <div class="layout-padding flex justify-center">
      <div class="card recovery-container">
      <div class="toolbar inverted text-black list">
          <button @click="$router.go(-1)">
            <i>keyboard_arrow_left</i>
          </button>
          <q-toolbar-title class="text-center">
            Reset password
          </q-toolbar-title>
        </div>
        <div class="card-content bg-white column items-center">
          <div class="floating-label">
            <input required type="text" class="full-width" @input="$v.email.$touch()" v-model.trim="email" :class="{'has-error': $v.email.$error}">
            <label>email</label>
            <ul class="error-list">
              <li v-if="!$v.email.required && $v.email.$error" class="text-red text-truncate"><small>Email is Required</small></li>
              <li v-if="!$v.email.email && $v.email.$error" class="text-red text-truncate"><small>Email usually contains @ and a dot.</small></li> 
            </ul>
          </div>
          <div class="row justify-center">       
            <button class="green" @click.stop="send" :disabled="$v.$invalid">Send reset email</button>
          </div>
          <div class="row justify-center">      
            <button class="text-red clear" @click.stop="cancel">cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      email: ''
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    send () {
      console.log('email should be sent')
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.recovery-container {
  width: 85%;
  max-width: 400px;
}
</style>
