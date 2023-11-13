import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddCourse from './pages/AddCourse';
import AddResult from './pages/AddResult';
import AddStudent from './pages/AddStudent';
import CourseList from './pages/CourseList';
import StudentList from './pages/StudentList';
import Results from './pages/Results';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import { BASE_URL } from './utils/constants';
import axios from 'axios';

function App() {
  let [studentList, setStudentList] = useState([]);
  let [courseList, setCourseList] = useState([]);

  const getStudents = () => {
    axios.get(`${BASE_URL}/alluser/`).then((res) => {
      setStudentList(res.data);
    });
  };

  const getCourses = () => {
    axios.get(`${BASE_URL}/allcourse/`).then((res) => {
      setCourseList(res.data);
    });
  };

  return (
    <div className='flex flex-row'>
      <div className='flex basis-1/4'>
        <Navbar />
      </div>
      <div className='flex basis-3/4 h-full'>
        <main className='pt-20'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/addCourse' element={<AddCourse />} />
            <Route
              path='/courseList'
              element={
                <CourseList courseList={courseList} getCourses={getCourses} />
              }
            />
            <Route path='/addStudent' element={<AddStudent />} />
            <Route
              path='/studentList'
              element={
                <StudentList
                  studentList={studentList}
                  getStudents={getStudents}
                />
              }
            />
            <Route
              path='/addResult'
              element={
                <AddResult
                  studentList={studentList}
                  courseList={courseList}
                  getCourses={getCourses}
                  getStudents={getStudents}
                />
              }
            />
            <Route
              path='/results'
              element={
                <Results
                  studentList={studentList}
                  courseList={courseList}
                  getCourses={getCourses}
                  getStudents={getStudents}
                />
              }
            />
          </Routes>
        </main>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
