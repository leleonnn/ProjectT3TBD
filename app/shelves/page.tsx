import { PrismaClient } from "@prisma/client";
import AddShelf from "./addShelf";
import DeleteShelf from "./deleteShelf";
import UpdateShelf from "./updateShelf";
import Nav from '../components/navigation';
import Image from 'next/image';
import image from './shelf.png';

const prisma = new PrismaClient();

const getShelves = async () => {
  const res = await prisma.shelf.findMany({
    select: {
        ShelfID: true,
        CategoryName: true,
    },
  });
  return res;
};

const Shelf = async () => {
  const [shelves] = await Promise.all([getShelves()]);

  return (
    <div>
      <Nav/>

      <div className="flex justify-center">
        <Image src={image} alt="Shelf" className="h-20 w-auto" />
      </div>

      <div className="mb-2">
        <AddShelf />
      </div>

      <table className="table w-full">
        <thead>
          <tr>
            <th>#id</th>
            <th>Category Name</th>
          </tr>
        </thead>

        <tbody>
          {shelves.map((shelf, index) => (
            <tr key={shelf.ShelfID}>
              <td>{shelf.ShelfID}</td>
              <td>{shelf.CategoryName}</td>
              <td className="flex justify-center space-x-1">
                <UpdateShelf shelf={shelf} />
                <DeleteShelf shelf={shelf} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Shelf;