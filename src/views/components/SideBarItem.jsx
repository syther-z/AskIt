import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { update } from '../../controllers/states/slices/sidebarhighlight';
import { toggle } from '../../controllers/states/slices/sidebarslice';
const SideBarItem = ({ props }) => {
    let highlighterIdx = useSelector((state) => state.highlight.idx);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // console.log(highlighterIdx)
    return (
        <div onClick={() => {
            navigate(props.path);
            if(window.innerWidth < 900) dispatch(toggle());
            dispatch(update(props.idx));
        }} className={`w-full text-center text-white text-2xl h-[50px] relative cursor-pointer`}>
            <div className={`w-full  h-full absolute top-0 ${highlighterIdx == props.idx ? 'sidebar-item-active' : ''}`}></div>
            <div className={`absolute w-full h-full top-0 flex items-center justify-center font-semibold text-[16px] ${highlighterIdx == props.idx ? 'text-white' : 'text-gray-700'}`}>{props.title}</div>
        </div>
    )
}

export default SideBarItem;