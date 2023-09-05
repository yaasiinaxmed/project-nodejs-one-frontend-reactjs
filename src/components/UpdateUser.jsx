import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaTimes } from "react-icons/fa";
import { useGetUsersQuery, useUpdateUserMutation } from "../store/api/UsersSlice";
import { Link, useNavigate, useParams } from "react-router-dom";

function UpdateUser() {
  const navigate = useNavigate();

  const [currenValues, setCurrentValues] = useState({});

  const [updateUser] = useUpdateUserMutation();
  const {data: users } = useGetUsersQuery();

  const initialValues = {
    name: currenValues.name,
    bio: currenValues.bio,
  };

  const params = useParams();


  useEffect(() => {
    if(users.length > 0) {
      const user = users.find((user) => user.id === params.id);
      console.log(user)
      if(user) {
        setCurrentValues(user)
      }
    }
  }, [currenValues, params.id])

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    bio: Yup.string().required("Job Title is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    updateUser({
      id: params.id,
      updatedUser: values
    }).unwrap().then(() => {
      navigate('/')
    })
  };

  return (
    <div
      className={` absolute w-full h-[100vh] bg-[rgba(0,0,0,0.1)] flex items-center justify-center`}
    >
      <Link to="/">
      <button 
        className="absolute top-[130px] left-[24%] mb-4 w-[60px]  h-[60px] p-3 px-4 bg-[#0099ff] flex items-center justify-center text-white text-xl font-semibold rounded-full
      hover:bg-white border border-[#0099ff] hover:text-[#0099ff] ease-in duration-150  "
      >
        <FaTimes />
      </button>
      </Link>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="w-1/2 bg-white p-8 shadow flex flex-col gap-3 rounded">
          <div className="flex flex-col gap-2 ">
            <Field
              type="text"
              name="name"
              placeholder="Name"
              className="p-3 border bg-white rounded outline-[#0099ff] "
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-sm text-red-500"
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <Field
              type="text"
              name="bio"
              placeholder="Job Title"
              className="p-3 border bg-white rounded outline-[#0099ff] "
            />
            <ErrorMessage
              name="bio"
              component="div"
              className="text-sm text-red-500"
            />
          </div>
          <button type="submit"
            className="p-3 px-4 bg-[#0099ff] flex items-center justify-center text-white text-xl font-semibold rounded-full
      hover:bg-white border border-[#0099ff] hover:text-[#0099ff] ease-in duration-150  "
          >
            Update User
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default UpdateUser