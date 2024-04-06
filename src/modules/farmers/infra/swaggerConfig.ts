import { z } from 'zod'

const resource = '/farmers'
const tags = ['Farmers']

const farmerSchemaRequestRequired = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  document: z.string()
})

const farmerSchemaRequestOptional = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  document: z.string().optional()
})

const farmerSchemaResponse = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  document: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

const farmerSchemaResponseArray = z.array(farmerSchemaResponse)

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

export const farmerPostRoute = {
  method: 'post',
  path: resource,
  tags,
  summary: 'Create farmer',
  description: 'Create farmer description',
  request: {
    body: {
      content: {
        'application/json': {
          schema: farmerSchemaRequestRequired
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
      description: 'Farmer created'
    },
    400: {
      content: {
        'application/json': {
          schema: farmerSchemaError
        }
      },
      description: 'Invalid input'
    }
  }
} as const

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
          schema: farmerSchemaRequestOptional
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

export const farmersGetRoute = {
  method: 'get',
  path: resource,
  tags,
  summary: 'Get farmers',
  description: 'Get farmers description',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: farmerSchemaResponseArray
        }
      },
      description: 'Farmers found'
    }
  }
} as const
