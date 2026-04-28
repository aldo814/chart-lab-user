import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'u9rob73z',   
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  token: import.meta.env.VITE_SANITY_TOKEN
})