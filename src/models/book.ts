import mongoose from 'mongoose';

interface Book {
  author: string;
  title: string;
  year: number;
}


const bookSchema = new mongoose.Schema<Book>({
  author: String,
  title: { type: String, required: true },
  year: Number,
});

const Book = mongoose.model<Book>("Book", bookSchema);

export default Book;
