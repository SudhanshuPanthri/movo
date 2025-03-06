"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import {useRouter} from "next/navigation";

const MoviePage = () => {
    const [movieDetails, setMovieDetails] = useState<any>(null);
    const { id } = useParams();
    const searchParams = useSearchParams();
    const imgUrl = searchParams.get("imgUrl");
    const router=useRouter();


    const BookTicket=(id:number)=>{
        router.push(`/movie/${id}/booking`);
    }

    // Fetch movie details if id exists
    useEffect(() => {
        if (id) {
            const fetchMovieDetails = async () => {
                const response = await fetch(`https://localhost:7073/api/tmdb/details/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                setMovieDetails(data);
            };
            fetchMovieDetails();
        }
    }, [id]);

    if (!movieDetails) {
        return <Loader />;
    }

    // Make sure to handle the imgUrl correctly by removing any leading slash
    const imageUrl = imgUrl ? `https://image.tmdb.org/t/p/w500/${imgUrl.replace(/^\/+/, "")}` : "";

    return (
        <div className="flex h-full w-full p-4">
            <div className="w-1/3">
                {imageUrl && <img src={imageUrl} alt="Movie Image" />}
            </div>
            <div className="w-2/3 p-6">
                <div className="flex flex-col gap-6">
                    <h1 className="text-4xl font-semibold">{movieDetails.title}</h1>
                    <div className="flex gap-4">
                        {movieDetails.genres.map((genre)=>(
                            <span className="bg-white text-black px-4 py-1 hover:bg-white/80 cursor-pointer transition-all ease-in-out duration-200 rounded-sm" key={genre.id}>{genre.name}</span>
                        ))}
                    </div>
                    <div className="w-1/2 flex flex-col gap-10">
                        <p className="leading-8 text-xl">{movieDetails.overview}</p>
                        <h2 className="text-xl">Status : {movieDetails.status}</h2>
                    </div>
                </div>
                <button onClick={()=>BookTicket(movieDetails.id)} className="border py-2 px-4 mt-10 hover:border-none hover:scale-105 hover:bg-white hover:text-black transition-all duration-00 cursor-pointer">Book Ticket</button>
            </div>
        </div>
    );
};

export default MoviePage;
