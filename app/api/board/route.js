import { NextResponse } from 'next/server';
import connectMongo from '../../../lib/db';
import Board from '../../../lib/models/Board';
import defaultColumns from '../../../data/defaultColumns.json';


export const  POST = async (req) => {
  await connectMongo();

  const { id, name } = await req.json();
  const newBoard = new Board({ id, name, columns: defaultColumns });

  try {
    await newBoard.save();
    return NextResponse.json({ board: newBoard }, { status: 201 });
  } catch (error) {
    console.error('Error creating board:', error);
    return NextResponse.json({ message: 'Error creating board' }, { status: 500 });
  }
}
