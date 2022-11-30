import React from "react";
import { redirect } from "react-router-dom";

function TestRouter() {
  const loader = async (estado: boolean) => {
    const user = true;
    if (user) {
      console.log(user);
      return redirect("/home");
    } else {
      console.log(user);
      return redirect("/login");
    }
  };
  return (
    <>
      <div>
        <h1>This is the about page</h1>
        <button onClick={() => loader(true)}> aqui</button>
      </div>
    </>
  );
}

export default TestRouter;
