<template>
  <div>
    <div class="layout-padding flex justify-center">
      <div class="card registration-container">
       <div class="toolbar inverted text-black list">
         <button @click="$router.replace({name: 'login'})">
           <i>keyboard_arrow_left</i>
         </button>
         <q-toolbar-title class="text-center">
           <span class="header-text">Registration</span>
         </q-toolbar-title>
       </div>
       <div class="card-content bg-white column items-center">
        <div class="floating-label">
          <input required type="email" class="full-width" v-model.trim="tempUsername" :class="{'has-error': $v.username.$error}" @input="userInputChanged($v.username)">
          <spinner color="red" :size="30" class="load-username" v-if="checkUsername">checking...</spinner>
          <label>Email</label>
        </div>
        <div class="self-start">
          <ul class="error-list">
            <li v-if="!$v.username.isUnique && $v.username.$error" class="text-red text-truncate"><strong>This email is already registered.</strong> <a href="#/password-recovery"><small>Forgot your password?</small></a></li>
            <li v-if="!$v.username.required && $v.username.$error" class="text-red text-truncate"><small>Email is Required.</small></li>
            <li v-if="!$v.username.email && $v.username.$error" class="text-red text-truncate"><small>Email usually contains @ and a dot.</small></li> 
          </ul>
        </div>
        <div class="floating-label">
          <input required type="password" class="full-width" @input="inputChanged($v.password)" v-model="password" :class="{'has-error': $v.password.$error}">
          <label>Your password</label>
          <ul class="error-list">
            <li v-if="!$v.password.required && $v.password.$error" class="text-red text-truncate"><small>Password is required.</small></li>
            <li v-if="!$v.password.minLength && $v.password.$error" class="text-red text-truncate"><small>Password should have a minimum length of {{$v.password.$params.minLength.min}}</small></li>
            <li v-if="!$v.password.alphaNumCap && $v.password.$error" class="text-red text-truncate"><small>Password should have uppercase, lowercase & numeric.</small></li>
          </ul>
        </div>
        <div class="floating-label">
          <input required type="password" class="full-width" @input="inputChanged($v.repeatPassword)" v-model="repeatPassword" :class="{'has-error': $v.repeatPassword.$error}">
          <label>Confirm Password</label>
          <ul class="error-list">
            <li v-if="!$v.repeatPassword.sameAsPassword && $v.repeatPassword.$error" class="text-red text-truncate"><small>Both passwords must match.</small></li>
          </ul>
        </div>
        <small class="text-red" v-if="errorId > 0">{{error}}</small>
        <div class="button-container">
          <button class="primary round small"  :disabled="$v.$invalid" @click="register">
            Register
            <i class="on-right">keyboard_arrow_right</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

    <script>
import { login } from '../utils.js'
import { Loading, Utils } from 'quasar'

import { required, sameAs, minLength, email } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      username: '',
      tempUsername: '',
      password: '',
      repeatPassword: '',
      errorId: 0,
      checkUsername: false,
      loadingObj: {
        message: 'Registering...',
        spinner: 'tail',
        spinnerSize: 70,
        spinnerColor: 'red'
      }
    }
  },
  validations: {
    username: {
      required,
      email,
      isUnique (value) {
        if (!this.$v.username.email || value === '') {
          this.checkUsername = false
          return true
        }
        return new Promise((resolve, reject) => {
          this.checkUsername = true
          let p = this.$store.dispatch('userExists', value)
          p.then(response => {
            this.checkUsername = false
            if (response.data.exists) {
              resolve(false)
            }
            else {
              resolve(true)
            }
          })
          p.catch(error => {
            this.checkUsername = false
            console.warn(error)
            resolve(true)
          })
        })
      }
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
    },
    repeatPassword: {
      sameAsPassword: sameAs('password')
    }
  },
  computed: {
    error () {
      switch (this.errorId) {
        case 1:
          return 'Error registering, please try again.'
        case 5:
          return 'This email is already registered.'
        default:
          return 'Error registering, please try again.'
      }
    }
  },
  methods: {
    inputChanged (element) {
      this.errorId = 0
      element.$touch()
    },
    userInputChanged: Utils.debounce(function (name) {
      this.username = this.tempUsername
      name.$touch()
    }, 600, false),
    register () {
      this.checkUsername = false
      Loading.show(this.loadingObj)
      let p = this.$store.dispatch('register', {
        username: this.username,
        password: this.password
        // role: 'member'
      })

      p.then(response => {
        this.loadingObj.message = 'Logging in...'
        Loading.show(this.loadingObj)
        // Loading.hide()
        let p2 = login(this.username, this.password)

        p2.then(response => {
          this.$router.replace('dashboard')
          Loading.hide()
        })
        p2.catch(error => {
          Loading.hide()
          this.$router.replace({name: 'login'})
          console.warn(error)
        })
      })

      p.catch((error) => {
        this.password = ''
        this.repeatPassword = ''
        this.$v.$reset()
        Loading.hide()
        this.errorId = 1
        if (error.response) {
          // check the response status & return the corresponding errors
          if (error.response.status === 409) {
            this.errorId = 1
          }
          else if (error.response.data.code === 5) {
            this.errorId = 5
          }
        }
      })
    }
  }
}
</script>

<style scoped>
  .registration-container {
    width: 85%;
    max-width: 400px;
  }
  .load-username {
    position: absolute;
    bottom: 5px;
    right: 0;
  }
  .card-flex {
    display: flex;
    flex-direction: row;
    align-content: center;
    flex-wrap: no-wrap;
    align-items: flex-start;
  }
  .card-flex > button {
  align-self: center;
  }
  .error-list {
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .button-container {
    margin-top: 10px;
  }
  .header-text {
    font-weight: 400;
  }
</style>
