<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="(card, i) in cards" :key="`${card.title}_${i}`" cols="6">
        <v-card>
          <v-img
            :src="card.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <div class="ma-2">
              <span class="subtitle-1">{{ card.title }}</span>
              <span class="subtitle-2 font-weight-light">{{ card.title }}</span>
            </div>
          </v-img>

          <v-card-actions>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          title: 'Pre-fab homes',
          src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
        },
        {
          title: 'Favorite road trips',
          src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg'
        },
        {
          title: 'Best airlines',
          src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg'
        }
      ]
    }
  }
}
</script>
