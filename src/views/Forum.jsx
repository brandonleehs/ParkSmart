import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../auth/AuthWrapper";
import imageCompression from "browser-image-compression";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ForumCard from "../components/ForumCard";
import { useTranslation } from "react-i18next";
import ForumController from "../controllers/ForumController";

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(""); // New state for image
  const navigate = useNavigate(); // For navigation after successful post
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();

  useEffect(() => {
    console.log("ran", process.env.SERVER_URL);
    // Fetch posts from the backend
    const serverUrl = process.env.SERVER_URL
      ? process.env.SERVER_URL
      : `http://localhost:${process.env.PORT}`;

    console.log(serverUrl);
    axios
      .get(`${serverUrl}/api/posts`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const forumController = new ForumController();

  return (
    <>
      <Header></Header>
      <main className="flex min-h-[80.4vh] flex-col gap-4 bg-gray-100 p-4 min-[840px]:flex-row dark:bg-gray-800">
        <section className="flex flex-col gap-4 min-[840px]:grow min-[840px]:basis-0">
          <p className="text-center text-2xl font-bold dark:text-white">
            {t("forum__forum")}
          </p>
          {user ? (
            <form
              className="flex items-center justify-center"
              onSubmit={(e) => {
                e.preventDefault();
                forumController.createPost({
                  posts,
                  setPosts,
                  setTitle,
                  setContent,
                  setImage,
                  user,
                  image,
                  title,
                  content,
                });
              }}
            >
              <div className="w-full max-w-[500px] rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-700">
                <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
                  {t("forum__createPost")}
                </h2>
                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("forum__title")}
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-lg border border-gray-400 p-2 focus:outline-4 focus:outline-blue-200 focus:transition-none! dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder={t("forum__enterTitle")}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("forum__content")}
                  </label>
                  <textarea
                    className="w-full rounded-lg border border-gray-400 p-2 placeholder:text-gray-500 focus:outline-4 focus:outline-blue-200 focus:transition-none! dark:border-gray-600 dark:bg-gray-800 dark:text-white placeholder:dark:text-gray-400"
                    rows="4"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={t("forum__writeSomething")}
                    required
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("forum__uploadFile")}
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    className="file:text-md w-full rounded-lg border border-gray-400 p-2 text-gray-600 file:cursor-pointer file:rounded-md file:border file:border-gray-600 file:bg-gray-200 file:p-1 file:px-2 file:text-black hover:file:bg-gray-300 active:file:bg-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:file:border-gray-600 dark:file:bg-gray-700 dark:file:text-white"
                    accept="image/*"
                    onChange={(e) =>
                      forumController.handleImageChange(e, { setImage })
                    }
                  />
                  {image && (
                    <img
                      src={
                        typeof image === "string"
                          ? image
                          : URL.createObjectURL(image)
                      }
                      alt="Post Preview"
                      className="mt-2 w-[200px] justify-self-center"
                    />
                  )}{" "}
                  {/* Display the image preview */}
                </div>
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-lg bg-blue-500 py-2 text-white transition hover:bg-blue-600 active:bg-blue-700"
                >
                  {t("forum__createPost")}
                </button>
              </div>
            </form>
          ) : (
            <p className="text-center text-red-600 dark:text-red-400">
              {t("forum_pleaseLogin")}
            </p>
          )}
        </section>
        <section className="flex flex-col gap-4 min-[840px]:grow min-[840px]:basis-0">
          <p className="text-center text-2xl font-bold dark:text-white">
            {t("forum__posts")}
          </p>
          {posts.map((post) => (
            <ForumCard key={post._id} post={post}></ForumCard>
          ))}
        </section>
      </main>
      <Footer></Footer>
    </>
  );
}
