import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AddBlock } from "./addBlock";
import { EditBlock } from "./editBlock";
import { Row, Col } from "./bootstrapElems";
import { setter } from "../assets/store";
import { Styling } from "./styling";

export function Preview() {
  const dispatch = useDispatch();
  const site = useSelector((state) => state.site);
  const rows = useSelector((state) => state.rows);
  const container = useRef(null);
  const stylingRef = useRef(null);
  const handleResize = () => {
    dispatch(setter({ step: container.current.clientWidth / 12 }));
  };
  useEffect(() => {
    handleResize();
  }, []);
  return (
    <>
      <Styling stylingRef={stylingRef} />
      <div className="preview" style={{ width: "calc(100% - var(--styling-width))" }}>
        <div ref={container} className="container-fluid" style={{ marginInline: "auto", maxWidth: 1000, position: "relative", paddingTop: 30 }}>
          <BootstrapScripts />
          {site && <link rel="stylesheet" href={`${import.meta.env.BASE_URL}/styles/${site}/main.min.css`} />}
          {rows.length === 0 && <AddBlock type={"type-row"} id={0} />}
          {rows.map((row) => (
            <EditBlock key={row.id} id={row.id}>
              <Row>
                {row.cols.map((col, i) => (
                  <Col key={`${row.id}-col-${i}`} screen={col.screen} size={`-${col.size}`} i={i} row={row} col={col} stylingRef={stylingRef} />
                ))}
              </Row>
            </EditBlock>
          ))}
        </div>
      </div>
    </>
  );
}

function BootstrapScripts() {
  const ver = useSelector((state) => state.ver);
  switch (ver) {
    case "3.3.7":
      return (
        <>
          <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        </>
      );
    case "3.3.6":
      return (
        <>
          <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
        </>
      );
    case "5":
      return (
        <>
          <link rel="stylesheet" href="https://www.taiwan-healthcare.org/plugins/bootstrap-5.0.2/css/bootstrap.min.css" />
          <script src="https://www.taiwan-healthcare.org/plugins/popperjs-2.9.2/popper.min.js"></script>
          <script src="https://www.taiwan-healthcare.org/plugins/bootstrap-5.0.2/js/bootstrap.bundle.min.js"></script>
        </>
      );
    default:
      return <></>;
  }
}