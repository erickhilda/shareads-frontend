<template>
  <v-footer fixed="" app="" color="primary lighten-1" padless>
    <v-tabs absolute centered="" color="primary">
      <v-tab
        v-for="(nav, i) in navigationMenu"
        :key="i"
        :to="{ name: nav.to }"
        class="primary--text"
      >
        <v-icon>{{ nav.icon }}</v-icon>
      </v-tab>
    </v-tabs>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      navigationMenu: [
        { text: 'Library', to: 'home', icon: 'mdi-home-outline' },
        { text: 'Explore', to: 'explore', icon: 'mdi-google-fit' },
        { text: 'Notification', to: 'notification', icon: 'mdi-bell-outline' },
        { text: 'Profile', to: 'profile', icon: 'mdi-account-circle-outline' }
      ]
    }
  }
}
</script>
