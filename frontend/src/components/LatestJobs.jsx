import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

function LatestJobs() {
    // const randomJobs=[1,2,3,4,5,6,7,8];
    const {allJobs} = useSelector(store => store.job); // Fetching all jobs from the Redux store . variables are from redux
  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold'><span className='text-red-500'>Latest & Top </span>Job Openings</h1>
      {/* //multiple job card will display */}
      <div className='grid grid-cols-3 gap-4 my-5'>
        {
           allJobs.length<=0 ? <span>NO JOB AVAILABLE</span> : allJobs?.map((job)=><LatestJobCards  key={job._id} job={job}/>)
        }
      </div>
    </div>
  )
}

export default LatestJobs
