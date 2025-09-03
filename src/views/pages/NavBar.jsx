import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggle } from '../../controllers/states/slices/sidebarslice';
import ProfileIcon from '../components/ProfileIcon';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const userdetails = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <nav className="bg-white w-full h-[70px] flex items-center justify-between px-4 border-b border-gray-300 navbar-shadow overflow-hidden gap-2">
      
      {/* Sidebar toggle button */}
      <button
        onClick={() => dispatch(toggle())}
        className={`${window.innerWidth > 900 ? 'hidden' : 'block'}`}
      >
        <i className="fa-solid fa-bars text-[18px]"></i>
      </button>
 
      {/* Search + Profile */}
      <div className="flex items-center gap-4 flex-grow justify-between ">
        
        {/* Search bar */}
        <div className="flex items-center h-10 border border-gray-300 rounded-md overflow-hidden max-w-[300px] sm:max-w-[500px] w-full">
          <input
            type="text"
            className="flex-1 px-3 text-sm font-light focus:outline-none min-w-0"
            placeholder="Search"
          />
          <button className="bg-gray-200 w-[40px] h-full flex items-center justify-center">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        {/* Profile Icon */}
        <button onClick={(e)=>{
          e.stopPropagation();
          if(userdetails.email !== 'Login')
             navigate(`/profile/${userdetails.email}`);
           else navigate('/signin');
        }}>
        <ProfileIcon name={userdetails.email != 'Login' ? userdetails.username : undefined} size={40} />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
