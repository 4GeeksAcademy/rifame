# Rifame - AI Coding Agent Instructions

A **React + Flask full-stack web application** for managing raffles (rifas). Backend API handles user management and business logic; frontend provides interactive UI with global state management.

## Architecture Overview

**Tech Stack:**
- **Backend:** Flask 3.x, SQLAlchemy ORM, Flask-Migrate (Alembic), Flask-Admin
- **Frontend:** React 18.2, Vite 4.4, React Router v6, Bootstrap 5
- **Database:** PostgreSQL (default), SQLite (development), MySQL compatible
- **Deployment:** Render.com

**Key Structure:**
```
src/
├── app.py              # Flask app initialization, middleware setup
├── api/
│   ├── models.py       # SQLAlchemy models (use mapped_column pattern)
│   ├── routes.py       # API endpoints (Blueprint, CORS-enabled)
│   ├── admin.py        # Flask-Admin setup for database management
│   ├── commands.py     # CLI commands (pipenv run insert-test-users 5)
│   └── utils.py        # APIException, sitemap generation
├── front/
│   ├── main.jsx        # Entry point, StoreProvider + RouterProvider
│   ├── store.js        # Redux-like reducer pattern (storeReducer)
│   ├── routes.jsx      # React Router config (Layout as root)
│   └── components/     # Reusable UI components (Navbar, Footer)
└── wsgi.py            # Production WSGI entry point
```

## Critical Developer Workflows

### Backend Setup & Database
1. **Initial Setup:**
   ```bash
   pipenv install                  # Install Python dependencies
   pipenv run migrate             # Create migration (after model changes)
   pipenv run upgrade             # Run all pending migrations
   pipenv run insert-test-users 5 # Populate test data
   pipenv run start               # Run Flask dev server (port 3001)
   ```

2. **Database Management:**
   - Models in [src/api/models.py](src/api/models.py) - use `Mapped` type hints
   - `.serialize()` method required on models for JSON responses
   - Migrations auto-generated: `pipenv run migrate` after model edits
   - Undo migrations: `pipenv run downgrade`
   - Test data insertion: Edit [src/api/commands.py](src/api/commands.py) `insert_test_data()` function

3. **Environment Variables:**
   - Copy `.env.example` to `.env` before running
   - `DATABASE_URL`: Connection string (postgres:// for prod → postgresql://)
   - `FLASK_DEBUG=1`: Enable debug mode
   - `VITE_BACKEND_URL`: Frontend needs this to call API (check [src/front/components/BackendURL.jsx](src/front/components/BackendURL.jsx))

### Frontend Setup & Development
1. **Local Dev:**
   ```bash
   npm install           # Install Node dependencies (requires Node 20+)
   npm run start         # Vite dev server on http://localhost:3000
   npm run build         # Build for production (outputs to dist/)
   npm run lint          # ESLint with zero-warnings policy
   ```

2. **Build Configuration:** [vite.config.js](vite.config.js) - output dir is `dist/`, dev port is 3000

## Codebase Patterns & Conventions

### Backend API Routes
- **File:** [src/api/routes.py](src/api/routes.py)
- **Pattern:** Blueprint-based with CORS enabled, all endpoints prefixed `/api`
- **Response Format:** Use `jsonify()` for all responses; error handling via `APIException`
- **Models:** Must include `.serialize()` method; never serialize passwords
- **Example:**
  ```python
  @api.route('/hello', methods=['POST', 'GET'])
  def handle_hello():
      return jsonify({"message": "Success"}), 200
  ```

### Frontend State Management
- **File:** [src/front/store.js](src/front/store.js) + [src/front/hooks/useGlobalReducer.jsx](src/front/hooks/useGlobalReducer.jsx)
- **Pattern:** Redux-style reducer with action `type` and `payload`
- **Usage:** Import `useGlobalReducer()` hook, dispatch actions via `dispatch({type: 'action_name', payload: data})`
- **Initial State:** Defined in `initialStore()` function
- **Example:**
  ```javascript
  const { store, dispatch } = useGlobalReducer();
  dispatch({ type: 'set_hello', payload: 'Hello World' });
  ```

### Frontend Components & Routing
- **Routing File:** [src/front/routes.jsx](src/front/routes.jsx)
- **Pattern:** Nested routes with `<Layout />` as root container; pages replace `<Outlet />`
- **Layout:** [src/front/pages/Layout.jsx](src/front/pages/Layout.jsx) holds Navbar, Footer, Outlet
- **Dynamic Routes:** Supported (e.g., `/single/:theId`)
- **Components:** Located in [src/front/components/](src/front/components/) - reuse Navbar, Footer, ScrollToTop

### Environment Variable Access
- **Backend:** `import os; os.getenv('VARIABLE_NAME')`
- **Frontend:** `import.meta.env.VARIABLE_NAME` (only VITE_-prefixed variables loaded)

### CSS & Styling
- **Global Styles:** [src/front/index.css](src/front/index.css)
- **Bootstrap 5:** Available (components use `navbar`, `dropdown`, `container` classes)
- **Component-level:** Inline styles or import CSS in component files

## Integration Points & External Dependencies

### API-to-Frontend Communication
- Frontend accesses `import.meta.env.VITE_BACKEND_URL` to construct API calls
- CORS enabled in [src/api/routes.py](src/api/routes.py) - all origins allowed by default
- Validation: [src/front/components/BackendURL.jsx](src/front/components/BackendURL.jsx) prompts if `VITE_BACKEND_URL` missing

### Database Connection
- Uses SQLAlchemy ORM; Alembic manages schema migrations
- Connection pooling configured in Flask config
- `compare_type=True` in Migrate for type-sensitive migrations

### Flask Admin Dashboard
- Setup in [src/api/admin.py](src/api/admin.py)
- Auto-generates CRUD UI for models; accessible at `/admin` (if configured)

## Common Task Examples

**Adding a New API Endpoint:**
1. Define data model in [src/api/models.py](src/api/models.py) with `.serialize()` method
2. Add migration: `pipenv run migrate -m "description"`
3. Run migration: `pipenv run upgrade`
4. Add route in [src/api/routes.py](src/api/routes.py) under `@api.route('/endpoint', methods=['GET', 'POST'])`
5. Test via VITE_BACKEND_URL from React component

**Adding a New Page:**
1. Create component in [src/front/pages/](src/front/pages/) (e.g., `MyPage.jsx`)
2. Import in [src/front/routes.jsx](src/front/routes.jsx)
3. Add route: `<Route path="/my-page" element={<MyPage />} />`
4. Link via `<Link to="/my-page">Link</Link>`

**Database Testing:**
1. Edit `insert_test_data()` in [src/api/commands.py](src/api/commands.py)
2. Run: `pipenv run insert-test-data`
3. Verify via Flask Admin or API test endpoints

## Key Files to Review First
- [src/app.py](src/app.py) - Flask app config and middleware
- [src/api/models.py](src/api/models.py) - Data model examples
- [src/api/routes.py](src/api/routes.py) - API endpoint patterns
- [src/front/main.jsx](src/front/main.jsx) - Frontend entry point and setup
- [src/front/store.js](src/front/store.js) - State management pattern
