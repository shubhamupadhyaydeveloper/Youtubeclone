import React from 'react'

function Leftnavitem({name , icon , className , action}) {
  return (
    <div
        className={
            "text-white text-sm cursor-pointer h-[51.71px] flex items-center px-3 mb-[1px] rounded-lg hover:bg-white/[0.15] " +
            className
        }
        onClick={action}
    >
        <span className="text-xl mr-5">{icon}</span>
        {name}
    </div>
);
}

export default Leftnavitem;
