import { useNavigate } from 'react-router-dom';
import { Badge } from './ui/badge'
import React from 'react'

function LatestJobCards({job}) {
    const navigate = useNavigate();
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer'>
        <div>
            <h1 className='font-medium text-lg my-2'>{(job?.company?.name).toUpperCase()}</h1>
            <p className='text-sm text-gray-400 font-bold'>India</p>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>{(job?.title).toUpperCase()}</h1>
            <p className='text-sm text-gray-800 font-bold my-2 '>{job?.description}</p>
        </div>
        <div>
            <Badge className='text-blue-500 font-bold mr-2' variant="ghost">{job?.position} position</Badge>
            <Badge className='text-white font-bold mr-2'>{job?.jobType}</Badge>
            <Badge className='text-white font-bold' variant={"destructive"} >{job?.salary}LPA</Badge>
        </div>
    </div>
  )
}

export default LatestJobCards
