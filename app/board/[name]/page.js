'use client'

import { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useRouter } from "next/navigation";
import { notifyError, notifySuccess } from "@/components/Toast/ToastContainer";
import Loading from "@/components/Loading/Loading";
import { v4 as uuidv4 } from "uuid";

const Board = ({ params }) => {
  const router = useRouter();

  const [board, setBoard] = useState(null);
  const [newCard, setNewCard] = useState({
    title: "",
    description: "",
    columnId: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await fetch(`/api/board/${params.name}`);
        if (response.status === 404) {
          router.push("/404");
        } else {
          const data = await response.json();
          setBoard(data.board);
        }
      } catch (error) {
        console.error("Error fetching board:", error);
        router.push("/404");
      }
    };

    if (params.name) {
      fetchBoard();
    }
  }, [params.name]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = board.columns[source.droppableId];
      const destColumn = board.columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setBoard({
        ...board,
        columns: {
          ...board.columns,
          [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems,
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems,
          },
        },
      });
    } else {
      const column = board.columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setBoard({
        ...board,
        columns: {
          ...board.columns,
          [source.droppableId]: {
            ...column,
            items: copiedItems,
          },
        },
      });
    }
  };

  const handleAddCard = (columnId) => {
    setIsAdding(true);
    setNewCard({ ...newCard, columnId });
  };

  const handleSaveCard = () => {
    if (newCard.title && newCard.description && newCard.columnId) {
      const column = board.columns[newCard.columnId];
      const newItem = {
        id:  uuidv4(),
        content: newCard.title,
        description: newCard.description,
        color: "bg-blue-500", // Default color for new cards
      };
      const updatedItems = [...column.items, newItem];
      setBoard({
        ...board,
        columns: {
          ...board.columns,
          [newCard.columnId]: {
            ...column,
            items: updatedItems,
          },
        },
      });
      setNewCard({ title: "", description: "", columnId: "" });
      setIsAdding(false);
    }
  };

  const saveBoard = async () => {
    try {
      const response = await fetch("/api/board/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: board.id, columns: board.columns }),
      });
      if (response.status === 200)
        if (!response.ok) {
          throw new Error("Failed to update board");
        }
      notifySuccess("Board updated successfully!");
    } catch (error) {
      console.error("Error updating board:", error);
      notifyError("Error updating board.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsAdding(false);
      }
    };

    if (isAdding) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAdding]);

  if (!board) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-">
      <div className="flex justify-between py-5 w-auto">
        <h1 className="text-3xl font-bold mr-10 text-white">
          Board: {board.name}
        </h1>
        <button
          onClick={saveBoard}
          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Save
        </button>
      </div>
      <div className="flex space-x-4 max-w-full overflow-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(board.columns).map(([columnId, column], index) => {
            return (
              <div
                key={columnId}
                className="flex flex-col items-center bg-gray-800 p-4 rounded-lg relative"
              >
                <div className="flex items-center mb-4 w-full justify-between">
                  <h2 className="text-2xl font-bold text-white">
                    {column.name}
                  </h2>
                  <button
                    onClick={() => handleAddCard(columnId)}
                    className="ml-2 px-2  bg-blue-500 text-white rounded hover:bg-blue-700"
                  >
                    +
                  </button>
                </div>
                {isAdding && newCard.columnId === columnId && (
                  <div
                    ref={formRef}
                    className="absolute top-12 left-4 mt-2 w-64 bg-gray-700 p-4 rounded-md shadow-md z-10"
                  >
                    <input
                      type="text"
                      placeholder="Title"
                      value={newCard.title}
                      onChange={(e) =>
                        setNewCard({ ...newCard, title: e.target.value })
                      }
                      className="mb-2 px-2 py-1 w-full rounded"
                    />
                    <textarea
                      placeholder="Description"
                      value={newCard.description}
                      onChange={(e) =>
                        setNewCard({ ...newCard, description: e.target.value })
                      }
                      className="mb-2 px-2 py-1 w-full rounded resize-none"
                      style={{ resize: "none" }}
                    />
                    <button
                      onClick={handleSaveCard}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                    >
                      Add
                    </button>
                  </div>
                )}
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`p-4 w-64 bg-gray-700 rounded-md min-h-[200px] ${
                        snapshot.isDraggingOver ? "bg-blue-200" : ""
                      }`}
                    >
                      {column.items.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`${
                                item.color
                              } p-4 mb-2 rounded-md shadow-md  ${
                                snapshot.isDragging ? "bg-blue-100" : ""
                              }`}
                            >
                              <div className="font-bold text-white">
                                {item.content}
                              </div>
                              <div className="text-sm text-white">
                                {item.description}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;
