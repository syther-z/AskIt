import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { update } from '../../controllers/states/slices/sidebarhighlight';

const SideBarItem = ({ props }) => {
    let highlighterIdx = useSelector((state) => state.highlight.idx);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // console.log(highlighterIdx)
    return (
        <div onClick={() => {
            navigate(props.path)
            dispatch(update(props.idx));
        }} className={`w-full text-center text-white text-2xl h-[50px] relative cursor-pointer`}>
            <div className={`w-full  h-full absolute top-0 ${highlighterIdx == props.idx ? 'sidebar-item-active' : ''}`}></div>
            <div className='absolute w-full h-full top-0 flex items-center justify-center font-semibold text-[16px]'>{props.title}</div>
        </div>
    )
}

export default SideBarItem;