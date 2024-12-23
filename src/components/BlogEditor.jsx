'use client'
import React, { useRef, useState, useEffect } from 'react';
import Editor from './Editor';
import toast from 'react-hot-toast';
import { Progress } from '@/loaders/Progress';
import checkLinkAvailability from '@/utils/checkLinkAvailability.mjs';
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import getCategories from '@/utils/getCategories.mjs';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
const BlogEditor = ({ postId }) => {
  const [range, setRange] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const [objectId, setObjectId]= useState(null);
  const [changeBlogId, setChangeBlogId]= useState(false);
  const [blogId, setBlogId] = useState("");
  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const [checking, setChecking] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(null);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const quillRef = useRef();
  const [loadingCategory, setLoadingCategory] = useState(false);
  const router = useRouter();
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [date, setDate] = useState(new Date());
  const [updatedOn, setUpdatedOn] = useState(new Date())

//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [visible, setVisible] = useState(true);
//   const handleScroll = () => {
//     if (window.scrollY > lastScrollY) {
//         setVisible(false);
//     } else {
//         setVisible(true);
//     }
//     setLastScrollY(window.scrollY);
// };
//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//         window.removeEventListener('scroll', handleScroll);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [lastScrollY]);


  useEffect(() => {
    setUpdatedOn(new Date(date));
  }, [date])
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
  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        try {
          const response = await fetch(`/api/get-single-blog?blog_id=${postId}`);
          const data = await response.json();
          if (data.status === 404) return router.push("/admin/blog-editor");
          setContent(data?.blog);
          setObjectId(data?.blog?._id)
          setBlogId(data?.blog?.blog_id);
          setTitle(data?.blog?.title);
          setSelectedCategories(data?.blog?.categories)
          setDate(new Date(data?.blog?.addedOn));
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      }
    };

    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);
  const fetchCategories = async () => {
    try {
      setLoadingCategory(true)
      const data = await getCategories()
      setAvailableCategories(data);
      setLoadingCategory(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const handleSave = async () => {
    if (!postId && (blogId.length < 1 || !isIdAvailable || checking)) {
      return toast.error("Insert a valid link for this post.");
    }
    if (title.length < 1) {
      return toast.error("Insert a valid title for this post.");
    }
    if(isSaving) return;
    const contentToSave = quillRef.current.getContents();
    setIsSaving(true);
    try {
      const response = postId
        ? await fetch(`/api/admin/edit-a-blog`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: contentToSave, updatedOn: new Date(updatedOn), blog_id: blogId, title: title,
            categories: selectedCategories, _id: objectId,
          }),
          credentials: "include"
        })
        : await fetch('/api/admin/add-new-blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: contentToSave,
            addedOn: new Date(date),
            blog_id: blogId,
            readCount: 0,
            title: title,
            categories: selectedCategories
          }), credentials: 'include'
        });
      const data = await response.json();

      if (data?.status === 200) {
        toast.success(data?.message || "Success");
        router.push(`/blogs/${blogId}`)
      } else {
        toast.error("Error, try again")
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
    finally{
      setIsSaving(false);
    }
  };

  return (
    <div className='mx-2'>
      <h1>{postId ? 'Edit Blog' : 'Create a New Blog'}</h1>
      {uploadPercentage !== 0 && <Progress number={uploadPercentage} />}
      <div className="relative w-max rounded-lg my-1 mx-2">
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="peer rounded-lg border  bg-transparent px-4 py-2  focus:outline-none" type="text" placeholder="" id="title" />
        <label className="absolute -top-2 left-[10px] rounded-md px-2 text-xs bg-slate-400 duration-300 peer-placeholder-shown:left-[14px] peer-placeholder-shown:top-3  peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:left-[10px] peer-focus:text-xs  dark:peer-focus:bg-[#0F172A] text-black" htmlFor="title">
          Title
        </label>
      </div>
      <div className='w-fit my-2 mx-2'>
        <div className='flex gap-2 flex-wrap mb-1'>
          <Select
            options={loadingCategory ? [{ value: '', label: 'Loading...' }] : availableCategories?.map(category => ({ value: category, label: category }))}
            onChange={option => setSelectedCategories((prev) => [...prev, option.value])}
            className='text-black min-w-[150px] w-fit'
            onMenuOpen={fetchCategories}
            placeholder="Select from previous category"
          />
          {
            selectedCategories?.length > 0 &&
            <div className='flex gap-3 flex-wrap'>
              Selected: {selectedCategories?.map((c, i) => <p key={i}>{c} <button className='text-red-500' title='delete' onClick={() => setSelectedCategories((prev) => prev.filter(ca => ca !== c))}>x</button> </p>)}
            </div>
          }
        </div>
        <div className='flex gap-1'>
          <input
            type="text"
            value={newCategory}
            className='focus:outline-none bg-white border rounded border-gray-400 p-1'
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Or add a new category"
          />
          <button className='btn-submit' onClick={() => {
            if(newCategory.trim()?.length < 1) return;
            setNewCategory("")
            setSelectedCategories((prev) => [...prev, newCategory.trim()])
          }
          }>add</button>
        </div>
      </div>
      <Editor
        ref={quillRef}
        setUploadPercentage={setUploadPercentage}
        readOnly={readOnly}
        defaultValue={content?.content}
        onSelectionChange={setRange}
      // onTextChange={(content, delta, source, editor) => setLastChange(content)}
      />
      <div className='flex gap-2 items-center'>
        {((!postId) || (postId && changeBlogId)) && <div className="relative w-max my-3">
          <input value={blogId} onChange={(e) => setBlogId(e.target.value)} className="peer h-[50px] border-b bg-blue-100 px-2 pt-4 focus:outline-none dark:bg-blue-500/20" type="text" id="linkInput" placeholder="" />
          <label className="absolute left-2 top-0.5 text-xs duration-300 peer-placeholder-shown:left-2 peer-placeholder-shown:top-[50%] peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-2 peer-focus:top-0.5 peer-focus:-translate-y-0 peer-focus:text-xs " htmlFor="linkInput">
            Link
          </label>
        </div>}
        {checking && <div className='flex text-sm items-center gap-2'>
          <p>Checking</p>
          <div className="w-4 h-4 animate-[spin_1s_linear_infinite] rounded-full border-2 border-r-transparent border-l-transparent border-sky-400"></div>
        </div>
        }
        {
          blogId.length > 0 && !postId && (isIdAvailable ? <p className='text-sm text-green-500'>Available</p> : <p className='text-sm text-red-500'>Not available</p>)
        }
        <div className="relative ml-10">
          <label className="block text-sm font-medium text-gray-700">Added On (yyyy-mm-dd)</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="yyyy-MM-dd"
            className="w-fit border mt-2 text-gray-700 bg-white text-black rounded-lg shadow-sm focus:outline-none"
          />
          {/* <small className='pr-2'>yyyy-mm-dd.</small> */}
          <small>Leave unchanged to use the {content?.timestamp ? "previous" : "current"} date.</small>
        </div>      
        </div>

{postId && <div>

  <input type="checkbox" name="changeBlogId" id="changeBlogId" checked={changeBlogId} onChange={()=>setChangeBlogId(!changeBlogId)} />
  <label htmlFor="changeBlogId">Want to change blog link</label>
</div> }

      <div className='my-4 ml-10'>
        <button type="button" className='btn-submit' onClick={handleSave}>
          {postId ? 'Update' : 'Submit'}
        </button>
      </div>

    </div>
  );
};

export default BlogEditor;
