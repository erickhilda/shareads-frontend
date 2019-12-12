<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="5">
        <v-avatar :color="colorHash(userData.username)" size="128">
          <span class="white--text display-2">{{ userData.username[0] }}</span>
        </v-avatar>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title text-center">
            {{ userData.username }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-center">
            {{ userData.email }} | {{ userData.phone }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-row>
    <v-row justify="center" align="center"></v-row>

    <v-divider></v-divider>

    <v-list-item
      v-for="(list, i) in profileLists"
      :key="i"
      :to="{ name: list.to }"
      class="primary--test"
    >
      <v-list-item-content>
        <v-list-item-title>{{ list.text }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-content>
      <!--- pick-up screen height so we can center vertically -->
      <v-container fill-height>
        <!--- vertical and horizontal alignment -->
        <v-layout align-center justify-center>
          <v-flex xs6>
            <!--- v-flex is centered now, but we need to center button inside v-flex -->
            <div class="text-center">
              <v-btn color="error" @click="onLogout">Logout</v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <!-- <v-btn color="error" @click="onLogout">Logout</v-btn> -->
    <!-- <div>{{ userData }}</div> -->
  </v-container>
</template>

<script>
import materialColorHash from 'material-color-hash'
import { types } from '~/store'

const Cookie = process.client ? require('js-cookie') : undefined
export default {
  data() {
    return {
      profileLists: [
        { text: 'Edit Profile', to: 'profile-editProfile', icon: '' },
        { text: 'Privacy Policy', to: 'profile-privacyPolicy', icon: '' }
      ]
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
  mounted() {},
  created() {},
  methods: {
    colorHash(color) {
      const style = materialColorHash(color)
      return style.backgroundColor
    },
    onLogout() {
      Cookie.remove('token')
      this.$router.replace({ name: 'index' })
      this.$axios.setHeader('Authorization', ``)
      this.$store.commit(types.SET_TOKEN, null)
    }
  }
}
</script>
