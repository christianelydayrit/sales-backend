export const errorResponseSchema = {
    type: 'object',
    required: ['message', 'statusCode', 'error'],
    properties:{
        statusCode: { type: 'integer' },
        error: { type: 'string' },
        message: { type: 'string' },
        details: {
            anyOf: 
            [
              { type: "array", items: { type: "object" } },
              { type: "object" }
            ]
        }
    },
    additionalProperties: false
};