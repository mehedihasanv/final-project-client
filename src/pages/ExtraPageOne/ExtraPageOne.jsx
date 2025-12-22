import { useState } from "react";

const ExtraPageOne = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How can I join a contest?",
      answer:
        "First, create an account. Then go to your chosen contest and click the Register/Pay button. After successful payment, you will be registered as a participant.",
    },
    {
      question: "Do I need to pay to participate?",
      answer:
        "Yes, each contest has an entry fee. Once you complete the payment, your participation count will increase.",
    },
    {
      question: "How is the winner declared?",
      answer:
        "After the deadline, the Contest Creator reviews all submissions and declares one winner. The winner’s name and photo will be displayed on the contest details page.",
    },
    {
      question: "Can I create my own contest?",
      answer:
        "Yes, if your role is Creator, you can add new contests. After Admin approval, your contest will go live.",
    },
    {
      question: "Is the payment secure?",
      answer:
        "Absolutely. We use a secure payment gateway, and sensitive information is protected using environment variables.",
    },
  ];

  return (
    <div className="help-page px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Help & FAQ</h1>
      <p className="text-lg mb-8 text-center">
        Here are some common questions and answers about ContestHub.
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded shadow">
            <button
              className="w-full text-left px-4 py-3 font-semibold bg-gray-100 hover:bg-gray-200"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {faq.question}
            </button>
            {openIndex === index && (
              <div className="px-4 py-3 text-gray-700">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtraPageOne;
