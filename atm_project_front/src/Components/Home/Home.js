import React from 'react';
import { Link } from 'react-router-dom';

export default function Home (){

    return(

        <div className='h-full flex justify-center items-center mt-[15vh] w-full'>

            <Link className='bg-[red] text-white text-[20px] p-[10px] font-semibold pr-[25px] pl-[25px] shadow-black shadow-md' to={'/inset'}>Inset Your Card</Link>
            
        </div>

    )

}