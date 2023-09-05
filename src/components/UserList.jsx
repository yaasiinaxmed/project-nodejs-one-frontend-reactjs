import React from "react";
import { FaUserEdit, FaUserTimes } from "react-icons/fa";
import { useDeleteUserMutation, useGetUsersQuery } from "../store/api/UsersSlice";
import { Link } from "react-router-dom";

function UserList() {
  const {data: users = []} = useGetUsersQuery();
  const [UserDelete] = useDeleteUserMutation()

  const handleDelete = (id) => {
    if(confirm("Are you sure ? ")) {
      UserDelete(id).unwrap()
    }
  } 

  return (
    <div className="w-full relative overflow-x-auto">
      <table className="w-full text-[0.9rem] text-left">
        <thead className="p-3 text-xl uppercase bg-[#0099ff] text-white">
          <tr>
            <th scope="col" className="p-4">
              ID
            </th>
            <th scope="col" className="p-4">
              Name
            </th>
            <th scope="col" className="p-4">
              Job Title
            </th>
            <th scope="col" className="p-4">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border">
            <th scope="row" className="p-4 ">
              {user.id}
            </th>
            <th className="p-4">{user.name}</th>
            <th className="p-4">{user.bio}</th>
            <th className="p-4 flex items-center justify-center gap-5">
               <Link to={`/update_user/${user.id}`}>
               <span className="cursor-pointer text-xl text-[#0099ff]">
                <FaUserEdit />
              </span>
               </Link>
                <span onClick={() => handleDelete(user.id)} className="cursor-pointer text-xl text-red-500">
                  <FaUserTimes />
                </span>
            </th>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
