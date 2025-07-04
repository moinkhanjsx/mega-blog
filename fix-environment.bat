@echo off
echo ======================================================
echo Blog Website - Environment Repair Script
echo ======================================================
echo.
echo This script will help repair your React project environment.
echo It will stop any running processes, clean up node_modules,
echo and reinstall dependencies.
echo.
echo WARNING: Make sure to close VS Code and any other applications
echo that might be using your project files before running this script.
echo.
pause

echo.
echo Step 1: Stopping any running Node.js processes...
taskkill /F /IM node.exe /T 2>nul
echo.

echo Step 2: Cleaning up node_modules folder...
rd /s /q node_modules 2>nul
echo.

echo Step 3: Removing package-lock.json...
del package-lock.json 2>nul
echo.

echo Step 4: Cleaning npm cache...
call npm cache clean --force
echo.

echo Step 5: Updating your package.json...
echo Removing problematic packages and adding compatible versions...

:: Creating a temporary file with updated package.json content
echo {
echo   "name": "blog-website",
echo   "private": true,
echo   "version": "0.0.0",
echo   "type": "module",
echo   "scripts": {
echo     "dev": "vite",
echo     "build": "vite build",
echo     "lint": "eslint .",
echo     "preview": "vite preview --host 0.0.0.0 --port $PORT"
echo   },
echo   "dependencies": {
echo     "@reduxjs/toolkit": "^2.8.2",
echo     "@tinymce/tinymce-react": "^6.1.0",
echo     "appwrite": "^18.1.1",
echo     "html-react-parser": "^5.2.5",
echo     "react": "^19.1.0",
echo     "react-dom": "^19.1.0",
echo     "react-hook-form": "^7.56.4",
echo     "react-redux": "^9.2.0",
echo     "react-router-dom": "^7.6.0",
echo     "uuid": "^11.1.0"
echo   },
echo   "devDependencies": {
echo     "@eslint/js": "^9.25.0",
echo     "@types/react": "^19.1.2",
echo     "@types/react-dom": "^19.1.2",
echo     "@vitejs/plugin-react": "^4.4.1",
echo     "autoprefixer": "^10.4.16",
echo     "eslint": "^9.25.0",
echo     "eslint-plugin-react-hooks": "^5.2.0",
echo     "eslint-plugin-react-refresh": "^0.4.19",
echo     "globals": "^16.0.0",
echo     "postcss": "^8.4.31",
echo     "tailwindcss": "^3.3.3",
echo     "vite": "^5.0.10"
echo   }
echo } > package.json.new

:: Replace the old package.json with the new one
move /y package.json.new package.json
echo.

echo Step 6: Creating compatible configuration files...

:: Create tailwind.config.js
echo /** @type {import('tailwindcss').Config} */
echo export default {
echo   content: [
echo     "./index.html",
echo     "./src/**/*.{js,jsx,ts,tsx}",
echo   ],
echo   darkMode: 'class',
echo   theme: {
echo     extend: {
echo       colors: {
echo         primary: {
echo           50: '#f0f7ff',
echo           100: '#e0effe',
echo           200: '#bae0fd',
echo           300: '#7ac7fc',
echo           400: '#34adf8',
echo           500: '#0c96eb',
echo           600: '#0078c9',
echo           700: '#0060a3',
echo           800: '#005187',
echo           900: '#064570',
echo           950: '#042c4a',
echo         },
echo         accent: {
echo           50: '#fbf1ff',
echo           100: '#f6e1ff',
echo           200: '#eec5ff',
echo           300: '#e499ff',
echo           400: '#d55fff',
echo           500: '#c030f8',
echo           600: '#a618e8',
echo           700: '#8d0ec9',
echo           800: '#7311a5',
echo           900: '#610d87',
echo           950: '#420064',
echo         }
echo       }
echo     }
echo   },
echo   plugins: [
echo     require('@tailwindcss/typography')
echo   ],
echo } > tailwind.config.js

:: Create postcss.config.js
echo export default {
echo   plugins: {
echo     tailwindcss: {},
echo     autoprefixer: {},
echo   },
echo } > postcss.config.js

:: Create vite.config.js
echo import { defineConfig } from 'vite'
echo import react from '@vitejs/plugin-react'
echo.
echo // https://vite.dev/config/
echo export default defineConfig({
echo   plugins: [react()],
echo   preview: {
echo     allowedHosts: ["mega-blog-3ffs.onrender.com"]
echo   }
echo }) > vite.config.js
echo.

echo Step 7: Installing dependencies...
echo This may take a few minutes...
call npm install --legacy-peer-deps
echo.

echo Step 8: Installation complete!
echo.
echo To start your development server, run:
echo npm run dev
echo.
echo If you encounter any issues, try restarting your computer
echo and running this script again.
echo.
pause
