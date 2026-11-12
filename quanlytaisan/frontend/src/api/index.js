import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Token phiên đăng nhập (UC01) lưu trong sessionStorage, tự gắn vào mọi request
const TOKEN_KEY = 'env09_token';

export const tokenStore = {
  get: () => {
    try { return sessionStorage.getItem(TOKEN_KEY); } catch { return null; }
  },
  set: (token) => {
    try { sessionStorage.setItem(TOKEN_KEY, token); } catch { /* bỏ qua */ }
  },
  clear: () => {
    try { sessionStorage.removeItem(TOKEN_KEY); } catch { /* bỏ qua */ }
  },
};

// App đăng ký hàm này để tự đưa người dùng về màn hình đăng nhập khi phiên hết hạn
let onUnauthorized = () => {};
export const setOnUnauthorized = (fn) => { onUnauthorized = fn; };

api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor để unwrap data trả về từ ApiResponse<T>.
// ApiResponse thất bại (success = false) được chuyển thành lỗi để giao diện không báo nhầm "thành công".
api.interceptors.response.use(
  (response) => {
    const res = response.data;
    const thanhCong = res.success ?? res.thanhCong;
    const thongBao = res.message ?? res.thongBao;
    if (thanhCong === false) {
      return Promise.reject(new Error(thongBao || 'Thao tác không thành công!'));
    }
    return {
      ...res,
      thanhCong,
      thongBao,
      duLieu: res.data !== undefined ? res.data : res.duLieu,
    };
  },
  (error) => {
    if (error.response?.status === 401) {
      tokenStore.clear();
      onUnauthorized();
    }
    const message = error.response?.data?.message || error.response?.data?.thongBao || error.message || 'Lỗi kết nối máy chủ!';
    return Promise.reject(new Error(message));
  }
);

// 1. Auth API
export const authApi = {
  login: (data) => api.post('/auth/login', data),
  me: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

// 2. Tài sản API (Khớp 100% TaiSanController)
export const taiSanApi = {
  getDanhSach: () => api.get('/tai-san'),
  getSanSangChiaSe: () => api.get('/tai-san/san-sang-chia-se'),
  getLichSu: (maTS) => api.get(`/danh-muc/lich-su-tai-san/${maTS}`),
  khaiBao: (data) => api.post('/tai-san/khai-bao', data),
  kiemNhan: (data) => api.post('/tai-san/kiem-nhan', data),
  deXuatThanhLy: (maTS, lyDoDeXuat) =>
    api.post('/tai-san/de-xuat-thanh-ly', null, { params: { maTS, lyDoDeXuat } }),
};

// 3. Phiếu mượn API (Khớp 100% PhieuMuonController)
export const phieuMuonApi = {
  getDanhSach: () => api.get('/phieu-muon'),
  getTheoPhongBan: (maPB) => api.get(`/phieu-muon/phong-ban/${maPB}`),
  lapYeuCau: (data) => api.post('/phieu-muon/lap-yeu-cau', data),
  duyet: (data) => api.post('/phieu-muon/duyet', data),
  huyChoDuyet: (maPM, lyDoHuy) =>
    api.post('/phieu-muon/huy', null, { params: { maPM, lyDoHuy } }),
  getChiTiet: () => api.get('/phieu-muon/chi-tiet'),
  getChiTietTheoPhieu: (maPM) => api.get(`/phieu-muon/${maPM}/chi-tiet`),
};

// 4. Giao nhận API (Khớp 100% GiaoNhanController)
export const giaoNhanApi = {
  banGiao: (data) => api.post('/giao-nhan/ban-giao', data),
  thuHoi: (data) => api.post('/giao-nhan/thu-hoi', data),
};

// 5. Bảo dưỡng API (Khớp 100% BaoDuongController)
export const baoDuongApi = {
  getDanhSach: () => api.get('/bao-duong/danh-sach'),
  getChiTiet: (maPBD) => api.get(`/bao-duong/chi-tiet/${maPBD}`),
  lapPhieu: (data) => api.post('/bao-duong/lap-phieu', data),
  nghiemThu: (data) => api.post('/bao-duong/nghiem-thu', data),
};

// 6. Thanh lý API (Khớp 100% ThanhLyController)
export const thanhLyApi = {
  getDanhSach: () => api.get('/thanh-ly/danh-sach'),
  deXuat: (data) => api.post('/thanh-ly/de-xuat', data),
  pheDuyet: (data) => api.post('/thanh-ly/phe-duyet', data),
};

// 7. Báo cáo CAI API (Khớp 100% BaoCaoCAIController)
export const baoCaoApi = {
  getChiSoTungTaiSan: () => api.get('/bao-cao-cai/chi-so-tung-tai-san'),
  getTongHopKPI: () => api.get('/bao-cao-cai/tong-hop-kpi-ncav'),
  getChiPhiBaoDuong: () => api.get('/bao-cao-cai/chi-phi-bao-duong'),
  getTheoKy: (tuNgay, denNgay) => api.get('/bao-cao-cai/theo-ky', { params: { tuNgay, denNgay } }),
};

// 8. Hệ thống API (Khớp 100% HeThongController)
export const heThongApi = {
  quetQuaHan: () => api.post('/he-thong/quet-qua-han'),
};

// 9. Danh mục & Quản trị hệ thống (Khớp 100% DanhMucController - UC02, UC03, UC04)
export const danhMucApi = {
  getPhongBan: () => api.get('/danh-muc/phong-ban'),
  themPhongBan: (data) => api.post('/danh-muc/phong-ban', data),
  getLoaiTaiSan: () => api.get('/danh-muc/loai-tai-san'),
  themLoaiTaiSan: (data) => api.post('/danh-muc/loai-tai-san', data),
  getNguoiDung: () => api.get('/danh-muc/nguoi-dung'),
  themNguoiDung: (data) => api.post('/danh-muc/nguoi-dung', data),
  toggleTrangThaiNguoiDung: (maND) => api.put(`/danh-muc/nguoi-dung/${maND}/trang-thai`),
  getThamSoCAI: () => api.get('/danh-muc/tham-so-cai'),
  capNhatThamSoCAI: (maThamSo, giaTri) => api.put(`/danh-muc/tham-so-cai/${maThamSo}`, null, { params: { giaTri } }),
  getLichSuTaiSan: (maTS) => api.get(`/danh-muc/lich-su-tai-san/${maTS}`),
};

export default api;
