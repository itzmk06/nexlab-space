import ProjectCard from "@/components/cards/ProjectCard";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/lib/actions/project.action";
import { SearchParamsProps } from "@/types";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects | NexLab",
  description: "Explore projects, collaborate with developers, and create new opportunities.",
};

export default async function ProjectFeed({ searchParams }: SearchParamsProps) {

    const result = await getProjects({
      searchQuery: searchParams.q,
    });
  

  return (
    <>
      {/* Header Section */}
      <div className="flex w-full -mt-10 flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-semibold text-dark100_light900">All Projects</h1>
        <Link href={`/post-project`} className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Create a Project
          </Button>
        </Link>
      </div>

      {/* Search & Filter Section */}
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/projects"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for projects"
          otherClasses="flex-1"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {result.projects.length > 0 ? (
          result.projects.map((project) => (
            <ProjectCard
              key={project._id}
              title={project.title}
              authorClerkId={project.authorClerkId}
              description={project.description}
              author={project.author}
              collaborators={project.collaborators}
              savedBy={project.savedBy}
              status={project.status}
              _id={project._id}
              createdAt={project.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="No Projects Found"
            description="Be the first to create a project and collaborate with others! 🚀"
            link="/post-project"
            linkTitle="Create a Project"
          />
        )}
      </div>
    </>
  );
}
