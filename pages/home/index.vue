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
          :is-reading="false"
          :have-action="false"
          :title="book.title"
          :author="book.author"
          :publication-year="book.publicationYear"
        />
      </v-col>
      <v-col cols="6">
        <v-card
          color="grey light-1"
          height="200"
          @click="isAddBookDialog = !isAddBookDialog"
        >
          <v-row class="fill-height" align="center" justify="center">
            <v-icon color="white" size="48">
              mdi-plus-circle-outline
            </v-icon>
            <div class="white--text subtitle">
              Add New Book
            </div>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      v-model="isAddBookDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Add New Book</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items class="pa-2">
            <v-btn color="error" outlined="" @click="isAddBookDialog = false">
              Cancel
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container grid-list-md fluid class="">
            <v-row wrap>
              <v-col cols="12">
                <v-text-field
                  v-model="inputTitle"
                  label="Book Title"
                  required
                  clearable
                  flat
                  outlined=""
                  dense=""
                  color="primary"
                />
                <v-text-field
                  v-model="inputAuthor"
                  label="Author"
                  required
                  clearable
                  flat
                  outlined=""
                  dense=""
                  color="primary"
                />
                <v-dialog
                  ref="dialog"
                  v-model="isPublicationYearDialog"
                  :return-value.sync="inputPublicationYear"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="inputPublicationYear"
                      label="Publication Year"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      dense=""
                      outlined=""
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="inputPublicationYear" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="error"
                      @click="isPublicationYearDialog = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog.save(inputPublicationYear)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-dialog>
                <v-combobox
                  v-model="inputCategories"
                  :items="categoryList"
                  :search-input.sync="search"
                  hide-selected
                  hint="Maximum of 5 tags"
                  label="Add Categories"
                  multiple
                  outlined=""
                  item-text="name"
                  item-value="id"
                  dense=""
                  persistent-hint
                  small-chips
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          No results matching "<strong>{{ search }}</strong
                          >". Press <kbd>enter</kbd> to create a new one
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-combobox>
                <v-btn
                  class="white--text"
                  color="secondary"
                  block="block"
                  rounded
                  depressed="depressed"
                  @click="addNewBookClicked"
                >
                  Submit
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
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
      readingList: [],
      isAddBookDialog: false,
      inputTitle: null,
      inputAuthor: null,
      inputPublicationYear: null,
      isPublicationYearDialog: false,
      inputCategories: [],
      categoryList: [],
      search: null
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
    this.getCategoryList()
  },
  methods: {
    onAddBookClick() {},
    async getBooksData() {
      try {
        this.$axios.setHeader('Authorization', `Bearer ${this.token}`)
        const data = await this.$axios.$get(`books`)
        this.myBookList = []
        this.readingList = []
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
    },
    async getCategoryList() {
      try {
        const data = await this.$axios.$get(`categories`)
        this.categoryList = data
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    async addNewBookClicked() {
      try {
        const bookData = {
          title: this.inputTitle,
          author: this.inputAuthor,
          publicationYear: this.inputPublicationYear,
          users: [this.userData.id],
          categories: this.inputCategories
        }
        console.log(bookData)
        await this.$axios.$post(`books`, bookData)
        this.isAddBookDialog = false
        this.getBooksData()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
