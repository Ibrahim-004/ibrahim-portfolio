import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07080B",
        panel: "#0D0F16",
        line: "#1E2433",
        mist: "#EDEFF5",
        muted: "#A7AEC0",
        electric: "#3B82F6",
        violet: "#8B5CF6"
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"]
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem"
      }
    }
  },
  plugins: []
};
export default config;
