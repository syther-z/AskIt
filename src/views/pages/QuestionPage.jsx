import React, { use, useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import { getRandomColor } from "../../controllers/helper";
import { useParams } from "react-router-dom";
import { getQuestion } from "../../models/question.model";
import { getAnswersToQuestion, postUserAnswer } from "../../models/answer.model";
import { getDispatch } from "../../App";
import { updateLoader } from "../../controllers/states/slices/loadingslice";
import { setAlertMessage } from "../../controllers/states/slices/alertslice";

const QuestionPage = () => {
  const { qid } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
      getAnswersToQuestion(qid).then((val) => {
        setQuestion(val);
        setAnswers(val.answers || []);
      });
  }, [qid, refresh]);

  
  const handlePostAnswer = () => {
    getDispatch()(updateLoader(true));
    postUserAnswer(newAnswer, qid).then(val => {
      getDispatch()(updateLoader(false));
      getDispatch()(setAlertMessage({message: val.message, sign: val.sign}));
      setNewAnswer('');
      setRefresh(refresh + 1);
    });
    
  };
 
  return (
    <div className="page-load-animation w-full h-[var(--min-page-size)] flex flex-col p-[25px] items-center gap-[30px] overflow-y-scroll">
      {/* Question Card */}
      <QuestionCard props={question} comment={false} />

      {/* Answer Box */}
      <div className="w-full max-w-[800px] bg-white p-5 rounded-lg question-card-shadow flex flex-col gap-3">
        <h2 className="text-lg font-bold  py-3">Post Your Answer</h2>
        <textarea
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Write your answer here..."
          className="placeholder:text-[12px] placeholder:font-light  w-full min-h-[120px] border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-1 focus:black"
        />
        <button
          onClick={handlePostAnswer}
          className="self-end px-4 py-2 bg-[var(--select-color)] text-white rounded-md font-bold hover:bg-blue-600 transition"
        >
          Post Answer
        </button>
      </div>

      {/* Answers List */}
      <h2 className="text-xl font-semibold mt-[30px] mb-[20px]">Replies</h2>
      <section className="w-full max-w-[800px] flex flex-col gap-4">
        {answers.length > 0 ? (
          answers.map((r) => (
            <div
              key={r.aid}
              className="p-4 px-[30px] rounded-[5px] question-card-shadow bg-white hover:shadow-md transition"
            >
              <div className="py-3 flex items-center gap-3 mb-4 border-b border-gray-300">
                <div
                  className={`rounded-full ${getRandomColor()} h-10 w-10 flex justify-center items-center`}
                >
                  {r.authorname.substring(0, 2).toUpperCase()}
                </div>
                <span className="font-medium text-gray-700">{r.authorname}</span>
              </div>
              <p className="py-5 min-h-[70px] text-gray-700 mt-1">{r.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No replies yet. Be the first to reply!</p>
        )}
      </section>
    </div>
  );
};

export default QuestionPage;
