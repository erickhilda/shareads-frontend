<template>
  <v-app id="sharead">
    <v-content>
      <app-navigation-bar />
      <v-layout justify-center align-center>
        <v-flex>
          <nuxt-child />
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import AppNavigationBar from '~/components/AppNavigationBar'
export default {
  components: { AppNavigationBar },
  data() {
    return {}
  }
}
</script>
