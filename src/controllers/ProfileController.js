export default class ProfileController {
  constructor() {}

  handleDeleteAccount = async (user, { setIsDeleting }) => {
    if (user && user.username === "admin") {
      alert("Admin account cannot be deleted.");
      return;
    }
    // Show a confirmation dialog to the user
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone.",
    );

    if (confirmed) {
      setIsDeleting(true); // Set deleting state to show loading or handle progress

      try {
        // Call the delete API endpoint to remove the account
        const response = await fetch(
          `http://localhost:${process.env.PORT}/api/users/delete`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (response.ok) {
          // Handle successful deletion (e.g., log out the user, show success message)
          localStorage.removeItem("token"); // Remove the token or log out
          window.location.href = "/login"; // Redirect to login or home page
        } else {
          // Handle errors, e.g., show an error message
          const data = await response.json();
          alert(
            data.message || "An error occurred while deleting your account.",
          );
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("An error occurred while deleting your account.");
      } finally {
        setIsDeleting(false); // Reset the deleting state
      }
    }
  };

  handleEditCancel = (
    user,
    {
      setIsEditing,
      setUsername,
      setEmail,
      setName,
      setCarPlateNumber,
      setUsernameError,
      setEmailError,
    },
  ) => {
    setIsEditing(false);
    setUsername(user.username); // Reset username to original value
    setEmail(user.email); // Reset email to original value
    setName(user.name); // Reset email to original value
    setCarPlateNumber(user.carPlateNumber); // Reset email to original value
    setUsernameError(""); // Clear previous errors
    setEmailError("");
  };

  handleSave = async (
    user,
    {
      setUsernameError,
      setEmailError,
      username,
      email,
      carPlateNumber,
      name,
      setUser,
      setIsEditing,
    },
  ) => {
    setUsernameError(""); // Clear previous errors
    setEmailError("");

    const updatedUser = {
      current_username: user.username,
      username,
      email,
      carPlateNumber,
      name,
    };

    try {
      const response = await fetch(
        `http://localhost:${process.env.PORT}/api/users/update`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.message === "Username already exists") {
          setUsernameError("Username already exists");
          alert("Username Error: Username already exists"); // Alert for username error
        }
        if (data.message === "Email already in use") {
          setEmailError("Email already in use");
          alert("Email Error: Email already in use"); // Alert for email error
        }
        throw new Error(data.message);
      }
      setUser(data.user);
      if (data.token) localStorage.setItem("token", data.token);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    setIsEditing(false);
  };

  handlePasswordCancel = ({
    setIsChangingPassword,
    setCurrentPassword,
    setNewPassword,
    setCurrentPasswordVisibility,
    setNewPasswordVisibility,
  }) => {
    setIsChangingPassword(false);
    setCurrentPassword("");
    setNewPassword("");
    setCurrentPasswordVisibility(false);
    setNewPasswordVisibility(false);
  };

  handlePasswordSave = async ({
    user,
    currentPassword,
    newPassword,
    setIsChangingPassword,
    setCurrentPassword,
    setNewPassword,
    setCurrentPasswordVisibility,
    setNewPasswordVisibility,
    setUser,
  }) => {
    const updatedUser = { user, currentPassword, newPassword };
    console.log(updatedUser, JSON.stringify(updatedUser));
    try {
      console.log("entered try");
      console.log(updatedUser);
      const response = await fetch(
        `http://localhost:${process.env.PORT}/api/auth/change-password`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        },
      );

      if (!response.ok) {
        const errorData = await response.json(); // Parse error message from response
        console.log("Error:", errorData.message);

        throw new Error(errorData.message);
      }

      alert("Password updated successfully!");
      setIsChangingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setCurrentPasswordVisibility(false);
      setNewPasswordVisibility(false);
      const data = await response.json();
      setUser(data.user);
      if (data.token) localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("Error changing password:", error);
      alert(
        `Failed to update password. Please try again. Error: ${error.message || error}`,
      );
      console.log("after!");
    }
  };
}
