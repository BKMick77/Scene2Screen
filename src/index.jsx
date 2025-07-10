import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";

import "./index.scss";

const MyFlixApplication = () => {
  return <MainView />;
};

// const MyFlixApplication = () => {
//   return <div>Hello World</div>;
// };

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApplication />);
