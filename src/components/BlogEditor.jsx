'use client'
import React, { useRef, useState, useEffect } from 'react';
import Editor from './Editor';
import toast from 'react-hot-toast';
import { Progress } from '@/loaders/Progress';
import checkLinkAvailability from '@/utils/checkLinkAvailability.mjs';
import { useRouter } from 'next/navigation';

const BlogEditor = ({ postId }) => {
  // todos: add category
  const [range, setRange] = useState();
  const [blogId, setBlogId] = useState("");
  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const [checking, setChecking] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [content, setContent] = useState(null);
  const quillRef = useRef();
  const router = useRouter();
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10)); // Initialize date with today's date in ISO format
const [updatedOn, setUpdatedOn] = useState(new Date().toISOString().substr(0, 10))
  useEffect(() => {
    const isAvailable = async () => {
      setChecking(true);
      const res = await checkLinkAvailability(blogId);
      setIsIdAvailable(res);
      setChecking(false);
    }
    if (blogId.length > 1) {
      const timer = setTimeout(() => {
        isAvailable();
      }, 2000); // 2000 milliseconds = 2 seconds
      return () => clearTimeout(timer);
    }
  }, [blogId])
console.log(content)
  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        try {
          const response = await fetch(`/api/get-single-blog?blog_id=${postId}`);
          const data = await response.json();
          setContent(data?.blog);
          setDate(new Date(data?.blog?.timestamp).toISOString().substr(0, 10));
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      }
    };

    fetchPost();
  }, [postId]);

  console.log(date)
  const handleSave = async () => {
    if (blogId.length < 1 || !isIdAvailable || checking) {
      return toast.error("Insert a valid link for this post.");
    }

    const contentToSave = quillRef.current.getContents();
    try {
      const response = postId
        ? await fetch(`/api/posts/${postId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: contentToSave, updatedOn: updatedOn, link: blogId }),
        })
        : await fetch('/api/admin/add-new-blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: contentToSave,
            timestamp: date,
            blog_id: blogId
          }),
        });
      const data = await response.json();
      console.log('Post saved:', data);
      if (data?.status === 200) {
        toast.success("Added.");
        router.push(`/blogs/${blogId}`)
      } else {
        toast.error("Error, try again")
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  return (
    <div>
      <h1>{postId ? 'Edit Post' : 'Create a New Post'}</h1>
      {uploadPercentage !== 0 && <Progress number={uploadPercentage} />}
      <Editor
        ref={quillRef}
        setUploadPercentage={setUploadPercentage}
        readOnly={readOnly}
        defaultValue={content?.content}
        onSelectionChange={setRange}
      // onTextChange={(content, delta, source, editor) => setLastChange(content)}
      />
      <div className='flex gap-2 items-center'>
        <div className="relative w-max my-3">
          <input value={blogId} onChange={(e) => setBlogId(e.target.value)} className="peer h-[50px] border-b bg-blue-100 px-2 pt-4 focus:outline-none dark:bg-blue-500/20" type="text" id="linkInput" placeholder="" />
          <label className="absolute left-2 top-0.5 text-xs duration-300 peer-placeholder-shown:left-2 peer-placeholder-shown:top-[50%] peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-2 peer-focus:top-0.5 peer-focus:-translate-y-0 peer-focus:text-xs " htmlFor="linkInput">
            Link
          </label>
        </div>
        {checking && <div className='flex text-sm items-center gap-2'>
          <p>Checking</p>
          <div className="w-4 h-4 animate-[spin_1s_linear_infinite] rounded-full border-2 border-r-transparent border-l-transparent border-sky-400"></div>
        </div>
        }
        {
          blogId.length > 0 && (isIdAvailable ? <p className='text-sm text-green-500'>Available</p> : <p className='text-sm text-red-500'>Not available</p>)
        }
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Leave unchanged to use the {content?.timestamp ? "previous": "current" } date.</label>
          <input
            type="date"
            value={date}
            onChange={(e)=>setDate(e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Updated on</label>
          <input
            type="date"
            value={updatedOn}
            onChange={(e)=>setUpdatedOn(e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>


      <div className='mt-4'>
        <button type="button" className='btn-submit' onClick={handleSave}>
          {postId ? 'Update' : 'Submit'}
        </button>
      </div>

    </div>
  );
};

export default BlogEditor;
