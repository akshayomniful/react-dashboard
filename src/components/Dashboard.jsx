import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaChartBar,
  FaUsers,
  FaFileAlt,
  FaTimes,
} from "react-icons/fa";
import { IoMdNotifications, IoMdSettings, IoMdHelp } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import Accordion from "./Accordion";
import AutoCompletion from "./AutoCompletion";
import InfiniteScroller from "./InfiniteScroller";
import Modal from "./Modal";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  // Check if the screen is mobile size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-open sidebar on desktop
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    // Set initial state
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigation = (path, tab) => {
    setActiveTab(tab);
    navigate(path);
    // Close sidebar automatically on mobile after navigation
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col font-sans">
      {/* Navbar */}
      <nav className="bg-slate-800 text-white px-4 h-16 flex justify-between items-center shadow-md z-20">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-xl focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <FaBars className="h-6 w-6" />
          </button>
          <h1 className="ml-4 text-xl font-semibold truncate">Dashboard</h1>
        </div>

        <div className="flex">
          <button className="flex items-center px-2 py-2 mx-1 rounded hover:bg-slate-700 transition-colors">
            <CgProfile className="h-5 w-5" />
            <span className="hidden md:inline ml-2">Profile</span>
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile overlay - only shown when sidebar is open on mobile */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`bg-slate-700 text-white transition-all duration-300 fixed md:relative h-full z-40
            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full md:translate-x-0"
            } 
            ${isMobile ? "w-64" : sidebarOpen ? "w-64" : "w-16"}`}
        >
          <div className="flex justify-between items-center md:hidden p-4">
            <span className="font-bold">Menu</span>
            <button onClick={toggleSidebar} className="text-white">
              <FaTimes className="h-5 w-5" />
            </button>
          </div>

          <ul>
            <li
              className={`flex items-center px-4 py-3 cursor-pointer transition-colors ${
                activeTab === "home"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "hover:bg-slate-600"
              }`}
              onClick={() => handleNavigation("/", "home")}
            >
              <FaHome className="h-5 w-5 min-w-[1.25rem]" />
              <span
                className={`ml-3 ${
                  !sidebarOpen && !isMobile ? "hidden" : "block"
                }`}
              >
                Home
              </span>
            </li>

            <li
              className={`flex items-center px-4 py-3 cursor-pointer transition-colors ${
                activeTab === "infinite-scroll"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "hover:bg-slate-600"
              }`}
              onClick={() =>
                handleNavigation("/infinite-scroll", "infinite-scroll")
              }
            >
              <FaChartBar className="h-5 w-5 min-w-[1.25rem]" />
              <span
                className={`ml-3 ${
                  !sidebarOpen && !isMobile ? "hidden" : "block"
                }`}
              >
                Infinite Scroller
              </span>
            </li>

            <li
              className={`flex items-center px-4 py-3 cursor-pointer transition-colors ${
                activeTab === "auto-complete"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "hover:bg-slate-600"
              }`}
              onClick={() =>
                handleNavigation("/auto-complete", "auto-complete")
              }
            >
              <FaUsers className="h-5 w-5 min-w-[1.25rem]" />
              <span
                className={`ml-3 ${
                  !sidebarOpen && !isMobile ? "hidden" : "block"
                }`}
              >
                AutoComplete Search
              </span>
            </li>

            <li
              className={`flex items-center px-4 py-3 cursor-pointer transition-colors ${
                activeTab === "accordion"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "hover:bg-slate-600"
              }`}
              onClick={() => handleNavigation("/accordion", "accordion")}
            >
              <FaFileAlt className="h-5 w-5 min-w-[1.25rem]" />
              <span
                className={`ml-3 ${
                  !sidebarOpen && !isMobile ? "hidden" : "block"
                }`}
              >
                Accordion
              </span>
            </li>

            <li
              className={`flex items-center px-4 py-3 cursor-pointer transition-colors ${
                activeTab === "modal"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "hover:bg-slate-600"
              }`}
              onClick={() => handleNavigation("/modal", "modal")}
            >
              <FaFileAlt className="h-5 w-5 min-w-[1.25rem]" />
              <span
                className={`ml-3 ${
                  !sidebarOpen && !isMobile ? "hidden" : "block"
                }`}
              >
                Modal
              </span>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 bg-gray-100 overflow-y-auto">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                    Welcome to the dashboard
                  </h2>
                  <p className="text-gray-600">
                    Select an option from the sidebar
                  </p>
                </div>
              }
            />
            <Route path="/infinite-scroll" element={<InfiniteScroller />} />
            <Route
              path="/auto-complete"
              element={
                <AutoCompletion
                  suggestions={["apple", "bananas", "orange", "grapes"]}
                />
              }
            />
            <Route path="/accordion" element={<Accordion />} />
            <Route path="/modal" element={<Modal />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
