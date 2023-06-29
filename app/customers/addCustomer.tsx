"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Add = () => {
  const [CustomerID, setID] = useState("");
  const [CustomerName, setName] = useState("");
  const [Street, setStreet] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [Country, setCountry] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post("/api/customers", {
      CustomerID: Number(CustomerID),
      CustomerName: CustomerName,
      Street: Street,
      City: City,
      State: State,
      Country: Country
    });
    setID("");
    setName("");
    setStreet("");
    setCity("");
    setState("");
    setCountry("");
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };


  let txt = " ";
  txt = "INSERT INTO customer (CustomerID, CustomerName, Street, City, State, Country) \nVALUES ("+CustomerID+", '"+CustomerName+"', '"+Street+"', '"+City+"', '"+State+"', '"+Country+"');";

  return (
    <div>
      <button className="bg-green-500 text-gray-300 hover:bg-gray-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={handleModal}>
        ADD
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">INSERT customer</h3>
          <form onSubmit={handleSubmit}>

          <div className="form-control w-full">
              <label className="label font-bold">Customer ID</label>
              <input
                type="text"
                value={CustomerID}
                onChange={(e) => setID(e.target.value)}
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
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;