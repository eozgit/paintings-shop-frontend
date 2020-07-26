<template>
  <div class="centering margin-1em">
    <div class="q-px-xs row items-start q-gutter-xs">
      <q-input clearable outlined v-model="title" label="Title" class="min-width-16em q-mx-md" @input="list" />
      <q-select clearable outlined v-model="year" :options="years" label="Year" class="min-width-16em q-mx-md" @input="list" />
      <q-select clearable outlined v-model="medium" :options="media" label="Media" class="min-width-16em q-mx-md" @input="list" />
      <div class="width-16em q-mx-md">
        <q-badge>
          Height: {{ height.min }}″ to {{ height.max }}″
        </q-badge>
        <q-range clearable v-model="height" :min="5" :max="40" @change="list" />
      </div>
      <div class="width-16em q-mx-md">
        <q-badge>
          Width: {{ width.min }}″ to {{ width.max }}″
        </q-badge>
        <q-range clearable v-model="width" :min="5" :max="60" @change="list" />
      </div>
    </div>
    <div class="q-pa-xs row items-start q-gutter-xs">
      <painting v-for="painting in paintings" :key="painting.id" :painting="painting" />
    </div>
    <div class="q-pa-xs flex flex-center">
      <q-pagination
        v-model="page"
        :max="maxPage"
        :input="true"
        @input="goToPage"
      >
      </q-pagination>
    </div>
    <q-page-sticky position="top-right" :offset="[-30, 110]" v-if="basket.length">
      <q-btn fab icon="shopping_cart" color="primary" :label="basket.length" padding="md 3rem md md" to="/checkout" />
    </q-page-sticky>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, computed } from '@vue/composition-api'
import { debounce } from 'quasar'
import Painting from 'src/components/painting'
import { PaintingQuery } from '../store/paintings/state'

export default defineComponent({
  name: 'Paintings',
  components: {
    painting: Painting
  },
  setup (props, context) {
    const itemsPerPage = 4
    const state = reactive({
      title: '',
      year: null,
      medium: '',
      page: 1,
      height: { min: 5, max: 40 },
      width: { min: 5, max: 60 },
      store: computed(() => context.root.$store.state.paintings),
      paintingsData: computed(() => state.store.paintingsData),
      paintings: computed(() => state.paintingsData.results),
      maxPage: computed(() => Math.ceil(state.paintingsData.count / itemsPerPage)),
      basket: computed(() => state.store.basket)
    })
    const years = ['2016', '2017', '2018', '2019']
    const media = ['Mixed', 'Canvas', 'Ink', 'Paper', 'Watercolours']

    const goToPage = (page: number) => {
      loadPaintingsCurrent(page)
    }

    const list = debounce(value => {
      state.page = 1
      loadPaintingsCurrent(1)
    }, 1000)

    function loadPaintingsCurrent(page: number) {
      const { title, year, medium, height, width } = state
      loadPaintings({ page, title, year, medium, height, width })
    }

    function loadPaintings (query: PaintingQuery) {
      context.root.$store.dispatch('paintings/loadPaintings', { query })
    }

    onMounted(() => {
      loadPaintingsCurrent(1)
    })

    return { ...toRefs(state), itemsPerPage, years, media, list, goToPage }
  }
})
</script>

<style lang="scss" scoped>
.margin-1em {
  margin: 1em;
}

.min-width-16em {
  min-width: 16em;
}

.width-16em {
  width: 16em;
  padding: 0 1em;
}
</style>
