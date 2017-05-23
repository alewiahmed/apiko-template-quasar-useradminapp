<template>
  <!-- root node required -->
  <div>
    <q-autocomplete v-model="userTerms" :delay="0" @search="search" @selected="selected" :max-results="4" :min-characters="3">
      <q-search v-model="userTerms" placeholder="Search"></q-search>
    </q-autocomplete>
    <div class="layout-padding">
      <transition-group class="row sm-column wrap" name="list" tag="div">
        <div class="card-class lg-width-1of4 bg-width-1of3 md-width-1of2" v-for="(user, index) in users" :key="user.id" @mouseover="showControl = index" @mouseleave="showControl = null">
          <div class="button-container" v-if="showControl == index">
            <button class="clear text-green small" @click="gotoUserPage(user.id)">
              <i>edit</i>
            </button>
            <button class="clear text-red small" @click="removeUser(user.id)">
              <i>close</i>
            </button>
          </div>
          <userAvatar :user="user"></userAvatar>
        </div>
      </transition-group>
    </div>
  </div>
</div>
</template>

<script>
import { Dialog, Toast } from 'quasar'
import { mapGetters, mapActions } from 'vuex'
import userAvatar from './userAvatar.vue'
export default {
  components: { userAvatar },
  data () {
    return {
      showControl: null,
      userTerms: ''
    }
  },
  computed: {
    ...mapGetters(['users'])
  },
  methods: {
    ...mapActions(['deleteUser']),
    search (term, done) {
      let users = this.users.filter((user) => {
        return user.username.toLowerCase().includes(term.toLowerCase())
      })
      let searchResult = users.map((user) => {
        return {
          value: user.username,
          label: user.username,
          secondLabel: 'Email: ' + user.username,
          icon: 'account_box',
          stamp: user.role,
          id: user.id
        }
      })
      done(searchResult)
    },
    selected (term) {
      this.userTerms = ''
      this.gotoUserPage(term.id)
    },
    removeUser (userId) {
      Dialog.create({
        title: 'Warning',
        message: 'Are you sure you want to delete this user?',
        buttons: [
          {
            label: 'Cancel',
            classes: 'positive',
            style: 'margin-right: 7px'
          },
          {
            label: 'Yes',
            classes: 'negative',
            handler: () => {
              let p = this.deleteUser(userId)

              p.then(response => {
                Toast.create.positive({
                  html: 'The user was successfully deleted.',
                  timeout: 2000
                })
              })
              p.catch(() => {
                Toast.create.negative({
                  html: 'The user could not be deleted due to some error.',
                  timeout: 3000
                })
              })
            }
          }
        ]
      })
    },
    gotoUserPage (id) {
      this.$router.push({ name: 'singleUserManagement', params: {id: id} })
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
.card-class {
  transition: all 1s;
  padding-right: 10px;
  padding-left: 10px;
  position: relative;
}
.username {
  margin-bottom: 5px;
}
.button-container {
  position: absolute;
  top: 0;
  right: 10px;
  z-index: 9;
  display: flex;
  justify-content: flex-end;
}
.button-container button {
  padding: 0 0.4rem;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
.list-leave-active {
  display: none;
}
</style>
