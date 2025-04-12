import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// FAQ item component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      <div 
        className="flex cursor-pointer items-center justify-between bg-white p-4 dark:bg-[#1e293b]" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-base font-medium text-gray-800 dark:text-white">{question}</h3>
        <span className="text-2xl text-blue-600 dark:text-blue-400">{isOpen ? "−" : "+"}</span>
      </div>
      {isOpen && (
        <div className="bg-gray-50 p-4 dark:bg-[#273244]">
          <p className="text-gray-700 dark:text-gray-300">{answer}</p>
        </div>
      )}
    </div>
  );
};

// Main FAQ Section component
const FAQSection = () => {
  const { t } = useTranslation();

  // FAQ data
  const faqData = [
    {
      id: 1,
      question: t("feedback__howFrequentDataUpdatedQ"),
      answer: t("feedback__howFrequentDataUpdatedA"),
    },
    {
      id: 2,
      question: t("feedback__storeUserDataAndLocationAccessQ"),
      answer: t("feedback__storeUserDataAndLocationAccessA"),
    },
    {
      id: 3,
      question: t("feedback__carparkAvailabilityErrorQ"),
      answer: t("feedback__carparkAvailabilityErrorA"),
    },
  ];

  return (
    <section className="mx-auto my-12 max-w-3xl px-4">
      <h2 className="mb-6 text-center text-2xl font-bold text-blue-800 dark:text-blue-400">{t("feedback__frequentlyAskedQns")}</h2>

      {faqData.map((faq) => (
        <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
      ))}
    </section>
  );
};

export default FAQSection;