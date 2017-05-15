<template>
  <div class="card bg-white">
    <div class="card-title text-center list header-text">
      Change Password
    </div>
    <div class="card-content group">
      <div class="stacked-label">
        <input required type="password" class="full-width" @input="inputChanged($v.existingPassword)" v-model="existingPassword" :class="{'has-error': $v.existingPassword.$error}">
        <label>Current password</label>
        <ul class="error-list">
          <li v-if="!$v.existingPassword.required && $v.existingPassword.$error" class="text-red text-truncate"><small>Password is required.</small></li>
          <li v-if="!$v.existingPassword.minLength && $v.existingPassword.$error" class="text-red text-truncate"><small>Password should have a minimum length of {{$v.existingPassword.$params.minLength.min}}</small></li>
          <li v-if="!$v.existingPassword.alphaNumCap && $v.existingPassword.$error" class="text-red text-truncate"><small>Password should have uppercase, lowercase & numeric.</small></li>
        </ul>
      </div>

      <div class="stacked-label">
        <input required type="password" class="full-width" @input="inputChanged($v.newPassword)" v-model="newPassword" :class="{'has-error': $v.newPassword.$error}">
        <label>New Password</label>
        <ul class="error-list">
          <li v-if="!$v.newPassword.required && $v.newPassword.$error" class="text-red text-truncate"><small>Password is required.</small></li>
          <li v-if="!$v.newPassword.minLength && $v.newPassword.$error" class="text-red text-truncate"><small>Password should have a minimum length of {{$v.newPassword.$params.minLength.min}}</small></li>
          <li v-if="!$v.newPassword.alphaNumCap && $v.newPassword.$error" class="text-red text-truncate"><small>Password should have uppercase, lowercase & numeric.</small></li>
        </ul>
      </div>

      <div class="stacked-label">
        <input required type="password" class="full-width" @input="inputChanged($v.confirmPassword)" v-model="confirmPassword" :class="{'has-error': $v.confirmPassword.$error}">
        <label>Confirm Password</label>
        <ul class="error-list">
          <li v-if="!$v.confirmPassword.sameAsPassword && $v.confirmPassword.$error" class="text-red text-truncate"><small>Password should have uppercase, lowercase & numeric.</small></li>
        </ul>
      </div>
      <div class="row justify-center group">
        <button type="button" class="clear primary" :disabled="$v.$invalid || isLoading" @click.prevent="save"><i>done</i>Save<spinner color="red" :size="30" v-if='isLoading' class="on-right"></spinner></button>
        <button type="button" class="clear primary" @click.prevent="cancel"><i>close</i>Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { Toast } from 'quasar'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      existingPassword: '',
      newPassword: '',
      confirmPassword: '',
      isLoading: false
    }
  },
  validations: {
    existingPassword: {
      required,
      minLength: minLength(8),
      alphaNumCap (str) {
        let pattern1 = /[a-z]/
        let pattern2 = /[A-Z]/
        let pattern3 = /[0-9]/
        return pattern1.test(str) && pattern2.test(str) && pattern3.test(str)
      }
    },
    newPassword: {
      required,
      minLength: minLength(8),
      alphaNumCap (str) {
        let pattern1 = /[a-z]/
        let pattern2 = /[A-Z]/
        let pattern3 = /[0-9]/
        return pattern1.test(str) && pattern2.test(str) && pattern3.test(str)
      }
    },
    confirmPassword: {
      sameAsPassword: sameAs('newPassword')
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    inputChanged (element) {
      this.errorId = 0
      element.$touch()
    },
    save () {
      this.isLoading = true
      let payload = {
        id: this.user.id
      }
      payload.args = {
        current: this.existingPassword,
        new: this.newPassword
      }

      let p = this.$store.dispatch('changePassword', payload)

      p.then(response => {
        this.isLoading = false
        Toast.create.positive({
          html: 'You have successfully changed your password.',
          timeout: 4000
        })
        this.resetForm()
      })
      p.catch(error => {
        this.isLoading = false
        this.resetForm()
        Toast.create.negative({
          html: this.errorText(error.response.data.code),
          timeout: 4000
        })
        console.warn(error)
      })
    },
    errorText (code) {
      switch (code) {
        case 7:
          return 'Your current password is incorrect.'
        case 10:
          return 'No user with such id.'
        default:
          return 'Error changing password.'
      }
    },
    resetForm () {
      this.$v.$reset()
      this.existingPassword = ''
      this.newPassword = ''
      this.confirmPassword = ''
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.header-text {
  font-weight: 400;
}
</style>
