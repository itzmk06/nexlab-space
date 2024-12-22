import Link from "next/link";
import React from "react";
import { getTimestamp } from "@/lib/utils";
import Metric from "../shared/Metric";
import Image from "next/image";

interface Author {
  _id: string;
  name: string;
  picture?: string; 
  clerkId: string;
}

interface Collaborator {
  _id: string;
  name: string;
  picture?: string;
}

interface Props {
  clerkId?: string | null;
  _id: string;
  title: string;
  author: Author;
  status: string;
  collaborators: Collaborator[];
  createdAt: Date;
  authorClerkId:String;
  description:string
}

const ProjectCard = ({
  authorClerkId,
  _id,
  title,
  author,
  status,
  collaborators,
  createdAt,
}: Props) => {


  const statusClass =
    status === "completed"
      ? "bg-blue-500 text-white dark:bg-blue-500"
      : "bg-green-300 dark:bg-green-300 text-green-800";

  return (
    <div className="relative rounded-xl sm:py-4 bg-[#FFFFFF] dark:bg-[#0B0D11] p-2 py-3  sm:p-3 shadow-md hover:shadow-lg transform transition-all duration-200 ease-in-out hover:scale-101 cursor-pointer">
      {/* Status Badge */}
      <div
        className={`absolute top-2 right-2 text-light-100 text-xs font-semibold uppercase py-1 px-2 rounded-full shadow tracking-wide ${statusClass}`}
      >
        {status}
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between py-3 px-8 gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-dark-300 dark:text-light-900 text-xs sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          {/* Link to the detailed project page */}
          <Link href={`/project/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>

      {/* Author Section */}
      <div className="mt-3 flex items-center gap-2 px-9">
        <Metric
          imgUrl={author?.picture || "/assets/icons/avatar.svg"}
          alt="User"
          value={author?.name || "Unknown"}
          title={`Added ${getTimestamp(createdAt)}`}
          href={`/profile/${authorClerkId}`}
          isAuthor
          textStyles="body-medium text-dark-300 dark:text-light-900"
        />
      </div>

      {/* Collaborators Section */}
      {collaborators.length > 0 && (
        <div className="mt-4 flex items-center gap-1 ml-3 px-8">
          {collaborators.slice(0, 3).map((collaborator) => (
            <div key={collaborator._id} className="relative group -ml-4">
              <Image
                width={58}
                height={58}
                src={collaborator.picture || "/assets/icons/avatar.svg"}
                alt={collaborator.name}
                className="w-8 h-8 rounded-full border-2 border-light-800 dark:border-dark-300 transform transition-all duration-200 hover:scale-110 hover:border-dark-100 dark:hover:border-light-900"
              />
              <div className="absolute left-1/2 transform -translate-x-1/2 top-10 opacity-0 group-hover:opacity-100 bg-light-700 dark:bg-dark-300 text-dark-400 dark:text-light-900 text-xs px-2 py-1 rounded-lg transition-opacity duration-200">
                {collaborator.name}
              </div>
            </div>
          ))}
          {collaborators.length > 3 && (
            <span className="text-dark-300 dark:text-light-900 text-xs font-medium">
              +{collaborators.length - 3} more
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
