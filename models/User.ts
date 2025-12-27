import mongoose, { Schema, model, models, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    fullName: string;
    username: string;
    email: string;
    password?: string;
    googleId?: string;
    role: "admin" | "editor" | "writer" | "user";
    avatar: string;
    bio: string;
    website: string;
    otpCode?: string;
    otpExpiry?: Date;
    status: "active" | "blocked" | "pending";
    devices: {
        deviceId: string;
        ip: string;
        lastLogin: Date;
    }[];
    lastLoginAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    // Virtual or transient property for validation
    otpLogin?: boolean;
    comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 60,
        },

        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            minlength: 3,
            maxlength: 30,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
        },

        password: {
            type: String,
            required: function (this: IUser) {
                return !this.googleId && !this.otpLogin;
            },
            minlength: 6,
            select: false, // extra security
        },

        // For Google login / social login
        googleId: {
            type: String,
            default: null,
        },

        // Role-based access control
        role: {
            type: String,
            enum: ["admin", "editor", "writer", "user"],
            default: "user",
        },

        avatar: {
            type: String,
            default: "https://i.ibb.co/0jD0mF3/user.png",
        },

        // For SEO-friendly author pages
        bio: {
            type: String,
            default: "",
            maxlength: 500,
        },

        website: {
            type: String,
            default: "",
        },

        // For password reset, OTP, etc
        otpCode: {
            type: String,
            default: null,
            select: false,
        },
        otpExpiry: {
            type: Date,
            default: null,
        },

        // For account status
        status: {
            type: String,
            enum: ["active", "blocked", "pending"],
            default: "active",
        },

        // Device Login Tracking (optional)
        devices: [
            {
                deviceId: String,
                ip: String,
                lastLogin: Date,
            },
        ],

        lastLoginAt: {
            type: Date,
        },
    },
    { timestamps: true }
);

// HASH PASSWORD BEFORE SAVE
UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    if (this.password) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

// PASSWORD VALIDATION METHOD
UserSchema.methods.comparePassword = async function (userPassword: string) {
    if (!this.password) return false;
    return await bcrypt.compare(userPassword, this.password);
};

const User = (models.User as Model<IUser>) || model<IUser>("User", UserSchema);

export default User;
// Password: admin123