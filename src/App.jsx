import { useSelector, useDispatch } from "react-redux";
import { Header } from "./components/header.jsx";
import { Preview } from "./components/preview.jsx";
import { useEffect } from "react";
import { setter } from "./assets/store";

export default function App() {
  const dispatch = useDispatch();
  const stylingActive = useSelector((state) => state.stylingActive);

  useEffect(() => {
    const rows = localStorage.getItem("rows");
    console.log(rows);
    if (rows) dispatch(setter({ rows: JSON.parse(rows).map((row) => ({ id: parseInt(row.id), cols: row.cols.map((col) => ({ ...col, size: parseInt(col.size) })) })) }));
  }, []);
  return (
    <div style={{ "--styling-width": stylingActive ? "350px" : "50px" }}>
      <Header />
      <Preview />
    </div>
  );
}
