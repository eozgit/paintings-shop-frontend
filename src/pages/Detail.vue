<template>
  <div>
    <div class="q-pa-xs row items-start q-gutter-xs" style="width: 90vw;">
      <div class="col q-px-xl">
        <q-img
          :src="url"
          contain
          spinner-color="white"
          class="shadow-24"
          :height="imageDims.height"
          :width="imageDims.width"
        />
      </div>
      <div class="col q-px-xl">
        <h4>{{ title | title }} <small>({{ date | date }})</small></h4>
        <p>{{ media }}</p>
        <p>{{ height }}" x {{ width }}"</p>
        <p>£{{ price | currency }}</p>
        <div class="q-mt-xl">
          <q-btn color="primary" icon="add_shopping_cart" :label="itemInBasket ? 'Item in basket' : 'Add to basket'" @click="addToBasket" :disable="itemInBasket" />
          <q-btn flat color="primary" v-go-back="'/paintings'" label="Back" class="q-ml-sm" />
        </div>
      </div>
    </div>
    <q-page-sticky position="top-right" :offset="[-30, 110]" v-if="basket.length">
      <q-btn fab icon="shopping_cart" color="primary" :label="basket.length" padding="md 3rem md md" to="/checkout" />
    </q-page-sticky>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, computed, toRefs } from '@vue/composition-api'
export default defineComponent({
  name: 'Detail',
  filters: {
    date: function (value: string) {
      return value?.substring(0, 4)
    },
    title: function (value: string) {
      return value || 'Untitled'
    },
    currency: function (value: number) {
      return value.toFixed(2)
    }
  },
  setup (props, context) {
    const max = 500

    const state = reactive({
      painting: computed(() => context.root.$store.state.paintings.detail),
      title: computed(() => state.painting?.title),
      date: computed(() => state.painting?.date),
      media: computed(() => state.painting?.media),
      height: computed(() => state.painting?.height),
      width: computed(() => state.painting?.width),
      price: computed(() => state.painting?.price),
      imageUrl: computed(() => state.painting?.imageUrl),
      url: computed(() => {
        if (!state.painting) return ''
        const vertical = state.height > state.width
        return `${state.imageUrl}?${vertical ? 'h' : 'w'}=${max}`
      }),
      imageDims: computed(() => {
        if (!state.painting) return { height: 0, width: 0 }
        const { imageHeight, imageWidth } = state.painting
        const vertical = imageHeight > imageWidth
        const height = vertical ? max : (imageHeight / imageWidth) * max
        const width = vertical ? (imageWidth / imageHeight) * max : max
        return { height: height + 'px', width: width + 'px' }
      }),
      basket: computed(() => context.root.$store.state.paintings.basket),
      itemInBasket: (computed(() => state.basket.includes(+context.root.$route.params.id)))
    })

    function addToBasket (e) {
      context.root.$store.dispatch('paintings/addToBasket', { id: +context.root.$route.params.id })
    }

    onMounted(() => {
      context.root.$store.commit('setPaintingDetails', {})
      context.root.$store.dispatch('paintings/loadPainting', { id: context.root.$route.params.id })
    })

    return { ...toRefs(state), addToBasket }
  }
})
</script>
