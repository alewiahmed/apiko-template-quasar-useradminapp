<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="0">
        <button class="big capitalize" @click="redirect('dashboard')" v-if="loggedIn">Dashboard</button>
        <button class="big capitalize" @click="redirect('home')" v-else>Apiko + Quasar App</button>
      </q-toolbar-title>
      <button @click="$refs.leftDrawer.open()" v-if="loggedIn">
        <i>menu</i>
      </button>
    </div>
    <q-drawer ref="leftDrawer" :swipe-only="true" right-side>
      <userAvatar :user="user"></userAvatar>
      <div class="list no-border platform-delimiter">
        <div class="item item-link" @click="redirect('accountSettings')">
        <i class="item-primary">settings</i>
          <div class="item-content">
            Account Settings
          </div>
        </div>
        <div class="item item-link" @click="redirect('usersManagement')" v-if="isAdmin">
        <i class="item-primary">supervisor_account</i>
          <div class="item-content">
            Users management
          </div>
        </div>
        <div class="item item-link" @click="logUserOut" v-go-back=" '/'">
          <i class="item-primary">undo</i>
          <div class="item-content">
            Logout
          </div>
        </div>
      </div>
    </q-drawer>
    
    <transition name='route' mode="out-in">
      <router-view class="layout-view"></router-view>
    </transition>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import userAvatar from './userAvatar.vue'
import { logout } from '../utils.js'

export default {
  components: {
    userAvatar
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['loggedIn', 'isAdmin', 'user'])
  },
  methods: {
    redirect (address) {
      this.$router.push({name: address})
      this.$refs.leftDrawer.close()
    },
    logUserOut () {
      this.$router.replace({path: '/'})
      this.$refs.leftDrawer.close()
      logout()
    }
  }
}
</script>

<style>
body {
  background-color: #f5f8fa;
}
.route-enter {
  transform: translateX(600px);
  opacity: 0;
}
.route-enter-active {
  transition: all 0.5s ease;
}
.route-leave {
  opacity: 0;
}
</style>
