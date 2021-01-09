import { useEffect } from "react";

const MealCard = ({ meal }) => {
  return (
    <div className="flex flex-col space-y-3 p-6 border-2 rounded-md shadow-md">
      <div className="flex h-10 items-center border-b-2 space-x-5">
        <div className="h-5 w-5 rounded-full shadow-inner bg-gray-100" />
        <h1 className="font-fancy font-bold text-2xl lg:text-3xl text-secondary">
          {meal.title}
        </h1>
      </div>
      {meal.dishes.map((dish, i) => (
        <div key={i} className="flex h-10 items-center border-b-2 space-x-5">
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
