<template>
  <div>
    <v-list>
      <v-list-item v-for="(item, i) in books" :key="`${i}_${item.title}`">
        <v-list-item-avatar>
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold" v-text="item.title" />
          <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: []
    }
  },
  computed: {}
}
</script>
