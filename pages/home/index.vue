<template>
  <v-container>
    <v-row align="start" justify="start" class="ml-5">
      <h1 class="headline">Read Now</h1>
    </v-row>
    <v-divider />
    <v-row>
      <v-col
        v-for="(book, i) in readingList"
        :key="`${book.title}_${i}`"
        cols="6"
      >
        <app-book-card
          :have-action="false"
          :title="book.title"
          :author="book.author"
          :publication-year="book.publicationYear"
        />
      </v-col>
    </v-row>
    <v-row align="start" justify="start" class="ml-5">
      <h1 class="headline">My Book</h1>
    </v-row>
    <v-divider />
    <v-row>
      <v-col
        v-for="(book, i) in myBookList"
        :key="`${book.title}_${i}`"
        cols="6"
      >
        <app-book-card
          :have-action="false"
          :title="book.title"
          :author="book.author"
          :publication-year="book.publicationYear"
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
      resourceUrl: BASE_URL,
      myBookList: [],
      readingList: []
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
  created() {},
  mounted() {
    this.getBooksData()
  },
  methods: {
    async getBooksData() {
      try {
        this.$axios.setHeader('Authorization', `Bearer ${this.token}`)
        const data = await this.$axios.$get(`books`)
        data.map(book => {
          if (book.users[0].id === this.userData.id && book.readNow === true) {
            this.readingList.push(book)
            return book
          } else if (book.users[0].id === this.userData.id) {
            this.myBookList.push(book)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
