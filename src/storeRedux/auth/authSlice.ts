import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { decrypt, encrypt } from "../../lib/encryption-utils";

export interface AuthState {
email: string | null;
token: string | null;
role: string | null;
}

const initialState: AuthState = {
    email: null,
    token: null,
    role: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setEmail: (state, action:PayloadAction<string>) => {
            state.email =  action.payload;
            sessionStorage.setItem("email",encrypt(action.payload))
        },
        setToken: (state, action:PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem("token",action.payload)
        },
        setRole: (state, action:PayloadAction<string>) => {
            state.role = action.payload;
            sessionStorage.setItem("role",action.payload)
        },
        logout: (state) => {
            state.email = null;
            state.token = null;
            state.role = null;
            sessionStorage.removeItem("email")
            localStorage.removeItem("token")
            sessionStorage.removeItem("role")
        },
        restoreSession: (state) => {
            const storedEmail = decrypt(sessionStorage.getItem("email"));
            const storedToken = decrypt(sessionStorage.getItem("token"));
            const storedRole = decrypt(sessionStorage.getItem("role"));

            if(storedEmail) state.email = storedEmail
            if(storedToken) state.token = storedToken
            if(storedRole) state.role = storedRole
        }
    }
})

export const { setEmail, setToken, setRole, logout, restoreSession } = authSlice.actions;
export default authSlice.reducer
