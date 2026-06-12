import React from "react";
import {
  FileText,
  Award,
  Users,
  Download,
} from "lucide-react";

const Dashboard = () => {
  const cards = [
    {
      title: "Certificates",
      count: 120,
      icon: <Award size={28} />,
      color: "bg-blue-500",
    },
    {
      title: "Templates",
      count: 35,
      icon: <FileText size={28} />,
      color: "bg-green-500",
    },
    {
      title: "Users",
      count: 450,
      icon: <Users size={28} />,
      color: "bg-purple-500",
    },
    {
      title: "Downloads",
      count: 980,
      icon: <Download size={28} />,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="
              bg-white
              rounded-2xl
              shadow-md
              p-5
              flex
              items-center
              justify-between
              hover:shadow-lg
              transition
            "
          >
            <div>
              <p className="text-gray-500 text-sm">
                {card.title}
              </p>

              <h3 className="text-3xl font-bold mt-1">
                {card.count}
              </h3>
            </div>

            <div
              className={`
                ${card.color}
                text-white
                p-4
                rounded-xl
              `}
            >
              {card.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;