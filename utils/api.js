import axios from "axios";

const baseurl = 'https://www.googleapis.com/youtube/v3'

const fetchdataformapi = async (query) => {
  let {data} = await axios.get(`${baseurl}/${query}`)
  return data;
}

export default fetchdataformapi;