import { PrismaClient } from "@prisma/client";
import AddTruck from "./addTruck";
import DeleteTruck from "./deleteTruck";
import UpdateTruck from "./updateTruck";
import Nav from '../components/navigation';
import Image from 'next/image';
import image from './truck.png';

const prisma = new PrismaClient();

const getTrucks = async () => {
  const res = await prisma.truck.findMany({
    select: {
        TruckID: true,
        DriverName: true,
    },
  });
  return res;
};

const Truck = async () => {
  const [trucks] = await Promise.all([getTrucks()]);

  return (
    <div>
      <Nav/>

      <div className="flex justify-center">
        <Image src={image} alt="truck" className="h-20 w-auto" />
      </div>

      <div className="mb-2">
        <AddTruck />
      </div>

      <table className="table w-full">
        <thead>
          <tr>
            <th>#id</th>
            <th>Driver Name</th>
          </tr>
        </thead>

        <tbody>
          {trucks.map((truck, index) => (
            <tr key={truck.TruckID}>
              <td>{truck.TruckID}</td>
              <td>{truck.DriverName}</td>
              <td className="flex justify-center space-x-1">
                <UpdateTruck truck={truck} />
                <DeleteTruck truck={truck} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Truck;