import { IUser } from "@/database/user.model";
import Image from "next/image";
import Link from "next/link";

interface Props {
  user: IUser;
}

const UserCard = async ({ user }: Props) => {
  return (
    <div className="flex w-full flex-grow max-xs:min-w-full xs:w-[220px]">
      <article className="background-light900_dark200 light-border-2 flex w-full flex-col items-center justify-center rounded-2xl p-6 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl dark:hover:shadow-2xl hover:border-accent">
        <Link
          href={`/profile/${user.clerkId}`}
          className="flex flex-col items-center justify-center"
        >
          <Image
            src={user.picture}
            alt="user image"
            width={80}
            height={80}
            className="rounded-full border-2 border-light-200 dark:border-dark-400 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg"
            priority
          />
          <div className="mt-4 text-center">
            <h3 className="h4-semibold text-dark100_light900 line-clamp-1 transition-colors duration-300 ease-in-out hover:text-accent">
              {user.name}
            </h3>
            <p className="body-regular text-dark500_light500 mt-1 transition-colors duration-300 ease-in-out">
              @{user.username}
            </p>
          </div>
        </Link>
      </article>
    </div>
  );
};

export default UserCard;
