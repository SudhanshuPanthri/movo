"use client";

import React, { useEffect, useState } from "react";
import EmblaCarousel from "@/components/Carousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import '../app/Embla CSS/embla.css'
import Loader from "@/components/Loader";

interface Movie {
    id: number;
    title: string;
}

interface ImageData {
    backdrop: string;
    poster: string;
}

export default function Popular() {
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
    const [images, setImages] = useState<{ [key: number]: ImageData }>({});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getNowPlaying();
    }, []);

    const getNowPlaying = async () => {
        const response = await fetch("https://localhost:7073/api/tmdb/popular", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data: Movie[] = await response.json();
        setNowPlaying(data);

        // Fetch images for each movie asynchronously
        const imagesData: { [key: number]: ImageData } = {};

        for (const movie of data) {
            const imageResponse = await fetch(
                `https://localhost:7073/api/tmdb/images/${movie.id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const imageData = await imageResponse.json();
            const backdrop = imageData.backdrops?.[0]?.filePath || "";
            const poster = imageData.posters?.[0]?.filePath || "";

            imagesData[movie.id] = { backdrop, poster };
        }

        setImages(imagesData);
        setLoading(false); // Done loading
    };

    const OPTIONS: EmblaOptionsType = { dragFree: true };

    if(loading){
        <Loader />
    }

    return (
        <main className="flex gap-10">
            <div className="">
                <h2 className="text-3xl font-bold my-10">Popular</h2>
                <div className="flex flex-wrap gap-x-2">
                    <EmblaCarousel options={OPTIONS} slides={nowPlaying.map((movie) => ({
                        id: movie.id,
                        title: movie.title,
                        backdrop: images[movie.id]?.backdrop,
                        poster: images[movie.id]?.poster,
                        content:"popular"
                    }))} />
                </div>
            </div>
        </main>
    );
}
