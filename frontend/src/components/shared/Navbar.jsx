import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import store from '../../redux/store'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'
import { setUser } from '../../redux/authSlice'


function Navbar() {
  const {user} = useSelector(store=>store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`,
        {withCredentials: true}
      )
      if(res.data.success){
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  }
  return (
    <div className='bg-white'>
      <div className='flex items-center justify-between max-w-7xl mx-auto h-16 px-4 py-2'>
        <div>
           <h1 className="text-2xl font-semibold text-indigo-700 tracking-wide uppercase italic drop-shadow-md">Job<span className="text-pink-500 font-bold">Link</span></h1>


        </div>
        <div className='flex items-center gap-7'>
            <ul className='flex font-medium items-center gap-4'>
                {
                  user && user.role === "recruiter" ? (
                    <>
                        <li><Link to="/admin/companies">Companies</Link></li>
                        <li><Link to="/admin/jobs">Jobs</Link></li>
                    </>
                  ) : (
                      <>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/jobs">Jobs</Link></li>
                        <li><Link to="/browse">Browse</Link></li>
                      </>
                  )
                }
                
            </ul>
              {
                  !user ? (
                    <div className='flex gap-2'>
                      <Link to="/login"> <Button variant="outline">Login</Button></Link>
                      <Link to="/signup"><Button>
                        Signup
                      </Button></Link>
                      
                    </div>
            
                  ) : (
                      <Popover>
                <PopoverTrigger asChild>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src={user?.profile?.profilePhoto} alt='@shadcn' />
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent className='w-88'>
                  <div>
                  <div className='flex space-y-2 gap-4'>
                    <Avatar className="cursor-pointer flex items-center justify-center ">
                      <AvatarImage  src={user?.profile?.profilePhoto} alt="shadcdn" />   
                    </Avatar>
                    <div>
                      <h4 className='font-medium'>{user?.fullname}</h4>
                      <p>{user?.profile?.bio}</p>
                    </div>
                  </div>
                  <div className='flex flex-col text-gray-700'>

                    {
                      user && user.role === "student" && (
                          <div className='flex items-center'>
                              <User2/>
                              <Button  variant="link"><Link to="/profile">view profile</Link></Button>
                          </div>
                      )
                    }

                    
                    <div className='flex items-center'>
                      <LogOut/>
                      <Button onClick={handleLogout} variant="link">logout</Button>
                    </div>
                    
                  </div>
                  </div>
                </PopoverContent>
            </Popover>
                  )

              }
            

        </div>
      </div>
    </div>
  )
}

export default Navbar
