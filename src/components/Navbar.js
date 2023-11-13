import React from 'react';
import logo from '../assets/images/speer_logo.svg';
import { useLocation } from 'react-router-dom';
import {
  FaUserPlus,
  FaUserFriends,
  FaBook,
  FaBookMedical,
  FaChartPie,
  FaUniversity,
} from 'react-icons/fa';
import { MdAddchart } from 'react-icons/md';

const menuItems = [
  {
    icon: <FaUserPlus size={24} />,
    label: 'Add Student',
    link: '/addStudent',
  },
  {
    icon: <FaUserFriends size={24} />,
    label: 'Student List',
    link: '/studentList',
    count: 0,
  },
  {
    icon: <FaBookMedical size={24} />,
    label: 'Add Course',
    link: '/addCourse',
  },
  {
    icon: <FaBook size={24} />,
    label: 'Course List',
    link: '/courseList',
    count: 0,
  },
  {
    icon: <MdAddchart size={24} />,
    label: 'Add Result',
    link: '/addResult',
  },
  {
    icon: <FaChartPie size={24} />,
    label: 'Results',
    link: '/results',
    count: 0,
  },
];

const Navbar = () => {
  const location = useLocation();
  return (
    <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-[100vh] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5'>
      <div className='flex items-center mb-2 p-4 gap-2'>
        <FaUniversity size={32} />
        <h5 className='block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900'>
          ShyftLabs
        </h5>
      </div>
      <nav className='flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700'>
        {menuItems.map((item, index) => (
          <div
            key={index}
            role='button'
            tabindex='0'
            className={
              'flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 hover:text-blue-900 outline-none ' +
              (item.link === location.pathname
                ? 'text-blue-900 bg-blue-50 bg-opacity-80'
                : '')
            }
            onClick={() => window.location.assign(item.link)}
          >
            <div className='grid place-items-center mr-4'>{item.icon}</div>
            {item.label}
            {item.count > 0 && (
              <div className='grid place-items-center ml-auto justify-self-end'>
                <div
                  className='relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-blue-500/20 text-blue-900 py-1 px-2 text-xs rounded-full'
                  style={{ opacity: 1 }}
                >
                  <span className=''>{item.count}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
