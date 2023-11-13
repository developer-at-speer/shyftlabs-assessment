import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Formik, Field, Form } from 'formik';
import { BASE_URL } from '../utils/constants';
import Loader from '../components/Loader';

const AddCourse = () => {
  const [isLoading, setIsLoading] = useState(false);
  const addCourseHandler = async (values) => {
    setIsLoading(true);
    let courseDetails = {
      coursename: values.courseName,
    };
    try {
      const response = await fetch(`${BASE_URL}/course/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseDetails),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Course added successfully');
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setIsLoading(false);
  };

  const validateField = (values) => {
    let error;
    if (!values) {
      error = 'This is a required field';
    }
    return error;
  };

  return (
    <div className='flex w-[1000px] h-[700px] items-center justify-center'>
      <Formik initialValues={{ courseName: '' }} onSubmit={addCourseHandler}>
        {({ errors, touched, isValidating }) => (
          <Form>
            <div className='flex flex-col gap-8'>
              <h4 class='block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased'>
                Add New Course
              </h4>
              <Field
                className='w-[500px] h-10 bg-none rounded-md outline-slate-50 border-slate-500 border-2 p-2'
                type='text'
                name='courseName'
                id='courseName'
                placeholder='Enter course name'
                validate={validateField}
              />
              {errors.courseName && touched.courseName && (
                <p className='text-red-700'>{errors.courseName}</p>
              )}

              <button
                type='submit'
                data-ripple-light='true'
                class='mt-6 block w-full select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
              >
                {isLoading ? <Loader /> : 'Add'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCourse;
