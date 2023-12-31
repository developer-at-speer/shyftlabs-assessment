import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { MdDelete } from 'react-icons/md';

const CourseList = ({ courseList, getCourses }) => {
  const deleteCourse = async (row) => {
    try {
      const response = await fetch(`${BASE_URL}/deletecourse/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseid: row.shyft_courseid }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Record deleted successfully');
        getCourses();
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <>
      <div className='flex flex-col w-[1000px] justify-center items-center'>
        <h1 className='text-2xl font-bold mb-10'>Course List</h1>
        {courseList.length > 0 ? (
          <div className='flex flex-row justify center items center'>
            <table
              role='table'
              className='w-full min-w-[400px] overflow-x-scroll'
            >
              <thead>
                <tr role='row'>
                  <th>
                    <div className='flex items-center justify-between pb-2 pt-4 px-2 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs'>
                      Course Name
                    </div>
                  </th>
                  <th>
                    <div className='flex items-center justify-between pb-2 pt-4 px-2 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs'>
                      Action
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody role='rowgroup' className='px-4'>
                {courseList.map((row, index) => (
                  <tr
                    role='row'
                    className={`${
                      index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                    }`}
                    key={index}
                  >
                    <td className='py-3 text-sm px-2' role='cell'>
                      <div className='flex items-center gap-2'>
                        <p className='text-sm font-medium text-navy-700'>
                          {row.shyft_coursename}
                        </p>
                      </div>
                    </td>
                    <td className='py-3 text-sm px-2' role='cell'>
                      <MdDelete
                        className='cursor-pointer'
                        size={24}
                        onClick={() => {
                          deleteCourse(row);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CourseList;
