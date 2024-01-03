import { useContext } from 'react';
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Contexapi from '../context/context';
import Loader from '../shared/Loader';

//images
import standard from '../images/yt-logo.png'
import mobile from '../images/yt-logo-mobile.png'

// icons 
import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";

function Header() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const { loading, mobilemenu, setMobilemenu } = useContext(Contexapi)

  const mobiletoggle = () => {
    setMobilemenu(!mobilemenu)
  }

  const navigate = useNavigate()

  const onSubmit = (data) => {
    navigate(`/searchResults/${data.inputvalue}`)
    reset()
  }

  const { pathname } = useLocation()
  const pageName = pathname?.split("/")?.filter(Boolean)?.[0];

  return (
    <div className='bg-black sticky top-0 flex flex-row justify-between items-center h-14 px-5'>
      {loading && <Loader />}

      <div className='flex h-8'>
        {pageName !== 'video' && (
          <div className="flex items-center md:mr-6 md:hidden justify-center cursor-pointer rounded-full hover:bg-[#303030]/[0.6] h-8 w-8" onClick={mobiletoggle}>
            {mobilemenu ? (
              <CgClose className='text-white' />
            ) : (
              <SlMenu className='text-white ' />
            )}
          </div>
        )}

        <Link to='/' className='flex items-center' >
          <img src={standard} alt="standard" className='h-full hidden dark:md:block' />
          <img src={mobile} alt="mobile" className=' h-full md:hidden' />
        </Link>

      </div>

    <div className='group flex items-center'>
      <form action="#" className='flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0 rounded-r-3xl'
       onSubmit={handleSubmit(onSubmit)} >
        <div className='w-10 items-center justify-center hidden group-focus-within:md:flex'>
        <IoIosSearch className="text-white text-xl" />
        </div>
        <input type="text" className='bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]'
        {...register('inputvalue' , {required : 'Input is Required'})} />
        <button className='w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]'>
        <IoIosSearch className="text-white text-xl" />
        </button>
      </form>
    </div>
   
      <div className='flex hidden md:flex justify-center items-center gap-4'>
        <RiVideoAddLine className='text-white text-[23px] cursor-pointer hover:text-slate-400'/>
        <FiBell className='text-white text-[23px] cursor-pointer hover:text-slate-400' />
        <img src="https://xsgames.co/randomusers/avatar.php?g=male" alt="img" className='rounded-full w-9 cursor-pointer' />
      </div>
    </div>
  )
}

export default Header;
