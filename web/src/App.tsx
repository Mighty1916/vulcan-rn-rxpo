import './App.css'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { DashboardPage } from './pages/DashboardPage'
import { CommunitiesPage } from './pages/CommunitiesPage'
import { VideoRoomsPage } from './pages/VideoRoomsPage'
import { ProfilePage } from './pages/ProfilePage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-slate-800">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <NavLink to="/" className="flex items-center gap-2">
              <span className="inline-block h-8 w-8 rounded-lg bg-blue-600 text-white font-bold grid place-items-center">SB</span>
              <span className="font-semibold text-lg">StudyBuddy Hub</span>
            </NavLink>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <NavLink to="/dashboard" className={({isActive}) => `hover:text-blue-600 ${isActive ? 'text-blue-600' : ''}`}>Dashboard</NavLink>
              <NavLink to="/communities" className={({isActive}) => `hover:text-blue-600 ${isActive ? 'text-blue-600' : ''}`}>Communities</NavLink>
              <NavLink to="/video-rooms" className={({isActive}) => `hover:text-blue-600 ${isActive ? 'text-blue-600' : ''}`}>Video Rooms</NavLink>
              <NavLink to="/profile" className={({isActive}) => `hover:text-blue-600 ${isActive ? 'text-blue-600' : ''}`}>Profile</NavLink>
            </nav>
            <div className="flex items-center gap-3">
              <button className="hidden md:inline-flex px-3 py-2 rounded-md bg-blue-600 text-white text-sm font-medium">Get Started</button>
              <button className="md:hidden p-2 rounded-md border">☰</button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/communities" element={<CommunitiesPage />} />
            <Route path="/video-rooms" element={<VideoRoomsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>

        <footer className="border-t">
          <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-slate-500 flex flex-col md:flex-row items-center justify-between gap-2">
            <span>© {new Date().getFullYear()} StudyBuddy Hub</span>
            <span>Built for focused study collaboration</span>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
