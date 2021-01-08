import Navbar from "@/components/Navbar";
const MainLayout = ({ children }) => {
  return (
    <div className="w-10/12 md:w-3/4 mx-auto">
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
