// vite.config.ts
import path from "path";
import { defineConfig, loadEnv } from "file:///C:/Users/kittu/Downloads/GIT/Portfolio/Porfolio-Design/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/kittu/Downloads/GIT/Portfolio/Porfolio-Design/node_modules/@vitejs/plugin-react/dist/index.js";
import { visualizer } from "file:///C:/Users/kittu/Downloads/GIT/Portfolio/Porfolio-Design/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import compression from "file:///C:/Users/kittu/Downloads/GIT/Portfolio/Porfolio-Design/node_modules/vite-plugin-compression/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\kittu\\Downloads\\GIT\\Portfolio\\Porfolio-Design";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    server: {
      port: 3e3,
      host: "0.0.0.0"
    },
    plugins: [
      react(),
      // Generate bundle analysis report
      visualizer({
        filename: "./dist/stats.html",
        open: false,
        gzipSize: true,
        brotliSize: true
      }),
      // Brotli compression for preview builds
      compression({
        algorithm: "brotliCompress",
        ext: ".br"
      }),
      // Gzip compression for preview builds
      compression({
        algorithm: "gzip",
        ext: ".gz"
      })
    ],
    define: {
      "process.env.API_KEY": JSON.stringify(env.GEMINI_API_KEY),
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, ".")
      }
    },
    build: {
      // Increase chunk size warning limit to 600kB to focus on real issues
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
              return "vendor-react";
            }
            if (id.includes("node_modules/framer-motion") || id.includes("node_modules/motion")) {
              return "vendor-motion";
            }
            if (id.includes("node_modules/@google/genai")) {
              return "vendor-genai";
            }
            if (id.includes("src/components/chapters/")) {
              const match = id.match(/chapters\/([^\/]+)/);
              if (match) {
                return `chapter-${match[1].toLowerCase()}`;
              }
            }
            if (id.includes("node_modules")) {
              return "vendor-libs";
            }
          }
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxraXR0dVxcXFxEb3dubG9hZHNcXFxcR0lUXFxcXFBvcnRmb2xpb1xcXFxQb3Jmb2xpby1EZXNpZ25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGtpdHR1XFxcXERvd25sb2Fkc1xcXFxHSVRcXFxcUG9ydGZvbGlvXFxcXFBvcmZvbGlvLURlc2lnblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMva2l0dHUvRG93bmxvYWRzL0dJVC9Qb3J0Zm9saW8vUG9yZm9saW8tRGVzaWduL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJztcbmltcG9ydCBjb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsICcuJywgJycpO1xuICAgIHJldHVybiB7XG4gICAgICBzZXJ2ZXI6IHtcbiAgICAgICAgcG9ydDogMzAwMCxcbiAgICAgICAgaG9zdDogJzAuMC4wLjAnLFxuICAgICAgfSxcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgcmVhY3QoKSxcbiAgICAgICAgLy8gR2VuZXJhdGUgYnVuZGxlIGFuYWx5c2lzIHJlcG9ydFxuICAgICAgICB2aXN1YWxpemVyKHtcbiAgICAgICAgICBmaWxlbmFtZTogJy4vZGlzdC9zdGF0cy5odG1sJyxcbiAgICAgICAgICBvcGVuOiBmYWxzZSxcbiAgICAgICAgICBnemlwU2l6ZTogdHJ1ZSxcbiAgICAgICAgICBicm90bGlTaXplOiB0cnVlLFxuICAgICAgICB9KSxcbiAgICAgICAgLy8gQnJvdGxpIGNvbXByZXNzaW9uIGZvciBwcmV2aWV3IGJ1aWxkc1xuICAgICAgICBjb21wcmVzc2lvbih7XG4gICAgICAgICAgYWxnb3JpdGhtOiAnYnJvdGxpQ29tcHJlc3MnLFxuICAgICAgICAgIGV4dDogJy5icicsXG4gICAgICAgIH0pLFxuICAgICAgICAvLyBHemlwIGNvbXByZXNzaW9uIGZvciBwcmV2aWV3IGJ1aWxkc1xuICAgICAgICBjb21wcmVzc2lvbih7XG4gICAgICAgICAgYWxnb3JpdGhtOiAnZ3ppcCcsXG4gICAgICAgICAgZXh0OiAnLmd6JyxcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgICAgZGVmaW5lOiB7XG4gICAgICAgICdwcm9jZXNzLmVudi5BUElfS0VZJzogSlNPTi5zdHJpbmdpZnkoZW52LkdFTUlOSV9BUElfS0VZKSxcbiAgICAgICAgJ3Byb2Nlc3MuZW52LkdFTUlOSV9BUElfS0VZJzogSlNPTi5zdHJpbmdpZnkoZW52LkdFTUlOSV9BUElfS0VZKVxuICAgICAgfSxcbiAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuJyksXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBidWlsZDoge1xuICAgICAgICAvLyBJbmNyZWFzZSBjaHVuayBzaXplIHdhcm5pbmcgbGltaXQgdG8gNjAwa0IgdG8gZm9jdXMgb24gcmVhbCBpc3N1ZXNcbiAgICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiA2MDAsXG4gICAgICAgIFxuICAgICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgICBtYW51YWxDaHVua3M6IChpZCkgPT4ge1xuICAgICAgICAgICAgICAvLyBSZWFjdCBjb3JlIGxpYnJhcmllc1xuICAgICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcy9yZWFjdCcpIHx8IGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvcmVhY3QtZG9tJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3ZlbmRvci1yZWFjdCc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIC8vIEZyYW1lciBNb3Rpb24gYW5pbWF0aW9uIGxpYnJhcnkgKGxhcmdlKVxuICAgICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcy9mcmFtZXItbW90aW9uJykgfHwgaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcy9tb3Rpb24nKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAndmVuZG9yLW1vdGlvbic7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIC8vIEdvb2dsZSBHZW5BSSBTREsgKHVzZWQgb25seSBpbiBDaGF0QXNzaXN0YW50KVxuICAgICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcy9AZ29vZ2xlL2dlbmFpJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3ZlbmRvci1nZW5haSc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIC8vIENoYXB0ZXIgY29tcG9uZW50cyAtIGxhenkgbG9hZCBieSBkZWZhdWx0XG4gICAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnc3JjL2NvbXBvbmVudHMvY2hhcHRlcnMvJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRjaCA9IGlkLm1hdGNoKC9jaGFwdGVyc1xcLyhbXlxcL10rKS8pO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGBjaGFwdGVyLSR7bWF0Y2hbMV0udG9Mb3dlckNhc2UoKX1gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgLy8gQWxsIG90aGVyIG5vZGVfbW9kdWxlc1xuICAgICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3ItbGlicyc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrVyxPQUFPLFVBQVU7QUFDblgsU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsa0JBQWtCO0FBQzNCLE9BQU8saUJBQWlCO0FBSnhCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3RDLFFBQU0sTUFBTSxRQUFRLE1BQU0sS0FBSyxFQUFFO0FBQ2pDLFNBQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUE7QUFBQSxNQUVOLFdBQVc7QUFBQSxRQUNULFVBQVU7QUFBQSxRQUNWLE1BQU07QUFBQSxRQUNOLFVBQVU7QUFBQSxRQUNWLFlBQVk7QUFBQSxNQUNkLENBQUM7QUFBQTtBQUFBLE1BRUQsWUFBWTtBQUFBLFFBQ1YsV0FBVztBQUFBLFFBQ1gsS0FBSztBQUFBLE1BQ1AsQ0FBQztBQUFBO0FBQUEsTUFFRCxZQUFZO0FBQUEsUUFDVixXQUFXO0FBQUEsUUFDWCxLQUFLO0FBQUEsTUFDUCxDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sdUJBQXVCLEtBQUssVUFBVSxJQUFJLGNBQWM7QUFBQSxNQUN4RCw4QkFBOEIsS0FBSyxVQUFVLElBQUksY0FBYztBQUFBLElBQ2pFO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxHQUFHO0FBQUEsTUFDbEM7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUE7QUFBQSxNQUVMLHVCQUF1QjtBQUFBLE1BRXZCLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQSxVQUNOLGNBQWMsQ0FBQyxPQUFPO0FBRXBCLGdCQUFJLEdBQUcsU0FBUyxvQkFBb0IsS0FBSyxHQUFHLFNBQVMsd0JBQXdCLEdBQUc7QUFDOUUscUJBQU87QUFBQSxZQUNUO0FBR0EsZ0JBQUksR0FBRyxTQUFTLDRCQUE0QixLQUFLLEdBQUcsU0FBUyxxQkFBcUIsR0FBRztBQUNuRixxQkFBTztBQUFBLFlBQ1Q7QUFHQSxnQkFBSSxHQUFHLFNBQVMsNEJBQTRCLEdBQUc7QUFDN0MscUJBQU87QUFBQSxZQUNUO0FBR0EsZ0JBQUksR0FBRyxTQUFTLDBCQUEwQixHQUFHO0FBQzNDLG9CQUFNLFFBQVEsR0FBRyxNQUFNLG9CQUFvQjtBQUMzQyxrQkFBSSxPQUFPO0FBQ1QsdUJBQU8sV0FBVyxNQUFNLENBQUMsRUFBRSxZQUFZLENBQUM7QUFBQSxjQUMxQztBQUFBLFlBQ0Y7QUFHQSxnQkFBSSxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBQy9CLHFCQUFPO0FBQUEsWUFDVDtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
