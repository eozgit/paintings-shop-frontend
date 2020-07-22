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

      <div>
        <q-btn label="Login" type="submit" color="primary"/>
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

interface FormData {
      username: string,
      password: string,
      hints: string[]
}

interface LoginResponse {
    refresh?: string,
    access?: string,
    username?: string[],
    password?: string[],
    detail?: string
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
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')

      const body = JSON.stringify({
        username: formData.username,
        password: formData.password
      })

      const requestOptions = {
        method: 'POST',
        headers,
        body
      }

      const response = await fetch('http://localhost:8000/api/token/', requestOptions)

      const json = await response.json() as LoginResponse

      if (json.access) {
        localStorage.token = json.access
        context.root.$store.dispatch('paintings/setToken', json.access)
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
