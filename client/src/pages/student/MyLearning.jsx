import React from "react";
import Course from "./Course";

const MyLearning = () => {
  const isLoading = false;
  const MyLearningCourses = [1, 2, 3];

  return (
    <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
      <h1 className="font-bold text-2xl">MY LIFE</h1>
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : MyLearningCourses.length === 0 ? (
          <p>Bless You !!!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2].map((course, index) => (
              <Course key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;

const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);
