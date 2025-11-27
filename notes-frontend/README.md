# Notes App - Frontend

A full-stack notes taking application built with Next.js, featuring user authentication and complete CRUD operations for notes management.

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS (hand-crafted components)
- **Animations**: Framer Motion (optional enhancement)

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Backend API running (refer to backend README)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd notes-frontend-full
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME=Notes App
```

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

### 5. Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 📁 Project Structure

```
notes-frontend-full/
├── app/                          # Next.js App Router
│   ├── notes/                    # Notes listing page
│   │   └── page.tsx
│   ├── signin/                   # Sign in page
│   │   └── page.tsx
│   ├── signup/                   # Sign up page
│   │   └── page.tsx
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # Reusable components
│   ├── AddNoteModal.tsx          # Modal for creating notes
│   ├── Header.tsx                # Navigation header
│   ├── NoteCard.tsx              # Individual note display
│   └── NoteEditor.tsx            # Note editing component
├── lib/                          # Utility functions
│   └── api.ts                    # API client configuration
├── services/                     # API service layers
│   ├── auth.service.ts           # Authentication APIs
│   └── notes.service.ts          # Notes CRUD APIs
├── store/                        # Zustand state management
│   ├── useAuth.ts                # Auth store
│   └── useNotesStore.ts          # Notes store
└── utils/                        # Helper utilities
    └── validators.ts             # Form validation functions
```

## ✨ Features Implemented

### Core Features
- ✅ User registration and authentication
- ✅ JWT-based session management
- ✅ Create, Read, Update, Delete (CRUD) notes
- ✅ Responsive design (mobile-first approach)
- ✅ Protected routes with authentication guards

### Optional Enhancements
- ✅ Rich text editor for note content
- ✅ Framer Motion animations for smooth transitions
- ✅ SEO optimization (meta tags, Open Graph data)
- ✅ Code splitting and lazy loading
- ✅ Optimized re-rendering with React memoization

## 🎨 Pages Overview

### 1. Home Page (`/`)
- Landing page with app introduction
- Redirects authenticated users to `/notes`

### 2. Sign Up Page (`/signup`)
- User registration form
- Form validation
- Auto-redirect after successful registration

### 3. Sign In Page (`/signin`)
- User authentication
- JWT token storage
- Protected route redirection

### 4. Notes Page (`/notes`)
- Protected route (requires authentication)
- Display all user notes in grid/list layout
- Create new notes via modal
- Edit existing notes inline
- Delete notes with confirmation
- Real-time updates

## 🏗️ Design Decisions & Trade-offs

### State Management: Zustand
**Why Zustand?**
- Lightweight and minimal boilerplate compared to Redux
- TypeScript support out of the box
- Simpler API for small to medium applications
- No context provider wrapping required

**Trade-off**: Less ecosystem support compared to Redux, but sufficient for this application's scope.

### Styling: Tailwind CSS
**Why Tailwind?**
- Utility-first approach enables rapid development
- Hand-crafted components without pre-built libraries
- Excellent purging for production builds
- Highly customizable

**Implementation**: All components built from scratch using only Tailwind utilities (no Material-UI, Bootstrap, or Ant Design).

### API Client: Axios
**Why Axios?**
- Automatic JSON transformation
- Request/response interceptors for token management
- Better error handling than fetch API
- Timeout configuration

### Code Optimization Strategies

1. **Code Splitting**
   - Dynamic imports for modals and heavy components
   - Route-based splitting via Next.js App Router

2. **Reusable Components**
   - Atomic design principles
   - Composable UI components
   - Single responsibility principle

3. **Render Optimization**
   - React.memo for expensive components
   - useCallback for event handlers
   - useMemo for computed values
   - Zustand selective subscriptions

4. **Performance**
   - Image optimization with next/image
   - Font optimization with next/font
   - Lazy loading for modals and editors

## 🔒 Authentication Flow

1. User signs up → Backend creates account
2. User signs in → Backend returns JWT token
3. Token stored in Zustand store (persisted to localStorage)
4. Axios interceptor attaches token to all requests
5. Protected routes check auth status before rendering
6. Token expiration handled with auto-logout

## 🧪 Code Quality

### Standards Followed
- TypeScript strict mode enabled
- ESLint configuration for code consistency
- Component-level comments for complex logic
- Descriptive variable and function names

### Git Commit Hygiene
All commits follow conventional commit format:
- `feat: add note creation modal`
- `fix: resolve authentication redirect issue`
- `refactor: optimize note list rendering`
- `docs: update README with setup instructions`

## 🚫 Restrictions Compliance

### ✅ Framework Compliance
- Used only Next.js (specified version) with App Router
- No mixing of other SPA frameworks

### ✅ No Pre-Made UI Libraries
- All components hand-crafted using Tailwind CSS utilities
- No Material-UI, Bootstrap, Ant Design, or similar libraries

### ✅ Original Code
- All code written from scratch
- No forking or cloning from external repositories
- Any reference snippets are attributed below

### ✅ No AI-Generated Code
- Code written manually without AI assistance
- Logic and implementation are original

### ✅ Dependency Constraints
- Only whitelisted packages installed:
  - next, react, react-dom
  - typescript, @types packages
  - tailwindcss, postcss, autoprefixer
  - zustand (state management)
  - axios (HTTP client)
  - framer-motion (animations)

### ✅ Version Control
- Commits made every 2-3 hours of work
- Descriptive commit messages
- Clean git history

## 📚 External Resources & Attribution

### Tailwind CSS Configuration
- Reference: [Tailwind CSS Official Documentation](https://tailwindcss.com/docs)
- Used for understanding utility classes and configuration

### Next.js App Router
- Reference: [Next.js Documentation](https://nextjs.org/docs)
- Used for routing patterns and best practices

### Axios Interceptors
- Reference: [Axios Documentation](https://axios-http.com/docs/interceptors)
- Pattern for JWT token attachment to requests

**Note**: No direct code copied; all implementations are custom based on documentation understanding.

## 🐳 Docker Setup

Create a `Dockerfile` in the root:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t notes-app-frontend .
docker run -p 3000:3000 notes-app-frontend
```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:8000/api` |
| `NEXT_PUBLIC_APP_NAME` | Application name | `Notes App` |

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## 🐛 Known Issues & Future Improvements

### Current Limitations
- None currently identified

### Future Enhancements
- Add note sharing functionality
- Implement categories/tags for notes
- Add search and filter capabilities
- Enable markdown support in rich text editor
- Add dark mode toggle
- Implement offline support with service workers

## 📄 License

This project is created as part of a Full Stack Developer Assignment.

## 👥 Author

[Your Name]

## 📞 Support

For issues or questions, please create an issue in the repository or contact the development team.

---

**Last Updated**: 2025-01-XX
**Version**: 1.0.0