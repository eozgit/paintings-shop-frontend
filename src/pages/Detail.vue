<template>
  <div class="q-pa-xs row items-start q-gutter-xs" style="width: 90vw">
    <div class="col q-px-xl bd">
      <q-img
        :src="url"
        contain
        spinner-color="white"
        :style="imgStyle"
        class="shadow-24"
      />
    </div>
    <div class="col q-px-xl bd">
      <h4>{{ title | title }} <small>({{ date | date }})</small></h4>
      <p>{{ media }}</p>
      <p>{{ height }}" x {{ width }}"</p>
      <p>£{{ price | currency }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, computed, toRefs } from '@vue/composition-api'
export default defineComponent({
  name: 'Detail',
  filters: {
    date: function (value: string) {
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
    const max = 500;

    const state = reactive({
      painting: computed(() => context.root.$store.state.paintings.detail),
      title: computed(() => state.painting?.title),
      date: computed(() => state.painting?.date),
      media: computed(() => state.painting?.media),
      height: computed(() => state.painting?.height),
      width: computed(() => state.painting?.width),
      price: computed(() => state.painting?.price),
      imageUrl: computed(() => state.painting?.imageUrl),
      url: computed(() => state.imageUrl ? state.imageUrl + '?h=' + max : ''),
      ratio: computed(() => `${state.width}/${state.height}`),
      imgStyle: computed(() => {
        const { height, width } = state
        const vertical = height > width
        const h = vertical ? max : height / width * max
        const w = vertical ? width / height * max : max
        return `height: ${h}px; width: ${w}px;`
        })
    })
    

    onMounted(() => {
      context.root.$store.dispatch('paintings/loadPainting', context.root.$route.params.id)
    })

    return { ...toRefs(state) }
  }
})
</script>

<style lang="scss" scoped>
.bd {
  // border: 1px dashed brown;
}
</style>