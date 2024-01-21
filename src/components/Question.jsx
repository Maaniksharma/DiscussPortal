import { useState, useEffect } from "react";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import formatDate from "./DateFormatter";
import { FaRegStar, FaStar } from "react-icons/fa";

const Question = ({
  id,
  name,
  content,
  onDelete,
  onUpdate,
  date,
  star,
  doStar,
  doUnStar,
}) => {
  const [isStar, setIsstar] = useState(star);
  const handleStar = () => {
    setIsstar(!isStar);
    const questions = JSON.parse(localStorage.getItem("questions"));
    if (isStar) doUnStar(id);
    else doStar(id);
    if (questions) {
      const updatedquestions = questions.map((question) => {
        if (question.id === id) {
          question = {
            ...question,
            star: !star,
          };
        }
        return question;
      });
      console.log(updatedquestions);
      localStorage.setItem("questions", JSON.stringify(updatedquestions));
    }
  };
  const [Ddate, setDdate] = useState("");
  const handleDelete = () => {
    onDelete(id);
  };
  const handleUpdate = () => {
    onUpdate(id, name, content);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      const vdate = formatDate(date);
      setDdate(vdate);
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Link to={`/${id}`}>
      <div className=" border-2 rounded border-gray-300 hover:bg-gray-300 px-3 py-2 mb-2">
        <div className="flex justify-between">
          <div className="text-xl font-normal">{name}</div>
          <div className="flex gap-2 items-center">
            <div className="text-gray-700  text-sm">{Ddate}</div>
            <button
              className="w-8 h-8 border-2 rounded pl-1.5"
              onClick={handleDelete}
            >
              <FaTrash />
            </button>
            <button
              className="w-8 h-8 border-2 rounded pl-1.5"
              onClick={handleUpdate}
            >
              <FaPencilAlt />
            </button>
            <button
              className="w-8 h-8 border-2 rounded pl-1.5"
              onClick={handleStar}
            >
              {isStar ? <FaStar /> : <FaRegStar />}
            </button>
          </div>
        </div>
        <div className="text-sm text-gray-800 overflow-hidden  h-6 truncate">
          {content}
        </div>
      </div>
    </Link>
  );
};

export default Question;
