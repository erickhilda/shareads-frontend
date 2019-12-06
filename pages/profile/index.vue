<template>
  <div>
    <v-btn color="error" @click="onLogout">Logout</v-btn>
    <div>{{ userData }}</div>
  </div>
</template>

<script>
import { types } from '~/store'

const Cookie = process.client ? require('js-cookie') : undefined
export default {
  data() {
    return {}
  },
  computed: {
    userData: {
      get() {
        return this.$store.state.userData
      },
      set(userData) {
        this.$store.commit(types.SET_USER_DATA, userData)
      }
    }
  },
  mounted() {
    console.log('userdata', this.userData)
  },
  created() {},
  methods: {
    onLogout() {
      Cookie.remove('token')
      this.$router.replace({ name: 'index' })
      this.$axios.setHeader('Authorization', ``)
      this.$store.commit(types.SET_TOKEN, null)
    }
  }
}
</script>
