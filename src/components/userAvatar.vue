<template>
  <div class="card" :style="backgroundImage">
    <div class="card-content column justify-center items-center">
    <div class="avatar-rep text-white relative-position">{{avatarChar}}</div>
      <div class="item" :class="{'three-lines': role !== '', 'two-lines': role === ''}">
        <div class="item-content column items-center generic-margin">
          <span class="label bg-white text-black username">{{user.name || 'userName'}}</span>
          <small class="label caption bg-primary text-white username">{{user.username}}</small>
          <small class="label bg-negative text-white" v-if="role !== ''">{{user.role}}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['user'],
  data () {
    return {}
  },
  computed: {
    ...mapGetters({theUser: 'user'}),
    avatarChar () {
      if (this.user.name) {
        return this.user.name.charAt(0)
      }
      else {
        return 'AQ'
      }
    },
    backgroundImage () {
      if (this.theUser.id === this.user.id) {
        return {
          'background-image': 'url(' + require('../assets/apiko-bamboo.png') + ')',
          'background-repeat': 'no-border',
          'background-position': 'center',
          'background-size': 'cover'
        }
      }
      return {
        'background-color': 'white'
      }
    },
    role () {
      return (this.user.role && (this.user.role !== '' || this.user.role !== null)) ? this.user.role : ''
    }
  }
}
</script>

<style scoped>
.avatar-rep {
  font-size: 30px;
  width: 55px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #00bcd4;
}
.username {
  margin-bottom: 5px;
}
.item.three-lines > .item-content {
    padding-top: 6px;
    padding-bottom: 8px;
}
.item.two-lines > .item-content {
    padding-top: 12px;
    padding-bottom: 16px;
}
</style>
