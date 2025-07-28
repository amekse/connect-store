# CLO-SET CONNECT Store Page Clone

This project is a **Front-end Developer Assessment** for the position at CLO Virtual Fashion. It replicates and enhances the **CLO-SET CONNECT Store Page**, implementing key features such as content filtering, infinite scrolling, search, and responsive layout—all built with modern tools like **React**, **Zustand**, **TanStack Query**, and **MUI**.

## Live Demo / Repo

**GitHub Repository**: [https://github.com/amekse/connect-store](https://github.com/amekse/connect-store)

---

## Tech Stack

- **React** (w/ TypeScript)
- **Zustand** – Lightweight state management
- **TanStack Query (React Query)** – Data fetching, caching, and persistence
- **Material UI (MUI)** – Component library for consistent and responsive UI
- **React Router DOM** – For route and URL state handling
- **Jest + React Testing Library** – Unit testing

---

## Project Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/amekse/connect-store.git
   cd connect-store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run start
   ```

4. Open in browser:
   ```
   http://localhost:3000
   ```

---

## Completed Features

### Mandatory Requirements

- **Pricing Filter**:
  - Supports **Paid**, **Free**, and **View Only** options
  - Multiple selections allowed
  - Default state: all unchecked (show all)

- **Reset Functionality**:
  - Clears both pricing filters and search term

- **Persistence Across Reloads**:
  - Implemented using **URL parameters** instead of browser storage

- **Responsive Content List**:
  - Displays photo, title, user name, and pricing (or price if Paid)
  - Responsive grid system:
    - 4 columns (default)
    - 3 columns (< 1200px)
    - 2 columns (< 768px)
    - 1 column (< 480px)

- **Infinite Scroll**:
  - Loads additional items automatically as the user scrolls

- **Keyword Search**:
  - Filters by user name or item title
  - Combinable with pricing filters
  - Persists in URL

---

### Optional Enhancements

- **TypeScript** across the entire project
- **Unit tests** for core state logic (Action Bar)
- **Sorting** options:
  - Item Name (default)
  - Higher Price
  - Lower Price
- **Price Slider**:
  - Active only when **Paid** is selected exclusively
  - Range: 0 – 999
  - Dynamic filtering
- **Skeleton UI** for initial loading and infinite scroll

---

## Testing

Unit tests are included for core state logic (Action Bar):

```bash
npm test
```

---

## Folder Structure (simplified)

```
src/
│
├── components/         # Reusable UI components
├── hooks/              # Custom React hooks
├── pages/              # Main route views
├── services/           # API logic
├── store/              # Zustand store
├── utils/              # Helpers and constants
├── App.tsx
├── index.tsx
```

---

## Notes

- **No browser storage** (localStorage/sessionStorage) is used for state persistence.
- API data is fetched from:  
  `https://closet-recruiting-api.azurewebsites.net/api/data`
- All UI interactions are based on the provided assessment design and behavior.

---

## Contact

For queries or suggestions, feel free to reach out on call: +91-8420463112 or email: dassaswata1996@gmail.com