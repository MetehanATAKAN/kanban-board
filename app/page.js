'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [boardName, setBoardName] = useState("");
  const router = useRouter();

  const handleCreateBoard = async () => {
    if (boardName) {
      const id = uuidv4();
      const response = await fetch("/api/board", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, name: boardName }),
      });

      const data = await response.json();
      router.push(`/board/${data.board.id}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4 text-white">Create a new Board</h1>
      <div className="flex">
        <input
          type="text"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          className="border border-gray-300 rounded-l px-4 py-2 focus:outline-none"
          placeholder="Enter board name"
        />
        <button
          onClick={handleCreateBoard}
          className="bg-blue-500 text-white rounded-r px-4 py-2 hover:bg-blue-700"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Home;
