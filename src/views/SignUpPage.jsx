import { useNavigate, Navigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthWrapper";
import PasswordChecklist from "react-password-checklist";
import "../styles/SignUpPage.css";
import Title from "../components/Title";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";
import SignUpController from "../controllers/SignUpController";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [carPlateNumber, setCarPlateNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordVisbility, setPasswordVisibility] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [errorState, setErrorState] = useState(false);
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState(
    "An error has occurred. Please try again.",
  );

  if (user) {
    return <Navigate to="/home" />;
  }
  const signUpController = new SignUpController();
  const signUp = (data) => {
    signUpController.signUp(
      navigate,
      setErrorState,
      setErrorMessage,
      setUser,
      data,
    );
  };

  return (
    <>
      <Header></Header>
      <div className="signup flex min-h-full min-w-full flex-col min-[600px]:flex-row">
        <section className="flex min-h-[80vh] grow flex-col items-center justify-center gap-4 bg-sky-50 p-8 sm:gap-8 lg:gap-10 dark:bg-gray-800 dark:text-white">
          <p className="2xl:text-4x; max-w-[350px] text-xl font-bold min-[400px]:text-2xl min-[450px]:text-3xl min-[600px]:text-start">
            {t("signup__joinParkingCommunity")}
          </p>
          <p className="max-w-[350px] text-sm text-gray-600 min-[450px]:text-base min-[600px]:text-start 2xl:text-xl dark:text-gray-300">
            {t("signup__connectEasyAccessBody")}
          </p>
          <img
            src="./car.jpg"
            alt="Image of a car"
            className="w-full max-w-[350px] rounded-lg shadow-lg"
          />
          <footer className="text-sm text-gray-600 2xl:text-base dark:text-gray-300">
            {t("signup__alreadyHaveAccount")}
            <Link
              to="/login"
              className="font-bold text-blue-600 dark:text-blue-400"
            >
              {t("signup__signIn")}
            </Link>
          </footer>
        </section>
        <div className="flex grow items-center justify-center dark:bg-gray-800 dark:text-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signUp({ email, password, username, carPlateNumber, name });
            }}
            className="grid max-w-[400px] gap-5 self-center p-4 text-start min-[600px]:max-w-[600px]"
          >
            <section className="grid gap-2">
              <h1 className="text-3xl font-semibold">
                {t("signup__createAccountHeader")}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {t("signup__fillInDetailsBody")}
              </p>
            </section>
            <main className="grid gap-4">
              <div className="grid gap-1">
                <label htmlFor="email">{t("signup__emailAddress")}</label>
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
                    placeholder={t("signup__enterEmail")}
                    type="email"
                    id="email"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    size="30"
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage)
                        setErrorMessage(
                          "An error has occurred. Please try again.",
                        );
                    }}
                  ></input>
                </div>
              </div>
              <div className="grid gap-1">
                <label htmlFor="carplate-number">
                  {t("signup__carPlateNumber")}
                </label>
                <div className="relative inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#9ca3af"
                    className="bi bi-car-front absolute left-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0m10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM4.862 4.276 3.906 6.19a.51.51 0 0 0 .497.731c.91-.073 2.35-.17 3.597-.17s2.688.097 3.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 10.691 4H5.309a.5.5 0 0 0-.447.276" />
                    <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM4.82 3a1.5 1.5 0 0 0-1.379.91l-.792 1.847a1.8 1.8 0 0 1-.853.904.8.8 0 0 0-.43.564L1.03 8.904a1.5 1.5 0 0 0-.03.294v.413c0 .796.62 1.448 1.408 1.484 1.555.07 3.786.155 5.592.155s4.037-.084 5.592-.155A1.48 1.48 0 0 0 15 9.611v-.413q0-.148-.03-.294l-.335-1.68a.8.8 0 0 0-.43-.563 1.8 1.8 0 0 1-.853-.904l-.792-1.848A1.5 1.5 0 0 0 11.18 3z" />
                  </svg>
                  <input
                    className="w-full rounded-md border border-gray-400 px-8 py-1 placeholder:text-gray-600 focus:outline-1 focus:outline-gray-600 dark:placeholder:text-gray-300"
                    placeholder={t("signup__enterCarPlate")}
                    type="text"
                    id="carplate-number"
                    onChange={(e) => {
                      setCarPlateNumber(e.target.value);
                    }}
                    required
                  ></input>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t("signup__format")}
                </p>
              </div>
              <div className="grid gap-1">
                <label htmlFor="name">{t("signup__name")}</label>
                <div className="relative inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#9ca3af"
                    className="bi bi-person-fill absolute left-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                  </svg>
                  <input
                    className="w-full rounded-md border border-gray-400 px-8 py-1 placeholder:text-gray-600 focus:outline-1 focus:outline-gray-600 dark:placeholder:text-gray-300"
                    placeholder={t("signup__enterName")}
                    type="text"
                    id="name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    required
                  ></input>
                </div>
              </div>
              <div className="grid gap-1">
                <label htmlFor="username">{t("signup__username")}</label>
                <div className="relative inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#9ca3af"
                    className="bi bi-person-fill absolute left-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                  </svg>
                  <input
                    className="w-full rounded-md border border-gray-400 px-8 py-1 placeholder:text-gray-600 focus:outline-1 focus:outline-gray-600 dark:placeholder:text-gray-300"
                    placeholder={t("signup__enterUsername")}
                    type="text"
                    id="username"
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (errorMessage)
                        setErrorMessage(
                          "An error has occurred. Please try again.",
                        );
                    }}
                    required
                  ></input>
                </div>
              </div>
              <div className="grid gap-1">
                <label htmlFor="password">{t("signup__password")}</label>
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
                    placeholder={t("signup__createPassword")}
                    type={passwordVisbility ? "text" : "password"}
                    id="password"
                    pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
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
                <PasswordChecklist
                  rules={[
                    "minLength",
                    "specialChar",
                    "number",
                    "capital",
                    "lowercase",
                  ]}
                  minLength={8}
                  value={password}
                  messages={{
                    minLength: t("signup__p8Characters"),
                    specialChar: t("signup__pSpecialCharacter"),
                    number: t("signup__pOneNumber"),
                    capital: t("signup__pOneUppercase"),
                    lowercase: t("signup__pOneLowercase"),
                  }}
                  style={{ fontSize: "0.875rem" }}
                />
              </div>
              <div className="flex gap-3 min-[860px]:gap-1.5">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  name="termsAccepted"
                  value="1"
                  required
                />
                <label htmlFor="termsAccepted">
                  {t("signup__agree")}
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {t("signup__termsOfService")}
                  </span>
                  {t("signup__and")}
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {t("signup__privacyPolicy")}
                  </span>
                </label>
              </div>
              {errorState && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}
              <button
                type="submit"
                className="cursor-pointer rounded-md bg-blue-600 p-2 font-semibold text-neutral-100 shadow-md transition hover:bg-blue-700 active:bg-blue-800"
              >
                {t("signup__createAccountButton")}
              </button>
            </main>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
