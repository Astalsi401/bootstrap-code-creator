import { AddBlock } from "./addBlock";

export function EditBlock({ id, children }) {
  return (
    <div className="edit-block">
      {children}
      <AddBlock type={"type-row"} id={id} />
    </div>
  );
}
