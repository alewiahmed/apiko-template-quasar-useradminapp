<template>
  <!-- root node required -->
  <div>
    <!-- your content -->
    <div class="layout-padding">
    <div class="card bg-white" v-for="user in users">
    <div class="card-content">
      {{user.username}}
    </div>
    </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['users'])
  }
}
</script>

<style>
</style>
