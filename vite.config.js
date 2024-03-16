import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// const env = loadEnv(mode, process.cwd(), '');
// // https://vitejs.dev/config/
// export default defineConfig({
//   define: {
//     'process.env.SOME_KEY': JSON.stringify(env.SOME_KEY)
//   },
//   plugins: [react()],
// })

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env': env
    },
    plugins: [react()],
  }
})