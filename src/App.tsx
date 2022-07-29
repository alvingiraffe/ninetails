import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QuestionComponent } from './app/components/Question';

interface AppProps {}

export class App extends React.Component<AppProps> {
  static displayName = "App";

  render() {
    return <InternalApp />;
  }
}

interface InternalAppProps {}
export const InternalApp: React.FC<InternalAppProps> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/questions/:questionId" element={<QuestionComponent />} />
        {/* <Route index element={<Hub />} /> */}
        {/* <Route path="*" element={<Hub />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
