"use client";

import React, {useEffect,useState} from 'react';
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {jwtDecode} from "jwt-decode";

const Header=()=>{
    const router = useRouter();
    const [name,setName]=useState("");

    useEffect(()=>{
        const token=localStorage.getItem("token");
        if(token){
            const {email}=jwtDecode(token);
            setName(email.charAt(0).toUpperCase());
        }
        else{
            console.error("Failed to decode token");
        }
    })

    const handleLogout=()=>{
        localStorage.removeItem("token");
        router.push("/auth/login");
        toast.info("Going this soon :( ? bye");
    }

    return(
        <div className="w-full flex justify-between items-center p-4">
            <div>
                <img src="/logo.png" alt="logo" height={50} width={50} className=""/>
            </div>
            <div className="">
                <input className="h-8 p-5 outline-none border w-[24rem]" placeholder="Search movie..." type="text"/>
            </div>
            <div className="flex gap-4">
                <div className="border h-10 w-10 rounded-full flex items-center justify-center">
                    <h2 className="font-bold text-xl">{name}</h2>
                </div>
                <button className="bg-white text-[#000] py-1 px-4 cursor-pointer" onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    )
}

export default Header;