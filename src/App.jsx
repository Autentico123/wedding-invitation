import React from "react";
import { Toaster } from "react-hot-toast";
import WeddingInvitation from "./components/WeddingInvitation";

const App = () => {
  return (
    <div className="App">
      <WeddingInvitation />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#800020",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default App;
