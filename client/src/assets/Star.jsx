import { useState } from "react";

function Star() {
  const [active, setActive] = useState(false);

  return (
    <span
      onClick={() => setActive(!active)}
      style={{
        cursor: "pointer",
        fontSize: "24px",
        color: active ? "gold" : "gray",
      }}
    >
      ★
    </span>
  );
}

export default Star;
