'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ResetPage = ({ currentPage }) => {
    const router = useRouter();

    const handleReset = () => {
        if (currentPage === 1) return router.push('/')
        const query = new URLSearchParams(window.location.search);
        query.set('page', 1);
        router.push(`${window.location.pathname}?${query.toString()}`, undefined);
    };

    return (
        <div className="text-center">
            <h3 className="text-xl my-2">Nothing Found</h3>
            <button
                onClick={handleReset}
                className="btn-green"
            >
                {currentPage === 1 ? "Go Home" : "Reset"}
            </button>
        </div>
    );
};

export default ResetPage;
