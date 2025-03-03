import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

const Search = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className=" w-80 items-center flex justify-between px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        placeholder="Search note"
        value={value}
        onChange={onChange}
        className="w-full text-xs bg-transparent py-[11px] outline-none"
      />
      {value && (
        <IoMdClose
          className=" text-xl text-slate-500 cusor-pointer hover:text-black mr-3"
          onClick={onClearSearch}
        />
      )}
      <IoSearchOutline
        className="text-xl text-slate-500 cusor-pointer hover:text-black mr-3"
        onClick={handleSearch}
      />
    </div>
  );
};
export default Search;
