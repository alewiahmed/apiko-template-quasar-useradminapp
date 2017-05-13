<template>
  <div>
    <div class="layout-padding flex justify-center">
      <div class="card login-container">
      <div class="card-title text-center bg-white list bordered">
          Login
        </div>
        <div class="card-content bg-white column items-center">
          <div class="floating-label">
            <input required type="text" class="full-width" @input="inputChanged($v.username)" v-model.trim="username" :class="{'has-error': $v.username.$error}">
            <label>Email</label>
            <ul class="error-list">
              <li v-if="!$v.username.required && $v.username.$error" class="text-red text-truncate"><small>Email is Required.</small></li>
              <li v-if="!$v.username.email && $v.username.$error" class="text-red text-truncate"><small>Email usually contains @ and a dot.</small></li> 
            </ul>
          </div>
          <div class="floating-label">
            <input required type="password" class="full-width" @input="inputChanged($v.password)" v-model="password" :class="{'has-error': $v.password.$error}">
            <label>Your Password</label>
            <ul class="error-list">
              <li v-if="!$v.password.required && $v.password.$error" class="text-red text-truncate"><small>Password is required.</small></li>
              <li v-if="!$v.password.minLength && $v.password.$error" class="text-red text-truncate"><small>Password should have a minimum length of {{$v.password.$params.minLength.min}}</small></li>
              <li v-if="!$v.password.alphaNumCap && $v.password.$error" class="text-red text-truncate"><small>Password should have uppercase, lowercase & numeric.</small></li>
            </ul>
          </div>
          <small class="text-red error-text" v-if="errorId > 0">{{error}}</small>
          <div class="row wrap justify-center">
            <button class="green small" :disabled="$v.$invalid" @click.stop="login">
              Login<i class="on-right">keyboard_arrow_right</i>
            </button>
            <button class="text-red capitalize clear light-paragraph" @click.stop="$router.push({name: 'passwordRecovery'})">Forgot your password?</button>
          </div>
          <div class="or-container">
            <h6>or</h6>
          </div>
          <div>
            <button class="primary" @click="goToRegistration">
              Register
              <i class="on-right">input</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from 'quasar'

import { required, minLength, email } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      username: '',
      password: '',
      isLoading: false,
      errorId: 0,
      loadingObj: {
        message: 'Logging In...',
        spinner: 'tail',
        spinnerSize: 70,
        spinnerColor: 'red'
      }
    }
  },
  validations: {
    username: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8),
      alphaNumCap (str) {
        let pattern1 = /[a-z]/
        let pattern2 = /[A-Z]/
        let pattern3 = /[0-9]/
        return pattern1.test(str) && pattern2.test(str) && pattern3.test(str)
      }
    }
  },
  computed: {
    error () {
      switch (this.errorId) {
        case 1:
          return 'This user does not exist.'
        case 2:
          return 'Wrong username or password.'
        case 3:
          return 'Unable to login, please try again later.'
        default:
          return 'Unable to login, please try again later.'
      }
    }
  },
  methods: {
    inputChanged (element) {
      this.errorId = 0
      element.$touch()
    },
    goToRegistration () {
      this.$router.push({name: 'registration'})
    },
    login () {
      Loading.show(this.loadingObj)
      let p = this.$store.dispatch('login', {
        username: this.username,
        password: this.password
      })

      p.then(response => {
        Loading.hide()
        console.log('Successfully logged in.')
        this.$store.commit('loggedIn', true)
        this.$store.commit('user', response.data.user)
        this.$store.commit('token', response.data.token)
        this.$router.replace('dashboard')
      })

      p.catch(error => {
        this.password = ''
        this.$v.$reset()
        Loading.hide()
        if (error.response) {
          if (error.response.status === 404) {
            this.errorId = 3
          }
          else if (error.response.status === 401) {
            this.errorId = 2
          }
          else {
            this.errorId = 3
          }
        }
        else {
          this.errorId = 3
        }
      })
    }
  }
}
</script>

<style scoped>
.login-container {
  width: 85%;
  max-width: 400px;
}
.error-text {
  margin: 10px auto;
}
.or-container {
  margin: 5px auto;
}
/*.floating-label label {
  top: 5px;
  left: 10px;
}
input:not(.no-style) {
  padding-left: 10px;
  padding-right: 10px;
}*/
</style>
