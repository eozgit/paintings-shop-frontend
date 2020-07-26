<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="username"
        label="Username *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Username cannot be empty']"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="Password *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Password cannot be empty']"
      />

      <div class="row">
        <div class="col q-mx-md">
          <q-btn label="Login" type="submit" color="primary"/>
        </div>
        <div class="col q-mx-md">
          <q-btn flat label="Register" type="button" color="primary" to="/registration" />
        </div>
      </div>

      <ul v-if="hints.length" class="warnings text-negative">
        <li v-for="(hint, i) in hints" :key="i">
          {{ hint }}
        </li>
      </ul>
    </q-form>

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import { getToken } from 'src/client'

interface FormData {
      username: string,
      password: string,
      hints: string[]
}

export default defineComponent({
  name: 'Registration',
  setup (props, context) {
    const data: FormData = {
      username: '',
      password: '',
      hints: []
    }
    const formData = reactive(data)

    async function onSubmit () {
      const json = await getToken(formData.username, formData.password)

      if (json.access) {
        localStorage.token = json.access
        context.root.$store.dispatch('paintings/setToken', { token: json.access })
        context.root.$options.router?.push('paintings');
      }

      formData.hints = []
      if (json.username) {
        formData.hints = [...formData.hints, ...json.username]
      }
      if (json.password) {
        formData.hints = [...formData.hints, ...json.password]
      }
      if (json.detail) {
        formData.hints = [...formData.hints, json.detail]
      }
    }

    return { ...toRefs(formData), onSubmit }
  }
})
</script>

<style lang="scss" scoped>
.warnings {
  list-style: none;
  font-size: small;
}
</style>
