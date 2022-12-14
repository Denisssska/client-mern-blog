import {createSlice} from "@reduxjs/toolkit";
import {PaletteMode} from "@mui/material";

export type UserType = {
    firstName: string
    lastName: string
    email: string
    password: string
    picture: string
    friends: string[]
    location: string,
    occupation: string,
    viewedProfile: number,
    impressions: number
}
const initialState = {
    mode: "light" as PaletteMode,
    user: {} as UserType,
    token: null,
    posts: []
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light"
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = {} as UserType;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                // @ts-ignore
                state.user.friends = action.payload.friends
            } else {
                console.error("user friends not found")
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            // @ts-ignore
            state.posts = state.posts.map((post) => {
                // @ts-ignore
                if (post._id === action.payload.post_id) {
                    return action.payload.posts
                }
                return post
            });
        }
    }
})
export const {setPost, setPosts, setFriends, setMode, setUser, setLogout} = authSlice.actions;
export const authReducer = authSlice.reducer