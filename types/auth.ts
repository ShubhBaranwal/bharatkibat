export interface LoginRequest {
    identifier: string; // Can be username or email
    password: string;
}

export interface UserResponse {
    id: string;
    username: string;
    email: string;
    role: string;
    avatar?: string;
}

export interface LoginResponse {
    user: UserResponse;
    token: string;
}

export interface JWTPayload {
    userId: string;
    role: string;
    iat?: number;
    exp?: number;
}
