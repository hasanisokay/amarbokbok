import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CommentBox = ({ isComment, blog_id, isReply, comment_id }) => {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);

    useEffect(() => {
        const previousName = localStorage.getItem("commenter");
        setName(previousName || "")
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isComment && !blog_id) return;
        if (isReply && !comment_id) return; 
        !isAnonymous && localStorage.setItem("commenter", name)
        const apiUrl = isComment ? "/api/new-comment" : "/api/new-reply"
        const formData = {
            name: isAnonymous ? 'Anonymous' : name,
        };
        if (isComment) {
            formData.comment = comment;
            formData.blog_id = blog_id
        }
        else if (isReply) {
            formData.reply = comment;
            formData.comment_id = comment_id
        }

        const res = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json();
        if (data?.status === 200) {
            toast.success(data?.message);
            setComment("")
        }
        else {
            toast.error(data?.message || "Error")
        }
    };

    return (
        <div className="mt-10 mb-4">
            <h4>{isComment ? "Leave a comment" : "Reply to this comment"} </h4>
            <form onSubmit={handleSubmit}>
                {!isAnonymous && (
                    <div className="mb-2">
                        <label htmlFor="name" className="block mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-fit p-2 border bg-transparent rounded"
                            required={!isAnonymous}
                        />
                    </div>
                )}
                <div className="mb-4">
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isAnonymous}
                            onChange={(e) => setIsAnonymous(e.target.checked)}
                            className="bg-blue-700 cursor-pointer"
                        />
                        <span className="ml-2">Stay Anonymous</span>
                    </label>
                </div>
                <div className="mb-4">
                    <label htmlFor="comment" className="block mb-2">{isComment ? "Comment" : "Reply"}</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-2 bg-transparent border rounded"
                        rows="4"
                        required
                    />
                </div>
                <button type="submit" className="btn-green">{isComment ? "Post" : "Reply"}</button>
            </form>
        </div>
    );
};

export default CommentBox;