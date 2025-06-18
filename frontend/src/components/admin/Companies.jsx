import React, { use, useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '../../redux/companySlice'

function Companies() {
  useGetAllCompanies();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setSearchCompanyByText(input))
  }, [input]);
  return (
    <div>
      <Navbar/>
        <div className='max-w-6xl mx-auto my-10'>
            <div className='flex items-center justify-between my-10'>
              <input 
              className='w-fit'
              placeholder='Filter By Name'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              />

              <Button onClick={()=>navigate("/admin/companies/create")}>New Company</Button>
            </div>
            <CompaniesTable/>
        </div>
    </div>
  )
}

export default Companies
