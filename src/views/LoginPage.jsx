import { useNavigate, Navigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthWrapper";
import Title from "../components/Title";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import LoginController from "../controllers/LoginController";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisbility, setPasswordVisibility] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [remember, setRemember] = useState(true);
  const { t } = useTranslation();

  if (user) {
    return <Navigate to="/home" />;
  }

  const loginController = new LoginController();
  const signIn = loginController.signIn;

  return (
    <>
      <Header></Header>
      <div className="flex min-h-full min-w-full flex-col min-[600px]:flex-row">
        <section className="flex grow flex-col gap-4 bg-sky-50 p-8 sm:gap-8 lg:gap-32 dark:bg-gray-800 dark:text-white">
          <div className="flex min-h-[80vh] flex-col items-center justify-center gap-8 p-4 lg:gap-16">
            <img
              src="./car.jpg"
              alt="Image of a car"
              className="w-full max-w-[350px] rounded-lg shadow-lg"
            />
            <p className="text-3xl font-bold md:text-4xl 2xl:text-5xl">
              {t("login__welcomeBack")}
            </p>
            <p className="lg: text-center text-gray-600 2xl:text-xl dark:text-gray-300">
              {t("login__loginToAccessAccount")}
            </p>
          </div>
          <footer className="inline-flex h-fit items-center gap-1 text-sm text-gray-600 2xl:text-base dark:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#60a5fa"
              className="bi bi-car-front-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z" />
            </svg>
            &copy; 2025 ParkSmart. All rights reserved.
          </footer>
        </section>
        <div className="flex grow items-center justify-center dark:bg-gray-800 dark:text-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signIn(email, password, { setError, setUser, navigate });
            }}
            className="grid max-w-[400px] grow gap-5 self-center p-4 text-start min-[600px]:max-w-[600px]"
          >
            <section className="grid gap-4">
              <h1 className="text-3xl font-semibold">
                {t("login__loginHeader")}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {t("login__enterCredentials")}
              </p>
            </section>
            <main className="grid gap-4">
              <div className="grid gap-1">
                <label htmlFor="email">{t("login__emailAddress")}</label>
                <div className="relative inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#9ca3af"
                    className="bi bi-envelope absolute left-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                  </svg>
                  <input
                    className="w-full rounded-md border border-gray-400 px-8 py-1 placeholder:text-gray-600 focus:outline-1 focus:outline-gray-600 dark:placeholder:text-gray-300"
                    placeholder={t("login__emailAddress")}
                    type="email"
                    id="email"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    size="30"
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className="grid gap-1">
                <label htmlFor="password">{t("login__password")}</label>
                <div className="relative inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#9ca3af"
                    className="bi bi-lock-fill absolute left-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
                  </svg>
                  <input
                    className="w-full rounded-md border border-gray-400 px-8 py-1 placeholder:text-gray-600 focus:outline-1 focus:outline-gray-600 dark:placeholder:text-gray-300"
                    placeholder={t("login__enterPassword")}
                    id="password"
                    type={passwordVisbility ? "text" : "password"}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  ></input>
                  <button
                    className="absolute right-2 h-4 w-4"
                    type="button"
                    onMouseOver={() => {
                      document
                        .querySelector(".active")
                        .setAttribute("fill", "#4b5563");
                    }}
                    onMouseOut={() => {
                      document
                        .querySelector(".active")
                        .setAttribute("fill", "#9ca3af");
                    }}
                    onClick={() => {
                      const eye = document.querySelector(".bi.bi-eye-slash");
                      eye.classList.toggle("active");
                      eye.classList.toggle("hidden");
                      const eyeslash = document.querySelector(".bi.bi-eye");
                      eyeslash.classList.toggle("active");
                      eyeslash.classList.toggle("hidden");
                      setPasswordVisibility(!passwordVisbility);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#9ca3af"
                      className="bi bi-eye-slash active"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                      <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#9ca3af"
                      className="bi bi-eye hidden"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                    </svg>
                  </button>
                </div>
                <small className="incorrect hidden text-red-600">
                  {t("login__incorrectCredentials")}
                </small>
                <small
                  className={"error text-red-600" + (error ? "" : " hidden")}
                >
                  {t("login__checkFields")}
                </small>
              </div>
              <div className="flex gap-1.5">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  defaultChecked={remember}
                  onChange={() => {
                    setRemember(!remember);
                  }}
                  value="1"
                />
                <label htmlFor="remember">{t("login__rememberMe")}</label>
              </div>
              <button
                type="submit"
                className="cursor-pointer rounded-md bg-blue-600 p-2 font-semibold text-neutral-100 shadow-md transition hover:bg-blue-700 active:bg-blue-800"
              >
                {t("login__loginButton")}
              </button>
            </main>
            <small>
              {t("login__noAccount")}
              <Link
                to="/signup"
                className="font-bold text-blue-600 dark:text-blue-400"
              >
                {t("login__signUp")}
              </Link>
            </small>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
