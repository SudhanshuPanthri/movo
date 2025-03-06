import React from "react";
import './Embla CSS/embla.css';
import NowPlaying from "@/components/now-playing";
import Popular from "@/components/popular";
import TopRated from "@/components/top-rated";


export default function Home() {


    return (
        <main className="p-4">
            {/*<div className="my-10">*/}
            {/*    <header className="text-5xl font-bold mb-10">Hi, </header>*/}
            {/*</div>*/}
            <NowPlaying />
            <TopRated />
            <Popular />
        </main>
    );
}
