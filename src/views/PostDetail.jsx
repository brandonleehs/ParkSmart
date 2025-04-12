import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../auth/AuthWrapper";
import imageCompression from "browser-image-compression";
import Comment from "../components/Comment";
import { LangContext } from "../lang/LangWrapper";
import { useTranslation } from "react-i18next";
import ForumController from "../controllers/ForumController";

export default function PostDetail() {
  const { t } = useTranslation();

  const { id } = useParams();
  const navigate = useNavigate(); // For programmatic navigation
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(""); // New state for image

  const [editingCommentId, setEditingCommentId] = useState(null); // Track the comment being edited
  const [editedCommentText, setEditedCommentText] = useState(""); // Store the edited text
  const { user } = useContext(AuthContext);
  const [reportText, setReportText] = useState(""); // State to hold report text
  const [reportingPost, setReportingPost] = useState(false); // Track if reporting post
  const [reportingCommentId, setReportingCommentId] = useState(null); // Track comment being reported
  const { lang, setLang } = useContext(LangContext);

  const forumController = new ForumController();

  useEffect(() => {
    // Fetch the specific post by its ID
    axios
      .get(`http://localhost:${process.env.PORT}/api/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (post) {
      setTitle(title ? title : post.title);
      setContent(content ? content : post.content);
    }
  }, [isEditingPost]);

  const addComment = () => {
    // Post the new comment to the backend
    if (!user) {
      alert("You must be logged in to comment.");
      return;
    }
    if (comment.trim() === "") {
      alert(t("forum__commentCannotEmpty"));
      return;
    }
    // Post the new comment to the backend
    axios
      .post(`http://localhost:${process.env.PORT}/api/posts/${id}/comments`, {
        username: user.username, // Include the logged-in user's username
        text: comment,
      })
      .then((res) => {
        // After successfully adding the comment, update the post data
        setPost((prevPost) => ({
          ...prevPost,
          comments: [...prevPost.comments, res.data], // Append the new comment
        }));
        setComment(""); // Clear the comment input field after submitting
      })
      .catch((err) => {
        console.error(err);
        alert(t("forum__somethingWentWrong"));
      });
  };

  const editPost = async () => {
    if (user.username !== post.username) {
      alert("You can only edit your own posts.");
      navigate(`/forum/post/${id}`);
      return;
    }
    setIsEditingPost(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("username", user.username);
    if (image) {
      formData.append("image", image); // Send the compressed file
    }

    axios
      .put(`http://localhost:${process.env.PORT}/api/posts/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsEditingPost(false);
      });
  };

  const deletePost = () => {
    if (user.username !== post.username && user.username !== "admin") {
      alert("You can only delete your own posts.");
      return;
    }
    // Confirm deletion with the user
    const confirmDelete = window.confirm(t("forum__confirmDelete"));
    if (confirmDelete) {
      // Delete the post from the backend
      axios
        .patch(`http://localhost:${process.env.PORT}/api/posts/${id}`, {
          deleted: true,
        })
        .then(() => {
          // After successfully deleting the post, redirect to the forum page
          navigate("/forum");
        })
        .catch((err) => console.log(err));
    }
  };

  // Edit Comment Functionality
  const editComment = (e) => {
    const commentId =
      e.currentTarget.parentNode.parentNode.parentNode.getAttribute("data-id");
    const comment = post.comments.find((comment) => comment._id === commentId);
    if (user.username !== comment.username) {
      alert("You can only edit your own comments.");
      return;
    }
    // Start editing the comment by setting the current text
    setEditingCommentId(commentId);
    setEditedCommentText(comment.text); // Populate the input with the current comment text
  };

  // Save the edited comment
  const saveComment = (e) => {
    const commentId =
      e.currentTarget.parentNode.parentNode.getAttribute("data-id");
    if (!editedCommentText.trim()) {
      alert(t("forum__commentCannotEmpty"));
      return;
    }

    // Send the updated comment to the backend
    axios
      .put(
        `http://localhost:${process.env.PORT}/api/posts/${id}/comments/${commentId}`,
        {
          text: editedCommentText,
        },
      )
      .then((res) => {
        // After successfully updating the comment, update the UI
        setPost((prevPost) => ({
          ...prevPost,
          comments: prevPost.comments.map((c) =>
            c._id === commentId ? { ...c, text: editedCommentText } : c,
          ),
        }));
        setEditingCommentId(null); // Reset editing state
        setEditedCommentText(""); // Clear the input field
      })
      .catch((err) => {
        console.error(err);
        alert(t("forum__somethingWentWrong"));
      });
  };

  const deleteComment = (e) => {
    const commentId =
      e.currentTarget.parentNode.parentNode.parentNode.getAttribute("data-id");
    const comment = post.comments.find((comment) => comment._id === commentId);
    if (user.username !== comment.username && user.username !== "admin") {
      alert("You can only delete your own comments.");
      return;
    }
    // Confirm deletion with the user
    const confirmDelete = window.confirm(t("forum__confirmDeleteComment"));
    if (confirmDelete) {
      // Delete the comment from the backend
      axios
        .delete(
          `http://localhost:${process.env.PORT}/api/posts/${id}/comments/${commentId}`,
        )
        .then(() => {
          // After successfully deleting the comment, update the comments array
          setPost((prevPost) => ({
            ...prevPost,
            comments: prevPost.comments.filter((c) => c._id !== commentId),
          }));
        })
        .catch((err) => console.log(err));
    }
  };

  const reportPost = () => {
    if (!reportText.trim()) {
      alert(t("forum__pleaseProvideReportReason"));
      return;
    }
    axios
      .post(`http://localhost:${process.env.PORT}/api/posts/${id}/report`, {
        username: user.username,
        report: reportText,
      })
      .then((res) => {
        alert(t("forum__postSuccessfulReport"));
        setReportingPost(false); // Hide the report box
        setReportText(""); // Reset the report text
      })
      .catch((err) => {
        console.error(err);
        alert(t("forum__somethingWentWrong"));
      });
  };

  const reportComment = (commentId) => {
    if (!reportText.trim()) {
      alert(t("forum__pleaseProvideReportReason"));
      return;
    }
    axios
      .post(
        `http://localhost:${process.env.PORT}/api/posts/${id}/comments/${commentId}/report`,
        {
          username: user.username,
          report: reportText,
        },
      )
      .then((res) => {
        alert(t("forum__successfulCommentReport"));
        setReportingCommentId(null); // Hide the report box
        setReportText(""); // Reset the report text
      })
      .catch((err) => {
        console.error(err);
        alert(t("forum__somethingWentWrong"));
      });
  };

  if (!post) return <p className="dark:text-white">Loading...</p>;

  return (
    <>
      <Header></Header>
      {isEditingPost ? (
        <form
          className="flex min-h-[80.4vh] items-center justify-center dark:bg-gray-800"
          onSubmit={(e) => {
            e.preventDefault();
            editPost();
          }}
        >
          <div className="w-full max-w-[500px] rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-700">
            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
              Edit Post
            </h2>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Title
              </label>
              <input
                type="text"
                defaultValue={title ? title : post.title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-400 p-2 focus:outline-4 focus:outline-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="Enter title"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Content
              </label>
              <textarea
                className="w-full rounded-lg border border-gray-400 p-2 focus:outline-4 focus:outline-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                rows="4"
                defaultValue={content ? content : post.content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write something..."
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Upload File
              </label>
              <input
                type="file"
                className="file:text-md w-full rounded-lg border border-gray-400 p-2 text-gray-600 file:cursor-pointer file:rounded-md file:border file:border-gray-600 file:bg-gray-200 file:p-1 file:px-2 file:text-black hover:file:bg-gray-300 active:file:bg-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:file:border-gray-600 dark:file:bg-gray-700 dark:file:text-white"
                accept="image/*"
                onChange={(e) =>
                  forumController.handleImageChange(e, { setImage })
                }
              />
              {image ? (
                <img
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
                  alt="Post Preview"
                  className="mt-2 w-[200px] justify-self-center"
                />
              ) : (
                post.image && (
                  <img
                    src={
                      post.image.startsWith("data:") ||
                      post.image.startsWith("http")
                        ? post.image
                        : `data:image/jpeg;base64,${post.image}`
                    }
                    alt="Post Image"
                    className="mt-2 w-[200px] justify-self-center"
                  />
                )
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="w-full cursor-pointer rounded-lg bg-blue-500 py-2 text-white transition hover:bg-blue-600 active:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                onClick={(e) => {
                  setIsEditingPost(false);
                }}
                type="button"
                className="w-full cursor-pointer rounded-lg bg-gray-500 py-2 text-white transition hover:bg-gray-600 active:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex min-h-[80.4vh] flex-col items-center justify-center gap-6 bg-gray-100 p-4 dark:bg-gray-800">
          <div className="grid w-full max-w-[800px] gap-4 rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-700">
            <p className="text-2xl font-semibold dark:text-white">
              {title ? title : post.title}
            </p>
            <p className="dark:text-gray-200">
              {content ? content : post.content}
            </p>
            {image ? (
              <img
                src={
                  typeof image === "string" ? image : URL.createObjectURL(image)
                }
                alt="Post Preview"
                className="mt-2 w-[200px] justify-self-center"
              />
            ) : (
              post.image && (
                <img
                  src={
                    post.image.startsWith("data:") ||
                    post.image.startsWith("http")
                      ? post.image
                      : `data:image/jpeg;base64,${post.image}`
                  }
                  alt="Post Image"
                  className="mt-2 w-[200px] justify-self-center"
                />
              )
            )}{" "}
            {/* Image display */}
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t("forum__postedBy")}
              {post.username},{/* Display the username */}{" "}
              {timeSince(new Date(post.date).getTime(), t)}
            </p>
            {/* Conditionally render Edit and Delete buttons */}
            {user && user.username === post.username ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setIsEditingPost(true);
                      }}
                      type="button"
                      className="cursor-pointer rounded-lg bg-blue-500 p-2 whitespace-nowrap text-white transition hover:bg-blue-600 active:bg-blue-700 min-[370px]:px-4 min-[370px]:py-2"
                    >
                      {t("forum__editPost")}
                    </button>
                    <button
                      onClick={deletePost}
                      type="button"
                      className="cursor-pointer rounded-lg bg-red-500 p-2 whitespace-nowrap text-white transition hover:bg-red-600 active:bg-red-700 min-[370px]:px-4 min-[370px]:py-2"
                    >
                      {t("forum__deletePost")}
                    </button>
                  </div>
                  <p className="ml-2 text-center text-sm text-gray-600 dark:text-gray-300">
                    {post.comments.filter((comment) => !comment.deleted).length}{" "}
                    {t("forum__comment")}
                    {lang === "en" &&
                      (post.comments.filter((comment) => !comment.deleted)
                        .length > 1 ||
                        post.comments.filter((comment) => !comment.deleted)
                          .length === 0) &&
                      "s"}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-end text-sm text-gray-600 dark:text-gray-300">
                {post.comments.filter((comment) => !comment.deleted).length}{" "}
                {t("forum__comment")}
                {lang === "en" &&
                  (post.comments.filter((comment) => !comment.deleted).length >
                    1 ||
                    post.comments.filter((comment) => !comment.deleted)
                      .length === 0) &&
                  "s"}
              </p>
            )}
            {/*Allow admin to delete post*/}
            {user && user.username === "admin" && post.username !== "admin" && (
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={deletePost}
                    type="button"
                    className="cursor-pointer rounded-lg bg-red-500 p-2 whitespace-nowrap text-white transition hover:bg-red-600 active:bg-red-700 min-[370px]:px-4 min-[370px]:py-2"
                  >
                    {t("forum__deletePost")}
                  </button>
                </div>
              </div>
            )}
            {user &&
              user.username !== post.username &&
              user.username != "admin" && (
                <div>
                  <button
                    onClick={() => setReportingPost(true)}
                    className="hover cursor-pointer p-1 text-gray-400 outline-black hover:bg-gray-200 hover:text-red-600 hover:outline-1 active:bg-gray-300 active:text-red-700 active:outline-1 dark:hover:bg-gray-600"
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
              )}
            {/* Show report input for post if reportingPost is true */}
            {reportingPost && (
              <div className="grid gap-2">
                <textarea
                  rows="4"
                  className="block w-full max-w-[400px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder:text-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-300"
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  placeholder={t("forum__reason")}
                ></textarea>
                <div className="flex max-w-[400px] gap-2">
                  <button
                    type="button"
                    onClick={reportPost}
                    className="w-full cursor-pointer rounded-lg bg-blue-500 py-2 text-sm text-white transition hover:bg-blue-600 active:bg-blue-700"
                  >
                    {t("submit")}
                  </button>
                  <button
                    onClick={() => setReportingPost(false)}
                    type="button"
                    className="w-full cursor-pointer rounded-lg bg-gray-500 py-2 text-sm text-white transition hover:bg-gray-600 active:bg-gray-700"
                  >
                    {t("cancel")}
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="grid w-full max-w-[800px] gap-4 rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-700">
            <p className="text-center text-2xl font-semibold dark:text-white">
              {t("forum__commentTitle")}
            </p>
            {post.comments && post.comments.length > 0 ? (
              post.comments
                .filter((c) => !c.deleted) // Filter out deleted comments
                .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date (ascending)
                .map((c) => (
                  <Comment
                    key={c._id}
                    comment={c}
                    editingCommentId={editingCommentId}
                    editedCommentText={editedCommentText}
                    setEditedCommentText={setEditedCommentText}
                    reportingCommentId={reportingCommentId}
                    setReportingCommentId={setReportingCommentId}
                    user={user}
                    deleteComment={deleteComment}
                    editComment={editComment}
                    setEditingCommentId={setEditingCommentId}
                    saveComment={saveComment}
                    reportText={reportText}
                    setReportText={setReportText}
                    reportComment={reportComment}
                  ></Comment>
                ))
            ) : (
              <p className="text-center dark:text-gray-200">
                {t("forum__noComments")}
              </p>
            )}
            {user ? (
              <form
                className="flex w-full flex-col items-center gap-0.5 sm:gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  addComment();
                }}
              >
                <label
                  htmlFor="comment"
                  className="mb-2 block text-sm font-medium text-gray-900 min-[400px]:text-base dark:text-gray-200"
                >
                  {t("forum__yourComment")}
                </label>
                <textarea
                  id="comment"
                  rows="4"
                  className="block w-full max-w-[400px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder:text-gray-600 focus:border-blue-500 focus:ring-blue-500 focus:transition-none! dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                  placeholder={t("forum__leaveComment")}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button
                  type="submit"
                  className="w-full max-w-[400px] cursor-pointer rounded-lg bg-blue-500 py-2 text-white transition hover:bg-blue-600 active:bg-blue-700"
                >
                  {t("submit")}
                </button>
              </form>
            ) : (
              <p className="text-center text-red-600 dark:text-red-400">
                {t("forum__pleaseLoginComment")}
              </p>
            )}
          </div>
        </div>
      )}

      <Footer></Footer>
    </>
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
