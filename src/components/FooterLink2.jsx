import React from "react";
import { FooterLink2 } from "../data/Footer-links.js";
import { Link } from "react-router-dom";
import Study_Logo from "../assets/Images/Study_Logo.webp";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";

const FooterLinks2 = () => {
  return (
    <footer className="bg-[#0f1720] text-white">
      <div className="max-w-maxContent mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Branding + description */}
          <div className="md:col-span-1 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={Study_Logo} alt="Studynotion logo" className="h-10 w-10 rounded" />
              <h2 className="text-2xl font-semibold">Studynotion</h2>
            </div>
            <p className="text-sm text-richblack-300 mb-4">
              Learn to code with project-based courses, expert instructors, and a supportive community.
            </p>

            <div className="flex items-center gap-3 mt-2">
              <a href="#" aria-label="Google" className="text-richblack-300 hover:text-white">
                <FaGoogle />
              </a>
              <a href="#" aria-label="Facebook" className="text-richblack-300 hover:text-white">
                <FaFacebook />
              </a>
              <a href="#" aria-label="Twitter" className="text-richblack-300 hover:text-white">
                <RiTwitterXLine />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-richblack-300 hover:text-white">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Dynamic link sections from data */}
          {FooterLink2.map((section, idx) => (
            <div key={idx} className="">
              <h3 className="text-lg font-semibold mb-3">{section.title}</h3>
              <ul className="space-y-2 text-sm text-richblack-300">
                {section.links.map((linkItem, i) => (
                  <li key={i}>
                    <Link to={linkItem.link} className="hover:underline">
                      {linkItem.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-richblack-700">
        <div className="max-w-maxContent mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-richblack-300">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} Studynotion</span>
            <Link to="/privacy" className="hover:underline">Privacy</Link>
            <Link to="/cookies" className="hover:underline">Cookies</Link>
            <Link to="/terms" className="hover:underline">Terms</Link>
          </div>
          <div className="text-xs text-richblack-400">Built with ❤️ for learners worldwide.</div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLinks2;