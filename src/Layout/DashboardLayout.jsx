// import React from 'react';
// import { Outlet } from 'react-router';
// import Sidebar from './Dashboard/Sidebar';

// const DashboardLayout = () => {
//     return (
//         <nav>
//             <Sidebar></Sidebar>
//             <div>
//                 <Outlet></Outlet>
//             </div>
//         </nav>
//     );
// };

// export default DashboardLayout;




import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from './Dashboard/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg hidden md:block">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        <div className="bg-white rounded-xl shadow-md p-4 min-h-[90vh]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
