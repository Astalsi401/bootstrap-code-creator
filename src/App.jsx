import { useSelector } from "react-redux";
import { Header } from "./components/header.jsx";
import { Preview } from "./components/preview.jsx";

export default function App() {
  const stylingActive = useSelector((state) => state.stylingActive);
  return (
    <div style={{ "--styling-width": stylingActive ? "350px" : "50px" }}>
      <Header />
      <Preview />
    </div>
  );
}
