import React from 'react';
import { toast } from 'react-toastify';
import { Formik, Field, Form } from 'formik';
import { BASE_URL } from '../utils/constants';

const AddCourse = () => {
  const addCourseHandler = async (values) => {
    let courseDetails = {
      coursename: values.courseName,
    };
    try {
      const response = await fetch(`${BASE_URL}/course/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseDetails), // Replace with your actual data
      });

      if (response.ok) {
        // Request was successful
        const data = await response.json();
        toast.success('Course add successfully');
      } else {
        // Request failed
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
                Add New Student
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
                Add
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCourse;
