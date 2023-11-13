import React from 'react';
import { FaUniversity } from 'react-icons/fa';

function Home() {
  return (
    <>
      <div className='flex flex-col w-[1000px] justify-center items-center'>
        <FaUniversity className='text-7xl text-slate-800' />
        <h1 className='text-5xl font-bold mb-10'>ShyftLabs</h1>
        <h4 className='text-3xl font-bold mb-10 text-slate-600'>
          Student Management System
        </h4>
      </div>
    </>
  );
}

export default Home;
