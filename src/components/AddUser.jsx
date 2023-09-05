import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaTimes } from "react-icons/fa";
import { useAddUserMutation } from "../store/api/UsersSlice";

function AddUser({ show, setShow }) {
  const [AddUser] = useAddUserMutation();

  const initialValues = {
    name: "",
    bio: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    bio: Yup.string().required("Job Title is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    AddUser(values).unwrap(setShow(false))
    resetForm();
  };

  return (
    <div
      className={` ${
        show === false ? "hidden" : "block"
      } absolute w-full h-[100vh] bg-[rgba(0,0,0,0.1)] flex items-center justify-center`}
    >
      <button onClick={() => setShow(false)}
        className="absolute top-[130px] left-[24%] mb-4 w-[60px]  h-[60px] p-3 px-4 bg-[#0099ff] flex items-center justify-center text-white text-xl font-semibold rounded-full
      hover:bg-white border border-[#0099ff] hover:text-[#0099ff] ease-in duration-150  "
      >
        <FaTimes />
      </button>
      <Formik
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
          <button
            className="p-3 px-4 bg-[#0099ff] flex items-center justify-center text-white text-xl font-semibold rounded-full
      hover:bg-white border border-[#0099ff] hover:text-[#0099ff] ease-in duration-150  "
          >
            Add User
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default AddUser;
