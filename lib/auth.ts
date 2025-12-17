import { SignJWT, jwtVerify } from "jose";
import { JWTPayload } from "@/types/auth";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this-in-env";
const encodedSecret = new TextEncoder().encode(JWT_SECRET);

export async function signToken(payload: JWTPayload): Promise<string> {
    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1d") // Token expires in 1 day
        .sign(encodedSecret);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await jwtVerify(token, encodedSecret);
        return payload as unknown as JWTPayload;
    } catch (error) {
        return null;
    }
}
