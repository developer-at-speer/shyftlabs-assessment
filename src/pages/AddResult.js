import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { BASE_URL } from '../utils/constants';

const AddResult = ({ getStudents, getCourses, studentList, courseList }) => {
  useEffect(() => {
    getStudents();
    getCourses();
  }, []);

  // Function to handle form submission
  // Function to handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    // Perform validation
    if (!values.dropdown1 || !values.dropdown2 || !values.score) {
      toast.error('Please select options for all dropdowns.'); // You can use other form validation techniques as well
      setSubmitting(false);
      return;
    }

    // Prepare the data for the POST request
    const data = {
      username: values.dropdown1, // Use the key instead of value
      coursename: values.dropdown2, // Use the key instead of value
      score: values.score,
    };

    // Send the POST request
    fetch(`${BASE_URL}/result/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        toast.success('Result added successfully');
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className='flex w-[1000px] h-[700px] items-center justify-center'>
      <Formik
        initialValues={{ dropdown1: '', dropdown2: '' }}
        onSubmit={handleSubmit}
      >
        <Form className='flex flex-col items-center p-4'>
          <div className='flex flex-col gap-8'>
            <h1 className='text-2xl font-bold'>Add New Result</h1>
            <div className='flex flex-col'>
              <label htmlFor='dropdown1' className='mb-2'>
                Student Name
              </label>
              <Field
                as='select'
                id='dropdown1'
                name='dropdown1'
                required
                className='w-[500px] h-10 bg-none rounded-md outline-slate-50 border-slate-500 border-2 p-2'
              >
                <option value=''>Select...</option>
                {studentList.map((option) => (
                  <option key={option.shyft_userid} value={option.shyft_name}>
                    {option.shyft_name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name='dropdown1'
                component='div'
                className='text-red-500'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='dropdown2' className='mb-2'>
                Course Name
              </label>
              <Field
                as='select'
                id='dropdown2'
                name='dropdown2'
                required
                className='w-[500px] h-10 bg-none rounded-md outline-slate-50 border-slate-500 border-2 p-2'
              >
                <option value=''>Select...</option>
                {courseList.map((option) => (
                  <option
                    key={option.shyft_courseid}
                    value={option.shyft_coursename}
                  >
                    {option.shyft_coursename}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name='dropdown2'
                component='div'
                className='text-red-500'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='score' className='mb-2'>
                Score
              </label>
              <Field
                as='select'
                id='score'
                name='score'
                required
                className='w-[500px] h-10 bg-none rounded-md outline-slate-50 border-slate-500 border-2 p-2'
              >
                <option value=''>Select...</option>
                <option value='A'>A</option>
                <option value='B'>B</option>
                <option value='C'>C</option>
                <option value='D'>D</option>
                <option value='E'>E</option>
              </Field>
              <ErrorMessage
                name='score'
                component='div'
                className='text-red-500'
              />
            </div>
            <button
              type='submit'
              data-ripple-light='true'
              class='mt-6 block w-full select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
            >
              Add
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AddResult;
