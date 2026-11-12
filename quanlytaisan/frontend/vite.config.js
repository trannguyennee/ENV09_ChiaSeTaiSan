import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Plugin tự động đồng bộ file tĩnh sang target/classes/static để Spring Boot nạp ngay
function copyToTargetStatic() {
  return {
    name: 'copy-to-target-static',
    closeBundle() {
      const srcDir = path.resolve(__dirname, '../src/main/resources/static')
      const targetDir = path.resolve(__dirname, '../target/classes/static')
      try {
        if (fs.existsSync(srcDir)) {
          if (fs.existsSync(targetDir)) {
            fs.rmSync(targetDir, { recursive: true, force: true })
          }
          fs.cpSync(srcDir, targetDir, { recursive: true })
          console.log('\n✅ [TỰ ĐỘNG ĐỒNG BỘ] Đã nạp thành công toàn bộ giao diện mới vào Spring Boot (target/classes/static)!')
        }
      } catch (err) {
        console.error('Lỗi tự động đồng bộ static:', err)
      }
    }
  }
}

export default defineConfig({
  root: fs.realpathSync(process.cwd()),
  plugins: [react(), copyToTargetStatic()],
  build: {
    outDir: '../src/main/resources/static',
    emptyOutDir: true
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
