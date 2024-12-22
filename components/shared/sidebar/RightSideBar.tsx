import Link from "next/link";
import React from "react";
import Image from "next/image";
import RenderTag from "../RenderTag";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getPopularTags } from "@/lib/actions/tag.action";

const RightSideBar = async () => {
  const topQuestions = await getHotQuestions();
  const popularTags = await getPopularTags();

  return (
    <section className="bg-light900_dark200 dark:bg-dark900 custom-scrollbar sticky top-0 right-0 flex flex-col h-screen overflow-y-auto overflow-x-hidden p-6 pt-20 max-xl:hidden lg:w-[280px] rounded-2xl shadow-xl dark:shadow-none transition-all duration-300 ease-in-out transform">
      {/* Top Questions Section */}
      <div className="mb-8">
        <h3 className="text-dark-200 dark:text-light-900 font-extrabold text-lg tracking-tight mb-5 transition-all duration-500 ease-in-out transform hover:text-accent-color">
          Top Questions
        </h3>
        <div className="flex flex-col gap-4">
          {topQuestions.map((question) => (
            <Link
              key={question._id}
              href={`/question/${question._id}`}
              className="flex items-center justify-between gap-5 p-3  rounded-lg bg-light-200 dark:bg-dark-700 hover:bg-light-300 dark:hover:bg-dark-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:translate-x-2 hover:shadow-md"
            >
              <p className="text-dark-500 dark:text-light-700 text-sm truncate max-w-[80%] leading-tight transition-all duration-300 ease-in-out hover:text-accent-color">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors transition-transform duration-300 ease-in-out  transform hover:scale-125"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Tags Section */}
      <div>
        <h3 className="text-dark-200 dark:text-light-900 font-extrabold text-lg tracking-tight mb-5 transition-all duration-500 ease-in-out transform hover:text-accent-color">
          Popular Tags
        </h3>
        <div className="flex flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.numberOfQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
