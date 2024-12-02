import { z } from "zod";

const UserCreateValidation = z.object({
    body:z.object({
       userName:z.string().nonempty(),
        email:z.string().email(),
        password:z.string().nonempty(),
        profileImage:z.string().optional(),
        role:z.enum(['admin','user']).default('user'),
        address:z.string().optional(),
        memberShip:z.enum(['free','premium']).default('free').optional()
    })
})

const UserUpdateValidation = z.object({
    body:z.object({
        userName:z.string().nonempty().optional(),
        email:z.string().email().optional(),
        password:z.string().nonempty().optional(),
        profileImage:z.string().optional(),
        role:z.enum(['admin','user']).optional(),
        address:z.string().optional(),
        memberShip:z.enum(['free','premium']).optional()
    })
})


const UserLoginValidation = z.object({
    body:z.object({
        email:z.string().email(),
        password:z.string().nonempty()
    })
})


export const UserValidation={
    UserCreateValidation,
    UserUpdateValidation,
    UserLoginValidation
}
