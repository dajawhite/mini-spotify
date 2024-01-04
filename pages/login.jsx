import React from "react";
import { signIn } from "next-auth/react"


const Login = () => {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-white space-y-8">
            <div className=" text-center px-32 space-y-2">
                <h1 className=" font-bold">Spotify Web API Project</h1>
                <h2 className=" italic">How to use this app?</h2>
                <ul className=" px-48 text-left list-disc">
                    <li>Play songs through the Spotify app on an active device (for Spotify Premium users)</li>
                    <li>View featured Spotify playlists</li>
                    <li>View your playlists</li>
                    <li>Search Spotify for artists, playlists, and songs</li>
                </ul>
            </div>
            <button className="text-white px-8 py-2 rounded-full bg-green-500 font-bold" onClick={() => signIn('spotify',{ callbackUrl: "/"})}>Login with Spotify</button>
        </div>
    )
}

export default Login;