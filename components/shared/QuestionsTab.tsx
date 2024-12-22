import { getUserQuestions } from "@/lib/actions/user.action";
import { getUserProjects } from "@/lib/actions/project.action"; // Assuming this method is available
import { SearchParamsProps } from "@/types";
import QuestionCard from "../cards/QuestionCard";
import ProjectCard from "../cards/ProjectCard"; // Import the ProjectCard here
import NoResult from "./NoResult";
import Pagination from "./Pagination";

interface QuestionsTabProps extends SearchParamsProps {
  userId: string;
  clerkId: string | null;
}

const QuestionsTab = async ({
  userId,
  clerkId,
  searchParams,
}: QuestionsTabProps) => {
  // Fetch questions
  const { questions, totalQuestions, isNextQuestion } = await getUserQuestions({
    userId,
  });

  // Fetch projects
  const { projects } = await getUserProjects(userId);

  return (
    <div className="mt-10 flex w-full flex-col gap-6 ">
      {/* Display Questions */}
      {totalQuestions > 0 ? (
        questions.map((question: any) => (
          <QuestionCard
            key={question._id}
            clerkId={clerkId}
            tags={question.tags}
            title={question.title}
            author={question.author}
            upvotes={question.upvotes.length}
            answers={question.answers}
            views={question.views}
            _id={question._id}
            createdAt={question.createdAt}
          />
        ))
      ) : (
        <NoResult
          title="No questions to show"
          description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion."
          link="/ask-question"
          linkTitle="Ask a Question"
        />
      )}

      {/* Display Projects */}
      {projects.length > 0 ? (
        projects.map((project: any) => (
          <ProjectCard
            key={project._id}
            _id={project._id}
            title={project.title}
            author={project.author}
            status={project.status}
            collaborators={project.collaborators}
            createdAt={project.createdAt}
            description={project.description}
            authorClerkId={project.authorClerkId}
          />
        ))
      ) : (
        <NoResult
          title="No projects to display"
          description="It looks like there are no projects available. Be the first to contribute and create a new project!"
          link="/create-project"
          linkTitle="Create a Project"
        />
      )}

      {/* Pagination for both Questions and Projects */}
      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={isNextQuestion}
      />
    </div>
  );
};

export default QuestionsTab;
