"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AddAuthor = () => {
  const [AuthorID, setID] = useState("");
  const [AuthorName, setName] = useState("");
  const [YearBorn, setBorn] = useState("");
  const [YearDied, setDied] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post("/api/authors", {
        AuthorID: Number(AuthorID),
        AuthorName: AuthorName,
        YearBorn: Number(YearBorn),
        YearDied: YearDied !== null ? Number(YearDied) : null
    });
    setID("");
    setName("");
    setBorn("");
    setDied("");
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  
  let txt = " ";
  txt = "INSERT INTO author (AuthorID, AuthorName, YearBorn, YearDied) \nVALUES ("+AuthorID+", '"+AuthorName+"', "+YearBorn+", "+YearDied+");";

  return (
    <div>
      <button className="bg-green-500 text-gray-300 hover:bg-gray-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={handleModal}>
        ADD
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">INSERT author</h3>
          <form onSubmit={handleSubmit}>

          <div className="form-control w-full">
              <label className="label font-bold">Author ID</label>
              <input
                type="text"
                value={AuthorID}
                onChange={(e) => setID(e.target.value)}
                className="input input-bordered"
                placeholder="Author ID"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">Author Name</label>
              <input
                type="text"
                value={AuthorName}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered"
                placeholder="Author Name"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">Year Born</label>
              <input
                type="text"
                value={YearBorn}
                onChange={(e) => setBorn(e.target.value)}
                className="input input-bordered"
                placeholder="Year Born"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">Year Died</label>
              <input
                type="text"
                value={YearDied}
                onChange={(e) => setDied(e.target.value)}
                className="input input-bordered"
                placeholder="Year Died"
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

export default AddAuthor;