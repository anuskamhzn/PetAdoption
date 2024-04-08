// import React from "react";
// import Layout from "../components/Layout/Layout";
// import {useAuth} from "../context/auth";

// const HomePage = () => {
//     const [auth, setAuth] = useAuth()
//     return (
//         <Layout>
//             <h1>HomePage</h1>
//             <pre>{JSON.stringify(auth,null,4)}</pre>
//         </Layout>
//     )
// }

// export default HomePage

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";

const HomePage = () => {
    const [auth] = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in and redirect to appropriate dashboard
        if (auth.user) {
            if (auth.user.role === 1) {
                // Admin Dashboard
                navigate("/dashboard/admin");
            } else if (auth.user.role === 2) {
                // Shelter Dashboard
                navigate("/dashboard/shelter");
            } else {
                // User Dashboard
                navigate("/dashboard/user");
            }
        }
    }, [auth, navigate]);

    return (
        <Layout>
            <h1>HomePage</h1>
            {/* You can add content here if needed */}
        </Layout>
    );
};

export default HomePage;
