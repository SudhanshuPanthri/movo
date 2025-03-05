"use client";

import React, { useEffect, useState } from "react";
import EmblaCarousel from "@/components/Carousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import './Embla CSS/embla.css';

interface Movie {
    id: number;
    title: string;
}

interface ImageData {
    backdrop: string;
    poster: string;
}

export default function Home() {
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
    const [images, setImages] = useState<{ [key: number]: ImageData }>({});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getNowPlaying();
    }, []);

    const getNowPlaying = async () => {
        const response = await fetch("https://localhost:7073/api/tmdb/now-playing", {
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

    if (loading) {
        return <div>Loading...</div>; // You can add a loading spinner here
    }

    return (
        <main className="w-full p-4 flex gap-10 flex-col">
            <div>
                <header className="text-6xl font-bold">Hi, xyz</header>
            </div>
            <div className="">
                <h2 className="text-3xl font-bold">Now Playing</h2>
                <div className="flex flex-wrap gap-x-2">
                    {/* Pass the actual movie data to EmblaCarousel */}
                    <EmblaCarousel options={OPTIONS} slides={nowPlaying.map((movie) => ({
                        id: movie.id,
                        title: movie.title,
                        backdrop: images[movie.id]?.backdrop,
                        poster: images[movie.id]?.poster,
                    }))} />
                </div>
            </div>
        </main>
    );
}
