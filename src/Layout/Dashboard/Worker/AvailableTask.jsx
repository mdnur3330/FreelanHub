// import React, { useEffect, useState } from 'react';
// import axiosSecure from '../../../Hooqs/useAxiosSecure';
// import { Link } from 'react-router';


// const AvailableTask = () => {
//     const [tasks, setTasks] = useState([])
//     const [loading, setLoading] = useState(true)
//     useEffect(()=>{
//         const getTask = async ()=>{
//            try{
//             const {data} = await axiosSecure('/task-list-worker')
//             setTasks(data)
            
//            }catch(error){
//             console.log(error);
//            }finally{
//             setLoading(false);
//            }
//         }
//         getTask()
//     },[])
//     console.log(tasks);
//     return (
//         <div>
//          {loading && "loaging...."}
//          <div className="p-5">
//       <h2 className="text-2xl font-bold mb-6">📋 Available Tasks</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {tasks.map((task) => (
//           <div key={task._id} className="border rounded-lg shadow-lg p-4 bg-white">
//             <img src={task.task_image_url} alt="task" className="h-40 w-full object-cover rounded" />
//             <h3 className="text-xl font-semibold mt-2">{task.task_title}</h3>
//             <p className="text-sm text-gray-600 mt-1">By: {task.Buyer_name}</p>
//             <p className="mt-1">Pay: <span className="text-green-600 font-semibold">{task.payable_amount} coins</span></p>
//             <p className="mt-1">Required Workers Left: {task.worker}</p>
//             <p className="text-sm text-gray-500 mt-1">Complete by: {task.completion_date?.split("T")[0]}</p>
//             <Link to={`/dashboard/task-details/${task._id}`}>
//               <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
//                 View Details
//               </button>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//         </div>
//     );
// };

// export default AvailableTask;



import React, { useEffect, useState } from 'react';
import axiosSecure from '../../../Hooqs/useAxiosSecure';
import { Link } from 'react-router'; 

const AvailableTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTask = async () => {
      try {
        const { data } = await axiosSecure('/task-list-worker');
        setTasks(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getTask();
  }, []);

  return (
    <div className="p-5">
      {loading && <p className="text-center text-[#1D3E3E] text-lg">Loading...</p>}

      <h2 className="text-3xl font-bold mb-6 text-center">
        📋 Available Tasks
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition p-5 flex flex-col justify-between"
          >
            <img
              src={task.task_image_url}
              alt="Task"
              className="h-48 w-full object-cover rounded-xl mb-4"
            />

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">
                {task.task_title}
              </h3>
              <p className="text-sm text-gray-500">By: {task.Buyer_name || 'Unknown'}</p>
              <p>
                💰 Pay: <span className="text-green-600 font-medium">{task.payable_amount} coins</span>
              </p>
              <p>
                👥 Workers Left:{' '}
                <span
                  className={
                    task.worker === 0
                      ? 'text-red-500 font-semibold'
                      : 'text-green-700 font-semibold'
                  }
                >
                  {task.worker == 0 ? 'Filled' : task.worker}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                ⏳ Deadline: {task.completion_date?.split('T')[0]}
              </p>
            </div>

            {task.worker < 1 ? (
              <p className="mt-4 text-center text-sm bg-gray-100 text-red-500 py-2 rounded-lg font-semibold cursor-not-allowed">
                🚫 Task already completed
              </p>
            ) : (
              <Link to={`/dashboard/task-details/${task._id}`}>
                <button className="mt-4 w-full bg-[#00C4CC] text-[#0F3C3C] py-2 rounded-lg hover:bg-[#00E0E0] transition-all font-semibold">
                  🔍 Apply Task
                </button>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableTask;
