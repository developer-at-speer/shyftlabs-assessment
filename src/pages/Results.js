import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Results = ({ getStudents, getCourses, studentList, courseList }) => {
  let [resultList, setResultList] = useState([]);
  useEffect(() => {
    getStudents();
    getCourses();
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL}/allresult/`).then((res) => {
      const filteredResults = res.data.filter((result) => {
        return (
          courseList.some(
            (course) => course.shyft_coursename === result.shyft_resultcourse
          ) &&
          studentList.some(
            (student) => student.shyft_name === result.shyft_resultuser
          )
        );
      });
      setResultList(filteredResults);
    });
  }, [courseList, studentList]);

  return (
    <>
      <div className='flex flex-col w-[1000px] justify-center items-center'>
        <h1 className='text-2xl font-bold mb-10'>Student List</h1>
        {resultList.length > 0 ? (
          <div className='flex flex-row justify center items center'>
            <table
              role='table'
              className='w-full min-w-[800px] overflow-x-scroll'
            >
              <thead>
                <tr role='row'>
                  <th>
                    <div className='flex items-center justify-between pb-2 pt-4 px-2 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs'>
                      Course
                    </div>
                  </th>
                  <th>
                    <div className='flex items-center justify-between pb-2 pt-4 px-2 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs'>
                      Student
                    </div>
                  </th>
                  <th>
                    <div className='flex items-center justify-between pb-2 pt-4 px-2 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs'>
                      Score
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody role='rowgroup' className='px-4'>
                {resultList.map((row, index) => (
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
                          {row.shyft_resultcourse}
                        </p>
                      </div>
                    </td>
                    <td className='py-3 text-sm px-2' role='cell'>
                      <div className='flex items-center gap-2'>
                        <p className='text-sm font-medium text-navy-700'>
                          {row.shyft_resultuser}
                        </p>
                      </div>
                    </td>
                    <td className='py-3 text-sm px-2' role='cell'>
                      <div className='flex items-center gap-2'>
                        <p className='text-sm font-medium text-navy-700'>
                          {row.shyft_resultscore}
                        </p>
                      </div>
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

export default Results;
