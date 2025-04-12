export default class SignUpController {
  constructor() {}

  signUp = async (
    navigate,
    setErrorState,
    setErrorMessage,
    setUser,
    { email, password, username, carPlateNumber, name },
  ) => {
    try {
      const response = await fetch(
        `http://localhost:${process.env.PORT}/api/auth/signup`,
        {
          // Updated to the correct signup endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            username,
            carPlateNumber,
            name,
          }), // Send username along with email and password
        },
      );

      const data = await response.json();

      if (!response.ok) {
        // Show backend error message
        setErrorState(true);
        setErrorMessage(
          data.message || "An error has occurred. Please try again.",
        );
        return;
      }
      setUser(data.user);
      // Optionally, save the token in localStorage/sessionStorage if using JWT
      localStorage.setItem("token", data.token); // assuming the server returns a token
      navigate("/home");
    } catch (err) {
      setErrorState(true);
    }
  };
}
