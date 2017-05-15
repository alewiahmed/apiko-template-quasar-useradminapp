<template>
  <div class="card bg-white">
    <div class="card-title text-center list header-text">
      General Settings
    </div>
    <div class="card-content group">
      <div>Email: <strong class="text-red">{{user.username}}</strong></div>
      <div class="stacked-label">
        <input required type="text" class="full-width" @input="inputChanged($v.name)" v-model.trim="name" :class="{'has-error': $v.name.$error}">
        <label>Name</label>
        <ul class="error-list">
          <li v-if="!$v.name.required && $v.name.$error" class="text-red text-truncate"><small>Name is required</small></li>
        </ul>
      </div>
      <div class="quote"><p>If you had any user settings to change, you would put it here. Name is not required by default in the apiko api, it's here for an example purpose.</p>
      <p>You can change the fields inside <span class="text-green">src/components/generalSettings.vue</span> file.</p>
      <p>Use the $v field (vuelidate plugin) to validate the inputs.</p></div>
      <div class="row justify-center group">
        <button type="button" class="clear primary" :disabled="( $v.$invalid || isLoading || noFieldChanged)" @click.prevent="save"><i>done</i>Save<spinner color="red" :size="30" v-if='isLoading' class="on-right"></spinner></button>
        <button type="button" class="clear primary" @click.prevent="cancel"><i>close</i>Cancel</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

import { Toast } from 'quasar'
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      name: '',
      isLoading: false
    }
  },
  validations: {
    name: {
      required
    }
  },
  computed: {
    ...mapGetters(['user']),
    noFieldChanged () {
      if (this.name !== this.user.name) {
        return false
      }
      return true
    }
  },
  methods: {
    inputChanged (element) {
      this.errorId = 0
      element.$touch()
    },
    save () {
      let user = {
        id: this.user.id,
        args: {}
      }
      if (this.name !== this.user.name) {
        user.args.name = this.name
      }
      this.isLoading = true
      let p = this.$store.dispatch('updateUser', user)

      p.then(response => {
        this.isLoading = false
        Toast.create.positive({
          html: 'Well done! You successfully saved your settings.',
          timeout: 4000
        })
      })
      p.catch(error => {
        this.isLoading = false
        Toast.create.negative({
          html: 'Oh snap! Change a few things up and try submitting again.',
          timeout: 4000
        })
        console.warn(error)
      })
    },
    cancel () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.name = this.user.name
  }
}
</script>

<style scoped>
.error-list {
  word-wrap: hidden;
  padding: 0;
  font-size: 14px;
  list-style-type: none;
}
.header-text {
  font-weight: 400;
}
</style>
