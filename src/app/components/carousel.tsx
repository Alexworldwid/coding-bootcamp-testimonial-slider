"use client";

import { error } from 'console';
import React, { useEffect, useState } from 'react';
import { Interface } from 'readline';
import Image from 'next/image';
import nextButton from '../../../public/images/icon-next.svg';
import prevButton from '../../../public/images/icon-prev.svg';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
    name: string,
    post: string,
    testimony: string,
    imagePath: string
}

const Carousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState<number> (0);
    const [testimonials, setTestimonials] = useState<Testimonial[]> ([]);

    // fetch the testimonial data
    useEffect(() => {
        const fetchTestimonial = async () => {
            try {
                const response = await fetch('/data/testimonials.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Testimonial[] = await response.json();
                setTestimonials(data);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            }
        }

        fetchTestimonial();

    }, []);

    // next button
    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => ( prevIndex + 1 ) % testimonials.length);
    }

    // prev button
    const prevTestimonial = () => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + testimonials.length ) % testimonials.length)
    }

    return (
        <section className='w-full md:flex md:justify-center md:items-center'>
            { testimonials.length > 0 && (
                <div className='flex flex-col-reverse justify-between gap-8 w-full md:grid md:grid-cols-2 md:items-center max-w-[800px]'>
                    <AnimatePresence mode='wait'>
                        <motion.div id='content-container' className='flex flex-col items-center mt-6 md:items-start pt-7'
                        key={testimonials[currentIndex].name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        exit={{ opacity: 0 }}
                        >
                            <p className='text-center text-slate-400 mb-4 md:text-left max-w-[500px]'>{`"${testimonials[currentIndex].testimony}"`}</p>
                            <h1 className='font-semibold text-xl md:text-left'>{testimonials[currentIndex].name}</h1>
                            <p className='text-slate-400 md:text-left'>{testimonials[currentIndex].post}</p>
                        </motion.div>
                    </AnimatePresence>
                    

                    <div id='image-container' className='relative w-full flex flex-col items-center pt-4 h-[310px]'>
                        <AnimatePresence mode='wait'>
                            <motion.div
                            key={testimonials[currentIndex].name}
                            initial={{ x: 400, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            exit={{ x: 400, opacity: 0 }}
                            >
                                <Image src={testimonials[currentIndex].imagePath} alt={`${testimonials[currentIndex].name} image`} width={300} height={300} className='pt-4 w-[300px] shadow-2xl h-auto' />
                            </motion.div>
                        </AnimatePresence>
                        
                        
                        <span className='bg-white w-[70px] shadow-xl  -bottom-10 rounded-full absolute flex items-center justify-between p-2 gap-x-4 md:left-10'>
                            <button aria-label='next button' onClick={prevTestimonial}>
                                <Image src={prevButton} alt='prev testimonial button' width={200}  />
                            </button>

                            <button onClick={nextTestimonial}>
                                <Image src={nextButton} alt='next testimonial button' width={200}   />
                            </button>
                        </span>
                    </div>

                    
                </div>    
            )}
        </section>
    );
};

export default Carousel;