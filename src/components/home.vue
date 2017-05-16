<template>
<!-- <div> -->
    <div class="layout-padding flex column items-center">
    <div class="logos-container">
    <img src="../assets/Apiko + Quasar.svg">
      <div class="card-content"></div>
    </div>
    <div class="card bg-white logos-container">
      <div class="card-content flex column items-center">
      <div class="generic-margin">
        "Welcome to the Apiko - Quasar User application example, which demonstrates a Quasar application working together with an Apiko API server."
      </div>
      <div class="group generic-margin">
        <button class="green" v-if="!loggedIn" @click="redirect('login')">
          Login
        </button>
        <button class="primary" v-if="!loggedIn" @click="redirect('registration')">
          Register
        </button>
      </div>
      </div>
    </div>
    </div>
    <!-- </div> -->
</template>

<script>
var moveForce = 30
var rotateForce = 40

import { mapGetters } from 'vuex'
import { Utils, Platform } from 'quasar'

export default {
  data () {
    return {
      orienting: window.DeviceOrientationEvent && !Platform.is.desktop,
      moveX: 0,
      moveY: 0,
      rotateY: 0,
      rotateX: 0
    }
  },
  computed: {
    ...mapGetters(['loggedIn']),
    position () {
      let transform = `rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg)`
      return {
        top: this.moveY + 'px',
        left: this.moveX + 'px',
        '-webkit-transform': transform,
        '-ms-transform': transform,
        transform
      }
    }
  },
  methods: {
    redirect (address) {
      this.$router.push({name: address})
    },
    move (evt) {
      const {width, height} = Utils.dom.viewport()
      const {top, left} = Utils.event.position(evt)
      const halfH = height / 2
      const halfW = width / 2

      this.moveX = (left - halfW) / halfW * -moveForce
      this.moveY = (top - halfH) / halfH * -moveForce
      this.rotateY = (left / width * rotateForce * 2) - rotateForce
      this.rotateX = -((top / height * rotateForce * 2) - rotateForce)
    },
    orient (evt) {
      this.rotateX = evt.beta * 0.7
      this.rotateY = evt.gamma * -0.7
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.orienting) {
        window.addEventListener('deviceorientation', this.orient, false)
      }
      else {
        document.addEventListener('mousemove', this.move)
      }
    })
  },
  beforeDestroy () {
    if (this.orienting) {
      window.removeEventListener('deviceorientation', this.orient, false)
    }
    else {
      document.removeEventListener('mousemove', this.move)
    }
  }
}
</script>

<style lang="styl">
.logo-container
  width 192px
  height 268px
  perspective 800px
  position absolute
  top 50%
  left 50%
  transform translateX(-50%) translateY(-50%)
.logo
  position absolute
  transform-style preserve-3d
</style>
<style scoped>
.logos-container {
  max-width: 600px;
  width: 85%;
}
</style>
