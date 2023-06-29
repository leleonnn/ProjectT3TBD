import { PrismaClient } from "@prisma/client";
import AddAuthors from "./addAuthors";
import DeleteAuthors from "./deleteAuthors";
import UpdateAuthors from "./updateAuthors";
import Nav from '../components/navigation';
import Image from 'next/image';
import image from './author.png';

const prisma = new PrismaClient();

const getAuthors = async () => {
  const res = await prisma.author.findMany({
    select: {
        AuthorID: true,
        AuthorName: true,
        YearBorn: true,
        YearDied: true,
    },
  });
  return res;
};

const Author = async () => {
  const [authors] = await Promise.all([getAuthors()]);
  
  return (
    <div>
      <Nav/>

      <div className="flex justify-center">
        <Image src={image} alt="author" className="h-20 w-auto" />
      </div>

      <div className="mb-2">
        <AddAuthors />
      </div>

      <table className="table w-full">
        <thead>
          <tr>
            <th>#id</th>
            <th>Author Name</th>
            <th>Year Born</th>
            <th>Year Died</th>
          </tr>
        </thead>
        
        <tbody>
          {authors.map((author, index) => (
            <tr key={author.AuthorID}>
              <td>{author.AuthorID}</td>
              <td>{author.AuthorName}</td>
              <td>{author.YearBorn}</td>
              <td>{author.YearDied}</td>
              <td className="flex justify-center space-x-5">
                <UpdateAuthors author={author} />
                <DeleteAuthors author={author} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Author;