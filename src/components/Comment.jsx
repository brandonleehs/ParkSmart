import { useTranslation } from "react-i18next";

export default function Comment({
  editingCommentId,
  editedCommentText,
  editComment,
  setEditedCommentText,
  reportingCommentId,
  setReportingCommentId,
  comment,
  user,
  setEditingCommentId,
  deleteComment,
  saveComment,
  reportText,
  setReportText,
  reportComment,
}) {
  const { t } = useTranslation();

  return (
    <div className="grid gap-2 bg-gray-100 p-4 dark:bg-gray-600 dark:text-white" data-id={comment._id}>
      <p>
        <strong>{comment.username}</strong>:{" "}
        {editingCommentId !== comment._id && <span>{comment.text}</span>}
      </p>
      {editingCommentId === comment._id && (
        <>
          <textarea
            rows="4"
            className="block w-full max-w-[400px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            placeholder={t("forum__editYourComment")}
            defaultValue={editedCommentText}
            onChange={(e) => setEditedCommentText(e.target.value)}
          ></textarea>
          <div className="flex max-w-[400px] gap-2">
            <button
              type="button"
              onClick={saveComment}
              className="w-full cursor-pointer rounded-lg bg-blue-500 py-2 text-sm text-white transition hover:bg-blue-600 active:bg-blue-700"
            >
              {t("save")}
            </button>
            <button
              onClick={(e) => {
                setEditingCommentId("");
              }}
              type="button"
              className="w-full cursor-pointer rounded-lg bg-gray-500 py-2 text-sm text-white transition hover:bg-gray-600 active:bg-gray-700"
            >
              {t("cancel")}
            </button>
          </div>
        </>
      )}
      {/* Conditionally render Edit and Delete buttons for each comment */}
      {user && user.username === comment.username ? (
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <button
              onClick={editComment}
              type="button"
              className="cursor-pointer p-1 text-black dark:text-white hover:bg-gray-200 hover:outline-1 active:bg-gray-300 active:outline-1 dark:hover:bg-gray-700 dark:active:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-fill"
                viewBox="0 0 16 16"
              >
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
              </svg>
            </button>
            <button
              onClick={deleteComment}
              type="button"
              className="hover cursor-pointer p-1 text-black dark:text-white hover:bg-gray-200 hover:outline-1 active:bg-gray-300 active:outline-1 dark:hover:bg-gray-700 dark:active:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3-fill"
                viewBox="0 0 16 16"
              >
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
              </svg>
            </button>
          </div>
          <p className="text-end text-sm text-gray-600 dark:text-gray-300">
            {timeSince(new Date(comment.date).getTime(), t)}
          </p>
        </div>
      ) : (
        <p className="text-end text-sm text-gray-600 dark:text-gray-300">
          {timeSince(new Date(comment.date).getTime(), t)}
        </p>
      )}
      {/* Allow admin to delete comment */}
      {user && user.username === 'admin' && comment.username !== 'admin' && (
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <button
              onClick={deleteComment}
              type="button"
              className="hover cursor-pointer p-1 text-black dark:text-white hover:bg-gray-200 hover:outline-1 active:bg-gray-300 active:outline-1 dark:hover:bg-gray-700 dark:active:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3-fill"
                viewBox="0 0 16 16"
              >
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
              </svg>
            </button>
          </div>
        </div>
      )}
      {user && user.username !== comment.username && user.username != 'admin' && (
        <>
          <div>
            <button
              onClick={() => setReportingCommentId(comment._id)}
              className="hover cursor-pointer p-1 text-gray-400 outline-black hover:bg-gray-200 hover:text-red-600 hover:outline-1 active:bg-gray-300 active:text-red-700 active:outline-1 dark:hover:bg-gray-700 dark:active:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-flag-fill"
                viewBox="0 0 16 16"
              >
                <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
              </svg>
            </button>
          </div>
        </>
      )}
      {/* Show report input for comment if reportingCommentId is the current comment ID */}
      {reportingCommentId === comment._id && (
        <div className="grid gap-2">
          <textarea
            rows="4"
            className="block w-full max-w-[400px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            placeholder="Reason for reporting comment"
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
          ></textarea>
          <div className="flex max-w-[400px] gap-2">
            <button
              type="button"
              onClick={() => reportComment(comment._id)}
              className="w-full cursor-pointer rounded-lg bg-blue-500 py-2 text-sm text-white transition hover:bg-blue-600 active:bg-blue-700"
            >
              Submit
            </button>
            <button
              onClick={() => setReportingCommentId(null)}
              type="button"
              className="w-full cursor-pointer rounded-lg bg-gray-500 py-2 text-sm text-white transition hover:bg-gray-600 active:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
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