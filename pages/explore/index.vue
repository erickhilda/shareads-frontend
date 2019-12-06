<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="(book, i) in books" :key="`${book.title}_${i}`" cols="6">
        <v-card>
          <!-- <div v-if="book.cover.url === null">
            <v-img
              :src="`${resourceUrl}${book.cover.url}`"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <div class="ma-2">
                <span class="subtitle-1">{{ book.title }}</span>
                <span class="subtitle-2 font-weight-light">{{
                  book.author
                }}</span>
              </div>
            </v-img>
          </div> -->
          <!-- <div v-else=""> -->
          <v-img
            :src="`https://picsum.photos/200`"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.4), rgba(0,0,0,.6)"
            height="200px"
          >
            <div class="ma-2">
              <div class="subtitle-1">
                {{ $options.filters.summery(book.title, 16) }}
              </div>
              <div class="subtitle-2 font-weight-light">{{ book.author }}</div>
            </div>
          </v-img>
          <!-- </div> -->

          <v-card-actions>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { types } from '~/store'
const BASE_URL =
  process.env.NODE_ENV !== 'production'
    ? process.env.BASE_API_DEV
    : process.env.BASE_API_PROD

export default {
  filters: {
    summery: (val, num) => {
      return val.substring(0, num) + '..'
    }
  },
  data() {
    return {
      books: [],
      resourceUrl: BASE_URL
    }
  },
  computed: {
    token: {
      get() {
        return this.$store.state.token
      },
      set(token) {
        this.$store.commit(types.SET_TOKEN, token)
      }
    }
  },
  created() {
    this.getBooksData()
  },
  methods: {
    async getBooksData() {
      try {
        this.$axios.setHeader('Authorization', `Bearer ${this.token}`)
        const data = await this.$axios.$get(`books`)
        this.books = data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
