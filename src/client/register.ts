import apiUrl from "./apiUrl"

interface RegistrationResponse {
    key?: string
    username?: string[],
    email?: string[],
    password1?: string[],
    password2?: string[],
}

export default async (username: string, password: string, confirm: string) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const body = JSON.stringify({
    username,
    email: `${new Date().getTime()}@example.com`,
    password1: password,
    password2: confirm
  })

  const requestOptions = {
    method: 'POST',
    headers,
    body
  }

  const response = await fetch(`${apiUrl}/rest-auth/registration/`, requestOptions)

  return await response.json() as RegistrationResponse
}
