
export type TUser = {
    userName: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    profileImage?: string;
    address: string;
    memberShip: 'free' | 'premium';
    isDeleted: boolean;
}


export type TUserLogin = {
    email: string;
    password: string;
}