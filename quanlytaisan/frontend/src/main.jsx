import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("LỖI GIAO DIỆN REACT RUNTIME:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '24px', background: '#fef2f2', color: '#991b1b', fontFamily: 'system-ui, sans-serif', minHeight: '100vh', boxSizing: 'border-box' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid #fee2e2' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#dc2626', marginBottom: '8px' }}>
              ⚠️ ĐÃ XẢY RA LỖI GIAO DIỆN REACT RUNTIME
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>
              Hệ thống đã bắt được lỗi trong quá trình khởi chạy giao diện:
            </p>
            <div style={{ background: '#fee2e2', padding: '12px 16px', borderRadius: '8px', color: '#b91c1c', fontWeight: 'bold', fontSize: '14px', marginBottom: '16px' }}>
              {String(this.state.error?.message || this.state.error)}
            </div>
            <details open style={{ marginBottom: '16px' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>
                Chi tiết Stack Trace:
              </summary>
              <pre style={{ background: '#0f172a', color: '#f8fafc', padding: '16px', borderRadius: '8px', fontSize: '12px', overflowX: 'auto', maxHeight: '200px' }}>
                {this.state.error?.stack || 'Không có stack trace'}
              </pre>
            </details>
            {this.state.errorInfo && (
              <details style={{ marginBottom: '16px' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>
                  Component Stack:
                </summary>
                <pre style={{ background: '#f1f5f9', color: '#334155', padding: '16px', borderRadius: '8px', fontSize: '12px', overflowX: 'auto' }}>
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              style={{ padding: '10px 20px', background: '#059669', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              🔄 Tải lại trang (F5)
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
