import { Route, Routes } from 'react-router-dom'
import ContexProvider from '../context/ContexProvider'
import Header from '../components/Header'
import Feed from '../components/Feed'
import Searchresult from '../components/Searchresult'
import Videodetail from '../components/Videodetail'
import './App.css'

function App() {

  return (
    <>
    <ContexProvider>
      <Header/>
      <Routes>
        <Route path='/' element={<Feed/>}/>
        <Route path='/searchResults/:query' element={<Searchresult/>}/>
        <Route path='/video/:id' element={<Videodetail/>}/>
      </Routes>
    </ContexProvider>
    </>
  )
}

export default App
