"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Truck = {
    TruckID: number;
    DriverName: string;
}

const UpdateTruck = ({truck}: {truck : Truck;}) => {
  const [TruckID, setID] = useState(truck.TruckID);
  const [DriverName, setName] = useState(truck.DriverName);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.patch(`/api/trucks/${truck.TruckID}`, {
        TruckID: Number(TruckID),
        DriverName: DriverName,
    });
    setIsLoading(false);
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  let txt = " ";
  txt = "UPDATE truck \nSET TruckID = "+TruckID+", DriverName = '"+DriverName+"' \nWHERE TruckID = "+truck.TruckID+";";

  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleModal}>
        Edit
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">UPDATE truck {truck.DriverName}</h3>
          <form onSubmit={handleUpdate}>

          <div className="form-control w-full">
              <label className="label font-bold">Truck ID</label>
              <input
                type="text"
                value={TruckID}
                onChange={(e) => setID(Number(e.target.value))}
                className="input input-bordered"
                placeholder="Truck ID"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">Truck Name</label>
              <input
                type="text"
                value={DriverName}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered"
                placeholder="Truck Name"
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

export default UpdateTruck;