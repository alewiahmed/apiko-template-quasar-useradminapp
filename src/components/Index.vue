<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="0">
      <button class="big capitalize" @click="redirect('home')">Apiko + Quasar Framework v{{$q.version}}</button>
      </q-toolbar-title>
      <button v-if="loggedIn" class="capitalize">
      {{user.username}}
      <q-popover
          ref="popover"
        >
          <div class="list highlight" style="min-width: 120px">
            <div class="item item-link item-delimiter">
              <div class="item-content" @click="">
              Account Setting
              </div>
            </div>
          </div>
        </q-popover>
      </button>
      <button v-if="!loggedIn" @click="redirect('login')">
        <i>menu</i>
        Login
      </button>
      <button v-if="!loggedIn" @click="redirect('registration')">
        <i>add_box</i>
        Register
      </button>
    </div>

    <!--
      Replace following "div" with
      <router-view class="layout-view"> component
      if using subRoutes
    -->
    <transition>
    <router-view class="layout-view"></router-view>
    </transition>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['user', 'loggedIn'])
  },
  methods: {
    redirect (address) {
      this.$router.push({name: address})
    }
  }
}
</script>

<style scoped>
body {
  background-color: #f5f8fa;
}
</style>
