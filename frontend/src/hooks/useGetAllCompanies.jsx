import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { COMPANY_API_END_POINT } from '../utils/constant'
import { setCompanies, setSingleCompany } from '../redux/companySlice'
function useGetAllCompanies() {
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchCompanies = async ()=>{
        try {
            const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
                withCredentials: true
            });
            if(res.data.success){
                dispatch(setCompanies(res.data.companies));
            }
        } catch (error) {
            console.log(error)
        }
    } 
    fetchCompanies();
  },[])
}

export default useGetAllCompanies
