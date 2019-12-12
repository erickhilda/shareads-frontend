<template>
  <v-container class="pa-2">
    <v-row>
      <v-col v-for="(book, i) in books" :key="`${book.title}_${i}`" cols="6">
        <app-book-card
          :is-reading="false"
          :title="book.title"
          :author="book.author"
          :publication-year="book.publicationYear"
          @action="onClickBorrow(book)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { types } from '~/store'
import AppBookCard from '~/components/AppBookCard'

const BASE_URL =
  process.env.NODE_ENV !== 'production'
    ? process.env.BASE_API_DEV
    : process.env.BASE_API_PROD

export default {
  components: { AppBookCard },
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
    },
    userData: {
      get() {
        return this.$store.state.userData
      },
      set(userData) {
        this.$store.commit(types.SET_USER_DATA, userData)
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
        console.log(data)
        data.map(book => {
          if (book.users[0].id !== this.userData.id) {
            this.books.push(book)
            return book
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    onClickBorrow(book) {
      this.$router.push({
        path: `/explore/${book.id}`
      })
    }
  }
}
</script>
