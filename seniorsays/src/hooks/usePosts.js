import { useEffect, useRef, useState } from 'react';
import { Query } from 'appwrite';
import appwriteService from '../appwrite/config';
import { paginate } from '../utils/paginate';

// Ek page pe itne cards dikhenge
const POSTS_PER_PAGE = 10;

// Posts ka data + search + pagination — ek jagah. Do mode hain:
//
//   usePosts()                    -> PUBLIC: sirf published (active) posts.
//                                    Home aur AllPosts ise use karte hain.
//   usePosts({ userId: "abc" })   -> MERE POSTS: us user ke SAARE posts,
//                                    draft (inactive) + published dono. MyPosts page.
//
// Dono list alag rakhne ki wajah: public search me kisi ka adhoora draft aana
// galat hai, par senior ko apna draft dhoondhne ki jagah bhi chahiye.
export function usePosts({ userId } = {}) {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setQuery] = useState('');
    const [page, setPage] = useState(1);
    // Page badalne par list ke top pe scroll karne ke liye
    const listRef = useRef(null);

    useEffect(() => {
        //  userId diya = "mere posts" mode -> status filter nahi, taaki draft bhi aayein.
        //  userId nahi diya = public mode -> sirf active.
        const queries = userId
            ? [Query.equal("userId", userId)]
            : [Query.equal("status", "active")];

        queries.push(Query.orderDesc("$createdAt"));   // naye posts pehle

        // getPosts andar loop karke SAARE posts laata hai (koi 25/100 ka cap nahi)
        appwriteService.getPosts(queries).then((posts) => {
            if (posts) setPosts(posts);
        });
    }, [userId]);

    const filteredPosts = posts.filter((post) => {
        const query = searchQuery.toLowerCase();
        return (
            post.companyName?.toLowerCase().includes(query) ||
            post.title?.toLowerCase().includes(query) ||
            post.roleType?.toLowerCase().includes(query)
        );
    });

    // PAGINATION: slice search ke BAAD hoti hai, warna search sirf current page ke
    // 10 posts me dhoondti — poore loaded set me nahi
    const { visible: visiblePosts, currentPage, totalPages } =
        paginate(filteredPosts, page, POSTS_PER_PAGE);

    // Nayi search = pehle page se shuru. Warna page 3 pe khade rehke aisi search karo
    // jiske 5 hi results hain, toh khaali screen dikhti hai.
    const setSearchQuery = (value) => {
        setQuery(value);
        setPage(1);
    };

    const goToPage = (nextPage) => {
        setPage(nextPage);
        listRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return {
        visiblePosts,    // current page ke cards — isko map karo
        filteredPosts,   // count dikhane ke liye (search me kitne mile)
        searchQuery,
        setSearchQuery,
        currentPage,
        totalPages,
        goToPage,
        listRef,         // list section pe lagao, page change pe yahan scroll hoga
    };
}
