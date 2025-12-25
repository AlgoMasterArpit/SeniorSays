import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    posts: [] // We start with an empty list of posts
}

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        // Action 1: Set all posts (Used when the Home Page loads)
        setPosts: (state, action) => {
            state.posts = action.payload;
        },

        // Action 2: Add a single post (Used when you create a new post)
        addPost: (state, action) => {
            state.posts.push(action.payload);
        },

        // Action 3: Delete a post (Used when you click delete)
        deletePost: (state, action) => {
            // We keep all posts EXCEPT the one matching the ID we sent
            state.posts = state.posts.filter((post) => post.$id !== action.payload);
        }
    }
})

// Export the actions so components can use them
export const { setPosts, addPost, deletePost } = postSlice.actions;

// Export the reducer so the Store can use it
export default postSlice.reducer; 