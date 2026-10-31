import { z } from 'zod'

export const errorSchema = z.object({
  error: z.string(),
})

export type RespuestaError = z.infer<typeof errorSchema>
