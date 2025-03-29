import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Login = React.lazy(() => import("./pages/Login"));
const Userslist = React.lazy(() => import("./pages/Userlist"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<Userslist />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
