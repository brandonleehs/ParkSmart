import { Link, useNavigate } from "react-router-dom";
import { LangContext } from "../lang/LangWrapper";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

export default function ForumCard(post) {
  const { lang, setLang } = useContext(LangContext);
  const { t } = useTranslation();

  if (post.post) {
    post = post.post;
  }
  return (
    <div className="flex items-center justify-center">
      <div className="grid w-full gap-4 rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-700 dark:text-white">
        <p className="text-2xl font-semibold">{post.title}</p>
        <p className="">{post.content}</p>
        {post.image && (
          <img
            src={
              post.image.startsWith("data:") || post.image.startsWith("http")
                ? post.image
                : `data:image/jpeg;base64,${post.image}`
            }
            alt="Post Image"
            className="mt-2 w-[200px] justify-self-center"
          />
        )}{" "}
        {/* Image display */}
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {t("forum__postedBy")}
          {post.username},{/* Display the username */}{" "}
          {timeSince(new Date(post.date).getTime(), t)}
        </p>
        <div className="flex items-center justify-between">
          <Link
            to={`/forum/post/${post._id}`}
            className="mt-2 cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
          >
            {t("forum__viewPost")}
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {post.comments.filter((comment) => !comment.deleted).length}{" "}
            {t("forum__comment")}
            {lang === "en" &&
              (post.comments.filter((comment) => !comment.deleted).length > 1 ||
                post.comments.filter((comment) => !comment.deleted).length ===
                  0) &&
              "s"}
          </p>
        </div>
      </div>
    </div>
  );
}

function timeSince(timeStamp, t) {
  const seconds = new Date().getTime();
  const difference = (seconds - timeStamp) / 1000;
  let output = ``;
  if (difference < 60) {
    // Less than a minute has passed:
    output = `${Math.floor(difference)} ${t("forum__secondsAgo")}`;
  } else if (difference < 3600) {
    // Less than an hour has passed:
    output = `${Math.floor(difference / 60)} ${t("forum__minutesAgo")}`;
  } else if (difference < 86400) {
    // Less than a day has passed:
    output = `${Math.floor(difference / 3600)} ${t("forum__hoursAgo")}`;
  } else if (difference < 2620800) {
    // Less than a month has passed:
    output = `${Math.floor(difference / 86400)} ${t("forum__daysAgo")}`;
  } else if (difference < 31449600) {
    // Less than a year has passed:
    output = `${Math.floor(difference / 2620800)} ${t("forum__monthsAgo")}`;
  } else {
    // More than a year has passed:
    output = `${Math.floor(difference / 31449600)} ${t("forum__yearsAgo")}`;
  }
  return output;
}
