<template>
  <!-- root node required -->
  <div>
    <!-- your content -->
    <div class="layout-padding">
    <!-- <div class="card bg-white" v-for="user in users">
    <div class="card-content">
      {{user.username}}
    </div> -->
    <div class="row sm-column wrap">
    <div class="card-class lg-width-1of4 bg-width-1of3 md-width-1of2" v-for="user in users">
    <userAvatar :user="user"></userAvatar>
    </div>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import userAvatar from './userAvatar.vue'
export default {
  components: { userAvatar },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['users'])
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
.card-class {
  padding-right: 10px;
  padding-left: 10px;
}
.username {
  margin-bottom: 5px;
}
/*.item.three-lines > .item-content {
    padding-top: 6px;
    padding-bottom: 8px;
}*/
/*.item.two-lines > .item-content {
    padding-top: 12px;
    padding-bottom: 16px;
}*/
</style>
