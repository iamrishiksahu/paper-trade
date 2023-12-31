import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { api_base_url } from '../../app/constants'

const em = 'rishikkr@hotmail.com';
export const ordersApi = createApi({

    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: api_base_url,
    }),

    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => ({
                url: `user/orders/${em}`,
                method: 'GET',

            })
        })
    }),
})

export const { useGetAllOrdersQuery } = ordersApi;