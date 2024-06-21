import { NextResponse } from 'next/server';
import connectMongo from '../../../../lib/db';
import Board from '../../../../lib/models/Board';

export const GET = async (req, { params }) => {
    await connectMongo();

  const { id } = params;

  try {
    const board = await Board.findOne({ id: id }); 
    if (!board) {
      return NextResponse.json({ message: 'Board not found' }, { status: 404 });
    }
    return NextResponse.json({ board });
  } catch (error) {
    console.error('Error fetching board:', error);
    return NextResponse.json({ message: 'Error fetching board' }, { status: 500 });
  }
}
