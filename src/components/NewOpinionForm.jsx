'use client'
import newOpinion from '@/serverActions/newOpinion.mjs';
import { useState } from 'react';
import toast from 'react-hot-toast';

const NewOpinionForm = () => {
    const [shareName, setShareName] = useState(true);
    const [shareEmail, setShareEmail] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name: shareName ? e.target.name.value : null,
            email: shareEmail ? e.target.email.value : null,
            message: e.target.message.value,
        };
        const res = await newOpinion(formData);
        if (res.error) {
            toast.error(res.error);
        }
        else {
            toast.success("Thanks. It will be visible after admin approval.")
            e.target.reset();
        }
    };

    return (
        <div className="md:w-[70%] lg:w-[50%] my-4 w-full mx-auto rounded-lg bg-zinc-200 px-10 pb-10 pt-8 shadow-md dark:bg-zinc-900">
            <div className="mb-6">
                <h2 className="text-center text-3xl font-semibold tracking-tight">
                    Your Opinion
                </h2>
                <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                    I&apos;d love to hear from you!
                </p>
            </div>
            <form className="w-full space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
                    <label className="block font-medium" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="h-10 w-full text-black bg-slate-200 rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
                        id="name"
                        placeholder="Your Name"
                        name="name"
                        type="text"
                        disabled={!shareName}
                    />
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="shareName"
                            checked={shareName}
                            onChange={() => setShareName(!shareName)}
                        />
                        <label htmlFor="shareName" className="text-sm">
                            Share your name
                        </label>
                    </div>
                </div>
                <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
                    <label className="block font-medium" htmlFor="_email">
                        Email
                    </label>
                    <input
                        className="h-10 w-full text-black bg-slate-200 rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
                        id="_email"
                        placeholder="Your Email"
                        name="email"
                        type="email"
                        disabled={!shareEmail}
                    />
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="shareEmail"
                            checked={shareEmail}
                            onChange={() => setShareEmail(!shareEmail)}
                        />
                        <label htmlFor="shareEmail" className="text-sm">
                            Share your email
                        </label>
                    </div>
                </div>
                <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
                    <label className="block font-medium" htmlFor="_message">
                        Message
                    </label>
                    <textarea
                        className="min-h-[80px] text-black bg-slate-200 w-full rounded border px-3 py-2 leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
                        id="_message"
                        placeholder="What's on your mind?"
                        name="message"
                        required

                    />
                </div>
                <button
                    type="submit"
                    className="btn-green"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default NewOpinionForm;
