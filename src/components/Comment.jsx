import getTime from '@/utils/getTime.mjs';
import { useState } from 'react';
import CommentBox from './CommentBox';
import Reply from './Reply';

const Comment = ({ c }) => {
    const [showReplyBox, setShowReplyBox] = useState(false);
    console.log(c)
    return (
        <div className='p-2 my-2 dark:bg-slate-800 w-fit rounded lg:min-w-[500px] md:min-w-[400px] min-w-[250px] bg-slate-100'>
            <p className='font-semibold'>{c?.name}</p>
            <span className='text-gray text-xs'>{getTime(c?.submittedOn)}</span>
            <p>{c?.comment}</p>
            <button className='lg:hover:underline active:underline mt-4' onClick={()=>setShowReplyBox(!showReplyBox)}>{showReplyBox ? "hide reply box":"reply"}</button>
            {showReplyBox && <CommentBox comment_id={c?._id} isReply={true} key={c._id } />}
            {c?.replies?.length > 0 && c?.replies?.map((reply)=> <Reply r={reply} key={reply?._id}/> )} 
  
        </div>
    );
};

export default Comment;