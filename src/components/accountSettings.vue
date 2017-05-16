<template>
  <!-- root node required -->
  <div>
    <!-- your content -->
    <div class="layout-padding">
    <generalSettings></generalSettings>
    <changePassword></changePassword>
    </div>
  </div>
</template>

<script>
import changePassword from './changePassword.vue'
import generalSettings from './generalSettings.vue'
export default {
  components: {
    generalSettings, changePassword
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
