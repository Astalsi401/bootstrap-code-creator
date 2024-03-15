import { useSelector, useDispatch } from "react-redux";
import { setCol, setter } from "../assets/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/styles/styling.scss";

library.add(fas, far);

export function Styling({ stylingRef }) {
  const dispatch = useDispatch();
  const site = useSelector((state) => state.site);
  const rows = useSelector((state) => state.rows);
  const id = useSelector((state) => state.currentID);
  const i = useSelector((state) => state.currentI);
  const themeColor = useSelector((state) => state.themeColor[site]);
  const fontSize = useSelector((state) => state.fontSize[site]);
  const stylingActive = useSelector((state) => state.stylingActive);
  const col = id !== null && rows[rows.findIndex((row) => row.id === id)].cols[i];
  const handleActive = () => dispatch(setter({ stylingActive: !stylingActive }));
  return (
    <div ref={stylingRef} className={`styling ${stylingActive ? "active" : ""}`}>
      <div className="toggle" onClick={handleActive}>
        {stylingActive ? <FontAwesomeIcon icon="fa-solid fa-xmark" /> : <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />}
      </div>
      {id !== null && stylingActive && (
        <>
          <h1>Styles</h1>
          <label htmlFor="screen-size">
            何時切換區塊尺寸:
            <select name="screen-size" id="screen-size" value={col.screen} onChange={({ target: { value } }) => dispatch(setCol({ id, i, screen: value }))}>
              <option value="-xs">無</option>
              <option value="-sm">小</option>
              <option value="-md">中</option>
            </select>
          </label>
          <label htmlFor="size">
            區塊尺寸:
            <input name="size" id="size" type="range" min={1} max={12} step={1} value={col.size} onChange={({ target: { value } }) => dispatch(setCol({ id, i, size: value }))} />
          </label>
          <label htmlFor="font-size">
            字體大小:
            <select name="font-size" id="font-size" value={col.fontSize} onChange={({ target: { value } }) => dispatch(setCol({ id, i, fontSize: value }))}>
              <option value="12pt">12pt</option>
              {Object.keys(fontSize).map((key) => (
                <option key={key} value={key}>
                  {fontSize[key]}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="font-color">
            字體顏色:
            <select name="font-color" id="font-color" value={col.fontColor} onChange={({ target: { value } }) => dispatch(setCol({ id, i, fontColor: value }))} style={{ color: themeColor[col.fontColor] }}>
              {Object.keys(themeColor).map((key) => (
                <option key={key} value={key} style={{ color: themeColor[key] }}>
                  {themeColor[key]}
                </option>
              ))}
            </select>
          </label>
          {[
            { id: "img-url", key: "imgUrl", name: "圖片連結" },
            { id: "img-alt", key: "imgAlt", name: "圖片說明" },
          ].map((obj) => (
            <label key={obj.id} htmlFor={obj.id}>
              {obj.name}:
              <input name={obj.id} id={obj.id} type="text" value={col[obj.key]} onChange={({ target: { value } }) => dispatch(setCol({ id, i, [obj.key]: value }))} />
            </label>
          ))}
        </>
      )}
    </div>
  );
}
