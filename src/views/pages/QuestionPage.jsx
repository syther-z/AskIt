import React, { useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import { getRandomColor } from "../../controllers/helper";
import { useParams } from "react-router-dom";
import { getQuestion } from "../../models/question.model";

// Dummy data (replace later with API/Redux data)
// const question = {
//   id: 1,
//   title: "What is the difference between state and props in React?",
//   description:
//     "I am confused about when to use state and when to use props. Can someone explain in simple terms?",
//   upvotes: 12,
//   replies: [
//     { id: 1, user: "Alice", text: "Props are passed from parent to child, state is managed within the component." },
//     { id: 2, user: "Bob", text: "Think of props as function arguments and state as local variables." },
//     { id: 3, user: "Charlie", text: "Props are immutable, state can change." },
//     { id: 1, user: "Alice", text: "Props are passed from parent to child, state is managed within the component. Props are passed from parent to child, state is managed within the component." },
//     { id: 2, user: "Bob", text: "Think of props as function arguments and state as local variables." },
//     { id: 3, user: "Charlie", text: "Props are immutable, state can change." },
//   ],
// };

const QuestionPage = () => {


  const { qid } = useParams();
  const [question, setQuestion] = useState(null);
    if(question == null)
    getQuestion(qid).then(val => {
      console.log(val)
      setQuestion(val);
    });
 


  return (
    <div className="bg-white w-full h-[var(--min-page-size)] flex flex-col p-[25px] items-center gap-[30px] overflow-y-scroll">
      
      <QuestionCard props={question}/>

      
      <h2 className="text-xl font-semibold mt-[30px] mb-[20px]">Replies</h2>
      <section className="w-full max-w-[800px] flex flex-col gap-4">
       
        {/* {question.replies.length > 0 ? (
          question.replies.map((r) => (
            <div
              key={r.id}
              className="p-4 px-[30px] rounded-[5px] question-card-shadow bg-white hover:shadow-md transition"
            >
              <div className="py-3 flex items-center gap-3 mb-4 border-b-1 border-b-gray-300">
                    
                    <div className={`rounded-full ${getRandomColor()} h-10 w-10 flex justify-center items-center`}>{r.user.substring(0, 2).toUpperCase()}</div>
                    <span className="font-medium text-gray-700">{r.user}</span>
                </div>
              <p className="py-5 min-h-[70px] text-gray-700 mt-1">{r.text}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No replies yet. Be the first to reply!</p>
        )} */}
      </section>
    </div>
  );
};

export default QuestionPage;
