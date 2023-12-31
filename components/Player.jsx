import { headers } from '@/next.config';
import { PauseCircleIcon, PlayCircleIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

const Player = ({globalCurrentSongId, setGlobalCurrentSongId, setGlobalIsTrackPlaying, globalIsTrackPlaying}) => {
  const {data:session} = useSession()
  const [songInfo, setSongInfo] = useState(null)

  
  async function fetchSongInfo(trackId){
    if(trackId){
      const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`,{
        headers: {
          Authorization: `Bearer ${session.accessToken}` 
        }
      })
      const data = await response.json()
      setSongInfo(data)
    }
  }

  async function getCurrentPlaying(){
    const response = await fetch(`https://api.spotify.com/v1/me/player/currently-playing`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}` 
      }
    })
    if (response.status == 204){
      console.log("204 response from currently playing")
      return
    }
    const data = await response.json()
    return data
  }

  async function handlePlayPause(){
    if(session && session.accessToken){
      const data = await getCurrentPlaying()
      if(data?.is_playing){
        const response = await fetch("https://api.spotify.com/v1/me/player/pause", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session.accessToken}` 
          }
        })
        if(response.status == 204){
          setGlobalIsTrackPlaying(false)
        }
      }
      else{
        const response = await fetch("https://api.spotify.com/v1/me/player/play", {
          method: "PUT",
          headers:{
              Authorization: `Bearer ${session.accessToken}` 
          }
        })
        if(response.status == 204){
          setGlobalIsTrackPlaying(true)
          setGlobalCurrentSongId(data.item.id)
        }
      }
    }
    
  }


  useEffect(()=>{
    //fetch details of song & play
    async function f(){
      if (session && session.accessToken){
        if(!globalCurrentSongId){
          // get the currently playing song from spotify
          const data = await getCurrentPlaying()
          setGlobalCurrentSongId(data?.item?.id)
          if(data?.is_playing){
            setGlobalIsTrackPlaying(true)
          }
          await fetchSongInfo(data?.item?.id)
        } 
        else {
          // get song info
          await fetchSongInfo(globalCurrentSongId)
        }
      }
    }
    f()
  }, [globalCurrentSongId]) //refetch if global current song id changes

  return (
    <div className='h-24 bg-neutral-800 border-t border-neutral-700 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
      <div className='flex items-center space-x-4'>
        {/* song details */}
        {songInfo?.album.images[0].url && <img className='hidden md:inline h-10 w-10' src={songInfo.album.images[0].url}/>}
        <div>
          <p className='text-white text-sm'>{songInfo?.name}</p>
          <p className='text-neutral-400 text-xs'>{songInfo?.artists[0]?.name}</p>
        </div>
      </div>
      <div className='flex items-center justify-center'>
        {globalIsTrackPlaying? <PauseCircleIcon onClick={handlePlayPause} className='h-10 w-10'/>:<PlayCircleIcon onClick={handlePlayPause} className='h-10 w-10'/>}
      </div>
      <div></div>
    </div>
  )
}

export default Player;