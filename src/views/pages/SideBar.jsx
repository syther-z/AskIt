import React, { useEffect, useRef, useLayoutEffect } from 'react'
import '../style/sidebar.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '../../controllers/states/slices/sidebarslice';
import { useNavigate } from 'react-router-dom';
import { sidebarOptions } from '../../controllers/staticpaths';
import SideBarItem from '../components/SideBarItem';
import { isAuthenticated } from '../../models/authorization';
import { update, updateFollow } from '../../controllers/states/slices/userdetail.js';
import { getDispatch } from '../../App.jsx';
import { updateLoader } from '../../controllers/states/slices/loadingslice.js';
import ProfileIcon from '../components/ProfileIcon.jsx';
import { getProfile } from '../../models/interaction.js';
const SideBar = () => {
  let sidebar = useSelector((state) => state.sidebar);
  const navigate = useNavigate();
  const ref = useRef(null);
  const userdetail = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();



  useEffect(() => {
    let listener;
    window.addEventListener('resize', listener = () => {
      sidebarToggle(ref);
    })
    sidebarToggle(ref);
    return () => {
      removeEventListener('resize', listener);
    }
  });

  //  console.log(userdetail);

  useEffect(() => {
    dispatch(updateLoader(true));
    isAuthenticated().then(val => {
      if (val){
        dispatch(update(val));
        getProfile(val.email).then(val1 => {
          // console.log(val1);
          dispatch(updateFollow(val1.user))
        });
      }
      dispatch(updateLoader(false));
    });
  }, []);

  return (
    <div ref={ref} onClick={(e) => e.stopPropagation()} id='sidebar' className={`sidebar border-gray-200 min-w-[250px] w-[20vw] max-w-[300px] h-screen z-10 bg-white sidebar-shadow  relative ${sidebar.show ? 'sidebar-small-show' : ''}`}>
      <h2 className=' w-full h-[70px] text-3xl font-bold flex items-center justify-between text-white bg-[var(--select-color)] px-[10px] navbar-shadow border-gray-400 rounded-b-[5px]'>AskIt {window.innerWidth < 900 && <i className="fa-solid fa-xmark scale-[0.7]"></i>}</h2>
      <div className='flex flex-col w-full mt-[50px]'>
        {sidebarOptions.map((item, idx) => {
          item.idx = idx;
          return <SideBarItem props={item} key={idx} />
        })}
      </div>
      <div onClick={() => {
        if (userdetail.email == 'Login') navigate('/signin');
        else navigate(`/profile/${userdetail.email}`);

      }} className={`w-full h-[50px] absolute bottom-0 ${userdetail.email == 'Login' ? 'bg-red-500' : 'bg-green-500'} text-white cursor-pointer`}>
        <div className='flex h-full justify-center gap-3'>
          <span className='h-full flex items-center'><ProfileIcon name={userdetail.email != 'Login' ? userdetail.username : undefined} size={40} /></span>
          <div className='flex flex-col h-full text-[14px] justify-center'>
            <span>{userdetail.username}</span>
            <span>{userdetail.email}</span>
          </div>
        </div>

      </div>
    </div>
  )
}

function sidebarToggle(ref) {
  if (window.innerWidth < 900) {
    ref.current.classList.add('sidebar-small');
  } else {
    ref.current.classList.remove('sidebar-small');
  }
}


export default SideBar;