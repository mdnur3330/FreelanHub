import { NavLink } from 'react-router';

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 my-2 rounded-xl transition-all duration-200 group
        ${isActive
          ? 'bg-[#E0F2FE] text-[#1D3E3E]font-semibold shadow-md'
          : 'text-white hover:bg-[#F0F9FF] hover:text-[#1D3E3E]'
        }`
      }
    >
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 group-hover:scale-110 transition-transform duration-200" />
      <span className="truncate text-sm sm:text-base">{label}</span>
    </NavLink>
  );
};

export default MenuItem;
