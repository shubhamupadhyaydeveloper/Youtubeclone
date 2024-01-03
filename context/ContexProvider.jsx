import Contexapi from "./context";
import fetchdataformapi from "../utils/api";
import { useEffect , useState} from "react";

const ContexProvider = ({children}) => {
  let [loading , setLoading] = useState(false)
  let [mobilemenu , setMobilemenu ] = useState(false)
  let [searchresult , setSearchresult] = useState([])
  let [selectcategory , setSelectcategory] = useState('New')

  const apikey = import.meta.env.VITE_API_KEY

  useEffect(() => {
    fetchdatacategory(selectcategory)
  } , [selectcategory])

  const fetchdatacategory = (query) => {
    setLoading(true)
    fetchdataformapi(`search?key=${apikey}&part=snippet&q=${query}&maxResults=25`).then(({items}) => {
      console.log(items)
      setSearchresult(items)
      console.log('home search')
      setLoading(false)
    })
  }

  return (
    <Contexapi.Provider value={{
        loading,
        setLoading,
        mobilemenu,
        setMobilemenu,
        searchresult,
        selectcategory,
        setSelectcategory
    }}>
    {children}
    </Contexapi.Provider>
  )
}

export default ContexProvider