"use client";

import React, {ChangeEvent, useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import Loader from "@/components/Loader";

const RegisterPage=()=>{
    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState("");
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

    const handleRegister=async()=>{

        if(name==="" || email===""){
            toast.error("You can't leave them empty :x");
            return;
        }

        if(password!==confirmPassword || password==="" || confirmPassword===""){
            toast.error("Passwords do not match, try again :x");
            return;
        }

        if(password.length<6){
            toast.error("Password length should be more than 6 characters");
            return;
        }

        try{
            const response=await fetch("https://localhost:7073/api/auth/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({name,email, password}),
            })

            if(response.ok){
                toast.success("Registration successfull, welcome to the club");
                router.push("/auth/login");
            }
            else{
                toast.error("Registration failed, something went wrong :x");
            }
        }
        catch (error:unknown){
            toast.error("Registration failed, something went wrong :x");
        }
    }

    if(loading){
        <Loader />
    }

    return(
        <div className="w-[100vw] h-[100vh] flex">
            <div className="bg-[#18181b] w-1/2 h-full relative hidden md:block">
                <img className="absolute top-0 left-0 w-full h-full object-cover" src="https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg" alt="https://www.pexels.com/@nathan-engel-50858/"/>
            </div>
            <div className="w-full md:w-1/2 h-full flex flex-col py-4 px-2">
                <div className="h-1/16 flex justify-between items-center px-2">
                    <img src="/logo.png" alt="logo" height={50} width={50} className=""/>
                    <Link href="/auth/login"  className="hover:bg-gray-800 px-4 py-2 border cursor-pointer">Login</Link>
                </div>
                <div className="h-15/16 flex justify-center items-center flex-col gap-6">
                    <h2 className="font-bold text-3xl">Create an account</h2>
                    <p className="text-gray-400">Enter your email below to create your account</p>
                    <input className="h-8 p-5 outline-none border w-[24rem]" placeholder="Your Name" type="email" value={name} onChange={(e:ChangeEvent<HTMLInputElement>   )=>setName(e.target.value)}/>
                    <input className="h-8 p-5 outline-none border w-[24rem]" placeholder="Your Email" type="email" value={email} onChange={(e:ChangeEvent<HTMLInputElement>   )=>setEmail(e.target.value)}/>
                    <input className="h-8 p-5 outline-none border w-[24rem]" placeholder="Password" type="password" value={password} onChange={(e:ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)}/>
                    <input className="h-8 p-5 outline-none border w-[24rem]" placeholder="Confirm Password" type="password" value={confirmPassword} onChange={(e:ChangeEvent<HTMLInputElement>)=>setConfirmPassword(e.target.value)}/>
                    <button className="bg-white text-[#000] py-2 px-6 cursor-pointer" onClick={handleRegister}>Sign Up</button>
                </div>
                <div className="flex items-center justify-center">
                    <p>movo &trade; 2025 &reg; </p>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;