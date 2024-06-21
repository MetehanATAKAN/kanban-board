import { NextResponse } from 'next/server';
import connectMongo from '../../../../lib/db';
import Board from '../../../../lib/models/Board';

export const POST = async (req) => {
  await connectMongo();

  const { id, columns } = await req.json();

  try {
    const board = await Board.findOneAndUpdate(
      { id },
      { columns },
      { new: true }
    );

    if (!board) {
      return NextResponse.json({ message: 'Board not found' }, { status: 404 });
    }

    return NextResponse.json({ board });
  } catch (error) {
    console.error('Error updating board:', error);
    return NextResponse.json({ message: 'Error updating board' }, { status: 500 });
  }
}
