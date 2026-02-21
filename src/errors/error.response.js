/**
 * Shared error response schemas reused across route `schema.response`
 * to keep API error contracts consistent and avoid duplication.
 */

import { errorResponseSchema } from "./error.schema.js";

export const commonErrors = {
    400: errorResponseSchema,
    401: errorResponseSchema,
    404: errorResponseSchema,
    415: errorResponseSchema,
    500: errorResponseSchema,
    503: errorResponseSchema
  };