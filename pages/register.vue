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
      <form action="">
        <v-container grid-list-md fluid class="">
          <v-row wrap>
            <v-col cols="12">
              <v-text-field
                v-model="username"
                v-validate="'required'"
                :loading="isLoading"
                :error-messages="errors.collect('username')"
                label="Username"
                required
                data-vv-name="username"
                data-vv-as="username"
                clearable
                flat
                solo
                color="primary"
              />
              <v-text-field
                v-model="email"
                v-validate="'required|email'"
                :loading="isLoading"
                :error-messages="errors.collect('email')"
                label="Email"
                required
                data-vv-name="email"
                data-vv-as="email"
                clearable
                flat
                solo
                color="primary"
              />
              <v-text-field
                v-model="password"
                v-validate="'required'"
                :type="isPasswordDisplayed ? 'text' : 'password'"
                :append-icon="appendedIcon"
                :error-messages="errors.collect('password')"
                :loading="isLoading"
                @click:append="onAppendedIconClicked"
                solo
                flat
                color="primary"
                clearable="clearable"
                required="required"
                label="Password"
                name="password"
                data-vv-name="password"
                data-vv-as="Password"
              />
              <v-btn
                :disabled="isActionButtonDisabled"
                :loading="isLoading"
                @click="onSignUpButtonClick"
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
      </form>
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
      isActionButtonDisabled: true
    }
  },
  computed: {
    ...mapState(['isLoading']),
    appendedIcon() {
      return this.isPasswordDisplayed ? 'mdi-eye-off' : 'mdi-eye'
    }
  },
  watch: {
    errors: {
      handler({ items }) {
        if (items.length === 0) {
          this.isActionButtonDisabled = false
        } else {
          this.isActionButtonDisabled = true
        }
      },
      deep: true
    }
  },
  methods: {
    onAppendedIconClicked() {
      this.isPasswordDisplayed = !this.isPasswordDisplayed
    },
    async onSignUpButtonClick() {
      try {
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
          // this.$axios.setHeader('Authorization', `Bearer ${userData}`)

          this.$store.commit(types.SET_TOKEN, userData.jwt)
          this.$store.commit(types.SET_USER_DATA, userData.user)

          this.$router.replace({ name: 'home___id' })
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
