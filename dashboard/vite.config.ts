import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';
import visualizer from 'rollup-plugin-visualizer';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tsconfigPaths({
      projects: [process.env.VITEST ? './tsconfig.test.json' : './tsconfig.json'],
    }),
    react(),
    dts({
      entryRoot: resolve(__dirname, 'src'),
      insertTypesEntry: true,
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,
    deps: {
      inline: ['echarts'],
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'dashboard',
      formats: ['es', 'umd'],
      fileName: (format) => `dashboard.${format}.js`,
    },
    rollupOptions: {
      plugins: [visualizer()],
      external: [
        '@emotion/react',
        '@mantine/core',
        '@mantine/dates',
        '@mantine/form',
        '@mantine/hooks',
        '@mantine/modals',
        '@mantine/notifications',
        '@mantine/prism',
        '@mantine/rte',
        // '@tanstack/react-table'
        'ahooks',
        'axios',
        'chroma-js',
        'echarts/core',
        'echarts/charts',
        'echarts/components',
        'echarts/renderers',
        'echarts-for-react/lib/core',
        'echarts-gl',
        'echarts-stat',
        'eventemitter2',
        'd3-array',
        'd3-regression',
        'jszip',
        'lodash',
        'mobx',
        'mobx-react-lite',
        'mobx-state-tree',
        'numbro',
        'react',
        'react-dom',
        'react-grid-layout',
        'react-hook-form',
        'react-virtual',
        'stickybits',
        'tabler-icons-react',
      ],
      output: {
        globals: {
          '@emotion/react': '@emotion/react',
          '@mantine/core': '@mantine/core',
          '@mantine/dates': '@mantine/dates',
          '@mantine/form': '@mantine/form',
          '@mantine/hooks': '@mantine/hooks',
          '@mantine/modals': '@mantine/modals',
          '@mantine/notifications': '@mantine/notifications',
          '@mantine/prism': '@mantine/prism',
          '@mantine/rte': '@mantine/rte',
          '@tanstack/react-table': '@tanstack/react-table',
          ahooks: 'ahooks',
          axios: 'axios',
          'chroma-js': 'chroma-js',
          'echarts/core': 'echarts/core',
          'echarts/charts': 'echarts/charts',
          'echarts/components': 'echarts/components',
          'echarts/renderers': 'echarts/renderers',
          'echarts-for-react/lib/core': 'echarts-for-react/lib/core',
          'echarts-gl': 'echarts-gl',
          'echarts-stat': 'echarts-stat',
          eventemitter2: 'eventemitter2',
          'd3-array': 'd3-array',
          'd3-regression': 'd3-regression',
          jszip: 'jszip',
          lodash: '_',
          mobx: 'mobx',
          'mobx-react-lite': 'mobx-react-lite',
          'mobx-state-tree': 'mobx-state-tree',
          numbro: 'numbro',
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-grid-layout': 'react-grid-layout',
          'react-hook-form': 'react-hook-form',
          'react-virtual': 'react-virtual',
          stickybits: 'stickybits',
          'tabler-icons-react': 'tabler-icons-react',
        },
      },
    },
  },
});
