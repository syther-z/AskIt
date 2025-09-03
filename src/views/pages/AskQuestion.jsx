import { useState } from "react";
import { postUserQuestion } from '../../models/question.model.js';
import { getDispatch } from "../../App";
import { setAlertMessage } from "../../controllers/states/slices/alertslice";
import { updateLoader } from "../../controllers/states/slices/loadingslice.js";
import { useNavigate } from "react-router-dom";
const AskQuestion = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    question: "",
    description: "",
    tags: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const questionData = {
      ...formData,
      tags: formData.tags.split(",").map(tag => tag.trim())
    };
    console.log("Submitted Question:", questionData);
    getDispatch()(updateLoader(true));
    const ans = await postUserQuestion(formData);
    getDispatch()(updateLoader(false));
    getDispatch()(setAlertMessage(ans));
    if(ans.sign == 1){
      navigate('/');
    }
    
  };

  return (
    <div className="flex justify-center h-[var(--min-page-size)] w-full p-[25px] font-[Inter] overflow-y-scroll page-load-animation">
      <div className="bg-white question-card-shadow h-fit p-6 w-full max-w-3xl">
        <h2 className="heading-h2 font-semibold mb-6">Ask a Question</h2>

        <form onSubmit={handleSubmit} className="space-y-5 text-[14px] font-normal">
          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-gray-700">Title</label>
            <input
              type="text"
              name="question"
              placeholder="e.g. What is React Redux used for?"
              value={formData.question}
              onChange={handleChange}
              required
              className="block w-full border-b-1 focus:rounded-md placeholder:font-[Arial] placeholder:text-[12px] px-[20px] border-gray-300  p-2  focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mt-[25px]">Description</label>
            <textarea
              name="description"
              placeholder="Add more details to your question..."
              value={formData.description}
              onChange={handleChange}
              rows="6"
              className="mt-1 block w-full rounded-md border placeholder:font-[Arial] placeholder:text-[12px] px-[20px] border-gray-300 p-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-bold text-gray-700">Tags</label>
            <input
              type="text"
              name="tags"
              placeholder="e.g. react, redux, javascript"
              value={formData.tags}
              onChange={handleChange}
              className="mt-1 block w-full placeholder:font-[Arial] placeholder:text-[12px] px-[20px] border-b-1 focus:rounded-md border-gray-300 p-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition font-bold font-[Inter]"
            >
              Post Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
