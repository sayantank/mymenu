import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MainLayout from "@/components/layouts/MainLayout";
import getDayName from "@/utils/getDayname";
import MealCard from "@/components/MealCard";
import formatDate from "@/utils/formatDate";
import Modal from "@/components/Modal";
import { parseISO } from "date-fns";

const Dashboard = () => {
  const [selectedDate, setselectedDate] = useState(new Date());
  const [selectedMeal, setSelectedMeal] = useState();
  const [showModal, setShowModal] = useState(false);

  const auth = useAuth();
  const { data } = useSWR(
    auth.user
      ? [`/api/meals/${formatDate(selectedDate)}`, auth.user.token]
      : null,
    fetcher
  );

  useEffect(() => {
    if (localStorage.getItem("selectedDate")) {
      const temp = parseISO(localStorage.getItem("selectedDate"));
      setselectedDate(temp);
    }
  }, []);

  const handleDateChange = (date) => {
    setselectedDate(date);
    localStorage.setItem("selectedDate", formatDate(date));
  };

  const CustomInput = ({ value, onClick }) => {
    return (
      <button
        className="lg:text-lg focus:outline-none border-2 hover:border-0 hover:bg-primary text-secondary hover:text-white transition-all rounded-md px-3 py-1"
        onClick={onClick}
      >
        {getDayName(selectedDate)}, {value}
      </button>
    );
  };

  return auth.user ? (
    <>
      {showModal ? (
        <Modal
          add={true}
          selectedMeal={selectedMeal}
          setShowModal={setShowModal}
          selectedDate={selectedDate}
          setSelectedMeal={setSelectedMeal}
        />
      ) : (
        <MainLayout>
          <h1 className="lg:text-6xl text-4xl text-secondary font-extrabold">
            Dashboard
          </h1>
          <div className="flex space-x-5 items-center mt-5">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => handleDateChange(date)}
              customInput={<CustomInput />}
            />
            <button
              onClick={() => setShowModal(!showModal)}
              className="lg:text-lg border-2 border-secondary bg-secondary hover:bg-tertiary font-bold text-white rounded-md px-6 py-1"
            >
              Add a Meal
            </button>
          </div>

          {data !== undefined ? (
            data.meals.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-4">
                {data.meals.map((meal, i) => (
                  <MealCard
                    key={i}
                    meal={meal}
                    setSelectedMeal={setSelectedMeal}
                    setShowModal={setShowModal}
                    editable={true}
                  />
                ))}
              </div>
            ) : (
              <div className="flex w-full h-96 py-10 justify-center items-center">
                <p className="text-3xl font-bold text-secondary text-center">
                  You haven't added any meals!
                </p>
              </div>
            )
          ) : null}
          <button onClick={(e) => auth.signout()}>Sign out</button>
        </MainLayout>
      )}
    </>
  ) : (
    <MainLayout>
      <h1>Oops! You're not dasdasd in.</h1>
    </MainLayout>
  );
};

export default Dashboard;
