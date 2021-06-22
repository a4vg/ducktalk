import React from "react";

const MessagesArea = ({ messages }) => {
  const isNextSameFrom = idx => {
    if (idx === messages.length - 1) return false;
    return messages[idx].from === messages[idx + 1].from;
  };

  return (
    <div className="flex-grow flex flex-col px-4 py-3">
      {messages.map((m, idx) => (
        <div
          key={idx}
          className={`flex max-w-full md:max-w-3/4 lg:max-w-1/2 break-all ${
            m.from === "You"
              ? "self-end items-end flex-row-reverse"
              : "self-start items-start"
          } ${isNextSameFrom(idx) ? "mb-1" : "mb-3"}`}
        >
          <div
            className={`message py-2 px-3 rounded-xl shadow-xl mb-1 bg-gradient-to-r ${
              m.from === "You"
                ? "rounded-br-none from-orange-200 to-yellow-200"
                : "rounded-bl-none from-orange-300 to-yellow-500"
            }`}
          >
            {m.text}
            <span
              className={`text-xs mx-2 whitespace-nowrap ${
                m.from === "You" ? "text-gray-400" : "text-gray-200"
              }`}
            >
              {m.time}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagesArea;
