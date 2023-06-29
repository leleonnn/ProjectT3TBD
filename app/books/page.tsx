import { PrismaClient } from "@prisma/client";
import AddBook from "./addBook";
import DeleteBook from "./deleteBook";
import UpdateBook from "./updateBook";
import Nav from '../components/navigation';
import Image from 'next/image';
import image from './book.png';

const prisma = new PrismaClient();

const getBooks = async () => {
  const res = await prisma.book.findMany({
    select: {
        BookID: true,
        BookName: true,
        PublicationYear: true,
        Pages: true,
    },
  });
  return res;
};

const Book = async () => {
  const [books] = await Promise.all([getBooks()]);

  return (
    <div>
      <Nav/>

      <div className="flex justify-center">
        <Image src={image} alt="Book" className="h-20 w-auto" />
      </div>

      <div className="mb-2">
        <AddBook />
      </div>

      <table className="table w-full">
        <thead>
          <tr>
            <th>#id</th>
            <th>Book Name</th>
            <th>Publication Year</th>
            <th>Pages</th>
          </tr>
        </thead>
        
        <tbody>
          {books.map((book, index) => (
            <tr key={book.BookID}>
              <td>{book.BookID}</td>
              <td>{book.BookName}</td>
              <td>{book.PublicationYear}</td>
              <td>{book.Pages}</td>
              <td className="flex justify-center space-x-1">
                <UpdateBook book={book} />
                <DeleteBook book={book} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Book;