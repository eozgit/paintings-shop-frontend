import { Painting } from 'src/components/models'
import apiUrl from './apiUrl'

export default async (token: string, id: number): Promise<Painting & { code: string }> => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${token}`)

  const requestOptions = {
    method: 'GET',
    headers
  }

  const url = `${apiUrl}/paintings/${id}`
  const response = await fetch(url, requestOptions)
  return await response.json() as Painting & { code: string }
}
