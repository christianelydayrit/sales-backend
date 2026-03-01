export const usersShema= {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            'id': {type: 'integer', maximum: 10, minimum: 1}
        }
    },
    response:{
        200:{
            type: 'object',
            required: ['data'],
            properties:{
                data:{
                    type:'array',
                    items:{
                        type: 'object',
                        required:['product', 'quantity', 'total_amount', 'sale_date'],
                        properties:{
                            'product': {type: 'string'},
                            'quantity': {type: 'integer'},
                            'total_amount': {type: 'string'},
                            'sale_date': {type: 'string'},
                        }
                    }
                    
                },
                // meta:{
                //     type: 'object',
                //     required: ['page', 'pageSize', 'total', 'totalPages'],
                //     properties: {
                //         'page': {type: 'integer'},
                //         'pageSize': {type: 'integer'},
                //         'total': {type: 'integer'},
                //         'totalPages': {type: 'integer'},
                //     }
                // }
            }
        }
    }
}