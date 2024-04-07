import apiSlice from "../../app/apiSlice";

const userApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getUsers: build.query({
            query:()=>({
                url:'/api/users'
            })
        }),
        addUser: build.mutation({
            query:(user)=>({
                url:'/api/users',
                method:"POST",
                body:user
            })  
        }),
        delUser: build.mutation({
            query:({_id})=>({
                url:'/api/users',
                method:"DELETE",
                body:{_id:_id}
            })  
        }),
        upUser: build.mutation({
            query:({user})=>({
                url:'/api/users',
                method:"PUT",
                body:user
            })  
        }),
    })
})

export const{useGetUsersQuery,useAddUserMutation,useDelUserMutation,useUpUserMutation}=userApiSlice