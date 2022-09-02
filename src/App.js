import React, { useState } from "react";
import "./App.css";
import { Home, About, Contact } from "./pages";

const tabs = [
  { id: "home", title: "Home" },
  { id: "contact", title: "Contact Us" },
  { id: "about", title: "About Us" },
];

function App() {
  const [currentActiveTab, setCurrentActiveTab] = useState("home");
  console.log("RENDEE");
  return (
    <div className="App ">
      <nav className="flex flex-wrap px-8 py-4 justify-around items-center bg-[#282c34] text-xl font-bold text-teal-50">
        {tabs.map(({ id, title }) => (
          <h5
            key={id}
            onClick={() => setCurrentActiveTab(id)}
            className={`${
              currentActiveTab === id ? "text-blue-500" : ""
            } cursor-pointer`}
          >
            {title}
          </h5>
        ))}
      </nav>
      <main className="App-header">
        {currentActiveTab === "about" ? (
          <About />
        ) : currentActiveTab === "contact" ? (
          <Contact />
        ) : (
          <Home />
        )}
      </main>
    </div>
  );
}

export default App;
