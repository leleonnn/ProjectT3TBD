"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Customer = {
    CustomerID: number;
    CustomerName: string;
    Street: string;
    City: string;
    State: string;
    Country: string;
}

const UpdateCustomer = ({customer}: {customer : Customer}) => {
    const [CustomerID, setID] = useState(customer.CustomerID);
    const [CustomerName, setName] = useState(customer.CustomerName);
    const [Street, setStreet] = useState(customer.Street);
    const [City, setCity] = useState(customer.City);
    const [State, setState] = useState(customer.State);
    const [Country, setCountry] = useState(customer.Country);

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.patch(`/api/customers/${customer.CustomerID}`, {
        CustomerID: Number(CustomerID),
        CustomerName: CustomerName,
        Street: Street,
        City: City,
        State: State,
        Country: Country
    });
    setIsLoading(false);
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  let txt = " ";
  txt = "UPDATE customer \nSET CustomerID = "+CustomerID+", CustomerName = '"+CustomerName+"', Street = '"+Street+"', City = '"+City+"', State = '"+State+"', Country = '"+Country+"' \nWHERE CustomerID = "+customer.CustomerID+";";

  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleModal}>
        Edit
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">UPDATE {customer.CustomerName}</h3>
          <form onSubmit={handleUpdate}>

          <div className="form-control w-full">
              <label className="label font-bold">Customer ID</label>
              <input
                type="text"
                value={CustomerID}
                onChange={(e) => setID(Number(e.target.value))}
                className="input input-bordered"
                placeholder="Customer ID"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">Customer Name</label>
              <input
                type="text"
                value={CustomerName}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered"
                placeholder="Customer Name"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">Street</label>
              <input
                type="text"
                value={Street}
                onChange={(e) => setStreet(e.target.value)}
                className="input input-bordered"
                placeholder="Street"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">City</label>
              <input
                type="text"
                value={City}
                onChange={(e) => setCity(e.target.value)}
                className="input input-bordered"
                placeholder="City"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">State</label>
              <input
                type="text"
                value={State}
                onChange={(e) => setState(e.target.value)}
                className="input input-bordered"
                placeholder="State"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">Country</label>
              <input
                type="text"
                value={Country}
                onChange={(e) => setCountry(e.target.value)}
                className="input input-bordered"
                placeholder="Country"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">SQL Builder</label>
              <textarea
                value={txt}
                className="input input-bordered resize-y overflow-auto h-40"
                placeholder="SQL"
                spellCheck="false"
              />
            </div>

            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              {!isLoading ? (
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCustomer;