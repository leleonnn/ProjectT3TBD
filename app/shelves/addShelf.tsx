"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AddShelf = () => {
  const [ShelfID, setID] = useState("");
  const [CategoryName, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post("/api/shelves", {
        ShelfID: Number(ShelfID),
        CategoryName: CategoryName,
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
  txt = "INSERT INTO shelf (ShelfID, CategoryName) \nVALUES ("+ShelfID+", '"+CategoryName+"');";

  return (
    <div>
      <button className="bg-green-500 text-gray-300 hover:bg-gray-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={handleModal}>
        ADD
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">INSERT shelf</h3>
          <form onSubmit={handleSubmit}>

          <div className="form-control w-full">
              <label className="label font-bold">Shelf ID</label>
              <input
                type="text"
                value={ShelfID}
                onChange={(e) => setID(e.target.value)}
                className="input input-bordered"
                placeholder="Shelf ID"
              />
            </div>
            
            <div className="form-control w-full">
              <label className="label font-bold">Category Name</label>
              <input
                type="text"
                value={CategoryName}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered"
                placeholder="Category Name"
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

export default AddShelf;