import "./App.css";
import Data from "./components/Data";
import PostById from "@/components/PostById";
import CreatePost from "@/components/CreatePost";
import Error from "@/components/Error.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SharedLayout} from "@/components/SharedLayout";
import Navbar from "@/components/Navbar";

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<SharedLayout/>}>
                    <Route index element={<Data/>}></Route>
                    <Route path="create" element={<CreatePost/>}/>

                    <Route path="post" element={<PostById/>}/>
                    <Route path="*" element={<Error/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
