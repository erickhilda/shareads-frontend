<template>
  <v-snackbar
    :value="notif.isDisplayed"
    :color="notif.type"
    @input="onClose"
    right=""
    top=""
  >
    <span class="white--text">
      {{ notif.message }}
    </span>
    <v-btn @click="onClose" text="">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'AppNotification',
  computed: {
    notif: {
      get() {
        return this.$store.state.notif
      },
      set(notif) {
        this.$store.commit('setNotification', notif)
      }
    }
  },
  methods: {
    onClose() {
      this.notif = {
        isDisplayed: false,
        message: '',
        type: 'info'
      }
    }
  }
}
</script>
