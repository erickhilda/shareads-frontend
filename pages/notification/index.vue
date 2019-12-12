<template>
  <div>
    <v-list>
      <v-list-item
        v-for="(item, i) in transactions"
        :key="`${i}_${item.title}`"
      >
        <v-list-item-avatar>
          <v-icon class="blue white--text">
            mdi-calendar
          </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            Transactions {{ item.borrowedDate | dateFilter }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ item.subtitle }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  filters: {
    dateFilter: value => {
      const date = new Date(value)
      return date.toLocaleString(['en-US'], {
        year: 'numeric',
        day: '2-digit',
        month: 'short'
      })
    }
  },
  data() {
    return {
      transactions: []
    }
  },
  computed: {},
  mounted() {
    this.getDataTransaction()
  },
  methods: {
    async getDataTransaction() {
      try {
        const data = await this.$axios.$get(`transactions`)
        console.log(data)
        this.transactions = data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
