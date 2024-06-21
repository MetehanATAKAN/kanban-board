import { Schema, models, model } from "mongoose";

const ItemSchema = new Schema({
  id: String,
  content: String,
  description: String,
  color: String,
});

const ColumnSchema = new Schema({
  name: String,
  items: [ItemSchema],
});

const BoardSchema = new Schema({
  id: String,
  name: String,
  columns: {
    "column-1": ColumnSchema,
    "column-2": ColumnSchema,
    "column-3": ColumnSchema,
    "column-4": ColumnSchema,
  },
});

const Board = models.Board || model("Board", BoardSchema);

export default Board;
