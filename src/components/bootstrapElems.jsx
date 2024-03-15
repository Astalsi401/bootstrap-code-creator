import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddBlock } from "./addBlock";
import { setCol, setter } from "../assets/store";
import ContentEditable from "react-contenteditable";

export function Row({ children }) {
  return <div className="row my-3">{children}</div>;
}
export function Col({ screen, size, row, col, i, stylingRef }) {
  const dispatch = useDispatch();
  const contentEditable = useRef(null);
  const colRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const handleChange = ({ target: { value } }) => {
    dispatch(setCol({ id: row.id, i, content: value }));
  };
  const handleClick = ({ target }) => {
    if (colRef.current && colRef.current.contains(target)) {
      dispatch(setter({ currentI: i, currentID: row.id }));
      setEditing(true);
    } else if (stylingRef.current && stylingRef.current.contains(target)) {
    } else {
      setEditing(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  return (
    <div ref={colRef} className={`col${screen}${size} my-2 text-${col.fontSize} text-${col.fontColor} ${editing ? "editing" : ""}`}>
      {col.imgUrl.length > 0 ? (
        <div className="w-100">
          <img className="w-100" src={col.imgUrl} alt={col.imgAlt} />
          <div className="text-gray">{col.imgAlt}</div>
        </div>
      ) : (
        <ContentEditable innerRef={contentEditable} html={`${col.content}`} disabled={false} onChange={handleChange} />
      )}
      <AddBlock type={"type-col"} id={row.id} i={i} />
    </div>
  );
}
