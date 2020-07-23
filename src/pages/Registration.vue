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

      <q-input
        filled
        type="password"
        v-model="confirm"
        label="Confirm password *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Password confirmation cannot be empty']"
      />

      <div>
        <q-btn label="Register" type="submit" color="primary"/>
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
import { register } from '../client'

interface FormData {
      username: string,
      email: string,
      password: string,
      confirm: string,
      hints: string[]
}

export default defineComponent({
  name: 'Registration',
  setup (props, context) {
    const data: FormData = {
      username: '',
      email: '',
      password: '',
      confirm: '',
      hints: []
    }
    const formData = reactive(data)

    async function onSubmit () {
      const json = await register(formData.username, formData.password, formData.confirm)

      if (json.key) {
        context.root.$options.router?.push('login');
      }

      formData.hints = []
      if (json.username) {
        formData.hints = [...formData.hints, ...json.username]
      }
      if (json.email) {
        formData.hints = [...formData.hints, ...json.email]
      }
      if (json.password1) {
        formData.hints = [...formData.hints, ...json.password1]
      }
      if (json.password2) {
        formData.hints = [...formData.hints, ...json.password2]
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
