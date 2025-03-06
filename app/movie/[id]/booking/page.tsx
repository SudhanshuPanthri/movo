"use client";
import { useState, useEffect } from 'react';
import { AirPlaneSeat } from "@deemlol/next-icons";

const BookingPage = () => {
    const [seats, setSeats] = useState([]);

    const seatTypeMap = new Map([
        [0, "Regular"],
        [1, "Premium"],
        [2, "VIP"]
    ]);

    const getSeats = async () => {
        // Hardcoding theatre number for now
        const res = await fetch("https://localhost:7073/api/seats/theatre/12");
        const data = await res.json();
        if (data.length > 0) {
            setSeats(data);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getSeats();
            console.log("hello");
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, []);

    const chunkSeats = (seats, chunkSize) => {
        const result = [];
        for (let i = 0; i < seats.length; i += chunkSize) {
            result.push(seats.slice(i, i + chunkSize));
        }
        return result;
    };

    const returnSeatClass = (id) => {
        const seatType = seatTypeMap.get(id);
        if (seatType === "Regular") {
            return "bg-green-500";
        } else if (seatType === "Premium") {
            return "bg-blue-500";
        } else if (seatType === "VIP") {
            return "bg-red-500";
        }
    }

    const isSeatBooked = (id) => {
        const seat = seats.find(seat => seat.seatId === id);
        if (seat) {
            return seat.isBooked ? "text-red-500" : "text-green-500";
        }
        return "text-gray-500";
    };

    const seatRows = chunkSeats(seats, 10);

    const rowLabels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    return (
        <main className="p-4">
            <div className="flex flex-col gap-10">
                {seatRows.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-10 justify-evenly items-center">
                        <div className="flex flex-col items-center gap-2">
                            <h2 className="font-bold text-3xl">{rowLabels[rowIndex]}</h2>
                            <div className="flex gap-10 justify-evenly items-center">
                                {row.map((seat, index) => (
                                    <div key={index} className={`flex items-center gap-2 justify-center h-18 w-18`}>
                                        <AirPlaneSeat size={24} className={`${isSeatBooked(seat.seatId)} h-16 w-16`} />
                                        <h1>{seat.seatNumber}</h1>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default BookingPage;
