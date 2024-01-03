import React from 'react';
import { Link } from 'react-router-dom'
import date from 'date-and-time';

function Searchcard({ to, video }) {
  return (

    <Link to={to}>
      <div className='flex flex-col md:flex-col lg:flex-row xl:flex-row' >
        <div className='lg:max-w-[22rem] xl:min-w-[30rem]'>
          <img src={video?.thumbnails?.high?.url} alt="" className='h-full w-full object-cover' />
        </div>
        <div className='flex  text-white mb-2 lg:mt-16 xl:mt-16'>
          <div className='flex flex-col ml-3 overflow-hidden'>
            <span className='text-sm font-bold line-clamp-2'>
              {video?.title}
            </span>
            <span className='text-[25px] font-semibold  text-white/[0.7] flex items-center'>
              {video?.author?.title}

            </span>
            <div className="flex text-[20px] font-semibold text-white/[0.7] truncate overflow-hidden">
              <span>{video?.channelTitle}</span>
              <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
                .
              </span>
              <span className="truncate">
                {date.format(new Date(video?.publishTime), 'MMM DD, YYYY')}
              </span>
            </div>

          </div>
        </div>
      </div>
    </Link>

  )
}

export default Searchcard;
