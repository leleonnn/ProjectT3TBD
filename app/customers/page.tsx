import { PrismaClient } from "@prisma/client";
import AddCustomer from "./addCustomer";
import DeleteCustomer from "./deleteCustomer";
import UpdateCustomer from "./updateCustomer";
import Nav from '../components/navigation';
import Image from 'next/image';
import image from './customer.png';

const prisma = new PrismaClient();

const getCustomers = async () => {
  const res = await prisma.customer.findMany({
    select: {
        CustomerID: true,
        CustomerName: true,
        Street: true,
        City: true,
        State: true,
        Country: true,
    },
  });
  return res;
};

const Customer = async () => {
  const [customers] = await Promise.all([getCustomers()]);

  return (
    <div>
      <Nav/>

      <div className="flex justify-center">
        <Image src={image} alt="Customer" className="h-20 w-auto" />
      </div>

      <div className="mb-2">
        <AddCustomer />
      </div>

      <table className="table w-full">
        <thead>
          <tr>
            <th>#id</th>
            <th>Customer Name</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
          </tr>
        </thead>
        
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer.CustomerID}>
              <td>{customer.CustomerID}</td>
              <td>{customer.CustomerName}</td>
              <td>{customer.Street}</td>
              <td>{customer.City}</td>
              <td>{customer.State}</td>
              <td>{customer.Country}</td>
              <td className="flex justify-center space-x-1">
                <UpdateCustomer customer={customer} />
                <DeleteCustomer customer={customer} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customer;