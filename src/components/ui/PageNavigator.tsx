import React from 'react';

const PageNavigator = () => {
    return (
        <div className="flex justify-center items-center mt-4">
            <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full mr-2 hover:bg-gray-400 transition duration-300">1</button>
            <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full mr-2 hover:bg-gray-400 transition duration-300">2</button>
            <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full mr-2 hover:bg-gray-400 transition duration-300">3</button>
            <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full mr-2 hover:bg-gray-400 transition duration-300">4</button>
            <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition duration-300">5</button>
        </div>
    );
};

export default PageNavigator;