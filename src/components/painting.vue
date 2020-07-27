<template>
  <div>
    <q-card class="item-card" @click="cardClick" style="cursor: pointer;">
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
          <div>£{{ painting.price | currency }}</div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'painting',
  props: ['painting'],
  filters: {
    date: function (value: string): string {
      return value.substring(0, 4)
    },
    title: function (value: string) {
      return value || 'Untitled'
    },
    currency: function (value: number) {
      return value.toFixed(2)
    }
  },
  setup (props, context) {
    function cardClick () {
      context.root.$options.router?.push(`/paintings/${props.painting.id}`)
    }

    return { ...props, cardClick }
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
