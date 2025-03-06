"use client";
import {useState,useEffect} from 'react';


const BookingPage=()=>{
    const [seats,setSeats]=useState([]);

    const seatTypeMap=new Map([
        [0,"Regular"],
        [1,"Premium"],
        [2,"VIP"]
    ])

    const getSeats=async()=>{
        //hardcoding theatre number for now
        const res=await fetch("https://localhost:7073/api/seats/theatre/12");
        const data=await res.json();
        if(data.length>0){
            setSeats(data);
        }
    }

    useEffect(() => {
        getSeats();
    }, []);

    const chunkSeats = (seats, chunkSize:number) => {
        const result = [];
        for (let i = 0; i < seats.length; i += chunkSize) {
            result.push(seats.slice(i, i + chunkSize));
        }
        return result;
    };

    const returnSeatClass=(id:number)=>{
        const seatType=seatTypeMap.get(id);
        if(seatType==="Regular"){
            return "bg-green-500"
        }
        else if(seatType==="Premium"){
            return "bg-blue-500"
        }
        else if(seatType==="VIP"){
            return "bg-red-500"
        }
    }

    // Group the seats into rows of 10
    const seatRows = chunkSeats(seats, 10);

    return (
        <main className="p-4">
            <div className="flex flex-col gap-10">
                {seatRows.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-10 justify-evenly items-center">
                        {row.map((seat, index) => (
                            <div key={index} className={`flex items-center gap-2 justify-center border h-18 w-18 ${returnSeatClass(seat.type)} `}>
                                <h1>{seat.seatNumber}</h1>
                                <p>{seat.type}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </main>
    )
}

export default BookingPage;