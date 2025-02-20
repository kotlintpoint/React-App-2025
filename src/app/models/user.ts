export interface User {
    displayName: string
    userName: string
    token: string
    image: string
}

export interface UserValues {
    email: string
    password: string
    displayName?: string
    userName?: string
}