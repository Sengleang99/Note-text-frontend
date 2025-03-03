import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = () => {
    if (inputValue.trim() !== "" && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue(""); // Clear input after adding
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission if inside a form
      handleAddTag();
    }
  };

  return (
    <div>
      {/* Display tags */}
      {tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-600 rounded text-sm"
            >
              {tag}
              <button onClick={() => handleRemoveTag(index)} className="text-red-500">
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input field */}
      <div className="flex items-center gap-4 mt-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Add Tag"
          className="text-sm bg-transparent border px-3 py-2 rounded"
        />
        <button
          onClick={handleAddTag}
          className="w-8 h-8 flex items-center justify-center bg-blue-500 hover:bg-blue-600 focus:outline-none rounded"
        >
          <MdAdd className="text-2xl text-white p-1 rounded" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
