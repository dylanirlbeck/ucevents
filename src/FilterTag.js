import React from "react";
function Tag(props) {
  const { isActive, onClick } = props;
  const colorScheme = "bg-gray-" + (isActive ? "400" : "200");
  return (
    <li className="flex-1 " onClick={onClick}>
      <button
        className={`inline-block px-3 text-sm font-semibold text-gray-700 ${colorScheme} rounded-full hover:bg-gray-400`}
        style={{ outline: 0 }}>
        #{props.name}
      </button>
    </li>
  );
}
export default Tag;
