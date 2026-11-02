import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-ink)",
        panel: "var(--color-panel)",
        line: "var(--color-line)",
        mist: "var(--color-mist)",
        muted: "var(--color-muted)",
        electric: "var(--color-electric)",
        violet: "var(--color-violet)"
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
