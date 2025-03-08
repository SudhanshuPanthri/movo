"use client";

import { useEffect,useState } from "react";
import { Video } from "@deemlol/next-icons";

const TheatersNearYou=()=>{
    const [theaters,setTheaters]=useState([]);

    const location=localStorage.getItem("location");
    const city=location?.split(",")[0].trim();
    const getTheaters=async()=>{
        const response=await fetch(`https://localhost:7073/api/theaters/location/${city}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        const data=await response.json();
        setTheaters(data);
    }

    useEffect(()=>{
        getTheaters();
    },[])

    return(
        <div className="flex items-center justify-center flex-col gap-4">
            <h1 className="text-2xl font-bold">Theaters near you</h1>
            <div className="flex items-center justify-center gap-4">
                {theaters.map((theater)=>(
                    <div className="flex items-center justify-center flex-col gap-4 p-4 cursor-pointer bg-[#18181b] rounded-lg" key={theater.id}>
                        <Video size={24} className="text-green-400"  />
                        <h2>{theater.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TheatersNearYou;