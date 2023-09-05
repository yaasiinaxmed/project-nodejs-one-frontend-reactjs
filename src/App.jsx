import { useState } from "react";
import AddUser from "./components/AddUser";
import { Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import { FaUserPlus } from "react-icons/fa";
import UpdateUser from "./components/UpdateUser";


function App() {
  const [show, setShow] = useState(false)

  return (
    <div className="w-full h-screen px-[30%] flex flex-col items-center  relative">
      <h1 className="p-8 text-center font-bold text-3xl text-[#0099ff]">
        User List
      </h1>
      <button onClick={() => setShow(true)}
        className="absolute top-[130px] left-[24%] mb-4 w-[60px]  h-[60px] p-3 px-4 bg-[#0099ff] flex items-center justify-center text-white text-xl font-semibold rounded-full
      hover:bg-white border border-[#0099ff] hover:text-[#0099ff] ease-in duration-150  "
      >
        <FaUserPlus />
      </button>

      <UserList />
      <AddUser show={show} setShow={setShow}/>
      <Routes>
        <Route path="/update_user/:id" element={<UpdateUser />} />
      </Routes>
    </div>
  );
}

export default App;
