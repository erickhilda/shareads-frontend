<template>
  <div>
    <v-btn @click="onLogout" color="error">Logout</v-btn>
  </div>
</template>

<script>
import { types } from '~/store'

const Cookie = process.client ? require('js-cookie') : undefined

export default {
  data() {
    return {}
  },
  methods: {
    onLogout() {
      Cookie.remove('token')
      this.$router.replace({ name: 'index___id' })
      this.$axios.setHeader('Authorization', ``)
      this.$store.commit(types.SET_TOKEN, null)
    }
  }
}
</script>
