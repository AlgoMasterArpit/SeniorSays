import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice'; // Import Auth Slice
import postSlice from './postSlice'; // Import Post Slice (if you created it)

const store = configureStore({
    reducer: {
        // The Key ('auth') is what you use to select data later: state.auth.status
        auth: authSlice,
        
        // The Key ('posts') is for your posts: state.posts.allPosts
        posts: postSlice 
    }
});

export default store;