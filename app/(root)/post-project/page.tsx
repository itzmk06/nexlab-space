import Project from "@/components/forms/Project";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask a Project | NexLab",
  description:
    "Got a project idea? Share it with the community on NexLab! Whether it's a new startup, a tech initiative, or an open-source project, connect with other developers to get feedback, suggestions, and collaborators.",
};

const AskProjectPage = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongooseUser = await getUserById({ userId });
  console.log(userId)

  return (
    <div>
      <h1 className="text-2xl font-semibold text-dark100_light900 -mt-10">Ask a Project</h1>
      <div className="mt-9">
        <Project mongoUserId={JSON.stringify(mongooseUser?._id)} />
      </div>
    </div>
  );
};

export default AskProjectPage;
