import React from 'react'

const Song = ({sno, track,}) => {

    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return (
            seconds == 60 ?
                (minutes + 1) + ":00" :
                minutes + ":" + (seconds < 10 ? "0" : "") + seconds
        );
    }

  return (
    <div className='grid grid-cols-2 text-neutral-400 text-sm py-4 px-5 hover:bg-white hover:bg-opacity-10 rounded-lg cursor-default'>
        <div className='flex items-center space-x-4'>
            <p className='w-5'>{sno + 1}</p>
            <img className='h-10 w-10' src={track.album.images[0].url}/>
            <div>
                <p className='w-36 lg:w-64 text-white text-base truncate'>{track.name}</p>
                <p className='w-36 truncate'>
                    {
                        track.artists.map((artist, i) =>{
                            return(
                                <>
                                    <span className='hover:underline'>{artist.name}</span>
                                    <span>{i != track.artists.length -1 ? ", ": null}</span> {/**if not last artist in the list add a comma */}
                                </>
                            )
                        })

                    }
                </p>
            </div>
        </div>
        <div className='flex items-center justify-between '>
            <p className='w-40 truncate hidden md:inline'>{track.album.name}</p>
            <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
        </div>
    </div>
  )
}

export default Song