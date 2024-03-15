import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setter } from "../assets/store";
import "../assets/styles/header.scss";
import { useEffect } from "react";

export function Header() {
  const site = useSelector((state) => state.site);
  const handleCopy = async () => {
    const innerHtml = [...document.querySelectorAll(".edit-block")].map((editBlock) => {
      const html = editBlock.cloneNode(true);
      html.querySelectorAll(".add-block").forEach((element) => element.remove());
      html.querySelectorAll("[contenteditable=true]").forEach((element) => element.removeAttribute("contenteditable"));
      html.querySelectorAll(".editing").forEach((element) => element.classList.remove("editing"));
      return html.innerHTML;
    });
    navigator.clipboard.writeText(`<style>${await getCss()}</style><div class="custom">${innerHtml.join("")}</div>`);
  };
  const getCss = async () => await fetch(`${import.meta.env.BASE_URL}/styles/${site}/main.min.css`).then((res) => res.text());
  useEffect(() => {}, [site]);
  return (
    <header>
      <SelectVersion />
      <button className="copy" onClick={handleCopy}>
        copy html
      </button>
    </header>
  );
}

function SelectVersion() {
  const dispatch = useDispatch();
  const site = useSelector((state) => state.site);
  const ver = useSelector((state) => state.ver);
  const pathname = useLocation().pathname.split("/");
  const customBsVer = {
    ibmi: "3.3.7",
    show: "3.3.6",
  };
  return (
    <div>
      {pathname.length === 3 && pathname[2] === "custom" ? (
        <label htmlFor="site-version">
          Site:{" "}
          <select name="site-version" id="site-version" value={site} onChange={({ target: { value } }) => dispatch(setter({ site: value, ver: customBsVer[value] }))}>
            {Object.keys(customBsVer).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </label>
      ) : (
        <label htmlFor="bootstrap-version">
          Bootstrap:{" "}
          <select name="bootstrap-version" id="bootstrap-version" value={ver} onChange={({ target: { value } }) => dispatch(setter({ ver: value }))}>
            <option value="3.3.7">3.3.7</option>
          </select>
        </label>
      )}
    </div>
  );
}
