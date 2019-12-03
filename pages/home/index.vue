<template>
  <div>
    <v-carousel cycle="" height="400" hide-delimiters="">
      <v-carousel-item
        v-for="(book, i) in books"
        :key="i"
        :src="`${resourceUrl}${book.cover.url}`"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-container fluid fill-height>
          <v-row align="center" justify="center">
            <v-col cols="6" md="6">
              <v-card>
                <v-img
                  :src="`${resourceUrl}${book.cover.url}`"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                  width="154"
                />
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <div class="title text-center white--text">
                {{ book.title }}
              </div>
              <div class="subtitle-1 text-center grey--text">
                {{ book.Author }} ({{ book.publicationYear | dateFilter }})
              </div>
              <v-row align="center" justify="center">
                <div
                  v-for="(category, j) in book.categories"
                  :key="`category_${j}`"
                >
                  <v-chip
                    :color="colorHash(category.name)"
                    small=""
                    class="ma-2"
                  >
                    {{ category.name }}
                  </v-chip>
                </div>
              </v-row>
              <v-row align="center" justify="center">
                <div>
                  <v-btn color="white" outlined="" small="" rounded="">
                    Borrow Now
                  </v-btn>
                </div>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-carousel-item>
    </v-carousel>
    <div>
      Read Now
    </div>
  </div>
</template>

<script>
import materialColorHash from 'material-color-hash'
import { types } from '~/store'

const BASE_URL =
  process.env.NODE_ENV !== 'production'
    ? process.env.BASE_API_DEV
    : process.env.BASE_API_PROD

export default {
  filters: {
    dateFilter: (value) => {
      const date = new Date(value)
      return date.toLocaleString(['en-US'], {
        year: 'numeric'
      })
    }
  },
  data() {
    return {
      colors: ['blue', 'secondary', 'yellow darken-2', 'red', 'orange'],
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
  mounted() {
    this.getBookData()
  },
  methods: {
    async getBookData() {
      try {
        this.$axios.setHeader('Authorization', `Bearer ${this.token}`)
        const data = await this.$axios.$get(`/books`)
        this.books = data
      } catch (error) {
        console.log(error)
      }
    },
    colorHash(color) {
      const style = materialColorHash(color)
      return style.backgroundColor
    }
  }
}
</script>
