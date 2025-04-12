export default class LoginController {
  constructor() {}

  signIn = async (email, password, { setError, setUser, navigate }) => {
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    if (!emailInput.checkValidity() || !passwordInput.checkValidity()) {
      setError(true);
      return;
    }
    setError(false);

    try {
      const response = await fetch(
        `http://localhost:${process.env.PORT}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Error logging in.");
      }
      setUser(data.user);
      // Optionally, save the token in localStorage/sessionStorage if using JWT
      localStorage.setItem("token", data.token); // assuming the server returns a token
      navigate("/home");
    } catch (error) {
      document.querySelector("#password").value = "";
      document.querySelector(".incorrect").classList.remove("hidden");
    }
  };
}
