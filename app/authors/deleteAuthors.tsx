"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Author = {
    AuthorID: number;
    AuthorName: string;
    YearBorn: number;
    YearDied: number | null;
}

const DeleteAuthor = ({author}:{author: Author}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleDelete = async (AuthorID: number) => {
    setIsLoading(true);
    await axios.delete(`/api/authors/${AuthorID}`);
    setIsLoading(false);
    router.refresh();
    setIsOpen(false);
  };
      
  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  let txt = " ";
  txt = "DELETE FROM author \nWHERE AuthorID = "+author.AuthorID+";";

  return (
    <div>
      <button className="btn btn-error btn-sm" onClick={handleModal}>
        Delete
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Delete {author.AuthorName}?
          </h3>

          <div className="form-control w-full">
              <label className="label font-bold">SQL Builder</label>
              <textarea
                value={txt}
                className="input input-bordered resize-y overflow-auto h-30"
                placeholder="SQL"
                spellCheck="false"
              />
          </div>
  
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>
              No
            </button>
            {!isLoading ? (
              <button
                type="button"
                onClick={() => handleDelete(author.AuthorID)}
                className="btn btn-primary"
              >
                Yes
              </button>
            ) : (
              <button type="button" className="btn loading">
                Deleting...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAuthor;