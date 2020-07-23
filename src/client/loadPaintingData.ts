import { PaintingQuery, PaintingsData } from "src/store/paintings/state"
import apiUrl from "./apiUrl"

export default async (token: string, { page, title, year, medium, height, width }: PaintingQuery) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${token}`)

  const requestOptions = {
    method: 'GET',
    headers
  }

  let url = `${apiUrl}/paintings/`
  url += `?page=${page}`
  if (title) url += `&title=${title}`
  if (year) url += `&date=${year}`
  if (medium) url += `&media=${medium}`
  if (height?.max) url += `&height_min=${height.min}&height_max=${height.max}`
  if (width?.max) url += `&width_min=${width.min}&width_max=${width.max}`
  const response = await fetch(url, requestOptions)
  return await response.json() as PaintingsData & { code: string }
}
