
# E-Commerce Web Application

A modern e-commerce platform built with Next.js and TypeScript, featuring a responsive design and comprehensive shopping experience.

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Redux Toolkit (State Management)
- SCSS Modules (Styling)
- Ant Design (UI Components)
- React-Toastify (Notifications)

### Features
- Responsive design for mobile and desktop
- Product catalog with categories
- Shopping cart functionality
- Wishlist feature
- Product search
- Product reviews and ratings
- Loading states and animations

## Getting Started

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
npm install
```
3. change .env.example to .env, or add this to your .env
```bash
NEXT_PUBLIC_API_URL=https://fakestoreapi.com
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Integration
- Uses FakeStore API for product data
- RESTful API integration
- Server-side rendering for product pages

## Project Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Next.js pages and API routes
├── redux/         # Redux store and slices
├── styles/        # SCSS modules and global styles
└── types/         # TypeScript type definitions
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
MIT
```

This README provides a comprehensive overview of your project's technology stack, features, and setup instructions.
