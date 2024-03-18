// import react from '@vitejs/plugin-react'
// import { defineConfig, loadEnv } from 'vite';

// export default defineConfig(({ command, mode }) => {
//     const env = loadEnv(mode, process.cwd(), '');
//     return {
//       plugins: [react()],
//         define: {
//             // 'process.env.FIREBASE_API_KEY': JSON.stringify(env.FIREBASE_API_KEY),
//             // 'process.env.FIREBASE_AUTH_DOMAIN': env.FIREBASE_AUTH_DOMAIN,
//             // 'process.env.FIREBASE_PROJECT_ID': JSON.stringify(env.FIREBASE_PROJECT_ID),
//             // 'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(env.FIREBASE_STORAGE_BUCKET),
//             // 'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(env.FIREBASE_MESSAGING_SENDER_ID),
//             // 'process.env.FIREBASE_APP_ID': JSON.stringify(env.FIREBASE_APP_ID),
//             // 'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(env.FIREBASE_MEASUREMENT_ID),
//             // 'process.env.YOUR_BOOLEAN_VARIABLE': env.YOUR_BOOLEAN_VARIABLE,
//             // If you want to exposes all env variables, which is not recommended
//             // 'process.env': env
//         },
//     };
// });

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
