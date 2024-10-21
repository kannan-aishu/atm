import React from 'react';
import { Link } from 'react-router-dom';

export default function Insetcard (){

    return(

        <div className='flex flex-col justify-between h-full'> 
            
        <Link to={'/'} className='bg-[red] text-[20px] p-[10px] w-[20%] text-center ml-[40%] text-white shadow-black shadow-md'>Exit</Link>

        </div>
    )

}