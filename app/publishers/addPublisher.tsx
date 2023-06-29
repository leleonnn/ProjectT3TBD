"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Add = () => {
  const [PublisherID, setID] = useState("");
  const [PublisherName, setName] = useState("");
  const [City, setCity] = useState("");
  const [Country, setCountry] = useState("");
  const [Telephone, setTele] = useState("");
  const [YearFounded, setYear] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post("/api/publishers", {
      PublisherID: Number(PublisherID),
      PublisherName: PublisherName,
      City: City,
      Country: Country,
      Telephone: Telephone,
      YearFounded: Number(YearFounded)
    });
    setID("");
    setName("");
    setCity("");
    setCountry("");
    setTele("");
    setYear("");
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };


  let txt = " ";
  txt = "INSERT INTO publisher (PublisherID, PublisherName, City, Country, Telephone, YearFounded) \nVALUES ("+PublisherID+", '"+PublisherName+"', '"+City+"', '"+Country+"', '"+Telephone+"', "+YearFounded+");";

  return (
    <div>
      <button className="bg-green-500 text-gray-300 hover:bg-gray-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={handleModal}>
        ADD
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">INSERT publisher</h3>
          <form onSubmit={handleSubmit}>

          <div className="form-control w-full">
              <label className="label font-bold">Publisher ID</label>
              <input
                type="text"
                value={PublisherID}
                onChange={(e) => setID(e.target.value)}
                className="input input-bordered"
                placeholder="Publisher ID"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">Publisher Name</label>
              <input
                type="text"
                value={PublisherName}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered"
                placeholder="Publisher Name"
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
              <label className="label font-bold">Telephone</label>
              <input
                type="text"
                value={Telephone}
                onChange={(e) => setTele(e.target.value)}
                className="input input-bordered"
                placeholder="Telephone"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">Year Founded</label>
              <input
                type="text"
                value={YearFounded}
                onChange={(e) => setYear(e.target.value)}
                className="input input-bordered"
                placeholder="Year Founded"
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