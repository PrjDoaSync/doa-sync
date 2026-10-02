import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand
        brand: {
          primary: "#2563EB",
          "primary-hover": "#1D4ED8",
          "primary-active": "#1E40AF",
          "primary-disabled": "#93C5FD",
          secondary: "#F1F5F9",
        },
        // Background & Surface
        page: "#F8FAFC",
        surface: "#FFFFFF",
        // Feedback
        feedback: {
          "success-bg": "#DCFCE7",
          "success-text": "#166534",
          "warning-bg": "#FEF9C3",
          "warning-text": "#854D0E",
          "error-bg": "#FEE2E2",
          "error-text": "#991B1B",
          "info-bg": "#DBEAFE",
          "info-text": "#1E40AF",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      maxWidth: {
        container: "1280px",
      },
      width: {
        sidebar: "240px",
      },
    },
  },
  plugins: [],
};

export default config;
