## Description of the Project

This is a monorepo application called WORSHIP-Confluence built with modern web technologies. It includes a full-stack application with a Next.js frontend and supporting backend infrastructure. The project manages content related to worship programs, songs, and video content for a unified platform.

**Key Features:**
- Next.js-based web application with TypeScript
- API integration capabilities
- Song and program catalogue management
- Video streaming integration with YouTube
- Registration system
- Responsive UI components with Tailwind CSS

## Project Structure

```
.
├── apps/
│   ├── api/              # Backend API application
│   └── app/              # Next.js frontend application
│       ├── app/          # Next.js app directory
│       │   ├── api/      # API routes
│       │   ├── data/     # Data files
│       │   ├── lib/      # Utility functions
│       │   ├── types/    # TypeScript type definitions
│       │   └── ui/       # UI components
│       ├── components/   # Reusable React components
│       ├── data/         # Application data
│       └── src/          # Source utilities and services
├── packages/             # Shared packages
├── turbo.json            # Turbo monorepo configuration
└── package.json          # Root package configuration
```

### Key Directories

- **apps/app** - Main Next.js application
- **apps/app/app** - Next.js app directory with pages and API routes
- **apps/app/components** - Reusable React components
- **apps/app/data** - Data files for programmes and content
- **apps/app/src/services** - Business logic and external service integrations
- **apps/api** - Backend API server

## How to Set Up and Run

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd WORSHIP-Confluence
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables (if needed):
   Create a `.env.local` file in the `apps/app` directory with necessary environment variables.

### Running the Development Server

1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

1. Build the project:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Start the production server:
   ```bash
   npm start
   # or
   yarn start
   ```

### Using Turbo

This is a Turbo monorepo. To run tasks across all packages:

```bash
turbo run dev       # Run dev task in all packages
turbo run build     # Build all packages
turbo run lint      # Lint all packages
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run linting checks (if configured)
