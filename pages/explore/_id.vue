<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="5">
        <v-card>
          <v-img
            :src="`https://picsum.photos/200`"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.4), rgba(0,0,0,.6)"
            height="200px"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              v-if="currentBook.title !== null"
              class="title text-center"
            >
              {{ currentBook.title }}
            </v-list-item-title>
            <v-list-item-title v-else>Sorry, Something snap</v-list-item-title>
            <v-list-item-subtitle class="text-center">
              {{ currentBook.author }}
              ({{ currentBook.publicationYear | dateFilter }})
              <v-chip
                v-if="currentBook.available"
                label=""
                class="align-start ma-2"
                color="secondary"
                text-color="white"
                small=""
              >
                available
              </v-chip>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <div v-for="(category, i) in currentBook.categories" :key="`__${i}`">
        <v-chip :color="colorHash(category.name)" class="white--text">
          {{ category.name }}
        </v-chip>
      </div>
    </v-row>
    <v-row align="center" justify="center">
      <div class="pa-4">
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here'.
        </p>
      </div>
    </v-row>
    <v-row align="center" justify="center">
      <div class="pa-4">
        <v-btn
          block=""
          color="primary"
          @click="onBorrowBookClicked(currentBook)"
        >
          Borrow Now
        </v-btn>
      </div>
    </v-row>
    <v-dialog v-model="isBorrowDialog" width="500">
      <v-card>
        <v-card-title class="headline primary white--text">
          Detail Transaction
        </v-card-title>

        <v-card-text>
          Untuk menyelesaikan transaksi peminjaman silahkan hubungi
          <span class="primary--text font-weight-bold">
            {{ currentBook.users[0].phone }}
          </span>
          .Pastikan untuk membaca syarat dan ketentuan yang berlaku dalam
          peminjaman buku.
        </v-card-text>
        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn color="error" text @click="isBorrowDialog = false">
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import materialColorHash from 'material-color-hash'
import { types } from '~/store'

export default {
  filters: {
    dateFilter: value => {
      const date = new Date(value)
      return date.toLocaleString(['en-US'], {
        year: 'numeric'
      })
    }
  },
  data() {
    return {
      currentBook: null,
      isBorrowDialog: false
    }
  },
  computed: {
    userData: {
      get() {
        return this.$store.state.userData
      },
      set(userData) {
        this.$store.commit(types.SET_USER_DATA, userData)
      }
    }
  },
  watch: {
    $route: {
      handler(route) {
        this.getCurrentBook(route.params.id)
      },
      immediate: true
    }
  },
  created() {
    this.getCurrentBook(this.$route.params.id)
  },
  methods: {
    colorHash(color) {
      const style = materialColorHash(color)
      return style.backgroundColor
    },
    async getCurrentBook(id) {
      try {
        const res = await this.$axios.$get(`books/${id}`)
        this.currentBook = res
      } catch (error) {
        console.log(error)
      }
    },
    async onBorrowBookClicked(book) {
      try {
        const detailTransaction = {
          books: [book.id],
          users: [book.users[0].id, this.userData.id],
          borrowedDate: new Date().toISOString(),
          returningDate: ''
        }
        await this.$axios.$post(`transactions`, detailTransaction)
        console.log(detailTransaction)
        this.isBorrowDialog = true
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
