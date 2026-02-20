import { errorResponseSchema } from "./error.schema.js";

export const commonErrors = {
    400: errorResponseSchema,
    401: errorResponseSchema,
    404: errorResponseSchema,
    500: errorResponseSchema,
    503: errorResponseSchema
  };