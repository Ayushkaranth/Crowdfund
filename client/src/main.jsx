// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter as Router} from "react-router-dom";
// import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

// import { StateContextProvider } from "./context";
// import App from "./App";
// import "./index.css"; 

// const route = ReactDOM.createRoot(
//   document.getElementById("root")
// );

// route.render(
//     <ThirdwebProvider desiredChainId={6342}>
//     <Router>
//     <StateContextProvider>
//         <App />
//     </StateContextProvider>
//     </Router>
//     </ThirdwebProvider>
// )


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";

import { StateContextProvider } from "./context";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
 <ThirdwebProvider
  clientId="90e86a6edad9640aa041eacbf1fddba0"
  activeChain={{
    chainId: 6342,
    rpc: ["https://carrot.megaeth.com/rpc"],
    nativeCurrency: {
      decimals: 18,
      name: "tMEGA",
      symbol: "tMEGA",
    },
    shortName: "mega",
    slug: "mega-testnet",
    testnet: true,
    chain: "Mega Testnet",
    name: "Mega Testnet",
  }}
>
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
);
