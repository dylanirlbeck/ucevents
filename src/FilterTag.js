import React from "react";
function Tag(props) {
  return (
    <li className="flex-1 ">
      <button className="inline-block px-3 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full hover:bg-gray-400">
        #{props.name}
      </button>
    </li>
  );
}
export default Tag;
