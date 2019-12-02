<template>
  <div>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(color, i) in colors" :key="`color_${i}`">
        <v-sheet color="primary" height="80%" tile class="pt-4">
          <v-row class="fill-height" align="center" justify="center">
            <v-card class="mx-auto" max-width="344" height="" outlined>
              <v-img
                class="white--text align-end"
                height="250px"
                width="178"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              />
            </v-card>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <div></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: ['blue', 'secondary', 'yellow darken-2', 'red', 'orange']
    }
  }
}
</script>
