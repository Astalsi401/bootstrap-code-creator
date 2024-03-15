import { useSelector, useDispatch } from "react-redux";
import { setCol } from "../assets/store";
import "../assets/styles/styling.scss";

export function Styling({ stylingRef }) {
  const dispatch = useDispatch();
  const site = useSelector((state) => state.site);
  const rows = useSelector((state) => state.rows);
  const id = useSelector((state) => state.currentID);
  const i = useSelector((state) => state.currentI);
  const themeColor = useSelector((state) => state.themeColor[site]);
  const fontSize = useSelector((state) => state.fontSize[site]);
  const col = id !== null && rows[rows.findIndex((row) => row.id === id)].cols[i];
  return (
    <div ref={stylingRef} className="styling">
      <h1>樣式</h1>
      {id !== null && (
        <>
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
          <label htmlFor="img-url">
            圖片連結:
            <input name="img-url" id="img-url" type="text" value={col.imgUrl} onChange={({ target: { value } }) => dispatch(setCol({ id, i, imgUrl: value }))} />
          </label>
          <label htmlFor="img-alt">
            圖片說明:
            <input name="img-alt" id="img-alt" type="text" value={col.imgAlt} onChange={({ target: { value } }) => dispatch(setCol({ id, i, imgAlt: value }))} />
          </label>
        </>
      )}
    </div>
  );
}
