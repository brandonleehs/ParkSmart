import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import FeedbackController from "../../controllers/FeedbackController";

const FeedbackForm = () => {
  const { t } = useTranslation();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    rating: "",
  });

  const feedbackController = new FeedbackController();
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <section className="mx-auto my-12 max-w-3xl px-4">
      <h2 className="mb-2 text-center text-2xl font-bold text-blue-800 dark:text-blue-400">
        {t("feedback__sendUsFeedback")}
      </h2>
      <p className="mb-8 text-center text-gray-600 dark:text-gray-300">
        {t("feedback__weValueInput")}
      </p>

      <form
        className="rounded-lg bg-white p-8 shadow-md dark:bg-[#1e293b]"
        onSubmit={(e) => {
          feedbackController.handleSubmit(e, { formData, setFormData });
        }}
      >
        <div className="mb-6">
          <label
            htmlFor="name"
            className="mb-2 block font-medium text-gray-700 dark:text-white"
          >
            {t("feedback__name")}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => {
              feedbackController.handleChange(e, { formData, setFormData });
            }}
            className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-[#273244] dark:text-white"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="mb-2 block font-medium text-gray-700 dark:text-white"
          >
            {t("feedback__email")}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => {
              feedbackController.handleChange(e, { formData, setFormData });
            }}
            className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-[#273244] dark:text-white"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="subject"
            className="mb-2 block font-medium text-gray-700 dark:text-white"
          >
            {t("feedback__selectSubject")}
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={(e) => {
              feedbackController.handleChange(e, { formData, setFormData });
            }}
            className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-[#273244] dark:text-white"
            required
          >
            <option value="">{t("feedback__selectSubject")}</option>
            <option value="question">{t("feedback__question")}</option>
            <option value="suggestion">{t("feedback__suggestion")}</option>
            <option value="problem">{t("feedback__problem")}</option>
            <option value="other">{t("feedback__other")}</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="message"
            className="mb-2 block font-medium text-gray-700 dark:text-white"
          >
            {t("feedback__message")}
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={(e) => {
              feedbackController.handleChange(e, { formData, setFormData });
            }}
            className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-[#273244] dark:text-white"
            required
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-medium text-gray-700 dark:text-white">
            {t("feedback__rateService")}
          </label>
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <React.Fragment key={num}>
                <input
                  type="radio"
                  id={`rating-${num}`}
                  name="rating"
                  value={num}
                  checked={formData.rating === num.toString()}
                  onChange={(e) => {
                    feedbackController.handleChange(e, {
                      formData,
                      setFormData,
                    });
                  }}
                  className="hidden"
                  required
                />
                <label
                  htmlFor={`rating-${num}`}
                  className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full ${
                    formData.rating === num.toString()
                      ? "bg-blue-500 text-white dark:bg-blue-600"
                      : "bg-gray-100 dark:bg-[#273244] dark:text-white"
                  }`}
                >
                  {num}
                </label>
              </React.Fragment>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="rounded-md bg-blue-500 px-6 py-3 font-medium text-white transition hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {t("feedback__submitFeedbackButton")}
        </button>
      </form>
    </section>
  );
};

export default FeedbackForm;
