import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import axiosInstance from "../../utils/axiosinstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEditNote = ({ type, getAllNotes, onClose, noteData={} }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [error, setError] = useState(null);
  const [tag, setTags] = useState(noteData?.tag || []);

  // add new data 
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/api/notes/addnotes", {
        title: title,
        content: content,
        tag: tag,
      });

      if (response.data && response.data.note) {
        toast.success("Note added successfully!"); // Show success toast
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
        toast.error(error.response.data.message); // Show error toast
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  // edit data 
  const handleEditNote = async () => {
    try {
      const noteId = noteData?._id; 
  
      if (!noteId) {
        toast.error("Error: Note ID is missing!");
        console.error("Error: noteData is missing _id", noteData);
        return;
      }
  
      const response = await axiosInstance.put(`/api/notes/updatenotes/${noteId}`, {
        title,
        content,
        tag,
      });
  
      if (response.data && response.data.note) {
        toast.success("Note updated successfully!");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      console.error("Update Note Error:", error);
      toast.error("Failed to update note!");
    }
  };
  
  // check condition note
  const handleAddNote = () => {
    if (!title) {
      setError("Enter the title");
      toast.error("Enter the title"); // Show error toast
      return;
    }
    if (!content) {
      setError("Enter the content");
      toast.error("Enter the content"); // Show error toast
      return;
    }

    setError(null);

    if (type === "edit") {
      handleEditNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl text-slate-900 outline-none p-2 border rounded"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          placeholder="Write Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-slate-900 bg-slate-50 p-2 rounded outline-none border"
          rows={5}
        />
      </div>

      <div className="mt-3">
        <label htmlFor="tags">Tags</label>
        <TagInput tags={tag} setTags={setTags} />
      </div>

      <button
        className="bg-blue-500 text-white font-medium w-115 mt-5 p-3 rounded"
        onClick={handleAddNote}
      >
        {type === "edit" ? "Update Note" : "Add Note"}
      </button>
    </div>
  );
};

export default AddEditNote;
