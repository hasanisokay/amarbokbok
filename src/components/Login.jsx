'use client'

import AuthContext from "@/contexts/AuthContext.mjs";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const router = useRouter();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^\d{4,}$/;
        if (!emailRegex.test(email) || !passwordRegex.test(password)) {
            return toast.error("Invalid Inputs");
        }
        const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        const data = await res.json();
        if (data.status === 200) {
            toast.success(data?.message);
            setCurrentUser(data?.user)
            router.push("/admin");
        }
        else {
            return toast.error(data?.message);
        }
    } 
    // if(currentUser) return router.push('/admin')
    return (
        <div className="w-full mx-auto lg:w-[800px] shadow-lg bg-white flex group text-[#0095ff] mt-10">
            <div className="w-1/2 min-h-full bg-[#0095ff] relative overflow-hidden hidden lg:block">
                <h1 className="text-white text-2xl absolute bottom-3 right-3 text-right">Hey! <br /> Welcome to<br /> Admin</h1>
                <span className="bg-sky-800/20 w-32 h-32 -top-8 -left-8 rounded-full absolute z-20 group-hover:w-56 group-hover:h-56 duration-500"></span>
                <span className="bg-sky-800/50 w-36 h-36 -top-5 -left-5  rounded-full absolute z-10"></span>
            </div>
            <form className="p-8 flex-1" onSubmit={handleSubmit}>
                <h1 className="text-center">Admin Login</h1>
                <div className="space-y-5">
                    <label htmlFor="email222_" className="block">Email</label>
                    <input id="email222_" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@example.com" className="p-3 block w-full shadow-lg outline-none border-2 rounded-md   invalid:border-red-700 valid:border-[#0095ff]" />
                    <label htmlFor="password222_" className="block">Password</label>
                    <input id="password222_" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder=".............." min={5} className="p-3 block w-full shadow-lg outline-none border-2 rounded-md  invalid:border-red-700 valid:border-[#0095ff]" />
                </div>
                <button type="submit" onClick={handleSubmit} className="py-2 px-5 mb-4 mt-8 overflow-hidden shadow-lg border-2 rounded-md  border-[#0095ff] before:block before:absolute before:translate-x-full before:inset-0 before:bg-[#0095ff] before:hover:translate-x-0  before:duration-300 before:rounded-s-full before:-z-10 after:-z-10 after:rounded-e-full after:duration-300 after:hover:translate-x-0 after:block after:absolute after:-translate-x-full after:inset-0 after:bg-[#0095ff] relative inline-block hover:text-white z-50">Submit</button>
            </form>
        </div>
    );
};

export default Login;