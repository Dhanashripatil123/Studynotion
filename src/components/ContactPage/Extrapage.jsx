import React from "react";
import { GrChatOption } from "react-icons/gr";
import { SiCompilerexplorer } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";

const Extrapage = () => {
  const cards = [
    {
      Icon: GrChatOption,
      title: "Chat on us",
      lines: ["Our friendly team is here to help.", "info@studynotion.com"]
    },
    {
      Icon: SiCompilerexplorer,
      title: "Visit us",
      lines: ["Come and say hello at our office HQ.", "Akshya Nagar 1st Block 1st Cross, Ramurthy nagar, Bangalore-560016"]
    },
    {
      Icon: FaPhoneAlt,
      title: "Call us",
      lines: ["Mon - Fri From 8am to 5pm", "+123 456 7869"]
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto lg:mx-0">
      <div className="bg-[#071226] rounded-xl p-6 border border-gray-800 shadow-lg text-gray-200">
        <h3 className="text-xl font-bold mb-4">Contact</h3>
        <div className="space-y-6">
          {cards.map((c, idx) => {
            const IconComp = c.Icon;
            return (
              <div key={idx} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-[#0f1724] rounded-lg text-yellow-400">
                  <IconComp />
                </div>
                <div>
                  <div className="font-semibold text-white">{c.title}</div>
                  <div className="text-sm text-gray-400 mt-1">
                    {c.lines.map((l, i) => (
                      <p key={i}>{l}</p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Extrapage;