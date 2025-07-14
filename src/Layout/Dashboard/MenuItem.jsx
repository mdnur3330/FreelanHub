// /* eslint-disable no-unused-vars */
// import { NavLink } from 'react-router'

// const MenuItem = ({ label, address, icon: Icon }) => {
//   return (
//     <NavLink
//       to={address}
//       end
//       className={({ isActive }) =>
//         `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300  hover:text-gray-700 ${
//           isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
//         }`
//       }
//     >
//       <Icon className='w-7 h-7'/>

//       <span className='mx-4 font-medium'>{label}</span>
//     </NavLink>
//   )
// }

// export default MenuItem
/* eslint-disable no-unused-vars */
import { NavLink } from 'react-router';

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 my-2 rounded-lg transition-all duration-200 
        ${isActive 
          ? 'bg-blue-100 text-blue-700 font-semibold shadow-sm' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
        }`
      }
    >
      <Icon className='w-6 h-6 shrink-0' />
      <span className='truncate'>{label}</span>
    </NavLink>
  );
};

export default MenuItem;
