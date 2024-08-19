/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import getComments from "@/utils/getComments.mjs";
import { useEffect, useState } from "react";
import Comment from "./Comment";


const PreviousComments = ({ blog_id }) => {
    // const getComments = async (page, limit, sort, pendingOnly, approvedOnly, all, keyword) => {
    const [comments, setComments] = useState([])
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(10);
    useEffect(() => {
        (async () => {
            const c = await getComments(1, 10, 'newest', blog_id, true,);
            setTotalCount(c.totalCount)
            setComments(c.comments);
        })()
    }, [limit])
    console.log(comments)
    return (
        <div className="my-6">
            {
                comments?.map((c) => <Comment c={c} key={c?._id} />)
            }
            {
                limit < totalCount && limit !==100 && <button onClick={()=>setLimit(100)} className="btn-submit">Show All</button>
            }
        </div>
    );
};

export default PreviousComments;