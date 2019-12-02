<template>
  <v-app>
    <v-content>
      <app-toolbar />
      <v-layout justify-center align-start="">
        <v-flex>
          <nuxt />
        </v-flex>
      </v-layout>
    </v-content>
    <app-navigation-bar />
  </v-app>
</template>

<script>
import AppToolbar from '~/components/AppToolbar'
import AppNavigationBar from '~/components/AppNavigationBar'

export default {
  middleware: 'non-auth',
  components: { AppToolbar, AppNavigationBar },
  data() {
    return {}
  }
}
</script>
