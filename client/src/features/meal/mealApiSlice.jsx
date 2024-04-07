import apiSlice from "../../app/apiSlice";

const mealApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getMealsByKategory: build.query({
            query:(kategory)=>({
                url:`/api/meals/${kategory}`,
                method:"GET"
            })
        }),
        getMeals: build.query({
            query:()=>({
                url:"/api/meals"
            }),
            providesTags:["Meals"]
        }),
        addMeal: build.mutation({
            query:(meal)=>({
                url:'/api/meals',
                method:"POST",
                body:meal
            })  
        }),
        delMeal: build.mutation({
            query:({_id})=>({
                url:'/api/meals',
                method:"DELETE",
                body:{_id:_id}
            })  
        }),
        upMeal: build.mutation({
            query:(meal)=>({
                url:'/api/meals',
                method:"PUT",
                body:meal
            })  ,
            invalidatesTags:["Meals"]

        }),
        upMealStatus: build.mutation({
            query:({idMeal})=>({
                url:'/api/meals',
                method:"PUT",
                body:{_id:idMeal}
            })  
        }),
    })
})

export const{useGetMealsQuery,useAddMealMutation,useDelMealMutation,useUpMealMutation,useUpMealStatusMutation,useGetMealsByKategoryQuery}=mealApiSlice