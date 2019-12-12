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
                label=""
                class="align-start ma-2"
                :color="currentBook.available ? 'secondary' : 'error'"
                text-color="white"
                small=""
              >
                {{ currentBook.available | availabilty }}
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
          @click="isTransactionDialog = !isTransactionDialog"
        >
          Borrow Now
        </v-btn>
      </div>
    </v-row>
    <v-dialog v-model="isTransactionDialog" persistent="" width="500">
      <v-card>
        <v-card-title class="headline primary white--text">
          Detail Transaction
        </v-card-title>

        <v-card-text>
          <v-row wrap>
            <v-col cols="12">
              <v-dialog
                ref="dialog"
                v-model="borrowingDateDialog"
                :return-value.sync="borrowingDate"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="borrowingDate"
                    label="Borrowing Date"
                    prepend-inner-icon="mdi-calendar"
                    clearable=""
                    dense=""
                    outlined=""
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="borrowingDate" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="error" @click="borrowingDateDialog = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog.save(borrowingDate)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-dialog>
              <v-dialog
                ref="dialog"
                v-model="returningDateDialog"
                :return-value.sync="returningDate"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="returningDate"
                    label="Returning Date"
                    prepend-inner-icon="mdi-calendar"
                    clearable=""
                    dense=""
                    outlined=""
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="returningDate" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="error" @click="returningDateDialog = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog.save(returningDate)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-dialog>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn color="error" text @click="isTransactionDialog = false">
            Cancel
          </v-btn>
          <v-btn
            type="submit"
            color="primary"
            text
            @click="onBorrowBookClicked(currentBook)"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isBorrowDialog" width="500">
      <v-card>
        <v-card-title class="headline primary white--text">
          Transaction Success
        </v-card-title>

        <v-card-text>
          Untuk menyelesaikan transaksi peminjaman silahkan hubungi
          <span class="primary--text font-weight-bold">
            {{ currentBook.users[0].username }}
            ({{ currentBook.users[0].phone }})
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
    },
    availabilty: value => {
      return value ? 'available' : 'not-available'
    }
  },
  data() {
    return {
      currentBook: null,
      isBorrowDialog: false,
      isTransactionDialog: false,
      returningDateDialog: false,
      borrowingDateDialog: false,
      returningDate: null,
      borrowingDate: new Date().toISOString().substr(0, 10)
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
          borrowedDate: this.borrowingDate,
          returningDate: this.returningDate
        }
        await this.$axios.$post(`transactions`, detailTransaction)
        this.isTransactionDialog = false
        this.isBorrowDialog = true
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
