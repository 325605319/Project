import apiSlice from "../../app/apiSlice";

const orderApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getOrders: build.query({
            query:()=>({
                url:'/api/orders'
            })
            
        }),
        getOrdersById: build.query({
            query:()=>({
                url:'/api/orders/byId'
            }),
            invalidatesTags:["getorders"],
            providesTags:["orders"]
        }),
        history: build.query({
            query:()=>({
                url:'/api/orders/history'
            }),
            invalidatesTags:["getorders"],
            providesTags:["orders"]
        }),
        addOrder: build.mutation({
            query:(order)=>({
                url:'/api/orders',
                method:"POST",
                body:order
            }) ,

        }),
        delOrder: build.mutation({
            query:({_id,userId})=>({
                url:'/api/orders',
                method:"DELETE",
                body:{_id:_id,userId:userId},
                
            })  ,
            invalidatesTags:["sum"]

        }),
        upOrder: build.mutation({
            query:({order})=>({
                url:'/api/orders',
                method:"PUT",
                body:order
            })  
        }),
        upOrderActive: build.mutation({
            query:()=>({
                url:'/api/orders/active',
                method:"PUT",
                // body:{_id:idOrder}
            }),
            invalidatesTags:["orders"]
        }),
        getSum: build.query({
            query:()=>({
                url:'/api/orders/sum'
            }),
            providesTags:["sum","getorders"]
        }),

    })
})

export const{useHistoryQuery,useGetSumQuery,useGetOrdersQuery,useAddOrderMutation,useDelOrderMutation,useUpOrderMutation,useUpOrderActiveMutation,useGetOrdersByIdQuery}=orderApiSlice