"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Publisher = {
    PublisherID: number;
    PublisherName: string;
    City: string;
    Country: string;
    Telephone: string;
    YearFounded: number;
}

const UpdatePublisher = ({publisher}: {publisher : Publisher}) => {
    const [PublisherID, setID] = useState(publisher.PublisherID);
    const [PublisherName, setName] = useState(publisher.PublisherName);
    const [City, setCity] = useState(publisher.City);
    const [Country, setCountry] = useState(publisher.Country);
    const [Telephone, setTele] = useState(publisher.Telephone);
    const [YearFounded, setYear] = useState(publisher.YearFounded);

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.patch(`/api/publishers/${publisher.PublisherID}`, {
        PublisherID: Number(PublisherID),
        PublisherName: PublisherName,
        City: City,
        Country: Country,
        Telephone: Telephone,
        YearFounded: Number(YearFounded),
    });
    setIsLoading(false);
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  let txt = " ";
  txt = "UPDATE publisher \nSET PublisherID = "+PublisherID+", PublisherName = '"+PublisherName+"', City = '"+City+"', Country = '"+Country+"', Telephone = '"+Telephone+"', YearFounded = '"+YearFounded+"' \nWHERE PublisherID = "+publisher.PublisherID+";";

  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleModal}>
        Edit
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">UPDATE {publisher.PublisherName}</h3>
          <form onSubmit={handleUpdate}>

          <div className="form-control w-full">
              <label className="label font-bold">Publisher ID</label>
              <input
                type="text"
                value={PublisherID}
                onChange={(e) => setID(Number(e.target.value))}
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
                onChange={(e) => setYear(Number(e.target.value))}
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

export default UpdatePublisher;