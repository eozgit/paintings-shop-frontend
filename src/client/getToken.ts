import apiUrl from "./apiUrl"

interface LoginResponse {
    refresh?: string,
    access?: string,
    username?: string[],
    password?: string[],
    detail?: string
}

export default async (username: string, password: string) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const body = JSON.stringify({
    username,
    password
  })

  const requestOptions = {
    method: 'POST',
    headers,
    body
  }

  const response = await fetch(`${apiUrl}/api/token/`, requestOptions)

  return await response.json() as LoginResponse
}
