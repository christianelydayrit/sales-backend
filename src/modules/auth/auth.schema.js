import { commonErrors } from "../../errors/error.response.js";

export const authSchema = {
    body:{
        type:'object',
        required:['username' ,'password'],
        properties:{
            username: {type: 'string', minLength: 3},
            password: {type: 'string', minLength: 6}
        },
        additionalProperties: false
    },
    response: {
        200:{
            type: 'object',
            required: ['accessToken'],
            properties:{
                accessToken: {type: 'string' },
            },
            
        },
        ...commonErrors
    }
}