"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AddBook = () => {
  const [BookID, setID] = useState("");
  const [BookName, setName] = useState("");
  const [PublicationYear, setYear] = useState("");
  const [Pages, setPage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post("/api/books", {
      BookID: Number(BookID),
      BookName: BookName,
      PublicationYear: Number(PublicationYear),
      Pages: Number(Pages)
    });
    setID("");
    setName("");
    setYear("");
    setPage("");
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };


  let txt = " ";
  txt = "INSERT INTO book (BookID, BookName, PublicationYear, Pages) \nVALUES ("+BookID+", '"+BookName+"', "+PublicationYear+", "+Pages+");";

  return (
    <div>
      <button className="bg-green-500 text-gray-300 hover:bg-gray-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={handleModal}>
        ADD
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">INSERT book</h3>
          <form onSubmit={handleSubmit}>

          <div className="form-control w-full">
              <label className="label font-bold">Book ID</label>
              <input
                type="text"
                value={BookID}
                onChange={(e) => setID(e.target.value)}
                className="input input-bordered"
                placeholder="Book ID"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">Book Name</label>
              <input
                type="text"
                value={BookName}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered"
                placeholder="Book Name"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">Publication Year</label>
              <input
                type="text"
                value={PublicationYear}
                onChange={(e) => setYear(e.target.value)}
                className="input input-bordered"
                placeholder="Publication Year"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">Pages</label>
              <input
                type="text"
                value={Pages}
                onChange={(e) => setPage(e.target.value)}
                className="input input-bordered"
                placeholder="Pages"
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

export default AddBook;