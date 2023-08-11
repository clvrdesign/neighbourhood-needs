import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

const namesOfFolders = ["src", "components", "img", "utils", "hooks", "routes"];
const namesOfPaths = namesOfFolders.reduce((accumulator, current) => ({
  ...accumulator, [current]: `/${current === "src" ? current : "src/" + current}`
}),{});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),svgr()],
  resolve: {
    alias: {
      ...namesOfPaths
    },
  },
  server: {
    port: 8080,
  },
})
console.log(namesOfPaths);

