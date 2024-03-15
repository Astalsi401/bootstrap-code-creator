import { useRef } from "react";
import { useSelector } from "react-redux";
import { AddBlock } from "./addBlock";
import { EditBlock } from "./editBlock";
import { Row, Col } from "./bootstrapElems";
import { Styling } from "./styling";

export function Preview() {
  const site = useSelector((state) => state.site);
  const rows = useSelector((state) => state.rows);
  const container = useRef(null);
  const stylingRef = useRef(null);
  return (
    <>
      <Styling stylingRef={stylingRef} />
      <div className="preview" style={{ width: "calc(100% - var(--styling-width))", paddingInline: 10, paddingTop: 30 }}>
        <div className="main main-center row" style={{ marginInline: "auto", position: "relative" }}>
          <div ref={container} style={{ width: "100%" }}>
            <BootstrapScripts />
            {site && <link rel="stylesheet" href={`${import.meta.env.BASE_URL}styles/${site}/main.min.css`} />}
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
      </div>
    </>
  );
}

function BootstrapScripts() {
  const site = useSelector((state) => state.site);
  const ver = useSelector((state) => state.ver);
  switch (ver) {
    case "3.3.7":
      return (
        <>
          {site === "ibmi" ? <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script> : <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>}
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
