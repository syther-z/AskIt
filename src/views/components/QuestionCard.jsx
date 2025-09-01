import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDispatch } from '../../App';
import { setAlertMessage } from '../../controllers/states/slices/alertslice';

const defaultObj = {
    question: 'Testing',
    description: 'Test Card',
    authorname: 'Anonymous',
    qid: 'null',
    upvotes: []
}
// let upvoteTimeOut = null;

const QuestionCard = ({ props = defaultObj }) => {
    if (props == null) props = defaultObj;
    const navigate = useNavigate();
    const ref = useRef(null);
    const [isOverflow, setOverflow] = useState(false);
    const [expanded, setExpanded] = useState(false);
    useEffect(() => {
        if (ref.current) {
            const style = window.getComputedStyle(ref.current);
            const lineHeight = parseInt(style.lineHeight, 10);
            const lines = Math.round(ref.current.scrollHeight / lineHeight);

            setOverflow(lines > 3);
        }
    }, [props.description]);


    const [upvote, setUpVote] = useState(false);
    const upvoteTimeOut = useRef(null);
    const isLogin = useSelector((state) => state.userDetail.email) != 'Login';


    return (
        <>
            <div className='bg-white mt-5 w-full max-w-[800px] min-h-[400px] flex flex-col py-[25px] px-[30px] relative question-card-shadow cursor-pointer'>

                <div className="py-4 flex items-center gap-3 mb-4 border-b-1 border-b-gray-300 cursor-pointer">

                    <div className='rounded-full bg-green-100 h-10 w-10 flex justify-center items-center'>{props.authorname.substring(0, 2).toUpperCase()}</div>
                    <span className="font-medium text-gray-700">{props.authorname}</span>
                </div>
                <div>
                    <h2 className='font-semibold text-[18px]'>{props.question}</h2> {/* question heading */}
                    <p ref={ref} className={`
                    mt-5  font-light
                    ${expanded ? 'overflow-y-scroll pb-[10px] h-[300px] sm:h-[300px]' : 'line-clamp-3'}`}>
                        {props.description}
                    </p>
                </div>
                {
                    (isOverflow && !expanded) && (
                        <button className='bg-red-400 w-[80px] text-[14px] cursor-pointer' onClick={() => setExpanded(!expanded)} >{expanded ? 'show less' : 'show more'}</button>
                    )
                }
                <div className='px-[30px] bg-[var(--select-color)] w-full h-[60px] absolute left-0 bottom-0 rounded-b-[10px] flex justify-start items-center text-white gap-[30px]'>
                    <span>
                        <button onClick={() => {
                            if (!isLogin) {
                                getDispatch()(setAlertMessage({
                                    message: 'You Are Not Logined',
                                    sign: 2
                                }));
                                return;
                            }
                            let newVal = !upvote;
                            setUpVote(newVal);
                            if (upvoteTimeOut.current != null) clearTimeout(upvoteTimeOut.current);
                            upvoteTimeOut.current = setTimeout(() => {
                                console.log(newVal);
                            }, 1000);

                        }}>
                            <i className={`fa-solid fa-heart scale-[1.4]`}

                                style={{
                                    color: upvote ? 'hotpink' : 'white'
                                }}
                            ></i>
                        </button> {props.upvotes.length + upvote}
                    </span>
                    <button onClick={() => navigate(`/question/${props.qid}`)} ><i className="fa-solid fa-comment scale-[1.4]"></i> 0</button>
                    <span><i className="fa-solid fa-bookmark scale-[1.4]"></i></span>
                </div>
            </div>
            {/* <div className='bg-white w-full max-w-[800px] h-[300px] flex flex-col py-[25px] px-[30px] relative question-card-shadow'></div> answer tab */}
        </>
    )
}

export default QuestionCard;