import Skeleton from "react-loading-skeleton";
import MainLayout from "../layouts/MainLayout";

const DashboardSkeleton = () => {
  return (
    <MainLayout>
      <Skeleton className="h-12 lg:h-16 mb-5" width="60%" />
      <div className="mb-4">
        <Skeleton className="h-8 lg:h-10" width="120px" />
        <Skeleton className="h-8 lg:h-10 ml-4" width="120px" />
      </div>
    </MainLayout>
  );
};

export default DashboardSkeleton;
