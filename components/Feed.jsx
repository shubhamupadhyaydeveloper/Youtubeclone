import React from 'react'
import { useContext } from 'react';
import Leftnav from './Leftnav';
import Videocard from './Videocard';
import Contexapi from '../context/context';

function Feed() {
  let { loading, searchresult } = useContext(Contexapi)
  return (
    <div className='flex flex-row h-[calc(100%-56px)]'>
      <Leftnav />
      <div className='grow bg-black w-[calc(100%-240px)] overflow-y-auto '>
        <div className='grid md:grid-cols-2 lg:grid-cols-2 
         grid-cols-1 xl:grid-cols-4 gap-5 p-5'>
          {!loading && searchresult &&
            searchresult?.map((item) => {
              if (item.kind !== 'youtube#searchResult') return false;
              return (
                <Videocard
                key={item?.id?.videoId}
                to={`/video/${item?.id?.videoId}`}
                video={item?.snippet}
                />
              )
            }
            )}
        </div>
      </div>
    </div>
  )
}

export default Feed;
