<template>
  <v-card>
    <v-img
      :src="`https://picsum.photos/200`"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.4), rgba(0,0,0,.6)"
      height="200px"
    >
      <div class="ma-2">
        <div class="subtitle-1">
          {{ $options.filters.summery(title, 16) }}
        </div>
        <div class="subtitle-2 font-weight-light">
          {{ author }}({{ publicationYear | dateFilter }})
        </div>
      </div>
      <div v-if="haveAction" class="pa-2">
        <v-btn
          x-small=""
          outlined=""
          color="white"
          block=""
          rounded=""
          @click="$emit('action', $event)"
        >
          See Detail
        </v-btn>
      </div>
    </v-img>
  </v-card>
</template>

<script>
export default {
  filters: {
    dateFilter: value => {
      const date = new Date(value)
      return date.toLocaleString(['en-US'], {
        year: 'numeric'
      })
    },
    summery: (val, num) => {
      return val.substring(0, num) + '..'
    }
  },
  props: {
    title: {
      default: '',
      type: String
    },
    author: {
      default: '',
      type: String
    },
    publicationYear: {
      default: '',
      type: String
    },
    haveAction: {
      type: Boolean,
      default: true
    }
  }
}
</script>
