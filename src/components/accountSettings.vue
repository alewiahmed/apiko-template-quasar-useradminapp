<template>
  <!-- root node required -->
  <div>
    <!-- your content -->
    <div class="layout-padding">
      <div v-if="user !== undefined">
        <generalSettings :user="user"></generalSettings>
        <changePassword :user="user"></changePassword>
      </div>
      <div class="card column items-center bg-white" v-else>
        <div class="card-content">
          <h5 class="text-center intro">No user with the given id.</h5>    
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import changePassword from './changePassword.vue'
import generalSettings from './generalSettings.vue'
export default {
  components: {
    generalSettings, changePassword
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters({theUser: 'user', users: 'users'}),
    id () {
      return Number(this.$route.params.id)
    },
    user () {
      if (Number.isInteger(this.id)) {
        return this.users.find(user => user.id === this.id)
      }
      return this.theUser
    }
  }
}
</script>

<style scoped>
.intro {
  font-size: 1.25rem;
  font-weight: 500;
}
</style>
