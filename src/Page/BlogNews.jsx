import React from "react";
import { FaLightbulb, FaRocket, FaUserCheck } from "react-icons/fa";

const BlogNews = () => {
  const articles = [
    {
      icon: <FaLightbulb className="text-yellow-500 text-3xl" />,
      title: "Top 5 Tips to Get More Tasks",
      description:
        "Boost your earnings with these proven strategies to land more tasks and build your TaskBazaar reputation.",
    },
    {
      icon: <FaRocket className="text-purple-500 text-3xl" />,
      title: "Exciting Platform Updates",
      description:
        "We’ve rolled out new features including faster task matching and performance-based rewards. See what’s new!",
    },
    {
      icon: <FaUserCheck className="text-green-500 text-3xl" />,
      title: "Success Story: From Newbie to Pro",
      description:
        "Read how a young freelancer turned part-time gig into a full-time career using TaskBazaar.",
    },
  ];

  return (
    <section className="bg-white py-16 px-6 md:px-20 text-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Blog & News
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((item, idx) => (
            <div
              key={idx}
              className="bg-blue-50 hover:bg-white border border-blue-100 hover:shadow-lg rounded-xl p-6 transition"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogNews;
