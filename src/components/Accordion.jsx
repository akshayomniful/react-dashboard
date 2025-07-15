// Accordion.jsx
import React, { useState } from "react";

const AccordionItem = ({ title, children, isOpen, toggle }) => {
  return (
    <div>
      <div className="border rounded mb-2">
        <button
          className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
          onClick={toggle}
          aria-expanded={isOpen}
        >
          <span className="font-medium">{title}</span>
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <div
          className={`transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="p-4 text-justify text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
};

const Accordion = () => {
  // Dummy data
  const dummyData = [
    {
      title: "What is React?",
      content:
        "React is a JavaScript library for building user interfaces. It was developed by Facebook and allows developers to create reusable UI components.",
    },
    {
      title: "Why use Tailwind CSS?",
      content:
        "Tailwind CSS is a utility-first CSS framework that makes it easier to build responsive designs without writing custom CSS. It provides low-level utility classes that let you build completely custom designs.",
    },
    {
      title: "How does this accordion work?",
      content:
        "This accordion uses React state to track which section is currently open. When you click on a section header, it either opens that section (if it was closed) or closes it (if it was already open).",
    },
    {
      title: "Can I customize this component?",
      content:
        "Absolutely! This accordion component is built with customization in mind. You can easily modify the styles, animation timing, or add additional features like allowing multiple sections to be open simultaneously.",
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  const handleToggle = (idx) => {
    setActiveIdx(activeIdx === idx ? -1 : idx);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Accordion Example</h1>
      {dummyData.map((item, idx) => (
        <AccordionItem
          key={idx}
          title={item.title}
          isOpen={activeIdx === idx}
          toggle={() => handleToggle(idx)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
