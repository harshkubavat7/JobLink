import { RadioGroupItem } from './ui/radio-group'
import { RadioGroup } from './ui/radio-group'
// import Label from '@radix-ui/react-radio-group'
import { Label } from './ui/label'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';

function FilterCard() {

     const dispatch = useDispatch();

    const filterData = [
       {
            filterType:"Location",
            array:["Delhi NCR","Bangalore","Gujarat","Pune","Mumbai"]
       },
       {
            filterType:"Industry",
            array:["Frontend Developer","Backend Developer","Full-Stack","Devops"]
       },
       {
            filterType:"salary",
            array:["0-40k","42k-1lakh","1lakh-5lakh"]
       },
      ]

      const [selectedValue, setSelectedValue] = useState('');
      const changeHandler = (value) => {
        setSelectedValue(value);
      }
      useEffect(()=>{
          dispatch(setSearchedQuery(selectedValue));
     },[selectedValue])
  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-2xl'>Filter Job</h1>
      <hr className='mt-3'/>
      <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-4 mt-3">
            {
                filterData.map((data,index)=>(
                    <div>
                         <h1 className='font-bold text-xl'>{data.filterType}</h1>
                         {
                              data.array.map((item,idx)=>{
                                   const itemId=`id${index}-${idx}`;
                                   return(
                                        <div className='flex items-center space-x-2 my-2'>
                                             <RadioGroupItem className="border border-yellow-500" value={item} id={itemId} />
                                             <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                   )
                              })
                         }
                    </div>
                ))
            }
      </RadioGroup>
    </div>
  )
}

export default FilterCard
