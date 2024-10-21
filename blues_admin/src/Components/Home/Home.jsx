import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home (){

    const [getusers,setgetusers] = useState()
    console.log(getusers)

    useEffect(()=>{
        fetch("http://localhost:8000/api/v1/get_users",)
        .then(res => res.json())
        .then(user => setgetusers(user))
    },[])

    return(

      <div className="flex flex-col p-6 gap-8 bg-gray-50 min-h-screen">
      <div className="flex justify-end">
        <Link
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full transition-all duration-200 shadow-md"
          to="/add"
        >
          ADD User
        </Link>
      </div>
      <div className="flex flex-col border border-black shadow-lg bg-white rounded-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between bg-gray-200 text-gray-800 font-semibold p-4">
          <p className="w-full sm:w-1/12 text-left">S.NO</p>
          <p className="w-full sm:w-3/12 text-left">NAME</p>
          <p className="w-full sm:w-4/12 text-left">ACCOUNT NUMBER</p>
          <p className="w-full sm:w-2/12 text-center">ACTION</p>
        </div>
    
        {getusers ? (
          getusers.test.map((user, index) => (
            <div
              key={user.Account_Number}
              className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 p-4 hover:bg-gray-100"
            >
              <p className="w-full sm:w-1/12 text-left">{index + 1}</p>
              <p className="w-full sm:w-3/12 text-left">{user.Username}</p>
              <p className="w-full sm:w-4/12 text-left">{user.Account_Number}</p>
              <Link
                className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 transition-all duration-200 text-center w-full sm:w-2/12 mt-2 sm:mt-0"
                to={`/view/${user._id}`}
              >
                View
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-600">Loading...</div>
        )}
      </div>
    </div>
    
      
    )

}