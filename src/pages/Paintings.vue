<template>
  <div class="q-pa-md row items-start q-gutter-md">
      <painting v-for="painting in paintings" :key="painting.id" :painting="painting" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, computed } from '@vue/composition-api'
import Painting from 'src/components/painting'

export default defineComponent({
  name: 'Paintings',
  components: {
    'painting': Painting
  },
  setup (props, context) {
    const state = reactive({
      paintings: computed(() => context.root.$store.state.paintings.paintings)
    })

    onMounted(() => {
      context.root.$store.dispatch('paintings/loadPaintings')
    })

    return { ...toRefs(state) }
  }
})
</script>
