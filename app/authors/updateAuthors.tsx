"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Author = {
    AuthorID: number;
    AuthorName: string;
    YearBorn: number;
    YearDied: number | null;
}

const UpdateAuthor = ({author}: {author : Author}) => {
  const [AuthorID, setID] = useState(author.AuthorID);
  const [AuthorName, setName] = useState(author.AuthorName);
  const [YearBorn, setBorn] = useState(author.YearBorn);
  const [YearDied, setDied] = useState(author.YearDied);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.patch(`/api/authors/${author.AuthorID}`, {
      AuthorID: Number(AuthorID),
      AuthorName: AuthorName,
      YearBorn: Number(YearBorn),
      YearDied: YearDied !== null ? Number(YearDied) : null as number | null
    });
    setIsLoading(false);
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  
  let txt = " ";
  txt = "UPDATE author \nSET AuthorID = "+AuthorID+", AuthorName = '"+AuthorName+"', YearBorn = "+YearBorn+", YearDied = "+YearDied+" \nWHERE AuthorID = "+author.AuthorID+";";


  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleModal}>
        Edit
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">UPDATE {author.AuthorName}</h3>
          <form onSubmit={handleUpdate}>
            
            <div className="form-control w-full">
              <label className="label font-bold">Author ID</label>
              <input
                type="text"
                value={AuthorID}
                onChange={(e) => setID(Number(e.target.value))}
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
                onChange={(e) => setBorn(Number(e.target.value))}
                className="input input-bordered"
                placeholder="Year Born"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">Year Died</label>
              {
                YearDied !== null ? (
                  <input
                  type="text"
                  value={YearDied}
                  onChange={(e) => setDied(Number(e.target.value))}
                  className="input input-bordered"
                  placeholder="Year Died"
                />
                ) : (
                  <input
                  type="text"
                  // value=null
                  onChange={(e) => setDied(null)}
                  className="input input-bordered"
                  placeholder="Year Died"
                  />
                )
              }

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

export default UpdateAuthor;