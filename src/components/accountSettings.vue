<template>
  <!-- root node required -->
  <div>
    <!-- your content -->
    <div class="layout-padding">
    <userAvatar></userAvatar>
    <generalSettings></generalSettings>
    <changePassword></changePassword>
    </div>
  </div>
</template>

<script>
import userAvatar from './userAvatar.vue'
import changePassword from './changePassword.vue'
import generalSettings from './generalSettings.vue'
export default {
  components: {
    generalSettings, changePassword, userAvatar
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
