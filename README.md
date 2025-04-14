# Spotify Clone

A modern Spotify web application clone that enables users to browse through app to view user libraries, top track, saved albums, saved playlists and artists. Built with React and TypeScript, this application provides a seamless browsing experience with features like playlist, album, tracks management and user authentication. Developers can test and preview UI components using Storybook. To access the application, please contact me at ozerkerr@gmail.com to be added to the Spotify Developer permissions.

## Features

- Spotify clone for take home project
- Modern UI built with React and Tailwind CSS
- Type-safe development with TypeScript
- Component documentation with Storybook
- Responsive design

## Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Routing**: React Router
- **Component Documentation**: Storybook

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with your API credentials:
```
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
VITE_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

### Development

To start the development server:
```bash
npm run dev
# or
yarn dev
```

### Building for Production

To create a production build:
```bash
npm run build
# or
yarn build
```

### Storybook

To view component documentation:
```bash
npm run storybook
# or
yarn storybook
```

## Project Structure

```
src/
├── apis/         # API integration code
├── components/   # Reusable UI components
├── context/      # React context providers
├── hooks/        # Custom React hooks
├── pages/        # Page components
├── routes/       # Route configurations
├── types/        # TypeScript type definitions
├── utils/        # Utility functions
└── data/         # Static data
```

