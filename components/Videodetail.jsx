import React from 'react'
import { useState, useContext, useEffect } from 'react';
import date from 'date-and-time';
import Contexapi from '../context/context';
import { abbreviateNumber } from "js-abbreviation-number";
import { AiOutlineLike } from "react-icons/ai";
import Suggestioncard from './Suggestioncard';
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom'
import fetchdataformapi from '../utils/api';
let apikey = import.meta.env.VITE_API_KEY

function Videodetail() {

  const [video, setVideo] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const { id } = useParams();
  const { setLoading } = useContext(Contexapi);

  useEffect(() => {
    fetchVideoDetails();
    fetchRelatedVideos();
  }, [id]);

  const fetchVideoDetails = () => {
    setLoading(true);
    fetchdataformapi(`videos?key=${apikey}&part=snippet,contentDetails,statistics&id=${id}`).then(({ items }) => {
      console.log(items);
      setVideo(items);
      console.log(id)
      console.log('video detail')
      setLoading(false);
    });
  };

  const fetchRelatedVideos = () => {
    setLoading(true);
    fetchdataformapi(`search?part=snippet&topicId=${id}&type=video&key=${apikey}&maxResults=25`).then(({ items }) => {
      console.log(items)
      setRelatedVideos(items);
      setLoading(false);
    });
  };


  return (
    <div className='flex  lg:flex-row bg-black h-[calc(100%-56px)] overflow-hidden  '>
      <div className='flex flex-col md:flex-row'>
        <div className='mt-7 flex-col flex'> 
          <div className=' relative w-full h-48 mb-5 md:w-[29rem] md:h-[15rem] md:ml-3 lg:w-[40rem] lg:h-[25rem] xl:w-[60rem] xl:h-[28rem] 2xl:w-[70rem] 2xl:h-[33rem] 2xl:flex 2xl:ms-20 2xl:me-20' >
            <ReactPlayer
              style={{ position: 'absolute', top: '0', left: '0' }}
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              playing={true}
              width='100%'
              height='100%'
              className='rounded-lg'
            />
          </div>
          <div className=' mt-2 justify-between hidden md:flex md:ml-3 lg:ml-5 xl:ml-10 xl:mr-10 2xl:mr-20 '>
            {
              video.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className='text-white flex flex-col'>
                      <p className=' text-[15px] text-white bg-red-500 px-2 rounded-lg font-bold text-xl'>{item.snippet.channelTitle}</p>
                      <p> {date.format(new Date(item.snippet.publishedAt), 'MMM DD, YYYY')}</p>
                    </div>
                    <div className='flex gap-2'>
                      <div className='flex items-center gap-1 bg-slate-700 rounded-xl text-white px-2'>
                        <span className='text-white'>{<AiOutlineLike />}</span> <span>Likes</span>  <p className=' text-[15px]'>{abbreviateNumber(item.statistics.likeCount, 2)}</p>

                      </div>
                      <div className='flex gap-1 bg-slate-700 items-center rounded-xl text-white px-2'>
                        <span>Views</span>  <p className=' text-[15px]'>{abbreviateNumber(item.statistics.viewCount, 2)}</p>

                      </div>
                    </div>


                  </React.Fragment>
                )
              })
            }
          </div>
        </div>

        <div className='flex flex-col py-6 px-4 overflow-y-auto md:w-[290px] lg:w-[350px] xl:w-[400px]'>
          {
            relatedVideos.map((item, index) => (
              <Suggestioncard key={`suggestion_${item.id}_${index}`} to={`/video/${item?.id?.videoId}`} video={item.snippet} />
            ))
          }
        </div>
      </div>
    </div>

    
  )
}

export default Videodetail;
