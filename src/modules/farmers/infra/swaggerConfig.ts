import { z } from 'zod'

const resource = '/farmers'
const tags = ['Farmers']

const farmerSchemaRequest = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  document: z.string()
})

const farmerSchemaResponse = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  document: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

const farmerSchemaError = z.object({
  success: z.boolean(),
  error: z.object({
    issues: z.array(
      z.object({
        code: z.string(),
        expected: z.string(),
        received: z.string(),
        path: z.array(z.string()),
        message: z.string()
      })
    ),
    name: z.string()
  })
})

export const farmerPatchRoute = {
  method: 'patch',
  path: `${resource}/:id`,
  tags,
  summary: 'Update farmer',
  description: 'Update farmer description',
  request: {
    params: z.object({
      id: z.string().uuid()
    }),
    body: {
      content: {
        'application/json': {
          schema: farmerSchemaRequest
        }
      }
    }
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: farmerSchemaResponse
        }
      },
      description: 'Farmer updated'
    },
    400: {
      content: {
        'application/json': {
          schema: farmerSchemaError
        }
      },
      description: 'Invalid input'
    },
    404: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string()
          })
        }
      },
      description: 'Farmer not found'
    }
  }
} as const

export const farmerGetRoute = {
  method: 'get',
  path: `${resource}/:id`,
  tags,
  summary: 'Get farmer',
  description: 'Get farmer description',
  request: {
    params: z.object({
      id: z.string().uuid()
    })
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: farmerSchemaResponse
        }
      },
      description: 'Farmer found'
    },
    400: {
      content: {
        'application/json': {
          schema: farmerSchemaError
        }
      },
      description: 'Invalid input'
    },
    404: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string()
          })
        }
      },
      description: 'Farmer not found'
    }
  }
} as const
