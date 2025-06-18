import React from 'react'
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "./ui/carousel"
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '../redux/jobSlice';
const category=[
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Devops developer",
    "FullStack Developer"
]

function CategoryCarousel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

      // Function to handle search job by category
  const searchJobHandler = (query) => {
          dispatch(setSearchedQuery(query));
          navigate("/browse");
      }
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-10 ">
        <CarouselContent className="">
            
                {
                    category.map((cat,index)=>(
                        <CarouselItem key={index} className="md:basis-1/2 lg-basis-1/3">
                            <Button onClick={()=>searchJobHandler(cat)} variant="" className="rounded-full ">{cat}</Button>
                        </CarouselItem>
                    ))
                }
            
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
  )
}

export default CategoryCarousel
