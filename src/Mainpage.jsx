import Question from "./components/Question.jsx";
import QuestionModal from "./components/questionModal.jsx";
import formatDate from "./components/DateFormatter";
import Reply from "./components/Reply.jsx";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Dquestions, setDquestions] = useState([]);
  const [Ddate, setDdate] = useState("");
  const [displayQuestions, setDisplayQuestions] = useState([]);
  const [Vname, setVname] = useState("");
  const [Vcontent, setVcontent] = useState("");
  const [title, setTitle] = useState("Add");
  const [id, setId] = useState("");

  const { sid } = useParams();
  useEffect(() => {
    if (sid) {
      const intervalId = setInterval(() => {
        const filteredQuestions = displayQuestions.filter(
          (question) => question.id === sid
        );
        const vdate = formatDate(filteredQuestions[0]?.date);
        setDdate(vdate);
      }, 100);

      return () => {
        clearInterval(intervalId);
      };
    } else {
      setDdate("");
    }
  }, [sid, displayQuestions]);

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem("questions"));
    if (storedQuestions) {
      let starQuestions = storedQuestions.map((question) => {
        if (question.star == 1) return question;
      });
      starQuestions = starQuestions.filter(
        (question) => question !== undefined
      );
      let unstarQuestions = storedQuestions.map((question) => {
        if (question.star == 0) return question;
      });
      unstarQuestions = unstarQuestions.filter(
        (question) => question !== undefined
      );
      setDisplayQuestions([...starQuestions, ...unstarQuestions]);
    }
  }, []);

  useEffect(() => {
    if (sid) {
      const filteredQuestions = displayQuestions.filter(
        (question) => question.id === sid
      );
      setDquestions(filteredQuestions);
    } else {
      setDquestions([]);
    }
  }, [sid, displayQuestions]);
  const addQuestion = (name, content, id) => {
    if (name === "" || content === "") {
      setIsModalOpen(false);
      return;
    }
    let updatedQuestions = [];
    if (id) {
      const questions = JSON.parse(localStorage.getItem("questions"));
      updatedQuestions = questions.filter((question) => question.id !== id);
      console.log(updatedQuestions);
      localStorage.setItem("questions", JSON.stringify(updatedQuestions));
      console.log(id);
    }
    const newQuestion = {
      id: uuidv4(),
      name,
      content,
      date: new Date(),
      answers: [],
      star: 0,
    };
    if (id) {
      setDisplayQuestions([...updatedQuestions, newQuestion]);
      localStorage.setItem(
        "questions",
        JSON.stringify([...updatedQuestions, newQuestion])
      );
    } else {
      setDisplayQuestions([...displayQuestions, newQuestion]);
      localStorage.setItem(
        "questions",
        JSON.stringify([...displayQuestions, newQuestion])
      );
    }
    setIsModalOpen(false);
    setId("");
  };

  const deleteQuestion = (id) => {
    const updatedQuestions = displayQuestions.filter(
      (question) => question.id !== id
    );
    setDisplayQuestions(updatedQuestions);
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };
  const doStar = (id) => {
    let temp = displayQuestions.filter((question) => question.id !== id);
    const tempQ = displayQuestions.find((question) => question.id === id);
    temp = [tempQ, ...temp];
    setDisplayQuestions(temp);
  };
  const doUnStar = (id) => {
    let temp = displayQuestions.filter((question) => question.id !== id);
    const tempQ = displayQuestions.find((question) => question.id === id);
    temp = [...temp, tempQ];
    setDisplayQuestions(temp);
  };

  return (
    <div className="">
      <div className="text-3xl text-center text-slate-800 mb-6 font-semibold">
        Discuss Portal
      </div>
      <div className="flex gap-2">
        <div className="bg-gray-200 rounded px-2" style={{ width: "35%" }}>
          <div className="pb-8 flex items-center justify-between">
            <div className="text-2xl  text-slate-800 font-semibold ">
              Questions
            </div>
            <button
              className="flex bg-gray-500 hover:bg-gray-700 rounded py-1 px-2 gap-2 items-center mt-2"
              onClick={() => {
                setVname("");
                setVcontent("");
                setTitle("Add");
                setIsModalOpen(true);
                setId("");
              }}
            >
              <div className="w-6 h-6">
                <FaPlus className="w-full h-full fill-white" />
              </div>
              <div className="text-white text-lg font-semibold">Add</div>
            </button>
          </div>
          {displayQuestions.map((question) => (
            <div key={question.id}>
              <Question
                key={question.id}
                id={question.id}
                name={question.name}
                date={question.date}
                content={question.content}
                star={question.star}
                onDelete={deleteQuestion}
                onUpdate={(id, name, content) => {
                  setId(id);
                  setTitle("Update");
                  setVname(name);
                  setVcontent(content);
                  setIsModalOpen(true);
                }}
                doStar={doStar}
                doUnStar={doUnStar}
              />
            </div>
          ))}
        </div>
        <div className="p-8 pt-12" style={{ width: "70%" }}>
          {Dquestions.length > 0 ? (
            <div className="" key={Dquestions[0].id}>
              <div className="flex justify-between">
                <div className="text-3xl font-semibold text-slate-800">
                  {Dquestions[0].name}
                </div>
                <div className="text-xl font-normal text-slate-600 flex gap-3">
                  {Ddate}
                </div>
              </div>
              <div className="text-xl font-normal text-gray-600 whitespace-pre-wrap flex flex-wrap mt-3">
                {Dquestions[0].content}
              </div>

              <Reply id={Dquestions[0].id} key={Dquestions[0].id} />
            </div>
          ) : (
            <div className=""></div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <QuestionModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={addQuestion}
          Vname={Vname}
          Vcontent={Vcontent}
          title={title}
          id={id}
        />
      )}
    </div>
  );
};

export default MainPage;
