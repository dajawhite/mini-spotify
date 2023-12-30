import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import PlaylistView from '@/components/PlaylistView'
import Search from '@/components/Search'
import Library from '@/components/Library'
import Artist from '@/components/Artist'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [view, setView] = useState("search") // ["search", "library", "playlist", "artist"]
  const [globalPlaylistId, setGlobalPlaylistId] = useState(null)
  const [globalArtistId, setArtistId] = useState(null)

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
          globalPlaylistId={globalPlaylistId}
        />}
        {view === "search" && <Search/>}
        {view === "library" && <Library/>}
        {view === "artist" && <Artist/>}
       </div>



    </main>
    <div className='sticky z-20 bottom-0 h-24 w-full bg-red-100'></div>
    </>
  )
}
