import { createContext, useState } from "react";

export let ConterContext = createContext();
export function ConterContextProvider({ Children }) {
  const [counter, setcounter] = useState(0);
  const [userName, setuserName] = useState("");

  function increaseCounter() {
    setcounter(counter + 1);
  }
  function decreaseCounter() {
    setcounter(counter - 1);
  }

  return (
    <ConterContext.Provider
      value={{ userName, counter, increaseCounter, decreaseCounter }}
    >
      {Children}
    </ConterContext.Provider>
  );
}
