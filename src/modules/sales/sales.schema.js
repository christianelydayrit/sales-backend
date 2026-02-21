import { commonErrors } from "../../errors/error.response.js";

export const salesMonthlySchema = {
    querystring:{
        type: 'object',
        required: ['month', 'year'],
        additionalProperties: false,
        properties:{
            // Year range is constrained to the seeded dataset for this exercise.
            'month': {type: 'integer', minimum: 1, maximum: 12},
            'year': {type: 'integer', minimum: 2025, maximum: 2026},

            // Pagination parameters
            'page': {type: 'integer', minimum: 1, default: 1},
            'pageSize': {type: 'integer', minimum: 1, maximum: 200, default: 10 }
        }
    },
    response: {
        200:{
            type: 'object',
            required: ['data', 'meta'],
            additionalProperties: false,
            properties:{
                data: {
                    type: 'array',
                    items:{
                        type: 'object',
                        required: ['id', 'customer_name', 'product_name', 'quantity', 'total_amount', 'sale_date'],
                        additionalProperties: false,
                        properties:{
                            'id': {type: 'integer'},
                            'customer_name': {type: 'string'},
                            'product_name': {type: 'string'},
                            'quantity': {type: 'integer'},
                            'total_amount': {type: 'string'},
                            'sale_date': {type: 'string'}
                        }
                    }
                },
                // Pagination metadata returned with every result set
                meta:{
                    type: 'object',
                    required: ['page', 'pageSize', 'total', 'totalPages'],
                    additionalProperties: false,
                    properties:{
                        page: { type: "integer" },
                        pageSize: { type: "integer" },
                        total: { type: "integer" },
                        totalPages: { type: "integer" }
                    }
                }
            }
        },
        ...commonErrors
    }
}