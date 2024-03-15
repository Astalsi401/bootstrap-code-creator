import { useSelector, useDispatch } from "react-redux";
import { Header } from "./components/header.jsx";
import { Preview } from "./components/preview.jsx";
import { useEffect } from "react";
import { setter } from "./assets/store";

export default function App() {
  const dispatch = useDispatch();
  const stylingActive = useSelector((state) => state.stylingActive);

  useEffect(() => {
    const rows = localStorage.getItem("rows") || [];
    const site = localStorage.getItem("site") || "ibmi";
    const ver = localStorage.getItem("ver") || "3.3.7";
    dispatch(setter({ site, ver, rows: JSON.parse(rows).map((row) => ({ id: parseInt(row.id), cols: row.cols.map((col) => ({ ...col, size: parseInt(col.size) })) })) }));
  }, []);
  return (
    <div style={{ "--styling-width": stylingActive ? "350px" : "50px" }}>
      <Header />
      <Preview />
    </div>
  );
}
