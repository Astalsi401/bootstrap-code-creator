import { useDispatch, useSelector } from "react-redux";
import { setter, defaultCol } from "../assets/store";
import "../assets/styles/wigets.scss";

export function AddBlock({ type, id, i }) {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.rows);
  const index = rows.findIndex((row) => row.id === id);
  const handleAdd = () => {
    if (id !== undefined) {
      switch (type) {
        case "type-row":
          if (rows.length === 0) {
            dispatch(setter({ rows: [{ id: 0, cols: [defaultCol] }] }));
          } else {
            dispatch(setter({ rows: [...rows.slice(0, index + 1), { id: Math.max(...rows.map((row) => row.id)) + 1, cols: [defaultCol] }, ...rows.slice(index + 1)] }));
          }
          break;
        case "type-col":
          dispatch(setter({ rows: [...rows.slice(0, index), { ...rows[index], cols: [...rows[index].cols.slice(0, i + 1), defaultCol, ...rows[index].cols.slice(i + 1)] }, ...rows.slice(index + 1)] }));
          break;
        default:
          break;
      }
    }
  };
  const handleDelete = () => {
    if (id !== undefined) {
      switch (type) {
        case "type-row":
          dispatch(setter({ rows: [...rows.slice(0, index), ...rows.slice(index + 1)], currentID: null, currntI: null }));
          break;
        case "type-col":
          if (rows[index].cols.length - 1 === 0) {
            dispatch(setter({ rows: [...rows.slice(0, index), ...rows.slice(index + 1)], currentID: null, currntI: null }));
          } else {
            dispatch(setter({ rows: [...rows.slice(0, index), { ...rows[index], cols: [...rows[index].cols.slice(0, i), ...rows[index].cols.slice(i + 1)] }, ...rows.slice(index + 1)], currentID: null, currntI: null }));
          }
          break;
        default:
          break;
      }
    }
  };
  return (
    <div className={`add-block ${type} ${rows.length === 0 ? "show" : ""}`}>
      <span className="add" onClick={handleAdd}>
        +
      </span>
      <span className="delete" onClick={handleDelete}>
        -
      </span>
    </div>
  );
}
