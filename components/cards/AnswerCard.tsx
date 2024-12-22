import Link from "next/link";
import Metric from "@/components/shared/Metric";
import { getFormattedNumber, getTimestamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

interface Props {
  clerkId?: string | null;
  _id: string;
  question: {
    _id: string;
    title: string;
  };
  author: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  createdAt: Date;
}

const AnswerCard = ({
  clerkId,
  _id,
  question,
  author,
  upvotes,
  createdAt,
}: Props) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <Link
      href={`/question/${question._id}/#${_id}`}
      className="card-wrapper bg-white dark:bg-gray-800 rounded-lg p-6 transition-all duration-300 ease-in-out  hover:shadow-lg"
    >
      <div className="flex flex-col-reverse sm:flex-row items-start justify-between gap-4 sm:gap-6">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <span className="text-sm text-gray-400 sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${question._id}`} passHref>
            <h3 className="text-gray-900 dark:text-white font-semibold text-lg line-clamp-2 hover:text-accent transition-colors duration-300 ease-in-out">
              {question.title}
            </h3>
          </Link>
        </div>

        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction
              type="answer"
              itemId={JSON.stringify(_id)}
            />
          )}
        </SignedIn>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 w-full justify-between items-center">
        <Metric
          imgUrl={author.picture || "/assets/icons/avatar.svg"}
          alt="User"
          value={author.name}
          title={`Answered ${getTimestamp(createdAt)}`}
          href={`/profile/${author._id}`}
          isAuthor
          textStyles="text-gray-900 dark:text-white font-medium"
        />

        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="Upvotes"
          value={getFormattedNumber(upvotes)}
          title="Upvotes"
          textStyles="text-gray-900 dark:text-white font-medium"
        />
      </div>
    </Link>
  );
};

export default AnswerCard;
