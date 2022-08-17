import React, { useState } from "react";
export default function Hello() {
  const [showError, setShowError] = useState(false);
  const [showMessage, setMessage] = useState();

  const inputChangeHandler = (e) => {
    setShowError(false);
    setMessage("");
    const val = e.target.value;
    if (val) {
      if (parseInt(val) < 500) {
        setShowError(true);
        return;
      } else {
        const requiredMatic = parseInt(val) * 0.1;
        setMessage(`Amount of matic required is ${requiredMatic}`);
      }
    }
  };

  return (
    <>
      1 dapp token = 0.1 matic
      <p>{showError && "Minimum dapp is 500"}</p>
      <p>{showMessage && !showError ? showMessage : ""}</p>
      <div className="row">
        <label>Enter no of dapp token </label>
        <input onChange={inputChangeHandler} type="number" />
      </div>
    </>
  );
}
