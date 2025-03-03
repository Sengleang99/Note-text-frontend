import React, { useEffect, useState } from "react";
import NodeCard from "../../components/Card/NoteCard";
import AddEditNote from "./AddEditNote";
import Navbar from "../../components/Navbar/Navbar";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Set Modal's app element for accessibility
Modal.setAppElement("#root");

const Home = () => {
  const [openAddEditNote, setOpenAddEditNote] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [userInfo, setUserInfo] = useState("");
  const [note, setNote] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditNote({ isShown: true, data: noteDetails, type: "edit" });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/api/users/getusertoken");
      if (response.data?.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        setUserInfo(null);
        navigate("/signin");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/api/notes/readallnote", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data && Array.isArray(response.data)) {
        setNote(response.data);
      } else if (response.data?.note && Array.isArray(response.data.note)) {
        setNote(response.data.note);
      } else {
        setNote([]);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNote([]);
    }
  };

  // delete data note
  const handleDeleteNote = async (data) => {
    try {
      const noteId = data._id;
      const response = await axiosInstance.delete(
        `/api/notes/deletenotes/${noteId}` // Fixed the URL format
      );

      // Check if the response was successful
      if (response.data && response.data.success) {
        // Assuming success is in response.data.success
        toast.success("Note deleted successfully");
        getAllNotes(); // Refresh the notes list
      } else {
        toast.error("Failed to delete the note.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again!");
      console.error("Error deleting note:", error);
    }
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes();
    return () => {};
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className="container mx-auto px-18 py-3">
        <div className="grid lg:grid-cols-3 gap-4 mt-8 sm:grid-cols-1 md:grid-cols-1">
          {note.length > 0 ? (
            note.map((item) => (
              <NodeCard
                key={item._id}
                title={item.title}
                date={item.createAt}
                content={item.content}
                tag={Array.isArray(item.tag) ? item.tag : []}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDeleteNote(item)}
                onPinNote={() => {}}
              />
            ))
          ) : (
            <p>No notes available.</p>
          )}
        </div>
      </div>
      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 focus:outline-none transition transform hover:scale-110 absolute right-10 bottom-10 z-50"
        onClick={() =>
          setOpenAddEditNote({ isShown: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditNote.isShown}
        onRequestClose={() =>
          setOpenAddEditNote({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.2)" },
          content: {
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "90%",
            maxWidth: "500px",
            padding: "20px",
            borderRadius: "10px",
            background: "#fff",
          },
        }}
      >
        <AddEditNote
          type={openAddEditNote.type}
          noteData={openAddEditNote.data || {}}
          onClose={() =>
            setOpenAddEditNote({ isShown: false, type: "add", data: null })
          }
          getAllNotes={getAllNotes}
        />
      </Modal>
    </>
  );
};

export default Home;
