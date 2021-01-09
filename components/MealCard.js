import { useEffect, useState } from "react";

const MealCard = ({ meal, setSelectedMeal, setShowModal, editable }) => {
  const handleSelect = () => {
    setSelectedMeal(meal);
    setShowModal(true);
  };
  return (
    <div className="flex flex-col space-y-3 p-6 border-2 rounded-md shadow-md">
      <div className="flex items-center border-b-2 space-x-5 py-2">
        <div className="h-5 w-5 rounded-full shadow-inner bg-gray-100" />
        <h1 className="font-fancy font-bold text-2xl lg:text-3xl text-secondary">
          {meal.title}
        </h1>
        {editable && (
          <div className="flex-1 flex justify-end space-x-3">
            <svg
              onClick={handleSelect}
              className="w-8 h-8 text-primary cursor-pointer"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
            </svg>
            <svg
              className="w-8 h-8 text-primary cursor-pointer"
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
        )}
      </div>
      {meal.dishes.map((dish, i) => (
        <div key={i} className="flex py-2 items-center border-b-2 space-x-5">
          <div className="h-5 w-5 rounded-full shadow-inner bg-gray-100" />
          <h2 className="font-fancy text-xl lg:text-2xl text-secondary">
            {dish}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default MealCard;
