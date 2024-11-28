import { z } from "zod";



const UserCreateValidation = z.object({
    body:z.object({
        name:z.string().nonempty(),
        email:z.string().email(),
        password:z.string().nonempty(),
        phone:z.string().nonempty(),
        address:z.string().nonempty(),
        // role:z.enum(['admin','user'])
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
    UserLoginValidation
}
