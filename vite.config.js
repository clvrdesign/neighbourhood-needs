import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


const namesOfFolders = ['src','components','img', 'utils']
const namesOfPaths = namesOfFolders.reduce((accumulator, current) => ({
  ...accumulator, [current]: `/${current === "src" ? current : "src/" + current}`
}));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      ...namesOfPaths
    },
  },
})


