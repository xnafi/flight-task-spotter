# ✈️ Flight Search Engine

A modern, responsive flight search application built with **Next.js**, featuring live flight results, advanced filtering, and a real-time price visualization.

Live Demo: https://flight-task-spotter.vercel.app  
GitHub Repo: (add your repo link here)

---

## 🧭 Overview

This project is a frontend-focused flight search engine inspired by tools like Google Flights, but designed with a custom UI and UX approach. The goal was to demonstrate strong frontend engineering fundamentals, state management, and real-time data visualization.

Key highlights include:
- Live flight search results
- Complex, simultaneous filtering
- A real-time price graph that reacts instantly to filters
- Fully responsive design for mobile and desktop

---

## 🚀 Features

### 🔍 Flight Search
- Search by origin, destination, date, cabin, and passengers
- Results fetched dynamically from a flight search API
- Clear loading, error, and empty states

### 📊 Live Price Graph
- Built using **Recharts**
- Displays flight prices derived directly from visible results
- Updates in real time as filters are applied
- Shows:
  - Popular flight prices initially
  - Search-result-based prices after a search

### 🎛️ Advanced Filtering
Multiple filters can be applied simultaneously:
- Stops (Non-stop, 1 stop, 2+ stops)
- Airline
- Departure time window
- Maximum duration
- Maximum price
- Sorting (price, duration, departure time)

Both the **flight list and the price graph** update instantly from the same filtered data source.

### 📱 Responsive Design
- Optimized layouts for mobile and desktop
- Mobile-friendly filter toggle
- Flexible grid-based layout

---

## 🧠 Architecture & State Management

- **Single source of truth** for filtered flight data
- Filter logic lives in a dedicated sidebar component
- The filtered flight state is shared by:
  - Flight result list
  - Live price graph

This ensures:
- No duplicated logic
- No unnecessary API calls
- Smooth and predictable UI updates

---

## 🔗 API & Data Notes

- The app is designed to work with flight search APIs such as **Amadeus Self-Service API (Test Environment)**.
- Due to API limitations in test environments:
  - “Popular Flights” and “Popular Price Graph” use curated demo data.
  - Once a user performs a search, the graph switches automatically to live search data.

This behavior is intentional and documented.

---

## 🔐 Authentication (Scope Decision)

Login and Signup screens are currently **UI-only placeholders**.

Authentication was intentionally deprioritized to focus on:
- Search behavior
- Filtering logic
- Real-time visualization
- Responsive UX

This trade-off allowed deeper focus on the core requirements of the assignment.

---

## 🛠️ Tech Stack

- **Next.js (App Router)**
- **React**
- **TypeScript**
- **Recharts**
- **Tailwind CSS**
- Fetch-based API integration

---

## 📈 Future Improvements

Given more time, the following enhancements could be added:
- Full authentication flow
- Price analytics (min / max / average lines)
- Airline-wise multi-line graphs
- Persistent filters via URL
- Performance optimization for large datasets

---

- Application flow
- Live filters and price graph
- Architectural decisions
- Trade-offs and limitations

---

## 🙌 Thank You

Thank you for reviewing this project. I look forward to discussing the technical and product decisions behind it.
