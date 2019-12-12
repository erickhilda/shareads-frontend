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
          <div class="white--text title text-center">Sign In</div>
        </v-col>
      </v-row>
      <v-form
        ref="form"
        action=""
        lazy-validation
        @submit.prevent="onSignInButtonClick"
      >
        <v-container grid-list-md fluid class="">
          <v-row wrap>
            <v-col cols="12">
              <v-text-field
                v-model="email"
                :loading="isLoading"
                label="Email"
                required
                clearable
                outlined=""
                dense=""
                flat=""
                :rules="emailValidate"
                color="primary"
              />
              <v-text-field
                v-model="password"
                :type="isPasswordDisplayed ? 'text' : 'password'"
                :append-icon="appendedIcon"
                :loading="isLoading"
                dense=""
                outlined=""
                flat
                color="primary"
                clearable="clearable"
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
                Sign In
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-row justify-center class="px-4">
        <v-col cols="12">
          Belum memiliki akun
          <v-btn color="primary" text small nuxt="" to="/register">
            daftar
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
    title: 'Login Pages'
  },
  layout: 'auth',
  data() {
    return {
      email: '',
      password: '',
      isPasswordDisplayed: false,
      emailValidate: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      requiredValidate: [v => !!v || 'Password is required']
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
    async onSignInButtonClick() {
      try {
        if (this.$refs.form.validate()) {
          this.$store.commit(types.SET_LOADING, false)
          const credential = {
            identifier: this.email,
            password: this.password
          }
          const userData = await this.$axios.$post(`/auth/local`, credential)
          if (userData) {
            Cookie.set('userData', userData, { expires: 1 / 2 })
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
