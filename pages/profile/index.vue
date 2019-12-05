<template>
  <div>
    <v-btn color="error" @click="onLogout">Logout</v-btn>
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
      this.$router.replace({ name: 'index' })
      this.$http.setHeader('Authorization', ``)
      this.$http.setHeader('', 'Bearer')
      this.$store.commit(types.SET_TOKEN, null)
    }
  }
}
</script>
