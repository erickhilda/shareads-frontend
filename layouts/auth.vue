<template>
  <v-app :dark="true">
    <v-content>
      <v-layout justify-center align-center>
        <v-flex>
          <nuxt />
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
export default {
  middleware: 'auth'
}
</script>
