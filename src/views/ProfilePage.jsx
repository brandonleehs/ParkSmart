import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../auth/AuthWrapper";
import { useNavigate, Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Dialog from "@mui/material/Dialog";
import PasswordChecklist from "react-password-checklist";
import { useTranslation } from "react-i18next";
import ProfileController from "../controllers/ProfileController";

const ProfileSettings = () => {
  const { user, setUser } = useContext(AuthContext); // Get user from AuthContext
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user ? user.username : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [name, setName] = useState(user ? user.name : "");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPasswordVisbility, setCurrentPasswordVisibility] =
    useState(false);
  const [newPasswordVisbility, setNewPasswordVisibility] = useState(false);

  const [carPlateNumber, setCarPlateNumber] = useState(
    user ? user.carPlateNumber : "",
  );

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [usernameError, setUsernameError] = useState(""); // Store username error
  const [emailError, setEmailError] = useState(""); // Store email error
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const profileController = new ProfileController();
  const handleEditCancel = profileController.handleEditCancel;
  const handleSave = profileController.handleSave;
  const handlePasswordCancel = profileController.handlePasswordCancel;
  const handlePasswordSave = profileController.handlePasswordSave;
  const handleDeleteAccount = profileController.handleDeleteAccount;

  return (
    <>
      <Header></Header>
      {/* Full width container with dark mode background */}
      <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-800">
        <div className="mx-auto max-w-2xl px-4 py-6">
          <h1 className="mb-6 text-2xl font-bold dark:text-white">
            {t("profile__profileSettingsHeader")}
          </h1>

          {/* Profile Card */}
          <div className="mb-6 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-700">
            <div className="grid justify-items-center gap-3 min-[400px]:flex min-[400px]:gap-6">
              <div className="">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-gray-400 dark:bg-gray-600 dark:text-gray-300">
                  {user.profileImage ? (
                    <img src={user.profileImage} alt={username} />
                  ) : (
                    <span className="text-2xl">
                      {name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <h2 className="text-center text-xl font-medium min-[400px]:text-start dark:text-white">
                  {user.name}
                </h2>
                <p className="mt-1 text-center text-sm text-gray-500 min-[400px]:text-start dark:text-gray-300">
                  {t("profile__userID") + user.username}
                </p>
                <div className="mt-2 flex items-center">
                  <span className="mr-6 inline-flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#9ca3af"
                      className="bi bi-car-front-fill mr-2 min-h-4 min-w-4"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z" />
                    </svg>
                    {t("profile__carPlate")}
                    <span className="ml-1 text-blue-600 dark:text-blue-400">
                      {user.carPlateNumber}
                    </span>
                  </span>
                </div>

                <div className="mt-2 flex items-center">
                  <span className="mr-6 inline-flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#9ca3af"
                      className="bi bi-envelope-fill mr-2 min-h-4 min-w-4"
                      viewBox="0 0 16 16"
                    >
                      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                    </svg>
                    {t("profile__emailAddress")}
                    <span className="ml-1 text-gray-600 dark:text-gray-300">
                      {user.email}
                    </span>
                  </span>
                </div>

                <div className="mt-2 flex items-center">
                  <span className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#9ca3af"
                      className="bi bi-clock-fill mr-2 min-h-4 min-w-4"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                    </svg>
                    {t("profile__lastLogin") + t("profile__todayAt")}
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-center min-[400px]:justify-end">
              <button
                onClick={() => {
                  setIsEditing(true);
                }}
                className="mt-4 cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600 active:bg-blue-700"
              >
                {t("profile__changeButton")}
              </button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="mb-6 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-700">
            <h2 className="mb-4 text-lg font-semibold dark:text-white">
              {t("profile__securitySettings")}
            </h2>

            <div className="flex flex-col items-center justify-between gap-2 border-b border-gray-200 py-4 min-[380px]:flex-row dark:border-gray-600">
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#9ca3af"
                  className="bi bi-key-fill mt-1 mr-3"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                </svg>
                <div>
                  <h3 className="font-medium dark:text-white">
                    {t("profile__changePassword")}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {t("profile__updatePasswordRegularly")}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsChangingPassword(true);
                }}
                className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600 active:bg-blue-700"
              >
                {t("profile__changeButton")}
              </button>
            </div>

            <div className="flex flex-col items-center justify-between gap-2 py-4 min-[380px]:flex-row">
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#9ca3af"
                  className="bi bi-shield-fill-check mt-1 mr-3"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7 7 0 0 0 1.048-.625 11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793z"
                  />
                </svg>
                <div>
                  <h3 className="font-medium dark:text-white">
                    {t("profile__twoFactorAuth")}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {t("profile__addExtraLayerSecurity")}
                  </p>
                </div>
              </div>
              <button
                disabled
                className="cursor-not-allowed rounded-md border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 transition dark:border-gray-600 dark:bg-gray-600 dark:text-white"
              >
                {t("profile__enableButton")}
              </button>
            </div>
          </div>

          {/* Account Actions */}
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-700">
            <h2 className="mb-4 text-lg font-semibold dark:text-white">
              {t("profile__accountActions")}
            </h2>

            <button
              onClick={async () => {
                try {
                  localStorage.removeItem("token");
                  setUser(null);
                  navigate("/login");

                  const response = await fetch(
                    `http://localhost:${process.env.PORT}/logout`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    },
                  );
                } catch (err) {
                  console.log(err);
                }
              }}
              className="mb-4 flex w-full cursor-pointer items-center justify-center rounded-md bg-blue-500 p-3 font-medium text-white transition hover:bg-blue-600 active:bg-blue-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-box-arrow-right mr-2"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                />
                <path
                  fillRule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                />
              </svg>
              {t("profile__logout")}
            </button>

            <button
              onClick={() => handleDeleteAccount(user, { setIsDeleting })}
              className="flex w-full cursor-pointer items-center justify-center rounded-md border border-red-300 p-3 font-medium text-red-500 transition hover:bg-red-500 hover:text-white active:bg-red-600 active:text-white dark:border-red-800 dark:text-red-400 dark:hover:bg-red-800 dark:hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-exclamation-circle-fill mr-2"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
              </svg>
              {t("profile__deleteAccount")}
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog
        onClose={() =>
          handleEditCancel(user, {
            setIsEditing,
            setUsername,
            setEmail,
            setName,
            setCarPlateNumber,
            setUsernameError,
            setEmailError,
          })
        }
        open={isEditing}
        closeAfterTransition={false}
        className="relative"
      >
        <button
          onClick={() =>
            handleEditCancel(user, {
              setIsEditing,
              setUsername,
              setEmail,
              setName,
              setCarPlateNumber,
              setUsernameError,
              setEmailError,
            })
          }
          type="button"
          className="absolute top-1 right-1 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none focus:ring-inset dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <span className="sr-only">Close menu</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <section className="grid gap-4 p-4 dark:bg-gray-800">
          <p className="text-xl font-bold dark:text-white">
            {t("profile__editProfile")}
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave(user, {
                setUsernameError,
                setEmailError,
                username,
                email,
                carPlateNumber,
                name,
                setUser,
                setIsEditing,
              });
            }}
          >
            <div className="grid gap-2">
              <div className="grid gap-1">
                <label htmlFor="name" className="dark:text-white">
                  {t("signup__name")}
                </label>
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
                    className="w-full rounded-md border border-gray-400 px-8 py-1 focus:outline-1 focus:outline-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder={t("signup__enterName")}
                    type="text"
                    id="name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    defaultValue={user.name}
                    required
                  ></input>
                </div>
              </div>
              <div className="grid gap-1">
                <label htmlFor="email" className="dark:text-white">
                  {t("signup__emailAddress")}
                </label>
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
                    className="w-full rounded-md border border-gray-400 px-8 py-1 focus:outline-1 focus:outline-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder={t("signup__enterEmail")}
                    type="email"
                    id="email"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    size="30"
                    required
                    defaultValue={user.email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className="grid gap-1">
                <label htmlFor="carplate-number" className="dark:text-white">
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
                    className="w-full rounded-md border border-gray-400 px-8 py-1 focus:outline-1 focus:outline-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder={t("signup__enterCarPlate")}
                    type="text"
                    id="carplate-number"
                    onChange={(e) => {
                      setCarPlateNumber(e.target.value);
                    }}
                    required
                    defaultValue={user.carPlateNumber}
                  ></input>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Format: ABC-1234
                </p>
              </div>
              <div className="grid gap-1">
                <label htmlFor="username" className="dark:text-white">
                  {t("signup__username")}
                </label>
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
                    className="w-full cursor-not-allowed rounded-md border border-gray-400 bg-gray-200 px-8 py-1 text-gray-500 focus:outline-1 focus:outline-gray-600 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400"
                    placeholder={t("signup__enterUsername")}
                    type="text"
                    id="username"
                    defaultValue={user.username}
                    disabled
                  ></input>
                </div>
              </div>
              <div className="flex flex-col gap-2 min-[340px]:flex-row min-[340px]:gap-3">
                <button
                  type="submit"
                  className="grow basis-0 cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600 active:bg-blue-700"
                >
                  {t("profile__saveChanges")}
                </button>
                <button
                  onClick={() =>
                    handleEditCancel(user, {
                      setIsEditing,
                      setUsername,
                      setEmail,
                      setName,
                      setCarPlateNumber,
                      setUsernameError,
                      setEmailError,
                    })
                  }
                  type="button"
                  className="grow basis-0 cursor-pointer rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-600 active:bg-gray-700"
                >
                  {t("cancel")}
                </button>
              </div>
            </div>
          </form>
        </section>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog
        onClose={() =>
          handlePasswordCancel({
            setIsChangingPassword,
            setCurrentPassword,
            setNewPassword,
            setCurrentPasswordVisibility,
            setNewPasswordVisibility,
          })
        }
        open={isChangingPassword}
        closeAfterTransition={false}
        className="relative"
      >
        <button
          onClick={() =>
            handlePasswordCancel({
              setIsChangingPassword,
              setCurrentPassword,
              setNewPassword,
              setCurrentPasswordVisibility,
              setNewPasswordVisibility,
            })
          }
          type="button"
          className="absolute top-1 right-1 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none focus:ring-inset dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <span className="sr-only">Close menu</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <section className="grid gap-4 p-4 dark:bg-gray-800">
          <p className="text-xl font-bold dark:text-white">
            {t("profile__editPassword")}
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePasswordSave({
                user,
                currentPassword,
                newPassword,
                setIsChangingPassword,
                setCurrentPassword,
                setNewPassword,
                setCurrentPasswordVisibility,
                setNewPasswordVisibility,
                setUser,
              });
            }}
          >
            <div className="grid gap-2">
              <div className="currentPassword grid gap-1">
                <label htmlFor="currentPassword" className="dark:text-white">
                  {t("profile__currentPassword")}
                </label>
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
                    className="w-full rounded-md border border-gray-400 px-8 py-1 focus:outline-1 focus:outline-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder={t("profile__currentPasswordPlaceholder")}
                    type={currentPasswordVisbility ? "text" : "password"}
                    id="currentPassword"
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                    }}
                    required
                  ></input>
                  <button
                    className="absolute right-2 h-4 w-4"
                    type="button"
                    onMouseOver={() => {
                      document
                        .querySelector(".currentPassword .active")
                        .setAttribute("fill", "#4b5563");
                    }}
                    onMouseOut={() => {
                      document
                        .querySelector(".currentPassword .active")
                        .setAttribute("fill", "#9ca3af");
                    }}
                    onClick={() => {
                      const eye = document.querySelector(
                        ".currentPassword .bi.bi-eye-slash",
                      );
                      eye.classList.toggle("active");
                      eye.classList.toggle("hidden");
                      const eyeslash = document.querySelector(
                        ".currentPassword .bi.bi-eye",
                      );
                      eyeslash.classList.toggle("active");
                      eyeslash.classList.toggle("hidden");
                      setCurrentPasswordVisibility(!currentPasswordVisbility);
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
              </div>
              <div className="newPassword grid gap-1">
                <label htmlFor="newPassword" className="dark:text-white">
                  {t("signup__password")}
                </label>
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
                    className="w-full rounded-md border border-gray-400 px-8 py-1 focus:outline-1 focus:outline-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder={t("signup__createPassword")}
                    type={newPasswordVisbility ? "text" : "password"}
                    id="newPassword"
                    pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                    required
                  ></input>
                  <button
                    className="absolute right-2 h-4 w-4"
                    type="button"
                    onMouseOver={() => {
                      document
                        .querySelector(".newPassword .active")
                        .setAttribute("fill", "#4b5563");
                    }}
                    onMouseOut={() => {
                      document
                        .querySelector(".newPassword .active")
                        .setAttribute("fill", "#9ca3af");
                    }}
                    onClick={() => {
                      const eye = document.querySelector(
                        ".newPassword .bi.bi-eye-slash",
                      );
                      eye.classList.toggle("active");
                      eye.classList.toggle("hidden");
                      const eyeslash = document.querySelector(
                        ".newPassword .bi.bi-eye",
                      );
                      eyeslash.classList.toggle("active");
                      eyeslash.classList.toggle("hidden");
                      setNewPasswordVisibility(!newPasswordVisbility);
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
                  value={newPassword}
                  messages={{
                    minLength: t("signup__p8Characters"),
                    specialChar: t("signup__pSpecialCharacter"),
                    number: t("signup__pOneNumber"),
                    capital: t("signup__pOneUppercase"),
                    lowercase: t("signup__pOneLowercase"),
                  }}
                  style={{ fontSize: "0.875rem" }}
                  className="text-gray-800 dark:text-white"
                />
              </div>
              <div className="flex flex-col gap-2 min-[340px]:flex-row min-[340px]:gap-3">
                <button
                  type="submit"
                  className="grow basis-0 cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600 active:bg-blue-700"
                >
                  {t("profile__saveChanges")}
                </button>
                <button
                  onClick={() =>
                    handlePasswordCancel({
                      setIsChangingPassword,
                      setCurrentPassword,
                      setNewPassword,
                      setCurrentPasswordVisibility,
                      setNewPasswordVisibility,
                    })
                  }
                  type="button"
                  className="grow basis-0 cursor-pointer rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-600 active:bg-gray-700"
                >
                  {t("cancel")}
                </button>
              </div>
            </div>
          </form>
        </section>
      </Dialog>
      <Footer></Footer>
    </>
  );
};

export default ProfileSettings;
