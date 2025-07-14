import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axiosSecure from '../../../Hooqs/useAxiosSecure';
import Swal from 'sweetalert2';

const UpdateTask = () => {
    const {id} = useParams()
    console.log("params teke",id);
    const [task, setTask] = useState()

    useEffect(()=>{
      const getTask = async () =>{
        try{
          const res = await axiosSecure(`/task-datails/${id}`)
          setTask(res.data)
        }catch(error){
          console.log(error);
        }
      }
      getTask()
    },[id])


    const handelUpdate = async (e)=>{
      e.preventDefault()
      const fData = e.target;
      const makeObj = new FormData(fData)
      const updateTask = Object.fromEntries(makeObj.entries())
      console.log(updateTask);
        const res = await axiosSecure.put(`/update-task/${id}`, updateTask)
        console.log(res.data);
        if(res.data.matchedCount){
          Swal.fire({
                title: "Updated!",
                text: "Your task has been Updated.",
                icon: "success"
              }); 
        }
    }
    return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Update Your Task</h2>
      <form onSubmit={handelUpdate}>
        <div>
          <label className="block mb-1 font-medium">Task Title</label>
          <input
            type="text"
            name="task_title"
            defaultValue={task?.task_title}
            placeholder="e.g. Watch my YouTube video and make a comment"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Task Details</label>
          <textarea
            name="task_detail"
            defaultValue={task?.task_detail}
            placeholder="Detail description"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
            required
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        </div>

        <div>
          <label className="block mb-1 font-medium">Submission Info</label>
          <input
            type="text"
            name="submission_info"
            defaultValue={task?.submission_info}
            placeholder="e.g. Submit screenshot or proof"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Click To Update
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;