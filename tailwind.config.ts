import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: ["content/**/**.md"],
  editorSupport: true,
  darkMode: "class",
  plugins: [require("@tailwindcss/typography")],
};
