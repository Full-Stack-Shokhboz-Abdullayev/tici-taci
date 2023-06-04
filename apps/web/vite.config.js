import { defineConfig } from 'vite';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  server: {
    port: 4001,
    strictPort: true,
  },
  preview: {
    port: 4001,
  },
});
