import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

// PAGES
import HomePage from "./pages/HomePage"
import CreatePostPage from "./pages/CreatePost/CreatePostPage"
import ResumePage from "./pages/Resume/ResumePage"
import NotesPage from "./pages/Notes/NotesPage"
import DisplayNote from "./pages/DisplayNote/DisplayNote"
import DisplayProjectPage from "./pages/DisplayProject/DisplayProjectPage"
import SignInPage from "./pages/SignIn/SignInPage"

function App() {

  return (
    <>
      <Router>
        <div className="app">
          <Routes>
            <Route path = '/' element={<HomePage />} />
            {/* <Route path = '/create' element={<CreatePostPage />} /> */}
            <Route path = '/create' element={<CreatePostPage />} />
            <Route path = '/resume' element={<ResumePage />} />
            <Route path = '/notes' element={<NotesPage />} />
            <Route path = '/notes/:id' element={<DisplayNote />} />
            <Route path = '/projects/:id' element={<DisplayProjectPage />} />
            {/* <Route path = '/signin' element={<SignInPage />} /> */}
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
