"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Shelf = {
    ShelfID: number;
    CategoryName: string;
}

const UpdateShelf = ({shelf}: {shelf : Shelf;}) => {
  const [ShelfID, setID] = useState(shelf.ShelfID);
  const [CategoryName, setName] = useState(shelf.CategoryName);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.patch(`/api/shelves/${shelf.ShelfID}`, {
        ShelfID: Number(ShelfID),
        CategoryName: CategoryName,
    });
    setIsLoading(false);
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  let txt = " ";
  txt = "UPDATE shelf \nSET ShelfID = "+ShelfID+", CategoryName = '"+CategoryName+"' \nWHERE ShelfID = "+shelf.ShelfID+";";

  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleModal}>
        Edit
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">UPDATE shelf {shelf.CategoryName}</h3>
          <form onSubmit={handleUpdate}>

          <div className="form-control w-full">
              <label className="label font-bold">Shelf ID</label>
              <input
                type="text"
                value={ShelfID}
                onChange={(e) => setID(Number(e.target.value))}
                className="input input-bordered"
                placeholder="Shelf ID"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">Shelf Name</label>
              <input
                type="text"
                value={CategoryName}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered"
                placeholder="Shelf Name"
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

export default UpdateShelf;