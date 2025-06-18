import React from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import {  Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom'
function Job({job}) {
  const navigate = useNavigate()
  // const jobId="cakjnkjc"

  //function to calculate days ago
  const daysAgoFunction = (mongodbTime)=>{
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  }
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-200'>
      <div className='flex items-center justify-between'>
        <p>{daysAgoFunction(job?.createdAt)===0?"Today":`${daysAgoFunction(job?.createdAt)} Days Ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon"><Bookmark/></Button>
      </div>
      <div className='flex items-center gap-2 my-2'>
        <Button className="p-6" variant="outline" size="icon">
            <Avatar >
                <AvatarImage src={job?.company?.logo}/>
            </Avatar>
        </Button>
        <div>
            <h1 className='text-xl font-bold'>{job?.company?.name}</h1>
            <p>India</p>
        </div>
      </div>

      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className=' text-gray-600'>{job?.description}</p>
      </div>
      <div>
            <Badge className='text-blue-500 font-bold mr-2' variant="ghost">{job?.position} position</Badge>
            <Badge className="bg-blue-500 text-white dark:bg-blue-600 mr-2" variant={"secondary"}>{job?.jobType}</Badge>
            <Badge className='text-white font-bold' variant={"destructive"} >{job?.salary}LPA</Badge>
        </div>

        <div className='flex items-center gap-4 mt-4'>
            <Button onClick={()=>navigate(`/description/${job?._id}`)} className={"border border-gray-950 hover:bg-blue-400 cursor-pointer"} variant={"outline"}>Details</Button>
            <Button className={"border border-gray-950 hover:bg-green-400 cursor-pointer"} variant={"outline"}>Save For later</Button>
        </div>
    </div>
  )
}

export default Job
