import { useState } from "react";

function MessageBox() {
  const [msg, setMsg] = useState("");

  return (
    <div>
      <button onClick={() => setMsg("Login successful!")}>
        Click Me
      </button>


      <p>{msg}</p>
    </div>
  );
}

export default MessageBox;
