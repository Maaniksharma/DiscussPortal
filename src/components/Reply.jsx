import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import ReplyForum from "./ReplyForum";

const Reply = ({ id }) => {
  const [answerOpen, setAnswerOpen] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [votes, setVotes] = useState([]);

  const toggleAnswer = () => {
    setAnswerOpen(!answerOpen);
  };

  const updateAnswers = () => {
    const storedQuestions = JSON.parse(localStorage.getItem("questions"));
    let newAnswers = [];
    let newVotes = [];
    if (storedQuestions) {
      newAnswers = storedQuestions.filter((question) => question.id === id)[0]
        .answers;
      setAnswers(newAnswers);
      storedQuestions
        .filter((question) => question.id === id)
        .map((question) =>
          question.answers.map((answer) =>
            newVotes.push({ id: answer.id, votes: answer.votes })
          )
        );

      setVotes(newVotes);
    }
  };
  useEffect(() => {
    updateAnswers();
  }, []);

  const upVote = (id) => {
    const updatedVotes = votes.map((vote) => {
      if (vote.id === id) {
        return {
          ...vote,
          votes: vote.votes + 1,
        };
      }
      return vote;
    });
    setVotes(updatedVotes);
    const questions = JSON.parse(localStorage.getItem("questions"));
    const updatedQuestions = questions.map((question) => {
      question.answers = question.answers.map((answer) => {
        if (answer.id === id) {
          return {
            ...answer,
            votes: answer.votes + 1,
          };
        }
        return answer;
      });
      return question;
    });
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };

  const downVote = (id) => {
    const updatedVotes = votes.map((vote) => {
      if (vote.id === id) {
        return {
          ...vote,
          votes: vote.votes - 1,
        };
      }
      return vote;
    });
    setVotes(updatedVotes);
    const questions = JSON.parse(localStorage.getItem("questions"));
    const updatedQuestions = questions.map((question) => {
      question.answers = question.answers.map((answer) => {
        if (answer.id === id) {
          return {
            ...answer,
            votes: answer.votes - 1,
          };
        }
        return answer;
      });
      return question;
    });
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };
  const sortedVotes = votes.sort((a, b) => b.votes - a.votes);
  return (
    <div className="mt-16">
      <div className="flex justify-between">
        <div className="font-semibold text-lg text-slate-800">Post Answer</div>
        <div
          className="flex gap-1 items-center hover:rounded hover:bg-gray-300 p-1 w-24 cursor-pointer"
          onClick={toggleAnswer}
        >
          <div className="">Answers</div>
          <FaChevronDown className="w-6 h-6 pt-1" />
        </div>
      </div>
      {answerOpen && answers.length > 0 ? (
        <div className="mt-2">
          {sortedVotes.map((vote, index) => {
            const answer = answers.filter((answer) => answer.id === vote.id);
            return (
              <div key={index} className="bg-gray-300 p-2 rounded mt-2">
                <div className="flex justify-between">
                  <div className="font-semibold text-lg text-slate-800">
                    {answer[0].name}
                  </div>
                  <div className="flex">
                    <div className="">
                      <BiUpvote
                        className="w-6 h-6 cursor-pointer hover:bg-gray-400 rounded"
                        id={answer[0].id}
                        onClick={() => upVote(answer[0].id)}
                      />
                    </div>
                    <div className="">{vote.votes}</div>
                    <div className="">
                      <BiDownvote
                        className="h-6 w-6 cursor-pointer hover:bg-gray-400 rounded"
                        onClick={() => downVote(answer[0].id)}
                      />
                    </div>
                    <div className="text-sm text-gray-600">
                      {new Date(answer[0].date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        timeZone: "UTC",
                      })}
                    </div>
                  </div>
                </div>
                <div className="text-gray-600 mt-1">{answer[0].content}</div>
              </div>
            );
          })}
        </div>
      ) : null}
      <ReplyForum sid={id} updateAnswers={updateAnswers} />
    </div>
  );
};

export default Reply;
