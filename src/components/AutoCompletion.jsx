// AutoComplete.jsx
import React, { useState, useEffect, useRef } from "react";

const AutoCompletion = ({ suggestions = [] }) => {
  const [input, setInput] = useState("");
  const [matches, setMatches] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!input.trim()) {
      setMatches([]);
      setShowDropdown(false);
      return;
    }

    const filtered = suggestions.filter((item) =>
      item.toLowerCase().includes(input.toLowerCase())
    );

    setMatches(filtered);
    setShowDropdown(true);
    setActiveIdx(-1);
  }, [input, suggestions]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const selectSuggestion = (suggestion) => {
    setInput(suggestion);
    setShowDropdown(false);
    inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((prev) => Math.min(prev + 1, matches.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter" && activeIdx >= 0) {
      setInput(matches[activeIdx]);
      setShowDropdown(false);
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  const highlightMatch = (text) => {
    if (!input.trim()) return text;

    const regex = new RegExp(`(${input})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="relative w-full max-w-lg mx-auto py-8">
      <label className="block text-left mb-2 text-sm font-medium text-gray-700">
        Search Fruits like apple:
      </label>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onClick={() => input.trim() && setShowDropdown(true)}
        placeholder="Search..."
        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      {showDropdown && matches.length > 0 && (
        <ul
          ref={dropdownRef}
          className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-60 overflow-auto"
        >
          {matches.map((suggestion, idx) => (
            <li
              key={idx}
              onClick={() => selectSuggestion(suggestion)}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                idx === activeIdx ? "bg-blue-100" : ""
              }`}
            >
              {highlightMatch(suggestion)}
            </li>
          ))}
        </ul>
      )}

      {showDropdown && matches.length === 0 && input.trim() && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow p-2 text-gray-500">
          No matches found
        </div>
      )}
    </div>
  );
};

export default AutoCompletion;
