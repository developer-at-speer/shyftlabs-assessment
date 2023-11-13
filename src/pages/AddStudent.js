import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Formik, Field, Form } from 'formik';
import { BASE_URL } from '../utils/constants';
import Loader from '../components/Loader';

const AddStudent = (e) => {
  const [isLoading, setIsLoading] = useState(false);
  const addStudentHandler = async (values) => {
    setIsLoading(true);
    let studentDetails = {
      name: values.firstName,
      familyname: values.familyName,
      dob: values.dob,
      email: values.email,
    };
    try {
      const response = await fetch(`${BASE_URL}/user/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentDetails),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Student added successfully');
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

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = 'This is a required field';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Invalid email id';
    }
    return error;
  };

  const validateAge = (value) => {
    let error;
    const selectedDate = new Date(value);
    const currentDate = new Date();
    const minimumDate = new Date();
    minimumDate.setFullYear(currentDate.getFullYear() - 10);

    if (!value) {
      error = 'This is a required field';
    } else if (selectedDate >= minimumDate) {
      error = 'Age must be greater than 10 years';
    }

    return error;
  };

  return (
    <div className='flex w-[1000px] h-[700px] items-center justify-center'>
      <Formik
        initialValues={{ firstName: '', familyName: '', dob: '', email: '' }}
        onSubmit={addStudentHandler}
      >
        {({ errors, touched }) => (
          <Form>
            <div className='flex flex-col gap-8'>
              <h4 class='block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased'>
                Add New Student
              </h4>
              <Field
                className='w-[500px] h-10 bg-none rounded-md outline-slate-50 border-slate-500 border-2 p-2'
                type='text'
                name='firstName'
                id='firstName'
                placeholder='Enter first name'
                validate={validateField}
              />
              {errors.firstName && touched.firstName && (
                <p className='text-red-700'>{errors.firstName}</p>
              )}

              <Field
                className='w-[500px] h-10 bg-none rounded-md outline-slate-50 border-slate-500 border-2 p-2'
                type='text'
                name='familyName'
                id='familyName'
                placeholder='Enter family name'
                validate={validateField}
              />
              {errors.familyName && touched.familyName && (
                <p className='text-red-700'>{errors.familyName}</p>
              )}

              <div className='flex flex-col'>
                <p className='text-sm'>Select DOB</p>
                <Field
                  className='w-[500px] h-10 bg-none rounded-md outline-slate-50 border-slate-500 border-2 p-2'
                  type='date'
                  name='dob'
                  id='dob'
                  placeholder='Select DOB'
                  validate={validateAge}
                />
                {errors.dob && touched.dob && (
                  <p className='text-red-700'>{errors.dob}</p>
                )}
              </div>

              <Field
                className='w-[500px] h-10 bg-none rounded-md outline-slate-50 border-slate-500 border-2 p-2'
                type='email'
                name='email'
                id='email'
                placeholder='Enter email'
                validate={validateEmail}
              />
              {errors.email && touched.email && (
                <p className='text-red-700'>{errors.email}</p>
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

export default AddStudent;
