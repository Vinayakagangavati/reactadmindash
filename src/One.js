import { useState, useEffect } from "react";

function One({ data }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setList(data);
    }
  }, [data]);

  const [currentPage, setCurrentPage] = useState(1);
  const [checkedItems, setCheckedItems] = useState({});
  const [arr, setArr] = useState([]);
  const [listname, setlistname] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [editItem, setEditItem] = useState({ id: null, name: "" });

  if (!Array.isArray(list) || list.length === 0) {
    return <div>No list available</div>;
  }
  const recordsperPage = 10;
  const lastIndex = currentPage * recordsperPage;
  const firstindex = lastIndex - recordsperPage;
  const records = list.slice(firstindex, lastIndex);
  const npage = Math.ceil(list.length / recordsperPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function delfun(id) {
    const updatedList = list.filter((item) => item.id !== id);
    console.log(updatedList);
    setList(updatedList);
  }

  function checkfun(id) {
    setCheckedItems((prev) => {
      const updatedCheckedItems = {
        ...prev,
        [id]: !prev[id] || false,
      };

      const updatedArr = Object.keys(updatedCheckedItems).filter(
        (key) => updatedCheckedItems[key]
      );

      setArr(updatedArr);

      return updatedCheckedItems;
    });
  }

  function deletefun() {
    const filteredData = data.filter((item) => !arr.includes(item.id));
    console.log(filteredData);
    setList(filteredData);
    setlistname(" ");
  }

  function searchfun(e) {
    const searchTerm = e.target.value;
    setlistname(searchTerm);

    const filteredData = data.filter(
      (item) =>
        item.name.includes(searchTerm) || item.email.includes(searchTerm)
    );

    setList(filteredData);
    console.log(filteredData);
  }

  function editfun(e) {
    const item = data.find((i) => i.id === e.id);
    setEditItemId(e.id);
    setEditItem({ ...item });
  }

  function saveEdit() {
    const index = data.findIndex((item) => item.id === editItemId);

    if (index !== -1) {
      const newData = [...data];
      newData[index] = { ...newData[index], name: editItem.name };
      setList(newData);
      setEditItemId(null);
    }
  }

  return (
    <div className="container">
      <form>
        <div className="form-group row mt-2">
          <div className="col col-sm-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Value..."
              value={listname}
              onChange={(e) => searchfun(e)}
            />
          </div>
          <div className="offset-6 col col-sm-2 mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="16"
              viewBox="0 0 448 512"
              onClick={deletefun}
            >
              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
            </svg>
          </div>
        </div>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((d) => (
            <tr key={d.id}>
              <td>
                <input
                  type="checkbox"
                  checked={checkedItems[d.id] || false}
                  onChange={() => checkfun(d.id)}
                />
              </td>
              <td>
                {editItemId === d.id ? (
                  <>
                    <input
                      type="text"
                      value={editItem.name}
                      onChange={(e) =>
                        setEditItem({ ...editItem, name: e.target.value })
                      }
                    />
                  </>
                ) : (
                  <>{d.name}</>
                )}
              </td>
              <td>{d.email}</td>
              <td>{d.role}</td>
              <td>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="16"
                  viewBox="0 0 576 512"
                  onClick={() =>
                    editItemId === d.id ? saveEdit() : editfun(d)
                  }
                >
                  <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="16"
                  viewBox="0 0 448 512"
                  className="mx-5"
                  onClick={() => delfun(d.id)}
                >
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a href="#" className="page-link" onClick={prePage}>
              Prev
            </a>
          </li>
          {numbers.map((n, i) => (
            <li
              className={`page-item ${currentPage === n ? "active" : ""}`}
              key={i}
            >
              <a href="#" className="page-link" onClick={() => changeCPage(n)}>
                {n}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a href="#" className="page-link" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default One;
