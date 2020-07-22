<template>
  <div>
    <div class="q-pa-md row items-start q-gutter-md margin-1em">
        <painting v-for="painting in paintingsOnPage" :key="painting.id" :painting="painting" />
    </div>
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="page"
        :max="maxPage"
        :input="true"
      >
      </q-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, computed } from '@vue/composition-api'
import Painting from 'src/components/painting'

export default defineComponent({
  name: 'Paintings',
  components: {
    painting: Painting
  },
  setup (props, context) {
    const itemsPerPage = 4
    const state = reactive({
      page: 1,
      paintings: computed(() => context.root.$store.state.paintings.paintings),
      maxPage: computed(() => Math.ceil(state.paintings.length / itemsPerPage)),
      firstIndex: computed(() => (state.page - 1) * itemsPerPage),
      paintingsOnPage: computed(() => state.paintings.slice(state.firstIndex, state.firstIndex + itemsPerPage))
    })

    onMounted(() => {
      context.root.$store.dispatch('paintings/loadPaintings')
    })

    return { ...toRefs(state), itemsPerPage }
  }
})
</script>

<style lang="scss" scoped>
.margin-1em {
  margin: 1em;
}
</style>
