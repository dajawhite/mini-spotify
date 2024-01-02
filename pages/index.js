import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import PlaylistView from '@/components/PlaylistView'
import Search from '@/components/Search'
import Library from '@/components/Library'
import Artist from '@/components/Artist'
import Player from '@/components/Player'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [view, setView] = useState("search") // ["search", "library", "playlist", "artist"]
  const [globalPlaylistId, setGlobalPlaylistId] = useState(null)
  const [globalArtistId, setGlobalArtistId] = useState(null)
  const [globalCurrentSongId, setGlobalCurrentSongId] = useState(null)
  const [globalIsTrackPlaying, setGlobalIsTrackPlaying] = useState(false)


  return (
    <>
    <main className='h-screen overflow-hidden bg-black'>
      <div className='flex w-full'>
        <Sidebar
          view={view}
          setView={setView} // this is how sidebar component will be able to change the main view
          setGlobalPlaylistId={setGlobalPlaylistId}

        />
        {view === "playlist" && <PlaylistView
        setView={setView}
        setGlobalArtistId={setGlobalArtistId}
          globalPlaylistId={globalPlaylistId}
          setGlobalCurrentSongId={setGlobalCurrentSongId}
          setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
        />}
        {view === "search" && <Search 
        setView={setView} // this is how sidebar component will be able to change the main view
        setGlobalPlaylistId={setGlobalPlaylistId}
        setGlobalCurrentSongId={setGlobalCurrentSongId}
          setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
          setGlobalArtistId={setGlobalArtistId}
          />}
        {view === "library" && <Library
        setView={setView} // this is how sidebar component will be able to change the main view
        setGlobalPlaylistId={setGlobalPlaylistId}/>}
        {view === "artist" && <Artist
        setView={setView}
        globalArtistId={globalArtistId}
        setGlobalArtistId={setGlobalArtistId}
        setGlobalCurrentSongId={setGlobalCurrentSongId}
        setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
        />}
       </div>
       <div className='sticky z-20 bottom-0 h-24 w-full'>
        <Player 
        globalCurrentSongId={globalCurrentSongId}
        setGlobalCurrentSongId={setGlobalCurrentSongId}
        setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
        globalIsTrackPlaying={globalIsTrackPlaying}/>
      </div>



    </main>
    
    </>
  )
}
