import { ArrowRight } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle';
import { dummyShowsData } from '../assets/assets';
import MovieCard from './MovieCard';

const FeaturedSection = () => {

  const navigate = useNavigate();

    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>
            <div className='relative flex items-center justify-between pt-20 pb-10'>
                <BlurCircle top='0' right='-80px'  />
                <p className='text-gray-300 font-medium text-lg'>Now Showing</p>
                <button  onClick={()=> navigate('/movies')} className='flex gap-2'>View All
                    <ArrowRight className='  group-hover:translate-x-0.5
        transition w-4.5 h4.5 cursor-pointer'/></button>
            </div>

            <div className='flex flex-wrap max-sm:justify-center gap-8 mt-8'>
                {dummyShowsData.slice(0,4).map((show)=>(
                    <MovieCard key={show._id} movie={show} />
                ))}
            </div>

            <div className='flex justify-center mt-20'>
              <button onClick={()=>{navigate('/movies'); scrollTo(0,0) }} className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>
                Show More</button>
            </div>
        </div>
    )
}

export default FeaturedSection 
