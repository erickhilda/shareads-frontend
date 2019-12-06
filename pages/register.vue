<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-row justify-center class="pt-2">
        <v-col cols="12">
          <v-img src="/icon.png" alt="Sassy Life" contain height="128" />
        </v-col>
      </v-row>
      <v-row justify-center>
        <v-col cols="12">
          <div class="white--text title text-center">Sign Up</div>
        </v-col>
      </v-row>
      <v-form
        ref="regForm"
        lazy-validation=""
        @submit.prevent="onSignUpButtonClick"
      >
        <v-container grid-list-md fluid class="">
          <v-row wrap>
            <v-col cols="12">
              <v-text-field
                v-model="username"
                :loading="isLoading"
                label="Username"
                required
                :rules="requiredValidate"
                clearable
                flat
                outlined=""
                dense=""
                solo
                color="primary"
              />
              <v-text-field
                v-model="email"
                :loading="isLoading"
                label="Email"
                required
                clearable
                flat
                outlined=""
                dense=""
                :rules="emailValidate"
                solo
                color="primary"
              />
              <v-text-field
                v-model="password"
                :type="isPasswordDisplayed ? 'text' : 'password'"
                :append-icon="appendedIcon"
                :loading="isLoading"
                solo
                flat
                dense=""
                outlined=""
                color="primary"
                clearable=""
                required=""
                :rules="requiredValidate"
                label="Password"
                name="password"
                @click:append="onAppendedIconClicked"
              />
              <v-btn
                :loading="isLoading"
                class="white--text"
                color="secondary"
                block="block"
                rounded
                depressed="depressed"
                type="submit"
              >
                Sign Up
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-row justify-center class="px-4">
        <v-col cols="12">
          Sudah memiliki akun
          <v-btn color="primary" text small nuxt="" to="/">
            masuk!
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import { types } from '~/store'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  head: {
    title: 'Sign Up Pages'
  },
  layout: 'auth',
  data() {
    return {
      email: '',
      username: '',
      password: '',
      isPasswordDisplayed: false,
      isActionButtonDisabled: true,
      emailValidate: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      requiredValidate: [v => !!v || 'This filed is required']
    }
  },
  computed: {
    ...mapState(['isLoading']),
    appendedIcon() {
      return this.isPasswordDisplayed ? 'mdi-eye-off' : 'mdi-eye'
    }
  },
  methods: {
    onAppendedIconClicked() {
      this.isPasswordDisplayed = !this.isPasswordDisplayed
    },
    async onSignUpButtonClick() {
      try {
        if (this.$refs.regForm.validate()) {
          this.$store.commit(types.SET_LOADING, false)
          const credential = {
            username: this.username,
            email: this.email,
            password: this.password
          }
          const userData = await this.$axios.$post(
            `/auth/local/register`,
            credential
          )
          if (userData) {
            Cookie.set('token', userData.jwt, {
              expires: 1 / 2
            })
            this.$axios.setHeader('Authorization', `Bearer ${userData.jwt}`)
            this.$store.commit(types.SET_TOKEN, userData.jwt)
            this.$store.commit(types.SET_USER_DATA, userData.user)
            this.$router.replace({ name: 'home' })
          }
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.$store.commit(types.SET_LOADING, false)
      }
    }
  }
}
</script>
