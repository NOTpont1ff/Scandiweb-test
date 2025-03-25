import { useEffect, useRef, useState } from "react";
import { FilmData } from "../types/Film";
import { fetchFilms } from "../services/filmService";
import "../App.css";

const FilmList = () => {
  const [film, setFilm] = useState<FilmData[]>([]);
  const [filteredFilms, setFilteredFilms] = useState<FilmData[]>([]);
  const filterCategoryRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    loadFilms();
  }, []);

  const loadFilms = async () => {
    const data = await fetchFilms();
    setFilm(data);
    setFilteredFilms(data);
  };

  const handleFilter = () => {
    const category = filterCategoryRef.current?.value;
    if (category === "All" || !category) {
      setFilteredFilms(film);
    } else {
      setFilteredFilms(film.filter((f) => f.category === category));
    }
  };

  return (
    <>
      <section className="showcase padding">
        <section className="nes-container with-title ">
          <h2 className="title">List</h2>

          <div id="FilterID " className="container text-center">
            <div className="row">
              <div className="col">
                <select className="nes-input" ref={filterCategoryRef}>
                  <option value="All">All</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Horror">Horror</option>
                  <option value="Thriller">Thriller</option>
                </select>
              </div>
              <div className="col">
                <button className="nes-btn is-primary" onClick={handleFilter}>
                  Filter
                </button>
              </div>
            </div>
          </div>
          <p></p>

          <table className="nes-table is-bordered center-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFilms.map((filmData) => (
                <tr key={filmData.ID}>
                  <td>{filmData.ID}</td>
                  <td>{filmData.name}</td>
                  <td>{filmData.price}</td>
                  <td>{filmData.category}</td>
                  <td>
                    {/* <button
                      onClick={() => handleDelete(filmData.ID)}
                      className="nes-btn is-error btn-sm"
                    >
                      x
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>
    </>
  );
};

export default FilmList;
