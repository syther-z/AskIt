import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDispatch } from '../../App';
import { setAlertMessage } from '../../controllers/states/slices/alertslice';
import { handleUpvote } from '../../models/question.model';
import { followHandle, getTimeAgo } from '../../controllers/helper';
import { followPerson } from '../../models/interaction';

const defaultObj = {
    question: 'Testing',
    description: 'Test Card',
    author: '',
    authorname: 'Anonymous',
    qid: 'null',
    upvotes: [],
    createdAt: new Date().toISOString()
}
// let upvoteTimeOut = null;

const QuestionCard = ({ props = defaultObj , comment = true}) => {
    if (props == null) props = defaultObj;
    const navigate = useNavigate();
    const ref = useRef(null);
    const [isOverflow, setOverflow] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const user = useSelector((state) => state.userDetail);
    const isLogin = user.email != 'Login';
    const [upvote, setUpVote] = useState(false);
    const initialUpvote = useRef(null);
    const initialFollow = useRef(user.following.includes(props.author));
    const [isFollowing, setIsFollowing] = useState(user.following.includes(props.author));
    useEffect(() => {
        if (user.email) {
            initialUpvote.current = props.upvotes.includes(user.email);
            setUpVote(props.upvotes.includes(user.email));
        }
        if (user.following) {
            initialFollow.current = user.following.includes(props.author);
            setIsFollowing(user.following.includes(props.author));
        }
    }, [user.email, user.following, props]);


    const totalUpvote = useRef(upvote ? -1 : 0);
    const upvoteTimeOut = useRef(null);

    
    useEffect(() => {
        if (ref.current) {
            const style = window.getComputedStyle(ref.current);
            const lineHeight = parseInt(style.lineHeight, 10);
            const lines = Math.round(ref.current.scrollHeight / lineHeight);

            setOverflow(lines > 3);
        }
        // setUpVote(props.upvotes.includes(email));
    }, [props.description]);



    const nameLength = window.innerWidth < 900 ? 8 : 1000;
    return (
        <>
            <div className='bg-white mt-5 w-full max-w-[800px] min-h-[400px] flex flex-col py-[25px] px-[30px] relative question-card-shadow cursor-pointer'
            onClick={()=>{
                if(comment) navigate(`/question/${props.qid}`);
            }}>

                <div className="py-4 flex items-center justify-between gap-3 mb-4 border-b-1 border-b-gray-300 cursor-pointer">
                    <div className='flex gap-3 items-center'>
                        <div className='rounded-full bg-green-100 h-10 w-10 flex justify-center items-center'>{props.authorname.substring(0, 2).toUpperCase()}</div>
                        <span

                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/profile/${props.author}`);
                            }}


                            className="font-medium  text-gray-700 hover:text-gray-900 ">{props.authorname.substring(0, Math.min(nameLength, props.authorname.length))}{props.authorname.length >=nameLength && '...'}</span>
                        {props.author != user.email && <button className={`transition-all duration-100   px-2 py-1 rounded-[5px] ${isFollowing ? 'bg-green-100' : 'bg-blue-100'}  ml-1 font-bold  text-[14px] text-[var(--select-color)]`}

                            onClick={(e) => {
                                e.stopPropagation();
                                if (!isLogin) {
                                    getDispatch()(setAlertMessage({
                                        message: 'You Are Not Logined',
                                        sign: 2
                                    }));
                                    return;
                                }
                                setIsFollowing(!isFollowing);
                                followHandle(initialFollow.current, isFollowing, props.author);
                            }}

                            style={{
                                color: isFollowing ? 'green' : 'var(--select-color)'
                            }}
                        >{isFollowing ? 'following' : 'follow'}</button>}
                    </div>
                    <span className='justify-self-end text-gray-500 text-[14px]'>{getTimeAgo(props.createdAt)}</span>
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
                        <button className='bg-red-400 w-[80px] text-[14px] cursor-pointer' onClick={(e) => { e.stopPropagation(); setExpanded(!expanded);}} >{expanded ? 'show less' : 'show more'}</button>
                    )
                }
                <div className='px-[30px] bg-[var(--select-color)] w-full h-[60px] absolute left-0 bottom-0 rounded-b-[10px] flex justify-start items-center text-white gap-[30px]'>
                    <span>
                        <button onClick={(e) => {
                            e.stopPropagation();
                            if (!isLogin) {
                                getDispatch()(setAlertMessage({
                                    message: 'You Are Not Logined',
                                    sign: 2
                                }));
                                return;
                            }
                            if (upvote) {
                                totalUpvote.current--;
                                setUpVote(false);
                            } else {
                                totalUpvote.current++;
                                setUpVote(true);
                            }
                            if (upvoteTimeOut.current != null) clearTimeout(upvoteTimeOut.current);
                            upvoteTimeOut.current = setTimeout(() => {
                                // console.log(newVal);
                                if (initialUpvote.current == upvote) handleUpvote(props.qid);
                            }, 1000);

                        }}>
                            <i className={`fa-solid fa-heart scale-[1.4] cursor-pointer`}

                                style={{
                                    color: upvote ? 'hotpink' : 'white'
                                }}
                            ></i>
                        </button> {props.upvotes.length + (totalUpvote.current)}
                    </span>
                   {comment && <button onClick={() => navigate(`/question/${props.qid}`)} ><i className="fa-solid fa-comment scale-[1.4] cursor-pointer"></i> {props.answers.length}</button>}
                    <span><i className="fa-solid fa-bookmark scale-[1.4]"></i></span>
                </div>
            </div>
            {/* <div className='bg-white w-full max-w-[800px] h-[300px] flex flex-col py-[25px] px-[30px] relative question-card-shadow'></div> answer tab */}
        </>
    )
}

export default QuestionCard;