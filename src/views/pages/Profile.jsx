import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../../controllers/states/slices/userdetail.js';
import { isAuthenticated } from '../../models/authorization';
import { updateLoader } from '../../controllers/states/slices/loadingslice.js';
import { getDispatch } from '../../App.jsx';
import { targetURL } from '../../models/constants.js';
import { getMyQuestions } from '../../models/question.model.js';
import { updateQuestions } from '../../controllers/states/slices/myquestionslice.js';
import { Link } from 'react-router-dom';
const Profile = () => {

  // const con = async () => {
  //   try {
  //     const a = await fetch(`${targetURL}/testing`);
  //   } catch (error) {}
  // }
  
  // getDispatch()(updateLoader(true));
  // con().then(()=>{
  //     getDispatch()(updateLoader(false));
  // })
  const questionList = useSelector((state) => state.myQuestions.questions);
  const userDetail = useSelector((state) => state.userDetail);

  const [activeTab, setActiveTab] = useState("questions");

  useEffect(() => {
    if(activeTab == 'questions'){
      getMyQuestions().then(val => {
        console.log(val);
        getDispatch()(updateQuestions(val));
      });
    }
  }, []);

 
  const replies = [
    { id: 1, text: "Redux helps in managing global state efficiently." },
    { id: 2, text: "useEffect runs after render, unlike componentDidMount which runs once." },
  ];

  const upvotes = [
    { id: 1, text: "Best practices for folder structure in MERN stack?" },
    { id: 2, text: "How to optimize React performance?" },
  ];

  const [isFollowing, setIsFollowing] = useState(false);

const handleFollow = () => {
  // 🔹 call backend API here: followUser(userid)
  setIsFollowing(!isFollowing);
};



  return (
    <div className=" w-full h-[var(--min-page-size)] flex flex-col p-[25px] items-center gap-[40px] overflow-y-scroll">

      {/* Profile Section */}
      <section className="w-full min-h-[300px] max-w-[500px] h-fit flex flex-col sm:flex-row wrap question-card-shadow">
        <div className="w-full h-full flex flex-col">
          <div className="w-full h-full flex flex-col justify-center items-center gap-3 p-4">
            <img src="user.png" width={100} alt="profile" />
            <span className='flex flex-col items-center'>
            <span className="font-semibold text-lg">{userDetail.username}</span>
            <span className="font-semibold text-gray-500 text-[12px]">{userDetail.email}</span>
            </span>
          </div>
          {/* <div className='w-full flex justify-center  mb-4'>
          <button className='text-white bg-[#288e28] w-[80px] h-[35px] rounded-[5px]'>Follow</button>
          </div> */}
          <div className="bg-[var(--select-color)] h-1/3 flex justify-center items-center gap-[20px] text-white font-bold rounded-b-[10px] p-3">
            <span>Following 0</span>
            <span>Follower 0</span>
          </div>
        </div>
      </section>

      {/* Navbar Tabs */}
      <div className="flex gap-6 border-b w-full max-w-[700px] justify-center">
        {["questions", "replies", "upvotes"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 font-semibold capitalize ${
              activeTab === tab ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 cursor-pointer"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <section className="w-full min-h-[350px] max-w-[700px] h-fit flex flex-col gap-5 bg-white  p-5 overflow-y-scroll">
        {activeTab === "questions" && (
          questionList.length != 0 ? <>
          <h2 className="text-xl font-bold">Your Questions</h2>
          {questionList.map((q) => (
            <Link to={`/question/${q.qid}`}>
            <div key={q.qid} className="p-4 rounded-xl border-1 border-gray-100 border-b-[#d7d7d7] cursor-pointer  bg-white">
              <p className="font-medium">{q.question}</p>
              <div className="flex justify-between gap-[20px] text-sm text-[#686868] mt-2">
                <span><i className="fa-solid fa-heart scale-[1.4]"></i> {q.upvotes.length}</span>
                <span><i className="fa-solid fa-comment scale-[1.4]"></i> {q.answers.length}</span>
              </div>
            </div>
            </Link>
          ))}
        </> : (<div className='w-full h-full flex justify-center items-center text-gray-400'>No questions yet</div>)
        )}

        {activeTab === "replies" && (
          <>
            <h2 className="text-xl font-bold">Your Replies</h2>
            {replies.map((r) => (
              <div key={r.id} className="p-4 rounded-xl shadow border bg-gray-50">
                <p className="text-gray-700">{r.text}</p>
              </div>
            ))}
          </>
        )}

        {activeTab === "upvotes" && (
          <>
            <h2 className="text-xl font-bold">Your Upvotes</h2>
            {upvotes.map((u) => (
              <div key={u.id} className="p-4 rounded-xl shadow border bg-gray-50">
                <p className="text-gray-700">👍 {u.text}</p>
              </div>
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default Profile;
