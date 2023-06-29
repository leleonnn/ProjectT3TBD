import { PrismaClient } from "@prisma/client";
import AddPublisher from "./addPublisher";
import DeletePublisher from "./deletePublisher";
import UpdatePublisher from "./updatePublisher";
import Nav from '../components/navigation';
import Image from 'next/image';
import image from './publisher.png';

const prisma = new PrismaClient();

const getPublishers = async () => {
  const res = await prisma.publisher.findMany({
    select: {
        PublisherID: true,
        PublisherName: true,
        City: true,
        Country: true,
        Telephone: true,
        YearFounded: true,
    },
  });
  return res;
};

const Publisher = async () => {
  const [publishers] = await Promise.all([getPublishers()]);

  return (
    <div>
      <Nav/>

      <div className="flex justify-center">
        <Image src={image} alt="Publisher" className="h-20 w-auto" />
      </div>

      <div className="mb-2">
        <AddPublisher />
      </div>

      <table className="table w-full">
        <thead>
          <tr>
            <th>#id</th>
            <th>Publisher Name</th>
            <th>Telephone</th>
            <th>City</th>
            <th>YearFounded</th>
            <th>Country</th>
          </tr>
        </thead>
        
        <tbody>
          {publishers.map((publisher, index) => (
            <tr key={publisher.PublisherID}>
              <td>{publisher.PublisherID}</td>
              <td>{publisher.PublisherName}</td>
              <td>{publisher.Telephone}</td>
              <td>{publisher.City}</td>
              <td>{publisher.YearFounded}</td>
              <td>{publisher.Country}</td>
              <td className="flex justify-center space-x-1">
                <UpdatePublisher publisher={publisher} />
                <DeletePublisher publisher={publisher} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Publisher;