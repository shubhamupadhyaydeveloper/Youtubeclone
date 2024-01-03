import React from 'react';
import { useContext } from 'react';
import { categories } from '../utils/constants';
import Contexapi from '../context/context';
import Leftnavitem from './Leftnavitem';
import {useNavigate} from 'react-router-dom'

function Leftnav() {
  let { selectcategory, setSelectcategory, mobilemenu } = useContext(Contexapi)

  const handleaction = (name ,type) => {
    switch (type) {
      case 'category':
        return setSelectcategory(name);
      case 'home':
        return setSelectcategory(name);
      case 'menu':
        return false;
      default:
        break;
    }
  }

  const navigate = useNavigate()

  return (
  
    <div className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 md:translate-x-0 translate-x-[-240px] transition-all ${mobilemenu ? 'translate-x-0' : ''}`}>
      {categories.map((item) => {
        return (
          <React.Fragment key={item.name}>
            <Leftnavitem
              name={item.type == "home" ? "Home" : item.name}
              icon={item.icon}
              action={() => {
                handleaction(item.name , item.type)
                navigate('/')

              }}
              className={`${selectcategory == item.name ?
                "bg-white/[0.15]" : ""}`}
            />
            {
              item.divider && (
                <hr className='border-white/[0.2] my-5' />
              )
            }
          </React.Fragment>
        )
      })}

      <hr className="my-5 border-white/[0.2]" />
      <div className="text-white/[0.5] text-[12px] px-2">
        Clone by: Shubham Upadhyay
      </div>
    </div>
  )
}

export default Leftnav;
