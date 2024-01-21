import { v4 as uuidv4 } from "uuid";

const ReplyForum = ({ sid, updateAnswers }) => {
  const addAnswer = (answer) => {
    let questions = JSON.parse(localStorage.getItem("questions"));
    if (questions) {
      const updatedquestions = questions.map((question) => {
        if (question.id === sid) {
          question = {
            ...question,
            answers: [...question.answers, answer],
          };
        }
        return question;
      });
      console.log(updatedquestions);
      localStorage.setItem("questions", JSON.stringify(updatedquestions));
      updateAnswers();
    }
  };
  return (
    <div className="mt-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const name = e.target.name.value;
          const content = e.target.content.value;
          e.target.reset();
          if (name === "" || content === "") return;
          const answer = {
            id: uuidv4(),
            name,
            content,
            date: new Date(),
            votes: 0,
          };
          addAnswer(answer);
        }}
      >
        <div className="mb-2">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className=" border focus:ring focusring-1 border-gray-400 p-2 rounded w-full focus:outline-none  focus:ring-blue-500"
          />
        </div>
        <div className="mb-2">
          <textarea
            name="content"
            placeholder="Your answer"
            className="border focus:ring border-gray-400 p-2 rounded w-full focus:outline-none  focus:ring-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default ReplyForum;
