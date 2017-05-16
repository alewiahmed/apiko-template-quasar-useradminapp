<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="0">
      <button class="big capitalize" @click="redirect('home')">Apiko + Quasar App</button>
      </q-toolbar-title>
      <button @click="$refs.leftDrawer.open()" v-if="loggedIn">
        <i>menu</i>
      </button>
    </div>
    <q-drawer ref="leftDrawer" :swipe-only="true" right-side>
      <userAvatar></userAvatar>
      <div class="list no-border platform-delimiter">
        <q-drawer-link icon="settings" :to="{path:'account-settings' , exact: true}">
        Account Settings
        </q-drawer-link>
        <q-drawer-link icon="help" :to="{path: 'logout', exact: true}">
        Logout
        </q-drawer-link>
      </div>
    </q-drawer>

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
import userAvatar from './userAvatar.vue'

export default {
  components: {
    userAvatar
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['loggedIn'])
  },
  methods: {
    redirect (address) {
      this.$router.push({name: address})
    }
  }
}
</script>

<style>
body {
  background-color: #f5f8fa;
}
</style>
