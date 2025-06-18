import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '../redux/jobSlice';

function HeroSection() {
   const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 mt-3'>
            <span className='mx-auto px-4 py-4 rounded-full bg-gray-500 text-[#ffffff] font-medium'>No. 1 Job Hunt Website</span>
            <h1 className='text-5xl  font-bold'>Search, Apply & <br /> Get Your <span className='text-red-500'>Dream Job</span></h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate veniam assumenda consectetur id dolor!</p>
            <div className='flex  w-[40%] shadow-lg border border-gray-400 pl-3 rounded-full items-center gap-4 mx-auto'>
                <input 
                type="text"
                placeholder='Find Your Job'
                onChange={(e) => setQuery(e.target.value)}
                className='w-full text-1xl outline-none px-3 p-4'
                 />
                 <Button onClick={searchJobHandler} className="h-12 w-14 p-7 rounded-full">
                    <Search/>
                 </Button>
            </div>
        </div>
          </div>
  )
}

export default HeroSection
