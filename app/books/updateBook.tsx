"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Book = {
    BookID: number;
    BookName: string;
    PublicationYear: number;
    Pages: number;
}

const UpdateBook = ({book}: {book : Book}) => {
    const [BookID, setID] = useState(book.BookID);
    const [BookName, setName] = useState(book.BookName);
    const [PublicationYear, setYear] = useState(book.PublicationYear);
    const [Pages, setPage] = useState(book.Pages);

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.patch(`/api/books/${book.BookID}`, {
        BookID: Number(BookID),
        BookName: BookName,
        PublicationYear: Number(PublicationYear),
        Pages: Number(Pages)
    });
    setIsLoading(false);
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  let txt = " ";
  txt = "UPDATE book \nSET BookID = "+BookID+", BookName = '"+BookName+"', publicationYear = "+PublicationYear+", Pages = "+Pages+" \nWHERE BookID = "+book.BookID+";";

  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleModal}>
        Edit
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">UPDATE {book.BookName}</h3>
          <form onSubmit={handleUpdate}>

          <div className="form-control w-full">
              <label className="label font-bold">Book ID</label>
              <input
                type="text"
                value={BookID}
                onChange={(e) => setID(Number(e.target.value))}
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
                onChange={(e) => setYear(Number(e.target.value))}
                className="input input-bordered"
                placeholder="Publication Year"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">Pages</label>
              <input
                type="text"
                value={Pages}
                onChange={(e) => setPage(Number(e.target.value))}
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

export default UpdateBook;