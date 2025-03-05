"use client";

import React, {ChangeEvent, useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

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
        return (
            <div role="status" className="flex items-center justify-center w-[100vw] h-[100vh]">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"/>
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        )
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