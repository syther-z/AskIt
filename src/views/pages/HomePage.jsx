import React, { useEffect } from 'react'
import Page from '../components/Page';
import QuestionCard from '../components/QuestionCard';
import { isAuthenticated } from '../../models/authorization';
import { updateFeed } from '../../controllers/states/slices/homefeed.js';
import { useDispatch, useSelector } from 'react-redux';
import { getDispatch } from '../../App.jsx';
import { homeQuestions } from '../../models/home.model.js';
// import { alertMessage } from '../../controllers/states/slices/alertslice.js';
const HomePage = () => {


  const feed = useSelector((state) => state.homeFeed.questions);
  const dispatch = useDispatch();
  useEffect(() => {
    homeQuestions().then((val) => {
      dispatch(updateFeed(val));
    })
  }, []);


  return (
    <section id='homepage' className='page-load-animation' style={{height: 'calc(100vh - var(--navbar-height)'}}>


      <div className={`w-full h-full flex items-center flex-col p-[20px] m-0 overflow-y-scroll`}>
      {
        feed.length > 0 ? feed.map((item) => {
          return <QuestionCard props={item}/>
        }) : <div className='w-full h-full flex justify-center items-center text-gray-500'>No questions yet</div>
      }
      </div>
       
      
    </section>
  )
}

export default HomePage;