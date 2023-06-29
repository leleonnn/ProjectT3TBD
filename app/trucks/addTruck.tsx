"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AddTruck = () => {
  const [TruckID, setID] = useState("");
  const [DriverName, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post("/api/trucks", {
        TruckID: Number(TruckID),
        DriverName: DriverName,
    });
    setID("");
    setName("");
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  let txt = " ";
  txt = "INSERT INTO truck (TruckID, DriverName) \nVALUES ("+TruckID+", '"+DriverName+"');";

  return (
    <div>
      <button className="bg-green-500 text-gray-300 hover:bg-gray-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={handleModal}>
        ADD
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">INSERT truck</h3>
          <form onSubmit={handleSubmit}>

          <div className="form-control w-full">
              <label className="label font-bold">Truck ID</label>
              <input
                type="text"
                value={TruckID}
                onChange={(e) => setID(e.target.value)}
                className="input input-bordered"
                placeholder="Truck ID"
              />
            </div>
            
            <div className="form-control w-full">
              <label className="label font-bold">Driver Name</label>
              <input
                type="text"
                value={DriverName}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered"
                placeholder="Driver Name"
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

export default AddTruck;