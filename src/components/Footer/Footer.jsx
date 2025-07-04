import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="w-full py-6 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700 mt-10 flex flex-col items-center gap-2 transition-colors duration-300">
      <div className="flex gap-4 mb-2">
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.841-2.338 4.687-4.566 4.936.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.577.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.29 20.251c7.547 0 11.675-6.155 11.675-11.49 0-.175 0-.349-.012-.522A8.18 8.18 0 0022 5.92a8.19 8.19 0 01-2.357.637A4.118 4.118 0 0021.448 4.1a8.224 8.224 0 01-2.605.977A4.107 4.107 0 0015.448 3c-2.266 0-4.104 1.822-4.104 4.07 0 .32.036.634.106.934C7.728 7.87 4.1 6.13 1.671 3.149c-.35.59-.553 1.272-.553 2.003 0 1.38.707 2.597 1.785 3.312A4.093 4.093 0 012 7.15v.051c0 1.926 1.384 3.534 3.292 3.897-.338.09-.694.138-1.062.138-.259 0-.508-.025-.752-.07.509 1.574 1.986 2.72 3.733 2.75A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        </a>
      </div>
      <div>
        &copy; {new Date().getFullYear()} MegaBlog. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer