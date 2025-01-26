import { z } from "zod";

const createRecipeValidation = z.object({
    body:z.object({
       title:z.string().nonempty(),
        description:z.string().nonempty(),
        image:z.string().nonempty(),
        ingredients:z.array(z.string()).nonempty(),
        cookingTime:z.number(),
        category:z.string().nonempty(),
        tags:z.array(z.string()).nonempty(),
    })
})


export const RecipeValidation ={
    createRecipeValidation
}