import axios from "axios";

export default class FeedbackController {
  constructor() {}

  handleChange = (e, { formData, setFormData }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  handleSubmit = (e, { formData, setFormData }) => {
    e.preventDefault();

    try {
      // Create new feedback entry with ID and timestamp
      const newFeedback = {
        ...formData,
      };

      const serverUrl = process.env.SERVER_URL
        ? process.env.SERVER_URL
        : `http://localhost:${process.env.PORT}`;

      // Send feedback to server
      axios
        .post(`${serverUrl}/api/feedback`, newFeedback, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      alert("Thank you for your feedback! We appreciate your input.");

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        rating: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert(
        "An error occurred while submitting your feedback. Please try again.",
      );
    }
  };
}
