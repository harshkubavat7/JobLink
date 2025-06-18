import React, { use, useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Contact, Mail, Pen } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '../hooks/useGetAppliedJobs'
function Profile() {
    // const skills=["html","css","javascript","Reactjs"]
    const isResume=true;
    const [open,setOpen] = useState(false)
    const {user} = useSelector((store) => store.auth); // Assuming user data is stored in Redux store

    useGetAppliedJobs(); // Custom hook to fetch applied jobs



      return (
    <div>
        <Navbar/>
        <div className='max-w-4xl mx-auto bg-white border border-gray-300 rounded-2xl my-5 p-8'>
            <div className='flex justify-between'>
                <div className='flex items-center gap-5'>
                <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
                <div>
                    <h1 className='font-medium text-3xl'>{user?.fullname}</h1>
                    <p>{user?.profile?.bio}</p>
                </div>
                
                </div>
                <Button onClick={()=>setOpen(true)} className="text-right"><Pen/></Button>
            </div>
            <div className='my-5'>
                <div className='flex items-center gap-4'>
                    <Mail/>
                    <span>{user?.email}</span>
                </div>
                <div className='flex items-center gap-4'>
                    <Contact/>
                    <span>{user?.phoneNumber}</span>
                </div>
            </div>
            <div className='flex items-center gap-4'>
                <h1 className='text-xl font-bold'>Skills :</h1>
                <div className='flex  items-center gap-1'>
                    {
                    user?.profile?.skills.length!= 0 ? user?.profile?.skills.map((item,index)=><Badge key={index}>{item}</Badge>) : <span>NA</span>
                }
                </div>
                
            </div>
            <div>
                <Label>Resume</Label>
                {
                    isResume?<a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                }
            </div>
            
        </div>
        <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                {/* Applied job table */}
                <AppliedJobTable/>
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen}/> {/* Control the dialog state with open and setOpen props */}

    </div>
  )
}

export default Profile
