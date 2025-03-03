import moment from "moment";
import React from "react";
import { MdOutlinePushPin, MdDelete, MdCreate } from "react-icons/md";

const NodeCard = ({
  title,
  date,
  content,
  isPinned,
  tag,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border bg-white p-4 rounded hover:shadow-xl transition-all ease-in-out duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">
            {moment(date).format("ddd MMM YYYY")}
          </span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? "text-green-700" : "text-slate-500"}`}
          onClick={onPinNote}
        />
      </div>
      <p className="text-slate-600 text-xs mt-2">{content?.slice(0, 60)}</p>
      <div className="justify-between items-center mt-2 flex">
        <div className="text-xs text-slate-500">
          {tag.length > 0
            ? tag.map((item, index) => `#${item}${index !== tag.length - 1 ? ", " : ""}`)
            : "No tags"}
        </div>
        <div className="flex items-center gap-2">
          <MdCreate className="icon-btn text-blue-600" onClick={onEdit} />
          <MdDelete className="icon-btn text-red-600" onClick={onDelete} />
        </div>
      </div>
    </div>
  );
};

export default NodeCard;
