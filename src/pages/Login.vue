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
    key?: string
    username?: string[],
    email?: string[],
    password?: string[],
    non_field_errors?: string[],
}

export default defineComponent({
  name: 'Registration',
  setup () {
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
        password: formData.password,
      })

      const requestOptions = {
        method: 'POST',
        headers,
        body
      }

      const response = await fetch('http://localhost:8000/rest-auth/login/', requestOptions)

      const json = await response.json() as LoginResponse

      formData.hints = []
      if (json.username) {
        formData.hints = [...formData.hints, ...json.username]
      }
      if (json.email) {
        formData.hints = [...formData.hints, ...json.email]
      }
      if (json.password) {
        formData.hints = [...formData.hints, ...json.password]
      }
      if (json.non_field_errors) {
        formData.hints = [...formData.hints, ...json.non_field_errors]
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
