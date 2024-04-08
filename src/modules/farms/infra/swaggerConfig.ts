import { z } from 'zod'

const resource = '/report'
const tags = ['Report']

const farmerSchemaResponse = z.record(
  z.string(), z.any()
)

export const reportGetRoute = {
  method: 'get',
  path: `${resource}/:type`,
  tags,
  summary: 'Get report',
  description: 'Get report of farmers',
  request: {
    params: z.object({
      type: z.enum(['count', 'totalArea', 'states', 'cultures', 'soil'])
    })
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: farmerSchemaResponse
        }
      },
      description: 'Report of farmers'
    },
    404: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string()
          })
        }
      },
      description: 'Report not found'
    }
  }
} as const
