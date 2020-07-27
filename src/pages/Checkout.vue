<template>
  <q-page padding style="min-width: 500px;">
    <div v-for="(item, i) in list" :key="i" class="row q-my-md">
      <div class="col-2">
        <q-img :src="item.imageUrl + '?h=88&w=104&crop=1'" height="44px" width="52px" class="rounded-borders" />
      </div>
      <div class="col-9">
        <div>
          {{ item.title | title }}
        </div>
        <div>
          £{{ item.price | currency }}
        </div>
      </div>
      <div class="col-1">
        <q-btn flat icon="remove_shopping_cart" color="negative" @click="removeItem(item.id)" />
      </div>
    </div>
    <h6>
      Total: £{{ total | currency }}
    </h6>
    <div class="text-subtitle1">
      Pay with:
    </div>
    <div class="row justify-start q-my-md">
      <div class="col-2">
        <q-icon name="fas fa-credit-card" style="font-size: 3rem;" color="grey-6" />
      </div>
      <div class="col">
        <div>Credit card <small>(currently unavailable)</small></div>
      </div>
    </div>
    <div class="row justify-start q-my-md">
      <div class="col-2">
        <q-icon name="fab fa-cc-paypal" style="font-size: 3rem;" color="grey-6" class="col" />
      </div>
      <div class="col">
        PayPal <small>(currently unavailable)</small>
      </div>
    </div>
    <div class="row justify-start q-my-md">
      <div class="col-2">
      <q-icon name="img:https://image.flaticon.com/icons/png/128/902/902102.png" style="font-size: 3rem;" />
      </div>
      <div class="col">
        Beans
      </div>
    </div>
    <div class="q-mt-xl">
      <q-btn color="primary" label="Buy now" @click="buyNow" />
      <q-btn flat color="primary" v-go-back="'/paintings'" label="Back" class="q-ml-sm" />
    </div>
    <q-dialog v-model="result" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Congratulations!</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Your payment has gone through.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn color="primary" flat v-go-back="'/paintings'" label="Back" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, onMounted } from '@vue/composition-api'
import { Painting } from '../components/models'
export default defineComponent({
  name: 'Checkout',
  filters: {
    title: function (value: string) {
      return value || 'Untitled'
    },
    currency: function (value: number) {
      return value?.toFixed(2)
    }
  },
  setup (props, context) {
    const state: any = reactive({
      result: false,
      store: computed(() => context.root.$store.state.paintings),
      basket: computed(() => state.store.basket),
      paintingsById: computed(() => state.store.paintingsById),
      idsOfLoaded: computed(() => Object.keys(state.paintingsById).map(i => +i)),
      list: computed(() => Object.values(state.paintingsById).filter((painting: any) => state.basket.includes(painting.id))),
      total: computed(() => state.list.reduce((sum: number, item: Painting) => sum + item.price, 0))
    })

    function removeItem (id: number) {
      context.root.$store.dispatch('paintings/removeFromBasket', { id })
    }

    function buyNow () {
      state.result = true
      // context.root.$store.dispatch('paintings/emptyBasket')
    }

    onMounted(() => {
      const idsToLoad = state.basket.filter((id: number) => !state.idsOfLoaded.includes(id))
      for (const id of idsToLoad) {
        context.root.$store.dispatch('paintings/loadPainting', { id })
      }
    })

    return { ...toRefs(state), removeItem, buyNow }
  }
})
</script>
