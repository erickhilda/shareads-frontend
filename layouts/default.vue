<template>
  <v-app id="sharead">
    <app-navigation-bar />
    <v-content>
      <v-row justify-center align-center>
        <v-col>
          <nuxt-child />
        </v-col>
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
import AppNavigationBar from '~/components/AppNavigationBar'

export default {
  components: { AppNavigationBar },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>
