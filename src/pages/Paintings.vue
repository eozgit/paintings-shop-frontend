<template>
  <div>
    <div class="q-pa-md row items-start q-gutter-md margin-1em">
        <painting v-for="painting in paintings" :key="painting.id" :painting="painting" />
    </div>
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="page"
        :max="maxPage"
        :input="true"
        @input="loadPage"
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
      paintingsData: computed(() => context.root.$store.state.paintings.paintingsData),
      paintings: computed(() => state.paintingsData.results),
      maxPage: computed(() => Math.ceil(state.paintingsData.count / itemsPerPage))
    })

    function loadPaintings (page: number) {
      context.root.$store.dispatch('paintings/loadPaintings', { page })
    }

    onMounted(() => {
      loadPaintings(1)
    })

    function loadPage (page) {
      loadPaintings(page)
    }

    return { ...toRefs(state), itemsPerPage, loadPage }
  }
})
</script>

<style lang="scss" scoped>
.margin-1em {
  margin: 1em;
}
</style>
