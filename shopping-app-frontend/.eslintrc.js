// shopping-app-frontend/.eslintrc.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended', // Enables TypeScript-specific linting rules
    'prettier', // Ensure 'prettier' is last
  ],
  plugins: ['react', 'jsx-a11y', 'import'],
  rules: {
    // Customize your rules
    'react/react-in-jsx-scope': 'off',
    // Add other rules as needed
  },
};
