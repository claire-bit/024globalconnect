import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
   
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white flex flex-col items-center justify-center px-4">
      <header className="text-center">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">🚀 Welcome to My Site</h1>
        <p className="text-lg max-w-xl mx-auto mb-6">
          This is your new digital playground. Built with React + Tailwind. Make it yours.
        </p>
        <a
          href="#get-started"
          className="mt-4 inline-block bg-white text-purple-600 font-bold py-2 px-6 rounded-full shadow-lg hover:bg-purple-100 transition"
        >
          Get Started
        </a>
      </header>

      <section className="mt-20 text-center max-w-2xl">
        <h2 className="text-3xl font-semibold mb-4">🔥 Features</h2>
        <ul className="space-y-2 text-left">
          <li>✨ Super fast with Vite</li>
          <li>🎨 Styled with Tailwind CSS</li>
          <li>⚛️ Powered by React</li>
          <li>📱 Responsive by default</li>
        </ul>
      </section>

      <footer className="mt-20 text-sm opacity-70">
        © {new Date().getFullYear()} Built by You. All vibes reserved.
      </footer>
    </div>
  );
}

export default App;
