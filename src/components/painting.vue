<template>
  <div>
    <q-card class="item-card">
      <q-img
        :src="painting.imageUrl + '?w=500&h=500&crop=1'"
        basic
      >
        <div class="absolute-bottom text-h6">
          {{ painting.title | title }} <small>({{ painting.date | date }})</small>
        </div>
      </q-img>

      <q-card-section>
        <div class="align-right">
          <div>{{ painting.height }}" x {{painting.width}}"</div>
          <div>{{ painting.media }}</div>
          <div>{{ painting.price | currency }}</div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'painting',
  props: ['painting'],
  filters: {
    date: function (value) {
      return value.substring(0, 4)
    },
    title: function (value) {
      return value || 'Untitled'
    },
    currency: function (value) {
      return '£' + value.toFixed(2)
    }
  },
  setup (props) {
    return props
  }
})
</script>

<style lang="scss" scoped>
.align-right {
  text-align: right;
}
.item-card {
  width: 20em;
  margin: 0 2em;
}
</style>