import React from "react";
import {useState , useEffect , useContext} from 'react'
import {useParams} from 'react-router-dom'
import Contexapi from "../context/context";
import Searchcard from "./Searchcard";
import Leftnav from './Leftnav';
import fetchdataformapi from '../utils/api';
let apikey = import.meta.env.VITE_API_KEY

function Searchresult() {
  const [searchquery , setSearchquery] = useState([])
  let {setLoading} = useContext(Contexapi)
  const {query} = useParams()

  useEffect(() => {
    fetchdataformsearchquery()
  }, [query])

  const fetchdataformsearchquery = () => {
    fetchdataformapi(`search?key=${apikey}&part=snippet&q=${query}&maxResults=25`).then(({items}) => {
      console.log(items)
      setSearchquery(items)
      console.log('search results search')
      setLoading(false)
    })
  }

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
    <Leftnav/>
    <div className='grow bg-black w-[calc(100%-240px)] overflow-y-auto xl:pl-24 '>
    <div className='grid md:grid-cols-1 lg:grid-cols-1 
     grid-cols-1 xl:grid-cols-1 gap-5 p-5'>
      { searchquery &&
        searchquery?.map((item) => {
          if (item.kind !== 'youtube#searchResult') return false;
          return (
            <Searchcard
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

export default Searchresult;
