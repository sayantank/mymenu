import formatDate from "@/utils/formatDate";
import { useState, useEffect } from "react";
import { addMeal, updateMeal } from "@/lib/db";
import isAlnum from "@/utils/isAlnum";
import isAlpha from "@/utils/isAlpha";
import { is } from "date-fns/locale";
import isAlnumSpace from "@/utils/isAlnumSpace";

const Modal = ({
  user,
  add,
  setShowModal,
  selectedDate,
  selectedMeal,
  setSelectedMeal,
}) => {
  const [values, setValues] = useState([]);
  const [curr, setCurr] = useState("");
  const [title, setTitle] = useState("");
  const [emptyError, setEmptyError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [dishError, setDishError] = useState("");

  useEffect(() => {
    if (selectedMeal) {
      setValues(selectedMeal.dishes);
      setTitle(selectedMeal.title);
    }
    return () => {
      setSelectedMeal(undefined);
      setValues([]);
      setTitle("");
    };
  }, []);

  useEffect(() => {
    if (values.length > 0) {
      setEmptyError("");
    }
  }, [values]);

  const handleAdd = () => {
    if (isAlnumSpace(curr.trim())) {
      setDishError("");
      const temp = [...values];
      temp.push(curr.trim());
      setValues(temp);
      setCurr("");
    } else {
      setDishError("Invalid Dish");
    }
  };

  const deleteDish = (index) => {
    const temp = [...values];
    temp.splice(index, 1);
    setValues(temp);
  };

  const submitMeal = async (e) => {
    e.preventDefault();
    if (values.length > 0 && isAlpha(title)) {
      setEmptyError("");
      setTitleError("");
      setShowModal(false);
      const temp = {};
      temp.ownerId = user.uid;
      temp.ownerUsername = user.username;
      temp.dishes = values;
      temp.date = formatDate(selectedDate);
      temp.title = title;
      if (add) temp.createdAt = formatDate(new Date());
      else temp.createdAt = selectedMeal.createdAt;
      temp.updatedAt = formatDate(new Date());
      // console.log(temp);
      if (add) {
        await addMeal(temp);
      } else {
        await updateMeal(temp, selectedMeal.id);
      }
      window.location.replace("/dashboard");
    } else {
      if (values.length <= 0) {
        setEmptyError("There are no dishes");
      } else {
        setEmptyError("");
      }
      if (!isAlpha(title)) {
        setTitleError("Invalid Title");
      } else {
        setTitleError("");
      }
    }
  };

  return (
    <div className="z-10 h-screen w-screen fixed top-0 bg-secondary bg-opacity-95 p-4 flex justify-center items-center ">
      <div className="w-full lg:w-7/12 p-5 lg:p-8 bg-white flex flex-col items-center rounded-md shadow-lg">
        <div className="flex justify-end w-full -mb-2">
          <svg
            onClick={() => setShowModal(false)}
            className="w-6 h-6 cursor-pointer"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <h1 className="text-3xl lg:text-4xl text-secondary font-bold">
          {add ? "Add Meal" : "Edit Meal"}
        </h1>
        <form
          id="meal-form"
          className="w-full flex flex-col items-center space-y-2 lg:space-y-4 bg-white mb-4 py-4"
          onSubmit={submitMeal}
        >
          <input
            type="text"
            value={title}
            placeholder="Meal Title*"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 text-lg lg:text-xl text-secondary font-semibold py-3 lg:py-4 focus:outline-none border-2 lg:border-4 border-secondary rounded-md"
          />
          {titleError !== "" && (
            <h3 className="text-sm lg:text-base text-red-500 font-normal mt-2">
              {titleError}
            </h3>
          )}
          {values.map((value, i) => (
            <div
              key={i}
              className="flex w-full items-center px-3 border-b-2 lg:border-b-4"
            >
              <input
                key={i}
                className="flex-1 bg-white w-full py-2 lg:py-3 text-md lg:text-lg text-secondary font-medium"
                type="text"
                value={value}
                readOnly="readonly"
              />
              <svg
                onClick={() => deleteDish(i)}
                className="w-6 h-6 text-tertiary cursor-pointer"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          ))}
        </form>
        <div className="flex flex-row w-full">
          <input
            className="w-9/12 block p-2 lg:p-3 text-md lg:text-xl outline-none border-2 lg:border-4 lg:border-r-0 border-r-0 rounded-tl-md rounded-bl-md"
            type="text"
            value={curr}
            placeholder="Add a dish"
            onChange={(e) => setCurr(e.target.value)}
          />
          <button
            className="w-1/4 p-2 lg:p-3 text-2xl lg:text-4xl outline-none bg-secondary hover:bg-tertiary text-white font-bold focus:outline-none"
            type="button"
            onClick={handleAdd}
          >
            +
          </button>
        </div>
        {dishError !== "" && (
          <h3 className="text-sm lg:text-base text-red-500 font-normal mt-2">
            {dishError}
          </h3>
        )}
        <button
          type="submit"
          form="meal-form"
          className="w-full bg-primary hover:bg-secondary transition-colors focus:outline-none text-xl lg:text-2xl p-3 text-white font-bold rounded-md mt-6"
        >
          Submit
        </button>
        {emptyError !== "" && (
          <h3 className="text-sm lg:text-base text-red-500 font-normal mt-2">
            {emptyError}
          </h3>
        )}
      </div>
    </div>
  );
};

export default Modal;
