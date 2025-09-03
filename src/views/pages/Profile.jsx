import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../../controllers/states/slices/userdetail.js';
import { isAuthenticated } from '../../models/authorization';
import { updateLoader } from '../../controllers/states/slices/loadingslice.js';
import { getDispatch } from '../../App.jsx';
import { targetURL } from '../../models/constants.js';
import { getMyQuestions } from '../../models/question.model.js';
import { updateQuestions } from '../../controllers/states/slices/myquestionslice.js';
import { Link, useParams } from 'react-router-dom';
import { getProfile, getUserAnswers } from '../../models/interaction.js';
import { setAlertMessage } from '../../controllers/states/slices/alertslice.js';
import { followHandle } from '../../controllers/helper.js';

const defaultObj = {
  username: '',
  email: 'Login',
  following: [],
  followers: [],
  questions: [],
}

const Profile = () => {

  const { pid } = useParams();

  const initialFollow = useRef(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const followersListCount = useRef(isFollowing ? -1 : 0);
  const [answers, setAnswers] = useState([]);
  
  const userDetail = useSelector((state) => state.userDetail);

  const [activeTab, setActiveTab] = useState("questions");
  const [userData, setUserData] = useState(defaultObj);

  useEffect(() => {
    if(activeTab == 'replies'){
      getUserAnswers(pid).then(val => {
        setAnswers(val);
      })
    }
  }, [activeTab]);
  
  useEffect(() => {
    getDispatch()(updateLoader(true));

    getProfile(pid).then(val => {
      if (!val || val.status !== 200) {
        getDispatch()(setAlertMessage('Something Went Wrong'));
        return;
      }

      val.user.questions = val.user.questions ?? [];
      setUserData(val.user);

      // If it's me, fetch my questions too
      if (pid === userDetail.email) {
        getMyQuestions().then(myQs => {
          setUserData(prev => ({ ...prev, questions: myQs }));
          getDispatch()(updateQuestions(myQs));
        });
      }
      initialFollow.current = userDetail.following.includes(pid);
      getDispatch()(updateLoader(false));
      setIsFollowing(userDetail.following.includes(pid));
    });
  }, [pid, userDetail]);


  // console.log(userData, ' ', isMe);
  const replies = [
    { id: 1, text: "Redux helps in managing global state efficiently." },
    { id: 2, text: "useEffect runs after render, unlike componentDidMount which runs once." },
  ];

  const upvotes = [
    { id: 1, text: "Best practices for folder structure in MERN stack?" },
    { id: 2, text: "How to optimize React performance?" },
  ];


  return (
    <div className=" w-full h-[var(--min-page-size)] flex flex-col p-[25px] items-center gap-[40px] overflow-y-scroll">

      {/* Profile Section */}
      <section className="w-full min-h-[300px] max-w-[500px] h-fit flex flex-col sm:flex-row wrap question-card-shadow page-load-animation">
        <div className="w-full h-full flex flex-col">
          <div className="w-full h-full flex flex-col justify-center items-center gap-3 p-4">
            <img src="/user.png" width={100} alt="profile" />
            <span className='flex flex-col items-center'>
              <span className="font-semibold text-lg">{userData.username}</span>
              <span className="font-semibold text-gray-500 text-[12px]">{userData.email}</span>
            </span>
          </div>
          <div className='w-full flex justify-center  mb-4'>
            {pid != userDetail.email && <button className={`text-[var(--select-color)] ${isFollowing ? 'bg-green-100' : 'bg-blue-100 '}  px-3 py-1 rounded-[5px]  transition-all duration-100`}

              onClick={(e) => {
                e.stopPropagation();
                if (userDetail.email == 'Login') {
                  getDispatch()(setAlertMessage({
                    message: 'You Are Not Logined',
                    sign: 2
                  }));
                  return;
                }
                if(isFollowing){
                  followersListCount.current--;
                  setIsFollowing(false);
                } else {
                  followersListCount.current++;
                  setIsFollowing(true);
                }
                followHandle(initialFollow.current, isFollowing, pid);
              }}

              style={{
                color: isFollowing ? 'green' : 'var(--select-color)'
              }}>
              {isFollowing ? 'Following' : 'Follow'}

            </button>}
          </div>
          <div className="bg-[var(--select-color)] h-1/3 flex justify-center items-center gap-[20px] text-white font-bold rounded-b-[10px] p-3">
            <span>Follower {userData.followers.length + followersListCount.current}</span>
            <span>Following {userData.following.length}</span>
          </div>
        </div>
      </section>

      {/* Navbar Tabs */}
      {pid == userDetail.email && <>
      <div className="flex gap-6 border-b w-full max-w-[700px] justify-center">
        {["questions", "replies"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 font-semibold capitalize ${activeTab === tab ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 cursor-pointer"
              }`}>
            {tab}
          </button>
        ))}
      </div>

      <section className="w-full min-h-[350px] max-w-[700px] h-fit flex flex-col gap-5 bg-white  p-5 overflow-y-scroll overflow-x-hidden">
        {activeTab === "questions" && (
          userData.questions.length != 0 ? <>
            <h2 className="text-xl font-bold">Your Questions</h2>
            {userData.questions.map((q, i) => (
              <Link key={i} to={`/question/${q.qid}`}>
                <div key={q.qid} className="p-4 rounded-xl border-1 border-gray-100 border-b-[#d7d7d7] cursor-pointer  bg-white page-load-animation">
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
            {answers.map((r) => (
              <Link to={`/question/${r.qid}`}>
              <div key={r.aid} className="p-4 rounded-xl border-1 border-gray-100 border-b-[#d7d7d7] cursor-pointer  bg-white question-card-shadow page-load-animation">
                <p className="text-gray-900">{r.content}</p>
              </div>
              </Link>
            ))}
          </>
        )}

        {/* {activeTab === "upvotes" && (
          <>
            <h2 className="text-xl font-bold">Your Upvotes</h2>
            {upvotes.map((u) => (
              <div key={u.id} className="p-4 rounded-xl shadow border bg-gray-50">
                <p className="text-gray-700">👍 {u.text}</p>
              </div>
            ))}
          </>
        )} */}
      </section>
      </>
}
    </div>
  );
};

export default Profile;
