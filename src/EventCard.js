import React from "react";
import img from './parasite.png';

const Event = () => {
	return(
		<div className="max-w-sm rounded overflow-hidden shadow-lg"> 
			<img className="w-full" src = {img}/> 
			<div>
				<p><span class="inline-block text-gray-700 font-semibold"> Megascreening! Parasite by Bon...</span></p>
				<p><span class="inline-block text-gray-700"> Sat, Feb 22 </span></p>
				<p><span class="inline-block text-gray-700"> 1599 interested </span></p>
			</div>
			<h2> <span> </span> </h2>
			<div> 
				<button class="bg-transparent hover:bg-blue-400 text-gray-500 font-semibold hover:text-white py-0.9 px-2 border border-gray-500 hover:border-transparent rounded"> Interested </button>
			</div>
		</div>
	);
};

export default Event;