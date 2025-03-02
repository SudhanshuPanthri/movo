import React from 'react';
import {useRouter} from "next/navigation";
import {toast} from "sonner";

const Header=()=>{
    const router = useRouter();

    const handleLogout=()=>{
        localStorage.removeItem("token");
        router.push("/auth/login");
        toast.info("Going this soon :( ? bye");
    }

    return(
        <div className="w-full flex justify-between items-center p-4">
            <div className="">
                Logo
            </div>
            <div className="">
                <input className="h-8 p-5 outline-none border w-[24rem]" placeholder="Search movie..." type="text"/>
            </div>
            <div className="">
                <button className="bg-white text-[#000] py-1 px-4 cursor-pointer" onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    )
}

export default Header;