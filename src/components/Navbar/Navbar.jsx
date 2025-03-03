import React, { useEffect, useState } from "react";
import ProfileInfo from "../Card/ProfileInfo";
import { useNavigate } from "react-router-dom";
import Search from "../search/Search";

const Navbar = ({ userInfo, onSearchNote }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery); 
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
  };

  const onSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };


  return (
    <div className="bg-white flex justify-between items-center px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Note</h2>
      <Search
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <ProfileInfo userInfo={userInfo} onSignOut={onSignOut} />
    </div>
  );
};

export default Navbar;
