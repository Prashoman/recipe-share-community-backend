
export type TUser = {
    userName: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    profileImage?: string;
    address: string;
    bio:string,
    expiryDate?: Date;
    memberShip: 'free' | 'premium';
    isDeleted: boolean;
    passwordUpdate: boolean;
}

export type TUserLogin = {
    email: string;
    password: string;
}