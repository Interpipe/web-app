# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Environment Variables

This project uses environment variables for configuration. Before running the project:

1. Create a `.env` file in the root directory
2. Add the following environment variables (or customize as needed):

```
# API Configuration
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=30000

# App Configuration
VITE_APP_NAME=Interpipe
VITE_DEFAULT_THEME=light
VITE_MAX_FILE_SIZE=5242880

# File Types
VITE_SUPPORTED_FILE_TYPES=image/jpeg,image/png,image/gif

# Routes
VITE_ROUTE_HOME=/
VITE_ROUTE_LOGIN=/login
VITE_ROUTE_REGISTER=/register
VITE_ROUTE_DASHBOARD=/dashboard
VITE_ROUTE_PROFILE=/profile
VITE_ROUTE_SETTINGS=/settings

# API Endpoints
VITE_API_AUTH_LOGIN=/auth/login
VITE_API_AUTH_REGISTER=/auth/register
VITE_API_AUTH_LOGOUT=/auth/logout
VITE_API_AUTH_REFRESH=/auth/refresh
VITE_API_USER_PROFILE=/user/profile
VITE_API_USER_SETTINGS=/user/settings

# Business Info
VITE_BUSINESS_HOURS_WEEKDAY=Mon-Fri: 0730-1630hrs
VITE_BUSINESS_HOURS_WEEKEND=Saturday: 0800-1400hrs
VITE_EXPERIENCE_YEARS=3+
VITE_CUSTOMERS_COUNT=150+
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
