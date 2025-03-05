"use client"

import React, {useState,useEffect} from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import {toast} from "sonner";
import Loader from "@/components/Loader";

const LoginPage=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading,setLoading]=useState(true);
    const router=useRouter();

    useEffect(()=>{
        const token=localStorage.getItem("token");
        if(token){
            router.push("/")
        }
        else{
            setLoading(false);
        }
    },[router])

    const handleLogin=async ()=>{
        try{
            const response=await fetch("https://localhost:7073/api/auth/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({email,password}),
            })
            console.log(response)
            if(response.ok){
                const data=await response.json();
                localStorage.setItem("token",data.token);
                toast.success("Login successfull, redirecting you soon :3");
                setEmail("");
                setPassword("")
                router.push("/");
            }
            else{
                toast.error("Login failed, check your credentials :x");
            }
        }
        catch (error:unknown){
            toast.error("Login failed, something went wrong :x");
        }
    }

    if(loading){
        <Loader />
    }
    return (
        <div className="w-[100vw] h-[100vh] flex">
            <div className="bg-[#18181b] w-1/2 h-full relative hidden md:block">
                <h1 className="text-4xl font-semibold absolute z-99 left-50 right-50 top-[50%] bottom-[50%] italic">We have made movies booking fun.</h1>
                <img className="absolute top-0 left-0 w-full h-full object-cover"
                     src="https://images.pexels.com/photos/7729564/pexels-photo-7729564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                     alt="https://www.pexels.com/@guyjoben/"/>
            </div>
            <div className="w-full md:w-1/2 h-full flex flex-col py-4 px-2">
                <div className="h-1/16 flex justify-between items-center px-2">
                    <img src="/logo.png" alt="logo" height={50} width={50} className=""/>
                    <Link href="/auth/register"  className="hover:bg-gray-800 px-4 py-2 border cursor-pointer">Sign Up</Link>
                </div>
                <div className="h-15/16 flex justify-center items-center flex-col gap-6">
                    <h2 className="font-bold text-3xl">Got an account ?</h2>
                    <p className="text-gray-400">Enter your credentials to proceed</p>
                    <input className="h-8 p-5 outline-none border w-[24rem]" placeholder="Your Email" type="email"
                           value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input className="h-8 p-5 outline-none border w-[24rem]" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button onClick={handleLogin} className="bg-white text-[#000] py-2 px-6 cursor-pointer">Log In</button>
                </div>
                <div className="flex items-center justify-center">
                    <p>movo &trade; 2025 &reg; </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;