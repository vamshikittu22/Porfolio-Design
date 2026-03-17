import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        // Generate bundle analysis report
        visualizer({
          filename: './dist/stats.html',
          open: false,
          gzipSize: true,
          brotliSize: true,
        }),
        // Brotli compression for preview builds
        compression({
          algorithm: 'brotliCompress',
          ext: '.br',
        }),
        // Gzip compression for preview builds
        compression({
          algorithm: 'gzip',
          ext: '.gz',
        }),
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.STITCH_API_KEY || ''),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.STITCH_API_KEY || '')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // Increase chunk size warning limit to 600kB to focus on real issues
        chunkSizeWarningLimit: 600,
        
        rollupOptions: {
          output: {
            manualChunks: (id) => {
              // React core libraries
              if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
                return 'vendor-react';
              }
              
              // Framer Motion animation library (large)
              if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion')) {
                return 'vendor-motion';
              }
              
              // Google GenAI SDK (used only in ChatAssistant)
              if (id.includes('node_modules/@google/genai')) {
                return 'vendor-genai';
              }
              
              // Chapter components - lazy load by default
              if (id.includes('src/components/chapters/')) {
                const match = id.match(/chapters\/([^\/]+)/);
                if (match) {
                  return `chapter-${match[1].toLowerCase()}`;
                }
              }
              
              // All other node_modules
              if (id.includes('node_modules')) {
                return 'vendor-libs';
              }
            },
          },
        },
      },
    };
});
