import React, { useEffect, useState } from "react";
import TopNavbar from "../components/dashboard/TopNavbar";
import HeroCard from "../components/dashboard/HeroCard";
import LearningSection from "../components/dashboard/LearningSection";
import ShowcaseSection from "../components/dashboard/ShowcaseSection";
import RightPanel from "../components/dashboard/RightPanel";
import Sidebar from "../components/dashboard/SideBar";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        title: "Digital Marketing Mastery for Beginners",
        progress: 93,
        image:
          "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRqbJH_VuhNIIASg9i2--LSRCuF76nKG2GCJJjcXl3Z_extHH0h",
      },
      {
        title: "MySQL Playlist",
        progress: 91,
        image:
          "https://img.youtube.com/vi/7S_tz1z_5bA/maxresdefault.jpg",
      },
      {
        title: "RESTful Web Services & API Testing",
        progress: 91,
        image:
          "https://img.youtube.com/vi/fgTGADljAeg/maxresdefault.jpg",
      },
      {
        title: "Comprehensive Python Programming",
        progress: 89,
        image:
          "https://img.youtube.com/vi/_uQrJ0TkZlc/maxresdefault.jpg",
      },
    ]);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <div className="h-16 bg-white border-b flex items-center px-6 shadow-sm z-50">
          <TopNavbar />
        </div>

        <div className="flex-1 overflow-y-auto p-6">

          <div className="flex flex-col md:flex-row gap-6">

            <div className="flex-1 space-y-6">
              <HeroCard />
              <LearningSection data={data} />
              <ShowcaseSection />
            </div>

            <RightPanel
              stats={{
                roleBased: 45,
                superSkills: 2,
              }}
            />

          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;