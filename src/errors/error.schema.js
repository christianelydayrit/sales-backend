/**
 * JSON schema describing the API error response format.
 * Must stay in sync with the global error handler output.
 */


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
              { 
                type: "array", 
                items: { 
                    type: "object",
                    properties: {
                        field: { type: "string" },
                        message: { type: "string" }
                    }
                } 
              },
              { type: "object" }
            ]
        }
    },
    additionalProperties: false
};