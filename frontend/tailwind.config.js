import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|navbar|card).js",
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui()],
};
