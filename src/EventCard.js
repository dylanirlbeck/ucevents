import React from "react";
import img from "./parasite.png";

const Tag = props => {
  const { name } = props;
  return (
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
      {name}
    </span>
  );
};

const Event = props => {
  // Destructure props
  const { name, tags, onClick } = props;
  return (
    <div
      onClick={onClick}
      className="max-w-sm overflow-hidden rounded shadow-lg hover:bg-red-200">
      <img className="w-full" src={img} />
      <div class="px-6 py-4">
        <div className="mb-2 text-xl font-bold">
          <span className="inline-block w-full font-semibold text-gray-700 truncate whitespace-no-wrap">
            {name}
          </span>
        </div>
        <div>
          <span> Sat, Feb 22 </span>
        </div>
        <div>
          <span class="text-base text-gray-700"> 1599 interested </span>
        </div>
        {tags.map(tag => (
          <Tag name={tag} />
        ))}
      </div>
    </div>
  );
};

export default Event;
