import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { BASE_URL } from '../utils/constants';
import { MdDelete } from 'react-icons/md';
import Moment from 'react-moment';

const StudentList = ({ studentList, getStudents }) => {
  const deleteStudent = async (row) => {
    try {
      const response = await fetch(`${BASE_URL}/deleteuser/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid: row.shyft_userid.toString() }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Record deleted successfully');
        getStudents();
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
      <div className='flex flex-col w-[1000px] justify-center items-center'>
        <h1 className='text-2xl font-bold mb-10'>Student List</h1>
        {studentList.length > 0 ? (
          <div className='flex flex-row justify center items center'>
            <table
              role='table'
              className='w-full min-w-[800px] overflow-x-scroll'
            >
              <thead>
                <tr role='row'>
                  <th>
                    <div className='flex items-center justify-between pb-2 pt-4 px-2 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs'>
                      Name
                    </div>
                  </th>
                  <th>
                    <div className='flex items-center justify-between pb-2 pt-4 px-2 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs'>
                      Date of Birth
                    </div>
                  </th>
                  <th>
                    <div className='flex items-center justify-between pb-2 pt-4 px-2 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs'>
                      Email
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
                {studentList.map((row, index) => (
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
                          {row.shyft_name} {row.shyft_familyname}
                        </p>
                      </div>
                    </td>
                    <td className='py-3 text-smpx-2' role='cell'>
                      <p className='text-md font-medium text-gray-600'>
                        <Moment format='DD MMM YYYY'>{row.shyft_dob}</Moment>
                      </p>
                    </td>
                    <td className='py-3 text-smpx-2' role='cell'>
                      <p className='text-md font-medium text-gray-600'>
                        {row.shyft_email}
                      </p>
                    </td>
                    <td className='py-3 text-sm px-2' role='cell'>
                      <MdDelete
                        className='cursor-pointer'
                        size={24}
                        onClick={() => {
                          deleteStudent(row);
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
export default StudentList;
