import React, { useState, useEffect } from 'react';
import {
  authApi, taiSanApi, phieuMuonApi, giaoNhanApi,
  baoDuongApi, thanhLyApi, baoCaoApi, heThongApi, danhMucApi,
  tokenStore, setOnUnauthorized
} from './api';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid
} from 'recharts';
import {
  Building2, Users, Computer, Wrench, Trash2, BarChart3,
  CheckCircle2, XCircle, AlertTriangle, Clock, RefreshCw,
  Plus, Search, LogIn, LogOut, ArrowRight, ShieldCheck,
  FileText, History, Zap, Check, AlertCircle, Calendar, X, Eye, ShieldAlert,
  Bookmark, Award, Settings, UserCheck, UserX, FolderPlus, UserPlus, Layers, Lock, Unlock, FileClock, Sliders
} from 'lucide-react';

export default function App() {
  // Người dùng hiện tại - chỉ được gán sau khi đăng nhập thành công (UC01)
  const NGUOI_DUNG_TRONG = { maND: '', hoTen: '', vaiTro: '', maPB: '', tenPB: '' };
  const [currentUser, setCurrentUser] = useState(NGUOI_DUNG_TRONG);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Dữ liệu chung
  const [kpiData, setKpiData] = useState(null);
  const [taiSanList, setTaiSanList] = useState([]);
  const [phieuMuonList, setPhieuMuonList] = useState([]);
  const [baoDuongList, setBaoDuongList] = useState([]);
  const [thanhLyList, setThanhLyList] = useState([]);
  const [phongBanList, setPhongBanList] = useState([]);
  const [loaiTSList, setLoaiTSList] = useState([]);
  const [kyReport, setKyReport] = useState(null);
  const [chiTietPMList, setChiTietPMList] = useState([]); // ChiTietPhieuMuon: một phiếu nhiều thiết bị
  const [chartHocKy, setChartHocKy] = useState([]);        // Hình 53: số liệu thật theo từng học kỳ

  // Quản trị hệ thống (UC02, UC03, UC04) & Lịch sử đơn vị (UC07)
  const [nguoiDungList, setNguoiDungList] = useState([]);
  const [thamSoCAIList, setThamSoCAIList] = useState([]);
  const [adminSubTab, setAdminSubTab] = useState('phongban'); // 'phongban', 'loaitaisan', 'nguoidung', 'thamso'
  const [dongGopSubTab, setDongGopSubTab] = useState('donggop'); // 'donggop', 'lichsumuon'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ tenDangNhap: '', matKhau: '' });

  // Bộ lọc
  const [filterTS, setFilterTS] = useState({ search: '', phongBan: '', trangThai: '' });

  // Modals state
  const [modalState, setModalState] = useState({
    lapMuon: false,
    duyetMuon: null,
    huyMuon: null,
    banGiao: null,
    thuHoi: null,
    lapBaoDuong: false,
    nghiemThu: null,
    deXuatThanhLy: false,
    pheDuyetThanhLy: null,
    lichSuTaiSan: null,
    kiemNhan: null,
    khaiBaoTS: false,
    themPhongBan: false,
    themLoaiTS: false,
    themNguoiDung: false,
    suaThamSo: null
  });

  // State các Form bổ sung (UC02, UC03, UC04)
  const [formPhongBan, setFormPhongBan] = useState({
    maPB: 'PB06',
    tenPB: '',
    diaDiem: 'Khu B - Tầng 2',
    soDienThoai: '028.38351056',
    truongDonVi: ''
  });

  const [formLoaiTS, setFormLoaiTS] = useState({
    maLoaiTS: 'LTS-04',
    tenLoaiTS: '',
    nhomTaiSan: 'DoDac',
    nienHanNam: 8
  });

  const [formNguoiDung, setFormNguoiDung] = useState({
    maND: 'ND-NV' + Math.floor(10 + Math.random() * 90),
    maPB: '',
    tenDangNhap: '',
    hoTen: '',
    email: '',
    matKhau: '',
    vaiTro: 'NhanVien'
  });

  const [formSuaThamSo, setFormSuaThamSo] = useState({
    maThamSo: '',
    tenThamSo: '',
    giaTri: 0,
    donViTinh: ''
  });

  // State các Form dữ liệu
  const [formMuon, setFormMuon] = useState({
    dsMaTS: [], // Một phiếu mượn có thể gồm nhiều thiết bị cùng khoảng thời gian
    ngayMuon: new Date().toISOString().split('T')[0],
    ngayHenTra: new Date(Date.now() + 5*24*60*60*1000).toISOString().split('T')[0],
    mucDichSuDung: 'Phục vụ công tác nghiên cứu khoa học và đào tạo thực địa',
    ghiChuMucDich: 'Đo đạc thực địa hiện trường'
  });

  const [formDuyetMuon, setFormDuyetMuon] = useState({
    hanhDong: 'Duyet',
    lyDoTuChoi: ''
  });

  const [formHuyMuon, setFormHuyMuon] = useState({
    lyDoHuy: 'Thay đổi kế hoạch công tác thực địa'
  });

  // Bàn giao (BR06): kiểm tra từng máy; có máy lỗi thì phải Hủy bàn giao (hủy cả phiếu)
  const [formBanGiao, setFormBanGiao] = useState({
    phuKien: 'Cáp nguồn, hộp bảo vệ, chân máy, hướng dẫn sử dụng',
    lyDoHuy: '',
    items: {} // { [maTS]: { tinhTrangTruoc, coLoiNgoaiQuan, moTaLoi } }
  });

  // Thu hồi (BR08, BR09): đánh giá độc lập từng máy trong phiếu
  const [formThuHoi, setFormThuHoi] = useState({
    ghiChu: 'Thiết bị hoạt động bình thường, đầy đủ phụ kiện bàn giao',
    items: {} // { [maTS]: { tinhTrangSau, tyLeHaoMon, ghiChuSau, moTaHuHong, mucDoThietHai } }
  });

  const [formBaoDuong, setFormBaoDuong] = useState({
    maTS: '',
    donViSuaChua: 'Trung tâm Hiệu chuẩn và Thiết bị Khoa học HCM',
    noiDungSuaChua: 'Bảo dưỡng định kỳ, cân chỉnh thấu kính và tra dầu mỡ',
    hangMuc: 'Hiệu chuẩn quang học',
    linhKien: 'Pin dự phòng hoặc bóng đèn',
    donGia: 1500000,
    soLuong: 1
  });

  const [formNghiemThu, setFormNghiemThu] = useState({
    donViSuaChua: 'Trung tâm Hiệu chuẩn và Thiết bị Khoa học HCM',
    noiDungSuaChua: 'Đã hoàn thành bảo dưỡng và hiệu chỉnh kỹ thuật',
    hienTrangSauSuaChua: 100,
    ketLuan: 'Dat'
  });

  const [formThanhLy, setFormThanhLy] = useState({
    maTS: '',
    lyDoDeXuat: 'Thiết bị quá cũ hỏng, linh kiện không còn sản xuất, chi phí sửa vượt 70% giá trị máy'
  });

  const [formPheDuyetThanhLy, setFormPheDuyetThanhLy] = useState({
    hanhDong: 'Duyet',
    soQuyetDinh: 'QD-789/QD-HCMUNRE',
    ghiChuDuyet: 'Đồng ý chủ trương thanh lý theo biên bản thẩm định kỹ thuật'
  });

  // Khai báo tài sản (UC05, BR01) - khớp tham số sp_KhaiBaoTaiSan_BR01; mã TS do CSDL tự sinh
  const FORM_KHAI_BAO_RONG = {
    tenTS: '', soSeri: '', maLoaiTS: '', maPBSoHuu: '',
    nguyenGia: '', namMua: new Date().getFullYear(), hienTrang: 90,
    viTriLuuTru: '', hinhAnh: '', moTa: '',
    doChinhXac: '', chuKyKiemDinh: '', cauHinhCPU: '', dungLuongRAM: '', congSuat: '', phuKienDiKem: ''
  };
  const [formKhaiBaoTS, setFormKhaiBaoTS] = useState(FORM_KHAI_BAO_RONG);

  const [lichSuChiTiet, setLichSuChiTiet] = useState([]);
  const [formKiemNhan, setFormKiemNhan] = useState({ nguyenGia: '', hienTrang: '', ghiChu: '' });

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4500);
  };

  // Tải dữ liệu theo quyền của vai trò đang đăng nhập (tránh gọi API không có quyền)
  const coQuyenBaoCao = (vaiTro) => vaiTro === 'LanhDao' || vaiTro === 'ThuKho';

  // Hình 53: 4 học kỳ gần nhất tính đến học kỳ hiện tại (HK1: 01/09 - 31/01, HK2: 01/02 - 31/08),
  // số liệu lấy từ sp_BaoCaoCAI_TheoKy
  const dsHocKyGanNhat = () => {
    const now = new Date();
    const thang = now.getMonth(); // 0 = tháng 1
    let namHoc = thang >= 8 ? now.getFullYear() : now.getFullYear() - 1;
    let hk = thang >= 8 || thang === 0 ? 1 : 2;
    const ds = [];
    for (let i = 0; i < 4; i++) {
      ds.unshift(hk === 1
        ? { hocKy: `HK1 (${namHoc}-${namHoc + 1})`, tuNgay: `${namHoc}-09-01`, denNgay: `${namHoc + 1}-01-31` }
        : { hocKy: `HK2 (${namHoc}-${namHoc + 1})`, tuNgay: `${namHoc + 1}-02-01`, denNgay: `${namHoc + 1}-08-31` });
      if (hk === 1) { hk = 2; namHoc -= 1; } else { hk = 1; }
    }
    return ds;
  };

  const loadAllData = async (vaiTro = currentUser.vaiTro) => {
    setLoading(true);
    const baoCao = coQuyenBaoCao(vaiTro);
    const namNay = new Date().getFullYear();
    try {
      const [kpiRes, tsRes, pmRes, ctpmRes, bdRes, tlRes, pbRes, ltsRes, kyRes, ndRes, tsCAIRes] = await Promise.all([
        baoCao ? baoCaoApi.getTongHopKPI().catch(() => null) : null,
        taiSanApi.getDanhSach().catch(() => null),
        phieuMuonApi.getDanhSach().catch(() => null),
        phieuMuonApi.getChiTiet().catch(() => null),
        baoDuongApi.getDanhSach().catch(() => null),
        thanhLyApi.getDanhSach().catch(() => null),
        danhMucApi.getPhongBan().catch(() => null),
        danhMucApi.getLoaiTaiSan().catch(() => null),
        baoCao ? baoCaoApi.getTheoKy(`${namNay}-01-01`, `${namNay}-12-31`).catch(() => null) : null,
        vaiTro === 'QuanTri' ? danhMucApi.getNguoiDung().catch(() => null) : null,
        danhMucApi.getThamSoCAI().catch(() => null)
      ]);

      setKpiData(kpiRes?.thanhCong ? kpiRes.duLieu : null);
      if (tsRes && tsRes.thanhCong) setTaiSanList(tsRes.duLieu || []);
      if (pmRes && pmRes.thanhCong) setPhieuMuonList(pmRes.duLieu || []);
      if (ctpmRes && ctpmRes.thanhCong) setChiTietPMList(ctpmRes.duLieu || []);
      if (bdRes && bdRes.thanhCong) setBaoDuongList(bdRes.duLieu || []);
      if (tlRes && tlRes.thanhCong) setThanhLyList(tlRes.duLieu || []);
      if (pbRes && pbRes.thanhCong) setPhongBanList(pbRes.duLieu || []);
      if (ltsRes && ltsRes.thanhCong) setLoaiTSList(ltsRes.duLieu || []);
      setKyReport(kyRes?.thanhCong ? kyRes.duLieu : null);
      setNguoiDungList(ndRes?.thanhCong ? (ndRes.duLieu || []) : []);
      if (tsCAIRes && tsCAIRes.thanhCong) setThamSoCAIList(tsCAIRes.duLieu || []);

      if (baoCao) {
        const hocKy = dsHocKyGanNhat();
        const ketQua = await Promise.all(hocKy.map(hk => baoCaoApi.getTheoKy(hk.tuNgay, hk.denNgay).catch(() => null)));
        setChartHocKy(hocKy.map((hk, i) => {
          const t = ketQua[i]?.duLieu?.tongHopKy || {};
          const trieu = (v) => Math.round(Number(v || 0) / 10000) / 100; // đổi sang triệu đồng
          return {
            hocKy: hk.hocKy,
            tranhMua: trieu(t.TongGiaTriTranhMuaMoi_Ky),
            baoDuong: trieu(t.TongChiPhiBaoDuong_Ky),
            ncav: trieu(t.GiaTriTranhMuaMoiRong_NCAV_Ky)
          };
        }));
      } else {
        setChartHocKy([]);
      }
    } catch (err) {
      console.error(err);
      showToast('Không thể kết nối đến máy chủ Backend (Port 8080)!', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Tab mặc định và danh sách tab được phép theo Actor của từng Use Case
  const QUYEN_TAB = {
    dashboard: ['LanhDao', 'ThuKho'],
    taisan: ['NhanVien', 'ThuKho', 'LanhDao', 'QuanTri'],
    donggop: ['NhanVien', 'ThuKho'],
    phieumuon: ['NhanVien', 'ThuKho'],
    baoduong: ['ThuKho'],
    thanhly: ['ThuKho', 'LanhDao'],
    quantri: ['QuanTri']
  };
  const tabMacDinh = (vaiTro) => (QUYEN_TAB.dashboard.includes(vaiTro) ? 'dashboard' : vaiTro === 'QuanTri' ? 'quantri' : 'taisan');

  const apDungNguoiDung = (u) => {
    const nguoiDung = {
      maND: u.MaND || u.maND,
      hoTen: u.HoTen || u.hoTen,
      vaiTro: u.VaiTro || u.vaiTro,
      maPB: u.MaPB || u.maPB,
      tenPB: u.TenPB || u.tenPB || u.MaPB || u.maPB
    };
    setCurrentUser(nguoiDung);
    setActiveTab(tabMacDinh(nguoiDung.vaiTro));
    setIsLoggedIn(true);
    loadAllData(nguoiDung.vaiTro);
    return nguoiDung;
  };

  // Khôi phục phiên khi tải lại trang; phiên hết hạn thì quay về màn hình đăng nhập
  useEffect(() => {
    setOnUnauthorized(() => {
      setIsLoggedIn(false);
      setCurrentUser(NGUOI_DUNG_TRONG);
    });
    if (tokenStore.get()) {
      authApi.me().then(res => apDungNguoiDung(res.duLieu)).catch(() => tokenStore.clear());
    }
  }, []);

  // Đăng nhập hệ thống (UC01) - xác thực thật qua API, máy chủ cấp Token phiên làm việc
  const dangNhap = async (thongTin) => {
    setLoading(true);
    try {
      const res = await authApi.login(thongTin);
      const u = res.duLieu || {};
      tokenStore.set(u.Token);
      const nd = apDungNguoiDung(u);
      showToast(`Đăng nhập thành công! Chào mừng ${nd.hoTen} (${nd.vaiTro})`);
    } catch (err) {
      showToast(err.message || 'Lỗi kết nối khi đăng nhập!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dangNhap(loginForm);
  };

  // Đăng nhập nhanh tài khoản mẫu (vẫn đi qua API xác thực, không bỏ qua UC01)
  const handleQuickLogin = (tenDangNhap, matKhau) => {
    setLoginForm({ tenDangNhap, matKhau });
    dangNhap({ tenDangNhap, matKhau });
  };

  const handleLogout = async () => {
    try { await authApi.logout(); } catch { /* phiên có thể đã hết hạn */ }
    tokenStore.clear();
    // Đóng mọi hộp thoại đang mở để phiên sau không thấy dữ liệu của người dùng trước
    setModalState(prev => Object.fromEntries(Object.entries(prev).map(([k, v]) => [k, typeof v === 'boolean' ? false : null])));
    setIsLoggedIn(false);
    setCurrentUser(NGUOI_DUNG_TRONG);
    setLoginForm({ tenDangNhap: '', matKhau: '' });
  };

  // Tra cứu nhanh thông tin thiết bị trong phiếu mượn
  const dsTSCuaPhieu = (maPM) => chiTietPMList.filter(ct => ct.maPM === maPM);
  const tenTaiSan = (maTS) => taiSanList.find(t => t.maTS === maTS)?.tenTS || maTS;

  const moBanGiao = (pm) => {
    const items = {};
    dsTSCuaPhieu(pm.maPM).forEach(ct => {
      items[ct.maTS] = { tinhTrangTruoc: 'Hoạt động tốt, đủ phụ kiện', coLoiNgoaiQuan: false, moTaLoi: '' };
    });
    setFormBanGiao(prev => ({ ...prev, lyDoHuy: '', items }));
    setModalState(prev => ({ ...prev, banGiao: pm }));
  };

  const moThuHoi = (pm) => {
    const items = {};
    dsTSCuaPhieu(pm.maPM).forEach(ct => {
      items[ct.maTS] = { tinhTrangSau: 'Tot', tyLeHaoMon: 1, ghiChuSau: '', moTaHuHong: '', mucDoThietHai: 0 };
    });
    setFormThuHoi(prev => ({ ...prev, items }));
    setModalState(prev => ({ ...prev, thuHoi: pm }));
  };

  const capNhatItemBanGiao = (maTS, field, value) =>
    setFormBanGiao(prev => ({ ...prev, items: { ...prev.items, [maTS]: { ...prev.items[maTS], [field]: value } } }));
  const capNhatItemThuHoi = (maTS, field, value) =>
    setFormThuHoi(prev => ({ ...prev, items: { ...prev.items, [maTS]: { ...prev.items[maTS], [field]: value } } }));

  // Thêm mới Phòng Ban (UC02)
  const handleSubmitThemPhongBan = async (e) => {
    e.preventDefault();
    if (!formPhongBan.maPB || !formPhongBan.tenPB) {
      showToast('Vui lòng nhập Mã và Tên phòng ban!', 'error');
      return;
    }
    setLoading(true);
    try {
      const res = await danhMucApi.themPhongBan(formPhongBan);
      if (res && res.thanhCong) {
        showToast(`Thêm mới phòng ban ${formPhongBan.tenPB} thành công! (UC02)`);
        setModalState(prev => ({ ...prev, themPhongBan: false }));
        setFormPhongBan({ maPB: 'PB0' + (phongBanList.length + 2), tenPB: '', diaDiem: '', soDienThoai: '', truongDonVi: '' });
        loadAllData();
      } else {
        showToast(res?.thongBao || 'Lỗi thêm phòng ban', 'error');
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Thêm mới Loại Tài Sản (UC03)
  const handleSubmitThemLoaiTS = async (e) => {
    e.preventDefault();
    if (!formLoaiTS.maLoaiTS || !formLoaiTS.tenLoaiTS) {
      showToast('Vui lòng nhập Mã và Tên loại tài sản!', 'error');
      return;
    }
    setLoading(true);
    try {
      const res = await danhMucApi.themLoaiTaiSan(formLoaiTS);
      if (res && res.thanhCong) {
        showToast(`Thêm mới loại tài sản ${formLoaiTS.tenLoaiTS} thành công! (UC03)`);
        setModalState(prev => ({ ...prev, themLoaiTS: false }));
        setFormLoaiTS({ maLoaiTS: 'LTS-0' + (loaiTSList.length + 2), tenLoaiTS: '', nhomTaiSan: 'DoDac', nienHanNam: 8 });
        loadAllData();
      } else {
        showToast(res?.thongBao || 'Lỗi thêm loại tài sản', 'error');
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Cấp phát tài khoản Người dùng (UC04)
  const handleSubmitThemNguoiDung = async (e) => {
    e.preventDefault();
    if (!formNguoiDung.maND || !formNguoiDung.tenDangNhap || !formNguoiDung.hoTen) {
      showToast('Vui lòng điền đủ Mã, Username và Họ tên cán bộ!', 'error');
      return;
    }
    setLoading(true);
    try {
      const res = await danhMucApi.themNguoiDung(formNguoiDung);
      if (res && res.thanhCong) {
        showToast(`Cấp tài khoản cho cán bộ ${formNguoiDung.hoTen} thành công! (UC04)`);
        setModalState(prev => ({ ...prev, themNguoiDung: false }));
        setFormNguoiDung({ maND: 'ND-NV' + Math.floor(10 + Math.random() * 90), maPB: '', tenDangNhap: '', hoTen: '', email: '', matKhau: '', vaiTro: 'NhanVien' });
        loadAllData();
      } else {
        showToast(res?.thongBao || 'Lỗi cấp tài khoản', 'error');
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Khóa / Mở khóa tài khoản (UC04)
  const handleToggleUserStatus = async (maND) => {
    try {
      const res = await danhMucApi.toggleTrangThaiNguoiDung(maND);
      if (res && res.thanhCong) {
        showToast(`Cập nhật trạng thái tài khoản ${maND} thành công!`);
        loadAllData();
      } else {
        showToast(res?.thongBao || 'Lỗi cập nhật trạng thái', 'error');
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Cập nhật tham số CAI (UC04 - BR18)
  const handleUpdateThamSoCAI = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await danhMucApi.capNhatThamSoCAI(formSuaThamSo.maThamSo, formSuaThamSo.giaTri);
      if (res && res.thanhCong) {
        showToast(`Cập nhật tham số ${formSuaThamSo.maThamSo} thành công! (UC04)`);
        setModalState(prev => ({ ...prev, suaThamSo: null }));
        loadAllData();
      } else {
        showToast(res?.thongBao || 'Lỗi cập nhật tham số', 'error');
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // BR13: quyền mượn suy ra động từ dữ liệu phiếu của phòng ban
  // (1) có phiếu Đang thực hiện bị cờ quá hạn (BR14)  (2) số phiếu chưa hoàn tất đạt hạn ngạch TS06
  const phieuCuaDonVi = phieuMuonList.filter(pm => pm.maPBMuon === currentUser.maPB);
  const coPhieuQuaHan = phieuCuaDonVi.some(pm => pm.trangThai === 'DangThucHien' && (pm.coQuaHan === true || pm.coQuaHan === 1));
  const hanNgachPhieu = Number(thamSoCAIList.find(t => t.maThamSo === 'TS06')?.giaTri ?? 5);
  const soPhieuDangMo = phieuCuaDonVi.filter(pm => ['ChoDuyet', 'DaDuyet', 'DangThucHien'].includes(pm.trangThai)).length;
  const isDepartmentLocked = coPhieuQuaHan || soPhieuDangMo >= hanNgachPhieu;
  const lyDoKhoaMuon = coPhieuQuaHan
    ? 'Đơn vị đang có phiếu mượn quá hạn chưa thu hồi (BR13, BR14)'
    : `Đơn vị đã đạt hạn ngạch ${hanNgachPhieu} phiếu mượn chưa hoàn tất (BR13)`;

  // 1. Lập yêu cầu mượn tài sản (UC08 - BR02, BR03, BR05, BR13)
  const handleSubmitLapMuon = async (e) => {
    e.preventDefault();
    if (!formMuon.dsMaTS.length) {
      showToast('Vui lòng chọn ít nhất một thiết bị muốn mượn!', 'error');
      return;
    }
    try {
      const payload = {
        ngayMuon: formMuon.ngayMuon,
        ngayHenTra: formMuon.ngayHenTra,
        mucDichSuDung: formMuon.mucDichSuDung,
        danhSachTaiSan: formMuon.dsMaTS.map(maTS => ({
          MaTS: maTS,
          GhiChuMucDich: formMuon.ghiChuMucDich
        }))
      };
      const res = await phieuMuonApi.lapYeuCau(payload);
      showToast(res.thongBao || 'Lập yêu cầu mượn thành công (Trạng thái: Chờ duyệt)!');
      setModalState(prev => ({ ...prev, lapMuon: false }));
      setFormMuon(prev => ({ ...prev, dsMaTS: [] }));
      loadAllData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // 2. Phê duyệt / Từ chối phiếu mượn (BR05, BR07)
  const handleSubmitDuyetMuon = async () => {
    if (!modalState.duyetMuon) return;
    try {
      const payload = {
        maPM: modalState.duyetMuon.maPM,
        hanhDong: formDuyetMuon.hanhDong,
        lyDoTuChoi: formDuyetMuon.lyDoTuChoi
      };
      const res = await phieuMuonApi.duyet(payload);
      showToast(res.thongBao || 'Xử lý duyệt phiếu mượn thành công!');
      setModalState(prev => ({ ...prev, duyetMuon: null }));
      loadAllData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // 3. Hủy phiếu mượn khi còn chờ duyệt (BR17)
  const handleSubmitHuyMuon = async () => {
    if (!modalState.huyMuon) return;
    try {
      const res = await phieuMuonApi.huyChoDuyet(
        modalState.huyMuon.maPM,
        formHuyMuon.lyDoHuy
      );
      showToast(res.thongBao || 'Hủy phiếu mượn thành công!');
      setModalState(prev => ({ ...prev, huyMuon: null }));
      loadAllData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // 4. Bàn giao xuất kho (UC10 - BR06, BR07): ketQua = 'DaGiao' (xuất kho) hoặc 'Huy' (hủy cả phiếu)
  const handleSubmitBanGiao = async (ketQua) => {
    if (!modalState.banGiao) return;
    const danhSach = Object.entries(formBanGiao.items).map(([maTS, it]) => ({
      MaTS: maTS,
      TinhTrangTruoc: it.tinhTrangTruoc,
      CoLoiNgoaiQuan: !!it.coLoiNgoaiQuan,
      MoTaLoi: it.moTaLoi
    }));
    if (!danhSach.length) {
      showToast('Phiếu mượn chưa có thiết bị nào để bàn giao!', 'error');
      return;
    }
    if (ketQua === 'DaGiao' && danhSach.some(d => d.CoLoiNgoaiQuan)) {
      showToast('BR06: Có thiết bị bị lỗi khi kiểm tra - vui lòng chọn "Hủy bàn giao" (hủy cả phiếu).', 'error');
      return;
    }
    try {
      const payload = {
        maPM: modalState.banGiao.maPM,
        maNguoiNhan: modalState.banGiao.maNguoiMuon,
        phuKienKemTheo: formBanGiao.phuKien,
        trangThaiGiao: ketQua,
        lyDoHuy: ketQua === 'Huy' ? formBanGiao.lyDoHuy : null,
        danhSachGiao: danhSach
      };
      const res = await giaoNhanApi.banGiao(payload);
      showToast(res.thongBao || 'Bàn giao xuất kho thành công! Máy đã chuyển sang Đang mượn.');
      setModalState(prev => ({ ...prev, banGiao: null }));
      loadAllData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // 5. Thu hồi thiết bị & Đóng phiếu (UC11 - BR08, BR09): đánh giá từng máy
  const handleSubmitThuHoi = async () => {
    if (!modalState.thuHoi) return;
    const thieuThietHai = Object.entries(formThuHoi.items).find(([, it]) =>
      it.tinhTrangSau === 'HuHong' && (!String(it.moTaHuHong || '').trim() || Number(it.mucDoThietHai || 0) <= 0));
    if (thieuThietHai) {
      showToast(`BR09: Thiết bị ${thieuThietHai[0]} hư hỏng - bắt buộc nhập mô tả hư hỏng và mức độ thiệt hại > 0%.`, 'error');
      return;
    }
    try {
      const payload = {
        maPM: modalState.thuHoi.maPM,
        maNguoiTra: modalState.thuHoi.maNguoiMuon,
        ghiChu: formThuHoi.ghiChu,
        danhSachThuHoi: Object.entries(formThuHoi.items).map(([maTS, it]) => ({
          MaTS: maTS,
          TinhTrangSau: it.tinhTrangSau,
          TyLeHaoMon: Number(it.tyLeHaoMon || 0),
          GhiChuSau: it.ghiChuSau,
          MoTaHuHong: it.tinhTrangSau === 'Tot' ? null : it.moTaHuHong,
          MucDoThietHai: it.tinhTrangSau === 'Tot' ? 0 : Number(it.mucDoThietHai || 0)
        }))
      };
      const res = await giaoNhanApi.thuHoi(payload);
      showToast(res.thongBao || 'Lập biên bản thu hồi thành công! Đã cập nhật CAI và trạng thái máy.');
      setModalState(prev => ({ ...prev, thuHoi: null }));
      loadAllData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // 6. Lập phiếu bảo dưỡng (BR11)
  const handleSubmitLapBaoDuong = async (e) => {
    e.preventDefault();
    if (!formBaoDuong.maTS) {
      showToast('Vui lòng chọn tài sản cần bảo dưỡng!', 'error');
      return;
    }
    try {
      const payload = {
        maTS: formBaoDuong.maTS,
        donViSuaChua: formBaoDuong.donViSuaChua,
        noiDungSuaChua: formBaoDuong.noiDungSuaChua,
        danhSachHangMuc: [
          {
            HangMucSuaChua: formBaoDuong.hangMuc,
            LinhKienThayThe: formBaoDuong.linhKien,
            DonGia: Number(formBaoDuong.donGia),
            SoLuong: Number(formBaoDuong.soLuong)
          }
        ]
      };
      const res = await baoDuongApi.lapPhieu(payload);
      showToast(res.thongBao || 'Lập phiếu bảo dưỡng thành công! Máy đã chuyển sang Đang bảo dưỡng.');
      setModalState(prev => ({ ...prev, lapBaoDuong: false }));
      loadAllData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // 7. Nghiệm thu bảo dưỡng kỹ thuật (BR12)
  const handleSubmitNghiemThu = async () => {
    if (!modalState.nghiemThu) return;
    try {
      const payload = {
        maPBD: modalState.nghiemThu.maPBD,
        donViSuaChua: formNghiemThu.donViSuaChua,
        noiDungSuaChua: formNghiemThu.noiDungSuaChua,
        hienTrangSauSuaChua: Number(formNghiemThu.hienTrangSauSuaChua),
        ketLuan: formNghiemThu.ketLuan
      };
      const res = await baoDuongApi.nghiemThu(payload);
      showToast(res.thongBao || 'Nghiệm thu bảo dưỡng thành công!');
      setModalState(prev => ({ ...prev, nghiemThu: null }));
      loadAllData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // 8. Đề xuất thanh lý tài sản (BR13)
  const handleSubmitDeXuatThanhLy = async (e) => {
    e.preventDefault();
    if (!formThanhLy.maTS) {
      showToast('Vui lòng chọn tài sản cần đề xuất thanh lý!', 'error');
      return;
    }
    try {
      const payload = {
        maTS: formThanhLy.maTS,
        lyDoDeXuat: formThanhLy.lyDoDeXuat
      };
      const res = await thanhLyApi.deXuat(payload);
      showToast(res.thongBao || 'Lập hồ sơ đề xuất thanh lý thành công (Chờ phê duyệt)!');
      setModalState(prev => ({ ...prev, deXuatThanhLy: false }));
      loadAllData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // 9. Lãnh đạo phê duyệt thanh lý (BR15)
  const handleSubmitPheDuyetThanhLy = async () => {
    if (!modalState.pheDuyetThanhLy) return;
    try {
      const payload = {
        maHSTL: modalState.pheDuyetThanhLy.maHSTL,
        hanhDong: formPheDuyetThanhLy.hanhDong,
        soQuyetDinh: formPheDuyetThanhLy.soQuyetDinh,
        ghiChuDuyet: formPheDuyetThanhLy.ghiChuDuyet
      };
      const res = await thanhLyApi.pheDuyet(payload);
      showToast(res.thongBao || 'Phê duyệt hồ sơ thanh lý thành công!');
      setModalState(prev => ({ ...prev, pheDuyetThanhLy: null }));
      loadAllData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // 10. Khai báo tài sản mới (UC05 - BR01)
  const handleSubmitKhaiBaoTS = async (e) => {
    e.preventDefault();
    if (Number(formKhaiBaoTS.hienTrang) < Number(thamSoCAIList.find(t => t.maThamSo === 'TS04')?.giaTri ?? 50)) {
      showToast('BR01: Hiện trạng dưới ngưỡng tối thiểu, thiết bị không được tiếp nhận vào kho dùng chung.', 'error');
      return;
    }
    const soHoacNull = (v) => (v === '' || v === null || v === undefined ? null : Number(v));
    const chuoiHoacNull = (v) => (v === '' ? null : v);
    try {
      const payload = {
        tenTS: formKhaiBaoTS.tenTS,
        soSeri: formKhaiBaoTS.soSeri,
        maLoaiTS: formKhaiBaoTS.maLoaiTS,
        maPBSoHuu: formKhaiBaoTS.maPBSoHuu || currentUser.maPB,
        namMua: Number(formKhaiBaoTS.namMua),
        nguyenGia: Number(formKhaiBaoTS.nguyenGia),
        hienTrang: Number(formKhaiBaoTS.hienTrang),
        viTriLuuTru: chuoiHoacNull(formKhaiBaoTS.viTriLuuTru),
        hinhAnh: chuoiHoacNull(formKhaiBaoTS.hinhAnh),
        moTa: chuoiHoacNull(formKhaiBaoTS.moTa),
        doChinhXac: chuoiHoacNull(formKhaiBaoTS.doChinhXac),
        chuKyKiemDinh: soHoacNull(formKhaiBaoTS.chuKyKiemDinh),
        cauHinhCPU: chuoiHoacNull(formKhaiBaoTS.cauHinhCPU),
        dungLuongRAM: chuoiHoacNull(formKhaiBaoTS.dungLuongRAM),
        congSuat: chuoiHoacNull(formKhaiBaoTS.congSuat),
        phuKienDiKem: chuoiHoacNull(formKhaiBaoTS.phuKienDiKem)
      };
      const res = await taiSanApi.khaiBao(payload);
      showToast(res.thongBao || 'Khai báo tài sản mới thành công!');
      setModalState(prev => ({ ...prev, khaiBaoTS: false }));
      setFormKhaiBaoTS(FORM_KHAI_BAO_RONG);
      loadAllData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // UC12 - BR21: Thủ kho kiểm nhận tài sản Mới (xác nhận nguyên giá, hiện trạng)
  const moKiemNhan = (ts) => {
    setFormKiemNhan({ nguyenGia: ts.nguyenGia, hienTrang: ts.hienTrang, ghiChu: 'Đã đối chiếu thực tế, đúng số seri và thông số' });
    setModalState(prev => ({ ...prev, kiemNhan: ts }));
  };

  const handleSubmitKiemNhan = async () => {
    if (!modalState.kiemNhan) return;
    try {
      const res = await taiSanApi.kiemNhan({
        maTS: modalState.kiemNhan.maTS,
        nguyenGia: Number(formKiemNhan.nguyenGia),
        hienTrang: Number(formKiemNhan.hienTrang),
        ghiChu: formKiemNhan.ghiChu
      });
      showToast(res.thongBao || 'Kiểm nhận tài sản thành công!');
      setModalState(prev => ({ ...prev, kiemNhan: null }));
      loadAllData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // 11. Xem lịch sử thay đổi trạng thái tài sản
  const handleXemLichSu = async (ts) => {
    try {
      const res = await danhMucApi.getLichSuTaiSan(ts.maTS);
      setLichSuChiTiet(res.duLieu || []);
      setModalState(prev => ({ ...prev, lichSuTaiSan: ts }));
    } catch (err) {
      showToast('Không thể tải lịch sử tài sản: ' + err.message, 'error');
    }
  };

  // 12. Quét quá hạn hệ thống (BR10)
  const handleQuetQuaHan = async () => {
    try {
      setLoading(true);
      const res = await heThongApi.quetQuaHan();
      showToast(res.thongBao || 'Đã thực thi quét quá hạn và xử lý kỷ luật phòng ban vi phạm!');
      loadAllData();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Lọc tài sản
  const filteredTaiSan = taiSanList.filter(ts => {
    const matchSearch = !filterTS.search ||
      (ts.maTS && ts.maTS.toLowerCase().includes(filterTS.search.toLowerCase())) ||
      (ts.tenTS && ts.tenTS.toLowerCase().includes(filterTS.search.toLowerCase()));
    const matchPB = !filterTS.phongBan || ts.maPBSoHuu === filterTS.phongBan;
    const matchTT = !filterTS.trangThai || ts.trangThai === filterTS.trangThai;
    // BR10 - UC06: Nhân viên chỉ tra cứu thiết bị Sẵn sàng chia sẻ (thiết bị của đơn vị mình xem ở tab Đóng góp - UC07)
    const khaDung = currentUser.vaiTro !== 'NhanVien' || ts.trangThai === 'SanSangChiaSe';
    return matchSearch && matchPB && matchTT && khaDung;
  });

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-slate-800">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/30">
              <Building2 className="w-8 h-8" />
            </div>
            <h1 className="text-lg font-extrabold text-slate-900">HCMUNRE - ĐỀ TÀI OOSD ENV-09</h1>
            <p className="text-xs text-slate-500 mt-1">Hệ Thống Quản Lý & Tái Sử Dụng Tài Sản Nội Bộ</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> Xác Thực & Đăng Nhập Hệ Thống (UC01)
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Tên đăng nhập (Username):</label>
              <input
                type="text"
                value={loginForm.tenDangNhap}
                onChange={(e) => setLoginForm(prev => ({ ...prev, tenDangNhap: e.target.value }))}
                required
                className="w-full p-3 border border-slate-300 rounded-xl font-mono text-sm focus:border-emerald-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Mật khẩu:</label>
              <input
                type="password"
                value={loginForm.matKhau}
                onChange={(e) => setLoginForm(prev => ({ ...prev, matKhau: e.target.value }))}
                required
                className="w-full p-3 border border-slate-300 rounded-xl text-sm focus:border-emerald-600 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" /> Đăng Nhập Vào Hệ Thống
            </button>
          </form>

          {/* BẢNG THÔNG TIN TÀI KHOẢN MẪU ĐỂ NHẬP TAY */}
          <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] space-y-1.5">
            <div className="font-bold text-slate-700 flex items-center justify-between">
              <span>📋 DANH SÁCH TÀI KHOẢN HỆ THỐNG:</span>
              <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">CSDL Chuẩn</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 font-mono text-[10.5px]">
              <div className="p-1.5 bg-white rounded-lg border">
                <span className="font-bold text-emerald-700">1. Cán bộ mượn:</span>
                <div>User: <strong className="text-slate-900">gv_mt</strong></div>
                <div>Pass: <strong className="text-emerald-600">User@123</strong></div>
              </div>
              <div className="p-1.5 bg-white rounded-lg border">
                <span className="font-bold text-amber-700">2. Thủ kho:</span>
                <div>User: <strong className="text-slate-900">thukho</strong></div>
                <div>Pass: <strong className="text-amber-600">ThuKho@123</strong></div>
              </div>
              <div className="p-1.5 bg-white rounded-lg border">
                <span className="font-bold text-purple-700">3. Lãnh đạo:</span>
                <div>User: <strong className="text-slate-900">lanhdao</strong></div>
                <div>Pass: <strong className="text-purple-600">User@123</strong></div>
              </div>
              <div className="p-1.5 bg-white rounded-lg border">
                <span className="font-bold text-rose-700">4. Quản trị:</span>
                <div>User: <strong className="text-slate-900">admin</strong></div>
                <div>Pass: <strong className="text-rose-600">Admin@123</strong></div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider text-center mb-2">
              ⚡ Hoặc bấm đăng nhập nhanh 1-chạm:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  handleQuickLogin('thukho', 'ThuKho@123');
                }}
                className="p-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl font-bold border border-amber-200 transition text-left"
              >
                1. Thủ kho (thukho)
                <span className="block text-[10px] font-normal text-amber-700">Duyệt & bàn giao máy</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  handleQuickLogin('gv_mt', 'User@123');
                }}
                className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-xl font-bold border border-emerald-200 transition text-left"
              >
                2. Cán bộ mượn (gv_mt)
                <span className="block text-[10px] font-normal text-emerald-700">Khai báo & lập mượn</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  handleQuickLogin('lanhdao', 'User@123');
                }}
                className="p-2.5 bg-purple-50 hover:bg-purple-100 text-purple-900 rounded-xl font-bold border border-purple-200 transition text-left"
              >
                3. Lãnh đạo (lanhdao)
                <span className="block text-[10px] font-normal text-purple-700">Duyệt thanh lý & xem KPI</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  handleQuickLogin('admin', 'Admin@123');
                }}
                className="p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-900 rounded-xl font-bold border border-rose-200 transition text-left"
              >
                4. Quản trị viên (admin)
                <span className="block text-[10px] font-normal text-rose-700">Cấu hình PB, Loại TS, User</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* 1. HEADER CHÍNH - NHẬN DIỆN THƯƠNG HIỆU HCMUNRE */}
      <header className="bg-emerald-800 text-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-700/80 rounded-lg shadow-inner flex items-center justify-center">
              <Building2 className="w-7 h-7 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-600 text-emerald-100 text-xs px-2 py-0.5 rounded font-mono font-bold tracking-wider">
                  ENV-09
                </span>
                <h1 className="text-lg font-bold tracking-tight">HỆ THỐNG QUẢN LÝ & TÁI SỬ DỤNG TÀI SẢN NỘI BỘ</h1>
              </div>
              <p className="text-xs text-emerald-200">
                Trường Đại học Tài nguyên và Môi trường TP.HCM (HCMUNRE) - Đề tài OOSD
              </p>
            </div>
          </div>

          {/* VAI TRÒ CỦA PHIÊN ĐĂNG NHẬP (không cho đổi vai trò khi chưa đăng nhập lại - UC01) */}
          <div className="flex items-center gap-2 bg-emerald-900/60 px-3 py-1.5 rounded-xl border border-emerald-700/60 text-xs">
            <Users className="w-3.5 h-3.5 text-emerald-300" />
            <span className="text-emerald-300 font-semibold">Vai trò:</span>
            <span className="px-2.5 py-1 rounded font-bold bg-emerald-500 text-white shadow">
              {{ ThuKho: 'Thủ kho', NhanVien: 'Nhân viên', LanhDao: 'Lãnh đạo', QuanTri: 'Quản trị' }[currentUser.vaiTro] || currentUser.vaiTro}
            </span>
          </div>
        </div>

        {/* PROFILE BAR */}
        <div className="bg-emerald-900/90 px-4 sm:px-6 py-1.5 border-t border-emerald-700/40 text-xs flex justify-between items-center text-emerald-200 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <span>Đang đăng nhập: <strong className="text-white font-bold">{currentUser.hoTen}</strong> ({currentUser.maND})</span>
            <button
              onClick={handleLogout}
              title="Đăng xuất khỏi hệ thống (UC01)"
              className="ml-2 px-2 py-0.5 bg-emerald-950/60 hover:bg-rose-700 text-emerald-200 hover:text-white rounded text-[11px] font-semibold transition border border-emerald-600/50 inline-flex items-center gap-1">
              <LogOut className="w-3 h-3" /> Đăng xuất
            </button>
            <span>Đơn vị: <strong className="text-emerald-100">{currentUser.tenPB}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Spring Boot 3.3.5 & SQL Server 2022
            </span>
            <button
              onClick={() => loadAllData()}
              title="Tải lại toàn bộ dữ liệu"
              className="p-1 hover:bg-emerald-800 rounded transition ml-2 flex items-center gap-1 text-emerald-200">
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Làm mới
            </button>
          </div>
        </div>
      </header>

      {/* 2. THANH MENU ĐIỀU HƯỚNG TABS */}
      <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-[72px] z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex space-x-1 sm:space-x-4 overflow-x-auto">
          {[
            { id: 'dashboard', label: 'Tổng quan KPI & CAI (Hình 53)', icon: BarChart3 },
            { id: 'taisan', label: 'Kho Tài sản & Khai báo', icon: Computer },
            { id: 'donggop', label: 'Lịch sử & Đóng góp đơn vị (UC07)', icon: Bookmark },
            { id: 'phieumuon', label: 'Quản lý Mượn - Trả', icon: FileText },
            { id: 'baoduong', label: 'Bảo dưỡng & Sửa chữa', icon: Wrench },
            { id: 'thanhly', label: 'Thanh lý & Quét quá hạn', icon: Trash2 },
            { id: 'quantri', label: 'Quản trị hệ thống (UC02-04)', icon: Settings }
          ].filter(tab => QUYEN_TAB[tab.id].includes(currentUser.vaiTro)).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3.5 px-3 border-b-2 font-semibold text-sm transition whitespace-nowrap ${
                  isActive
                    ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* 3. NỘI DUNG CHÍNH THEO TAB */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full">
        {/* TOAST THÔNG BÁO TẬP TRUNG */}
        {toast && (
          <div className={`mb-4 p-4 rounded-xl flex items-center justify-between shadow-lg border transition-all ${
            toast.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-800'
              : 'bg-emerald-50 border-emerald-200 text-emerald-900'
          }`}>
            <div className="flex items-center gap-3">
              {toast.type === 'error' ? (
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              )}
              <span className="text-sm font-medium">{toast.message}</span>
            </div>
            <button onClick={() => setToast(null)} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* TAB 1: BÁO CÁO CAI & BIỂU ĐỒ HÌNH 53 */}
        {activeTab === 'dashboard' && QUYEN_TAB.dashboard.includes(currentUser.vaiTro) && (
          <div className="space-y-6">
            {/* THẺ KPI TỔNG HỢP V5.1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tổng giá trị kho tài sản</span>
                <div className="text-2xl font-black text-slate-900 mt-2">
                  {Number(kpiData?.TongNguyenGiaTaiSan ?? kpiData?.tongNguyenGiaTaiSan ?? 0).toLocaleString('vi-VN')} đ
                </div>
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <Computer className="w-3.5 h-3.5 text-blue-500" />
                  Gồm <strong>{kpiData?.TongSoTaiSan ?? kpiData?.tongSoTaiSan ?? 0}</strong> thiết bị tại các khoa/viện
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tránh Mua Mới Gộp</span>
                <div className="text-2xl font-black text-emerald-600 mt-2">
                  {Number(kpiData?.TongGiaTriTranhMuaMoi ?? kpiData?.tongGiaTriTranhMuaMoi ?? 0).toLocaleString('vi-VN')} đ
                </div>
                <div className="text-xs text-emerald-700 mt-1 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Tiết kiệm nhờ cơ chế dùng chung
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Chi phí bảo dưỡng</span>
                <div className="text-2xl font-black text-amber-600 mt-2">
                  {Number(kpiData?.TongChiPhiBaoDuong ?? kpiData?.tongChiPhiBaoDuong ?? 0).toLocaleString('vi-VN')} đ
                </div>
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <Wrench className="w-3.5 h-3.5 text-amber-500" />
                  Phiếu bảo dưỡng thực tế
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-700 to-teal-800 text-white p-5 rounded-2xl shadow-md">
                <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">Hiệu quả ròng (NCAV & ROI)</span>
                <div className="text-2xl font-black text-white mt-2">
                  {Number(kpiData?.GiaTriTranhMuaMoiRong_NCAV ?? kpiData?.giaTriTranhMuaMoiRong_NCAV ?? 0).toLocaleString('vi-VN')} đ
                </div>
                <div className="text-xs text-emerald-200 mt-1 font-semibold flex items-center justify-between">
                  <span>Tỷ suất khai thác (ROI):</span>
                  <span className="bg-white text-emerald-800 font-extrabold px-2 py-0.5 rounded-full text-xs shadow-sm">
                    {kpiData?.TySuatHieuQua_ROI_CAI_PhanTram != null ? `${Number(kpiData.TySuatHieuQua_ROI_CAI_PhanTram).toFixed(1)}%` : 'Chưa có chi phí BD'}
                  </span>
                </div>
              </div>
            </div>

            {/* BIỂU ĐỒ HÌNH 53 TRONG WORD: GIÁ TRỊ TIẾT KIỆM RÒNG NCAV QUA CÁC HỌC KỲ */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 mb-4 border-b gap-2">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-emerald-600" />
                    Biểu đồ giá trị tiết kiệm ròng NCAV qua các học kì (triệu VNĐ)
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    NCAV = Tránh mua mới - Chi phí bảo dưỡng
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-500"></span> Tránh mua mới</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-amber-500"></span> Chi phí bảo dưỡng</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-teal-700"></span> Tiết kiệm ròng (NCAV)</span>
                </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartHocKy} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="hocKy" tick={{ fill: '#64748b', fontSize: 12 }} />
                    <YAxis unit=" tr" tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip
                      formatter={(val) => Number(val).toLocaleString('vi-VN') + ' triệu VNĐ'}
                      contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                    />
                    <Legend />
                    <Bar dataKey="tranhMua" name="Giá trị Tránh Mua Mới" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="baoDuong" name="Chi phí Bảo Dưỡng" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="ncav" name="Tiết Kiệm Ròng (NCAV)" fill="#0f766e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* BẢNG CHI TIẾT CÁC LƯỢT CHIA SẺ VÀ CHỈ SỐ CAI TỪNG MÁY (Result Set 1) */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-50/70 border-b flex justify-between items-center">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Danh sách chia sẻ & Chỉ số CAI từng lượt (Kỳ năm học 2026)
                </h3>
                <span className="text-xs text-slate-500 font-mono">Procedure: sp_BaoCaoCAI_TheoKy</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-600 uppercase font-semibold">
                    <tr>
                      <th className="p-3">Mã phiếu</th>
                      <th className="p-3">Mã TS</th>
                      <th className="p-3">Tên tài sản</th>
                      <th className="p-3">Đơn vị sở hữu</th>
                      <th className="p-3">Đơn vị mượn</th>
                      <th className="p-3 text-center">Số ngày mượn</th>
                      <th className="p-3 text-right">Nguyên giá</th>
                      <th className="p-3 text-right">Tránh mua mới</th>
                      <th className="p-3 text-center">Chỉ số CAI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {kyReport && kyReport.danhSachChiTiet && kyReport.danhSachChiTiet.length > 0 ? (
                      kyReport.danhSachChiTiet.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-emerald-700">{item.MaPM}</td>
                          <td className="p-3 font-mono text-slate-600">{item.MaTS}</td>
                          <td className="p-3 font-medium text-slate-900">{item.TenTS}</td>
                          <td className="p-3 text-slate-600">{item.DonViSoHuu}</td>
                          <td className="p-3 text-slate-600">{item.DonViMuon}</td>
                          <td className="p-3 text-center font-bold">{item.SoNgayMuonThucTe} ngày ({item.LoaiThoiHanMuon})</td>
                          <td className="p-3 text-right font-mono">{Number(item.NguyenGia).toLocaleString('vi-VN')} đ</td>
                          <td className="p-3 text-right font-mono font-bold text-emerald-700">
                            {Number(item.GiaTriTranhMuaMoi).toLocaleString('vi-VN')} đ
                          </td>
                          <td className="p-3 text-center">
                            <span className="bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full text-xs">
                              {Number(item.ChiSoCAI_Luot).toFixed(2)}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9} className="p-6 text-center text-slate-400">
                          Đang tải hoặc chưa có dữ liệu giao dịch trong kỳ.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: KHO TÀI SẢN & KHAI BÁO (UC02 - UC06, BR01, BR02) */}
        {activeTab === 'taisan' && (
          <div className="space-y-4">
            {/* THANH CÔNG CỤ TÌM KIẾM VÀ NÚT KHAI BÁO MỚI */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto flex-1">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Tìm theo mã hoặc tên tài sản..."
                    value={filterTS.search}
                    onChange={(e) => setFilterTS(prev => ({ ...prev, search: e.target.value }))}
                    className="w-full pl-9 pr-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <select
                  value={filterTS.phongBan}
                  onChange={(e) => setFilterTS(prev => ({ ...prev, phongBan: e.target.value }))}
                  className="py-2 px-3 border rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="">-- Tất cả phòng ban sở hữu --</option>
                  {phongBanList.map(pb => (
                    <option key={pb.maPB} value={pb.maPB}>{pb.tenPB}</option>
                  ))}
                </select>
                <select
                  value={filterTS.trangThai}
                  onChange={(e) => setFilterTS(prev => ({ ...prev, trangThai: e.target.value }))}
                  className="py-2 px-3 border rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="">-- Tất cả trạng thái --</option>
                  <option value="Moi">Mới (chờ kiểm nhận)</option>
                  <option value="SanSangChiaSe">Sẵn Sàng Chia Sẻ</option>
                  <option value="DangMuon">Đang Mượn</option>
                  <option value="DangBaoDuong">Đang Bảo Dưỡng</option>
                  <option value="CanBaoDuong">Cần Bảo Dưỡng</option>
                  <option value="DeXuatThanhLy">Đề Xuất Thanh Lý</option>
                  <option value="DaThanhLy">Đã Thanh Lý</option>
                </select>
              </div>

              {(currentUser.vaiTro === 'ThuKho' || currentUser.vaiTro === 'NhanVien') && (
                <button
                  onClick={() => setModalState(prev => ({ ...prev, khaiBaoTS: true }))}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition"
                >
                  <Plus className="w-4 h-4" /> + Khai Báo Tài Sản Mới (UC05)
                </button>
              )}
            </div>

            {/* BẢNG DANH SÁCH TÀI SẢN */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-600 uppercase font-semibold">
                    <tr>
                      <th className="p-3">Mã TS</th>
                      <th className="p-3">Tên thiết bị</th>
                      <th className="p-3">Đơn vị quản lý</th>
                      <th className="p-3 text-right">Nguyên giá</th>
                      <th className="p-3 text-center">Năm mua / Hiện trạng</th>
                      <th className="p-3 text-center">Trạng thái</th>
                      <th className="p-3 text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredTaiSan.length > 0 ? (
                      filteredTaiSan.map((ts) => {
                        let badgeColor = 'bg-slate-100 text-slate-800';
                        if (ts.trangThai === 'Moi') badgeColor = 'bg-sky-100 text-sky-800 border-sky-200';
                        else if (ts.trangThai === 'SanSangChiaSe') badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
                        else if (ts.trangThai === 'DangMuon') badgeColor = 'bg-blue-100 text-blue-800 border-blue-200';
                        else if (ts.trangThai === 'DangBaoDuong') badgeColor = 'bg-amber-100 text-amber-800 border-amber-200';
                        else if (ts.trangThai === 'CanBaoDuong') badgeColor = 'bg-yellow-100 text-yellow-800 border-yellow-200';
                        else if (ts.trangThai === 'DeXuatThanhLy') badgeColor = 'bg-purple-100 text-purple-800 border-purple-200';
                        else if (ts.trangThai === 'DaThanhLy') badgeColor = 'bg-rose-100 text-rose-800 border-rose-200';

                        return (
                          <tr key={ts.maTS} className="hover:bg-slate-50 transition">
                            <td className="p-3 font-mono font-bold text-slate-900">{ts.maTS}</td>
                            <td className="p-3 font-semibold text-slate-800">
                              <div>{ts.tenTS}</div>
                              <div className="text-[11px] text-slate-400 font-normal">{ts.moTa || ts.soSeri}</div>
                            </td>
                            <td className="p-3 text-slate-600 font-medium">{phongBanList.find(p => p.maPB === ts.maPBSoHuu)?.tenPB || ts.maPBSoHuu}</td>
                            <td className="p-3 text-right font-mono font-semibold">
                              {Number(ts.nguyenGia).toLocaleString('vi-VN')} đ
                            </td>
                            <td className="p-3 text-center text-slate-500">{ts.namMua} / <strong className="text-emerald-700">{ts.hienTrang}%</strong></td>
                            <td className="p-3 text-center">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeColor}`}>
                                {ts.trangThai}
                              </span>
                            </td>
                            <td className="p-3 text-center">
                              <div className="flex items-center justify-center gap-1">
                                {ts.trangThai === 'SanSangChiaSe' && currentUser.vaiTro === 'NhanVien' && ts.maPBSoHuu !== currentUser.maPB && (
                                  <button
                                    onClick={() => {
                                      setFormMuon(prev => ({ ...prev, dsMaTS: [ts.maTS] }));
                                      setModalState(prev => ({ ...prev, lapMuon: true }));
                                    }}
                                    disabled={isDepartmentLocked}
                                    title={isDepartmentLocked ? lyDoKhoaMuon : "Lập phiếu mượn thiết bị này (UC08)"}
                                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition shadow-sm ${
                                      isDepartmentLocked
                                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                    }`}
                                  >
                                    <FileText className="w-3.5 h-3.5" /> Mượn máy (UC08)
                                  </button>
                                )}
                                <button
                                  onClick={() => handleXemLichSu(ts)}
                                  title="Xem lịch sử trạng thái tài sản"
                                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
                                >
                                  <History className="w-3.5 h-3.5" />
                                </button>
                                {currentUser.vaiTro === 'ThuKho' && ts.trangThai === 'Moi' && (
                                  <button
                                    onClick={() => moKiemNhan(ts)}
                                    title="Kiểm nhận tài sản vào kho dùng chung (UC12 - BR21)"
                                    className="px-2.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition shadow-sm"
                                  >
                                    <ShieldCheck className="w-3.5 h-3.5" /> Kiểm nhận
                                  </button>
                                )}
                                {currentUser.vaiTro === 'ThuKho' && ts.trangThai === 'CanBaoDuong' && (
                                    <button
                                      onClick={() => {
                                        setFormBaoDuong(prev => ({ ...prev, maTS: ts.maTS }));
                                        setModalState(prev => ({ ...prev, lapBaoDuong: true }));
                                      }}
                                      title="Lập phiếu bảo dưỡng (UC13 - chỉ cho máy Cần bảo dưỡng)"
                                      className="p-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg transition"
                                    >
                                      <Wrench className="w-3.5 h-3.5" />
                                    </button>
                                )}
                                {currentUser.vaiTro === 'ThuKho' && ['SanSangChiaSe', 'CanBaoDuong', 'DeXuatThanhLy'].includes(ts.trangThai)
                                  && !thanhLyList.some(tl => tl.maTS === ts.maTS && tl.trangThai === 'ChoDuyet') && (
                                  <>
                                    <button
                                      onClick={() => {
                                        setFormThanhLy(prev => ({ ...prev, maTS: ts.maTS }));
                                        setModalState(prev => ({ ...prev, deXuatThanhLy: true }));
                                      }}
                                      title="Đề xuất thanh lý (UC14 - BR15)"
                                      className="p-1.5 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-lg transition"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-400">
                          Không tìm thấy tài sản nào phù hợp điều kiện lọc.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: QUẢN LÝ MƯỢN - TRẢ (UC08, UC09, UC10, UC14, UC17, BR04-BR09, BR17) */}
        {activeTab === 'phieumuon' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
              <div>
                <h2 className="font-bold text-slate-900 text-sm">Danh Sách Phiếu Mượn & Luồng Vòng Đời Mượn - Trả</h2>
                <p className="text-xs text-slate-500">Khớp quy tắc BR02, BR03, BR05, BR13 (Lập phiếu), BR04 (Duyệt), BR06, BR07 (Giao), BR08, BR09 (Thu hồi), BR17 (Hủy phiếu)</p>
              </div>

              {currentUser.vaiTro === 'NhanVien' && (
                <button
                  onClick={() => setModalState(prev => ({ ...prev, lapMuon: true }))}
                  disabled={isDepartmentLocked}
                  title={isDepartmentLocked ? lyDoKhoaMuon : 'Lập yêu cầu mượn (UC08)'}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition ${isDepartmentLocked ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-emerald-700 hover:bg-emerald-800 text-white'}`}
                >
                  <Plus className="w-4 h-4" /> + Lập Yêu Cầu Mượn Máy (UC08)
                </button>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-600 uppercase font-semibold">
                    <tr>
                      <th className="p-3">Mã phiếu</th>
                      <th className="p-3">Người mượn</th>
                      <th className="p-3">Đơn vị</th>
                      <th className="p-3">Thiết bị</th>
                      <th className="p-3">Ngày mượn</th>
                      <th className="p-3">Ngày hẹn trả</th>
                      <th className="p-3 text-center">Trạng thái</th>
                      <th className="p-3 text-center">Cảnh báo</th>
                      <th className="p-3 text-center">Thao tác nghiệp vụ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {phieuMuonList.length > 0 ? (
                      phieuMuonList.map((pm) => {
                        let sttBadge = 'bg-slate-100 text-slate-800';
                        if (pm.trangThai === 'ChoDuyet') sttBadge = 'bg-amber-100 text-amber-800 border-amber-200';
                        else if (pm.trangThai === 'DaDuyet') sttBadge = 'bg-blue-100 text-blue-800 border-blue-200';
                        else if (pm.trangThai === 'DangThucHien') sttBadge = 'bg-indigo-100 text-indigo-800 border-indigo-200';
                        else if (pm.trangThai === 'HoanTat') sttBadge = 'bg-emerald-100 text-emerald-800 border-emerald-200';
                        else if (pm.trangThai === 'TuChoi' || pm.trangThai === 'DaHuy') sttBadge = 'bg-rose-100 text-rose-800 border-rose-200';

                        return (
                          <tr key={pm.maPM} className="hover:bg-slate-50 transition">
                            <td className="p-3 font-mono font-bold text-slate-900">{pm.maPM}</td>
                            <td className="p-3 font-semibold text-slate-800">{pm.maNguoiMuon}</td>
                            <td className="p-3 text-slate-600 font-medium">{pm.maPBMuon}</td>
                            <td className="p-3 text-slate-600 font-mono">{dsTSCuaPhieu(pm.maPM).map(ct => ct.maTS).join(', ')}</td>
                            <td className="p-3 text-slate-600">{pm.ngayMuon}</td>
                            <td className="p-3 text-slate-600">{pm.ngayHenTra}</td>
                            <td className="p-3 text-center">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${sttBadge}`}>
                                {pm.trangThai}
                              </span>
                            </td>
                            <td className="p-3 text-center">
                              {pm.coQuaHan ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-700 border border-rose-200">
                                  <AlertTriangle className="w-3 h-3 text-rose-600" /> Quá hạn (BR14)
                                </span>
                              ) : (
                                <span className="text-slate-400 font-normal">Bình thường</span>
                              )}
                            </td>
                            <td className="p-3 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                {/* Hủy phiếu khi ChoDuyet (BR17) */}
                                {pm.trangThai === 'ChoDuyet' && (currentUser.maND === pm.maNguoiMuon || currentUser.vaiTro === 'ThuKho') && (
                                  <button
                                    onClick={() => setModalState(prev => ({ ...prev, huyMuon: pm }))}
                                    className="px-2 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-md font-semibold text-xs"
                                  >
                                    Hủy yêu cầu (BR17)
                                  </button>
                                )}

                                {/* Duyệt / Từ chối (UC09 - BR04) - Thủ kho */}
                                {pm.trangThai === 'ChoDuyet' && currentUser.vaiTro === 'ThuKho' && (
                                  <button
                                    onClick={() => setModalState(prev => ({ ...prev, duyetMuon: pm }))}
                                    className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-semibold text-xs"
                                  >
                                    Duyệt phiếu (BR04)
                                  </button>
                                )}

                                {/* Bàn giao xuất kho (BR06) - Thủ kho */}
                                {pm.trangThai === 'DaDuyet' && currentUser.vaiTro === 'ThuKho' && (
                                  <button
                                    onClick={() => moBanGiao(pm)}
                                    className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold text-xs"
                                  >
                                    Bàn giao xuất kho (BR06)
                                  </button>
                                )}

                                {/* Thu hồi máy (BR08, BR09) - Thủ kho */}
                                {pm.trangThai === 'DangThucHien' && currentUser.vaiTro === 'ThuKho' && (
                                  <button
                                    onClick={() => moThuHoi(pm)}
                                    className="px-2 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-md font-semibold text-xs"
                                  >
                                    Lập biên bản thu hồi (BR08)
                                  </button>
                                )}

                                {pm.trangThai === 'HoanTat' && (
                                  <span className="text-emerald-700 font-semibold text-xs flex items-center gap-1">
                                    <Check className="w-3.5 h-3.5" /> Hoàn tất
                                  </span>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={9} className="p-8 text-center text-slate-400">
                          Chưa có phiếu mượn nào trong hệ thống.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BẢO DƯỠNG & SỬA CHỮA KỸ THUẬT (UC11, UC12, BR11, BR12) */}
        {activeTab === 'baoduong' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
              <div>
                <h2 className="font-bold text-slate-900 text-sm">Quản Lý Bảo Dưỡng, Sửa Chữa & Nghiệm Thu Kỹ Thuật</h2>
                <p className="text-xs text-slate-500">Khớp quy tắc nghiệp vụ BR11 (Lập phiếu sửa chữa) và BR12 (Nghiệm thu đạt chuẩn/hỏng nặng)</p>
              </div>

              {currentUser.vaiTro === 'ThuKho' && (
                <button
                  onClick={() => setModalState(prev => ({ ...prev, lapBaoDuong: true }))}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition"
                >
                  <Plus className="w-4 h-4" /> + Lập Phiếu Bảo Dưỡng (UC13)
                </button>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-600 uppercase font-semibold">
                    <tr>
                      <th className="p-3">Mã phiếu BD</th>
                      <th className="p-3">Mã TS</th>
                      <th className="p-3">Đơn vị sửa chữa</th>
                      <th className="p-3">Nội dung kỹ thuật</th>
                      <th className="p-3 text-center">Hiện trạng sau sửa</th>
                      <th className="p-3 text-center">Trạng thái</th>
                      <th className="p-3 text-center">Nghiệm thu kỹ thuật</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {baoDuongList.length > 0 ? (
                      baoDuongList.map((bd) => (
                        <tr key={bd.maPBD} className="hover:bg-slate-50 transition">
                          <td className="p-3 font-mono font-bold text-slate-900">{bd.maPBD}</td>
                          <td className="p-3 font-mono font-semibold text-emerald-800">{bd.maTS}</td>
                          <td className="p-3 text-slate-700">{bd.donViSuaChua}</td>
                          <td className="p-3 text-slate-600">{bd.noiDungSuaChua}</td>
                          <td className="p-3 text-center font-mono font-bold text-amber-700">
                            {bd.hienTrangSauSuaChua != null ? `${bd.hienTrangSauSuaChua}%` : '---'}
                          </td>
                          <td className="p-3 text-center">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                              bd.trangThaiBaoDuong === 'DangBaoDuong'
                                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                : bd.trangThaiBaoDuong === 'KhongTheSua'
                                ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            }`}>
                              {bd.trangThaiBaoDuong}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            {bd.trangThaiBaoDuong === 'DangBaoDuong' && currentUser.vaiTro === 'ThuKho' ? (
                              <button
                                onClick={() => setModalState(prev => ({ ...prev, nghiemThu: bd }))}
                                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-semibold text-xs flex items-center gap-1 mx-auto"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" /> Nghiệm thu (BR12)
                              </button>
                            ) : (
                              <span className="text-emerald-700 font-semibold text-xs flex items-center justify-center gap-1">
                                <Check className="w-3.5 h-3.5" /> {bd.trangThaiBaoDuong === 'DangBaoDuong' ? 'Đang sửa chữa' : bd.trangThaiBaoDuong === 'KhongTheSua' ? 'Không thể sửa' : 'Đã nghiệm thu'}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-400">
                          Chưa có phiếu bảo dưỡng nào trong hệ thống.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: THANH LÝ & TÁC VỤ HỆ THỐNG (UC15, BR10, BR13, BR14, BR15) */}
        {activeTab === 'thanhly' && (
          <div className="space-y-6">
            {/* KHỐI 1: TÁC VỤ CRON QUÉT QUÁ HẠN HỆ THỐNG (BR10) */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 rounded-2xl shadow-md flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/30">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    Tác Vụ Tự Động Quét Quá Hạn & Tự Hủy Phiếu Không Nhận Máy (UC17 - BR14)
                  </h3>
                  <p className="text-xs text-slate-300">
                    Chạy ngầm 00:05 mỗi đêm: bật cờ CoQuaHan = 1 cho phiếu Đang thực hiện quá hạn (BR14), tự hủy phiếu Đã duyệt quá hạn nhận máy; quyền mượn bị chặn gián tiếp theo BR13
                  </p>
                </div>
              </div>

              <button
                onClick={handleQuetQuaHan}
                disabled={loading}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg transition whitespace-nowrap"
              >
                <Zap className="w-4 h-4" /> Kích hoạt quét ngay lập tức
              </button>
            </div>

            {/* KHỐI 2: QUẢN LÝ HỒ SƠ THANH LÝ */}
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
                <div>
                  <h2 className="font-bold text-slate-900 text-sm">Hồ Sơ Đề Xuất & Phê Duyệt Thanh Lý Tài Sản</h2>
                  <p className="text-xs text-slate-500">Khớp UC14 - BR15 (3 căn cứ đề xuất thanh lý) và Lãnh đạo đơn vị ký duyệt / bác bỏ</p>
                </div>

                {currentUser.vaiTro === 'ThuKho' && (
                  <button
                    onClick={() => setModalState(prev => ({ ...prev, deXuatThanhLy: true }))}
                    className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition"
                  >
                    <Plus className="w-4 h-4" /> + Lập Hồ Sơ Đề Xuất Thanh Lý (BR15)
                  </button>
                )}
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-600 uppercase font-semibold">
                      <tr>
                        <th className="p-3">Mã hồ sơ</th>
                        <th className="p-3">Mã TS</th>
                        <th className="p-3">Người đề xuất</th>
                        <th className="p-3">Lý do đề xuất</th>
                        <th className="p-3">Số quyết định</th>
                        <th className="p-3 text-center">Trạng thái</th>
                        <th className="p-3 text-center">Phê duyệt Lãnh đạo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {thanhLyList.length > 0 ? (
                        thanhLyList.map((tl) => (
                          <tr key={tl.maHSTL} className="hover:bg-slate-50 transition">
                            <td className="p-3 font-mono font-bold text-slate-900">{tl.maHSTL}</td>
                            <td className="p-3 font-mono font-semibold text-purple-700">{tl.maTS}</td>
                            <td className="p-3 text-slate-700">{tl.maNguoiDeXuat}</td>
                            <td className="p-3 text-slate-600">{tl.lyDoDeXuat}</td>
                            <td className="p-3 font-mono font-semibold text-slate-800">{tl.soQuyetDinh || '---'}</td>
                            <td className="p-3 text-center">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                tl.trangThai === 'ChoDuyet'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                  : tl.trangThai === 'DaDuyet'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  : 'bg-rose-100 text-rose-800 border border-rose-200'
                              }`}>
                                {tl.trangThai}
                              </span>
                            </td>
                            <td className="p-3 text-center">
                              {tl.trangThai === 'ChoDuyet' && currentUser.vaiTro === 'LanhDao' ? (
                                <button
                                  onClick={() => setModalState(prev => ({ ...prev, pheDuyetThanhLy: tl }))}
                                  className="px-3 py-1 bg-purple-700 hover:bg-purple-800 text-white rounded-md font-semibold text-xs flex items-center gap-1 mx-auto"
                                >
                                  <ShieldCheck className="w-3.5 h-3.5" /> Phê duyệt (UC14)
                                </button>
                              ) : (
                                <span className="text-slate-400 font-normal">
                                  {tl.trangThai === 'DaDuyet' ? 'Đã ban hành QĐ' : tl.trangThai === 'BacBo' ? 'Đã bác bỏ' : 'Chờ Lãnh đạo duyệt'}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-slate-400">
                            Chưa có hồ sơ thanh lý nào trong hệ thống.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: LỊCH SỬ MƯỢN - TRẢ & ĐÓNG GÓP TÀI SẢN CỦA ĐƠN VỊ (UC07) */}
        {activeTab === 'donggop' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-emerald-600" />
                  Lịch Sử Mượn - Trả & Tài Sản Đóng Góp Của Đơn Vị (UC07)
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Đơn vị đang tra cứu: <strong className="text-emerald-800">{currentUser.tenPB}</strong> ({currentUser.maPB}) - Cán bộ: <strong>{currentUser.hoTen}</strong>
                </p>
              </div>

              <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setDongGopSubTab('donggop')}
                  className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                    dongGopSubTab === 'donggop' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Award className="w-4 h-4 text-emerald-600" />
                  1. Tài sản Khoa đã đóng góp
                </button>
                <button
                  onClick={() => setDongGopSubTab('lichsumuon')}
                  className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                    dongGopSubTab === 'lichsumuon' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileClock className="w-4 h-4 text-emerald-600" />
                  2. Lịch sử mượn của đơn vị
                </button>
              </div>
            </div>

            {isDepartmentLocked && (
              <div className="p-4 bg-rose-50 border border-rose-300 rounded-2xl text-xs text-rose-800 flex items-start gap-3 shadow-sm">
                <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-rose-900 mb-0.5">TẠM CHẶN LẬP YÊU CẦU MƯỢN MỚI (BR13)</h4>
                  <p>
                    {lyDoKhoaMuon}. Quyền mượn tự động khôi phục ngay khi đơn vị hoàn tất thu hồi / các phiếu được xử lý xong.
                  </p>
                </div>
              </div>
            )}

            {dongGopSubTab === 'donggop' && (() => {
              const dsDongGop = taiSanList.filter(ts => ts.maPBSoHuu === currentUser.maPB);
              const tongNguyenGia = dsDongGop.reduce((sum, ts) => sum + Number(ts.nguyenGia || 0), 0);
              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                      <span className="text-xs text-slate-500 font-semibold block uppercase">Số thiết bị chia sẻ</span>
                      <span className="text-2xl font-extrabold text-emerald-700 mt-1 block">{dsDongGop.length} thiết bị</span>
                      <span className="text-[11px] text-slate-400">Đã khai báo đưa vào kho dùng chung</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                      <span className="text-xs text-slate-500 font-semibold block uppercase">Tổng nguyên giá đóng góp</span>
                      <span className="text-2xl font-extrabold text-slate-800 mt-1 block">{tongNguyenGia.toLocaleString('vi-VN')} đ</span>
                      <span className="text-[11px] text-slate-400">Giá trị tài sản nhàn rỗi được kích hoạt</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                      <span className="text-xs text-slate-500 font-semibold block uppercase">Tỷ lệ thiết bị đang phục vụ</span>
                      <span className="text-2xl font-extrabold text-teal-700 mt-1 block">
                        {dsDongGop.length > 0 ? ((dsDongGop.filter(ts => ts.trangThai === 'DangMuon').length / dsDongGop.length) * 100).toFixed(0) : 0}%
                      </span>
                      <span className="text-[11px] text-slate-400">Đang được các khoa khác mượn sử dụng</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b flex justify-between items-center">
                      <h3 className="font-bold text-slate-900 text-sm">Danh Mục Thiết Bị Của Khoa Đang Chia Sẻ Trên Hệ Thống</h3>
                      <button
                        onClick={() => setModalState(prev => ({ ...prev, khaiBaoTS: true }))}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow transition">
                        <Plus className="w-3.5 h-3.5" /> + Khai Báo Thêm Tài Sản Nhàn Rỗi (UC05)
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-100 text-slate-600 uppercase font-semibold">
                          <tr>
                            <th className="p-3">Mã TS</th>
                            <th className="p-3">Tên thiết bị</th>
                            <th className="p-3">Loại tài sản</th>
                            <th className="p-3">Nguyên giá</th>
                            <th className="p-3 text-center">Năm mua</th>
                            <th className="p-3 text-center">Hiện trạng</th>
                            <th className="p-3 text-center">Số lượt được mượn</th>
                            <th className="p-3 text-center">Trạng thái vòng đời</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {dsDongGop.length > 0 ? (
                            dsDongGop.map((ts) => (
                              <tr key={ts.maTS} className="hover:bg-slate-50 transition">
                                <td className="p-3 font-mono font-bold text-emerald-800">{ts.maTS}</td>
                                <td className="p-3 font-semibold text-slate-900">{ts.tenTS}</td>
                                <td className="p-3 text-slate-600 font-mono">{ts.maLoaiTS}</td>
                                <td className="p-3 font-bold text-slate-800">{Number(ts.nguyenGia).toLocaleString('vi-VN')} đ</td>
                                <td className="p-3 text-center font-mono">{ts.namMua}</td>
                                <td className="p-3 text-center font-bold text-emerald-700">{ts.hienTrang}%</td>
                                <td className="p-3 text-center font-bold">
                                  {chiTietPMList.filter(ct => ct.maTS === ts.maTS && ['DangThucHien', 'HoanTat'].includes(phieuMuonList.find(p => p.maPM === ct.maPM)?.trangThai)).length}
                                </td>
                                <td className="p-3 text-center">
                                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                    ts.trangThai === 'SanSangChiaSe' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                                    ts.trangThai === 'DangMuon' ? 'bg-teal-100 text-teal-800 border border-teal-200' :
                                    ts.trangThai === 'DangBaoDuong' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                                    'bg-rose-100 text-rose-800 border border-rose-200'
                                  }`}>
                                    {ts.trangThai}
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={8} className="p-8 text-center text-slate-400">
                                Đơn vị chưa có tài sản nào được đưa vào kho chia sẻ dùng chung.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })()}

            {dongGopSubTab === 'lichsumuon' && (() => {
              const dsMuon = phieuMuonList.filter(pm => pm.maPBMuon === currentUser.maPB);
              return (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b flex justify-between items-center">
                      <h3 className="font-bold text-slate-900 text-sm">Lịch Sử Các Đợt Lập Phiếu Mượn Thiết Bị Của Đơn Vị</h3>
                      {currentUser.vaiTro === 'NhanVien' && <button
                        onClick={() => setModalState(prev => ({ ...prev, lapMuon: true }))}
                        disabled={isDepartmentLocked}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow transition ${
                          isDepartmentLocked ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}>
                        <Plus className="w-3.5 h-3.5" /> + Đăng Ký Mượn Thiết Bị Mới (UC08)
                      </button>}
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-100 text-slate-600 uppercase font-semibold">
                          <tr>
                            <th className="p-3">Mã phiếu</th>
                            <th className="p-3">Mã TS</th>
                            <th className="p-3">Người mượn</th>
                            <th className="p-3">Ngày mượn</th>
                            <th className="p-3">Hạn trả</th>
                            <th className="p-3 text-center">Trạng thái</th>
                            <th className="p-3 text-center">Kiểm tra quá hạn (BR14)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {dsMuon.length > 0 ? (
                            dsMuon.map((pm) => (
                              <tr key={pm.maPM} className="hover:bg-slate-50 transition">
                                <td className="p-3 font-mono font-bold text-emerald-800">{pm.maPM}</td>
                                <td className="p-3 font-mono font-semibold text-slate-800">{dsTSCuaPhieu(pm.maPM).map(ct => ct.maTS).join(', ')}</td>
                                <td className="p-3 text-slate-700">{pm.maNguoiMuon}</td>
                                <td className="p-3 text-slate-600">{pm.ngayMuon}</td>
                                <td className="p-3 text-slate-600 font-semibold">{pm.ngayHenTra}</td>
                                <td className="p-3 text-center">
                                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                    pm.trangThai === 'ChoDuyet' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                                    pm.trangThai === 'DaDuyet' ? 'bg-teal-100 text-teal-800 border border-teal-200' :
                                    pm.trangThai === 'DangThucHien' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                                    pm.trangThai === 'HoanTat' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                                    'bg-rose-100 text-rose-800 border border-rose-200'
                                  }`}>
                                    {pm.trangThai}
                                  </span>
                                </td>
                                <td className="p-3 text-center">
                                  {pm.coQuaHan === 1 || pm.coQuaHan === true ? (
                                    <span className="px-2 py-0.5 bg-rose-100 text-rose-800 rounded font-bold border border-rose-200">
                                      Quá hạn BR14
                                    </span>
                                  ) : (
                                    <span className="text-emerald-700 font-medium">Đúng hạn</span>
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={7} className="p-8 text-center text-slate-400">
                                Đơn vị chưa có lịch sử mượn tài sản nào.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* TAB 7: QUẢN TRỊ HỆ THỐNG - DANH MỤC & THAM SỐ (UC02, UC03, UC04) */}
        {activeTab === 'quantri' && currentUser.vaiTro !== 'QuanTri' && (
          <div className="bg-rose-50 border border-rose-200 p-8 rounded-2xl text-center shadow-sm my-6">
            <ShieldAlert className="w-12 h-12 text-rose-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-rose-900 mb-1">TRUY CẬP BỊ TỪ CHỐI (ACCESS DENIED)</h3>
            <p className="text-xs text-rose-700 max-w-lg mx-auto mb-4">
              Bạn đang ở vai trò <strong>{currentUser.hoTen} ({currentUser.vaiTro})</strong>.
              Chức năng <strong>Quản trị hệ thống (UC02-04)</strong> gồm quản lý Phòng ban, Loại tài sản, Người dùng và Tham số chỉ dành riêng cho <strong>Quản trị viên (ND-AD01)</strong> theo đúng quy tắc phân quyền bảo mật RBAC.
            </p>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow transition"
            >
              Đăng xuất để đăng nhập bằng tài khoản Quản trị viên
            </button>
          </div>
        )}

        {activeTab === 'quantri' && currentUser.vaiTro === 'QuanTri' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-emerald-600" />
                  Phân Hệ 6: Quản Trị Hệ Thống, Danh Mục & Cấu Hình Tham Số
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Khớp đặc tả Use Case <strong>UC02 (Phòng ban)</strong>, <strong>UC03 (Loại tài sản)</strong>, và <strong>UC04 (Người dùng, Phân quyền & Tham số CAI)</strong>
                </p>
              </div>

              <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold overflow-x-auto max-w-full">
                {[
                  { id: 'phongban', label: '1. Phòng Ban (UC02)', icon: Building2 },
                  { id: 'loaitaisan', label: '2. Loại Tài Sản (UC03)', icon: Layers },
                  { id: 'nguoidung', label: '3. Cán Bộ & Phân Quyền (UC04)', icon: Users },
                  { id: 'thamso', label: '4. Cấu Hình 7 Tham Số (UC04)', icon: Sliders },
                ].map(sub => {
                  const SubIcon = sub.icon;
                  const isCur = adminSubTab === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setAdminSubTab(sub.id)}
                      className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 whitespace-nowrap ${
                        isCur ? 'bg-white text-emerald-800 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <SubIcon className={`w-3.5 h-3.5 ${isCur ? 'text-emerald-600' : 'text-slate-400'}`} />
                      {sub.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SUB-TAB 1: PHÒNG BAN (UC02) */}
            {adminSubTab === 'phongban' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Danh Mục Các Phòng Ban / Khoa / Viện / Trung Tâm Toàn Trường (UC02)</h3>
                    <p className="text-xs text-slate-500">Ràng buộc toàn vẹn khóa ngoại (BR16) và Chặn mượn mới khi đơn vị có phiếu quá hạn (BR13)</p>
                  </div>
                  {currentUser.vaiTro === 'QuanTri' && (
                    <button
                      onClick={() => setModalState(prev => ({ ...prev, themPhongBan: true }))}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition">
                      <FolderPlus className="w-4 h-4" /> + Thêm Phòng Ban Mới
                    </button>
                  )}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-600 uppercase font-semibold">
                      <tr>
                        <th className="p-3">Mã PB</th>
                        <th className="p-3">Tên phòng ban / khoa đào tạo</th>
                        <th className="p-3">Trưởng đơn vị</th>
                        <th className="p-3">Địa điểm</th>
                        <th className="p-3">Số điện thoại</th>
                        <th className="p-3 text-center">Trạng thái mượn (BR13)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {phongBanList.length > 0 ? (
                        phongBanList.map(pb => {
                          const isLocked = phieuMuonList.some(pm => pm.maPBMuon === pb.maPB && pm.trangThai === 'DangThucHien' && (pm.coQuaHan === 1 || pm.coQuaHan === true));
                          return (
                            <tr key={pb.maPB} className="hover:bg-slate-50 transition">
                              <td className="p-3 font-mono font-bold text-emerald-800">{pb.maPB}</td>
                              <td className="p-3 font-semibold text-slate-900">{pb.tenPB}</td>
                              <td className="p-3 text-slate-700">{pb.truongDonVi || '---'}</td>
                              <td className="p-3 text-slate-600">{pb.diaDiem || '---'}</td>
                              <td className="p-3 font-mono text-slate-600">{pb.soDienThoai || '---'}</td>
                              <td className="p-3 text-center">
                                {isLocked ? (
                                  <span className="px-2.5 py-1 bg-rose-100 text-rose-800 rounded-full font-bold border border-rose-200">
                                    Chặn mượn mới (BR13)
                                  </span>
                                ) : (
                                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-semibold border border-emerald-200">
                                    Được phép mượn
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-400">Chưa có dữ liệu phòng ban.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SUB-TAB 2: LOẠI TÀI SẢN (UC03) */}
            {adminSubTab === 'loaitaisan' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Danh Mục Phân Loại Trang Thiết Bị Toàn Trường (UC03)</h3>
                    <p className="text-xs text-slate-500">Phân nhóm thiết bị & Niên hạn sử dụng chuẩn (BR15: tối thiểu 8 năm trước khi thanh lý)</p>
                  </div>
                  {currentUser.vaiTro === 'QuanTri' && (
                    <button
                      onClick={() => setModalState(prev => ({ ...prev, themLoaiTS: true }))}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition">
                      <Plus className="w-4 h-4" /> + Thêm Loại Tài Sản Mới
                    </button>
                  )}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-600 uppercase font-semibold">
                      <tr>
                        <th className="p-3">Mã loại</th>
                        <th className="p-3">Tên loại tài sản</th>
                        <th className="p-3">Phân nhóm thiết bị</th>
                        <th className="p-3 text-center">Niên hạn sử dụng chuẩn</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {loaiTSList.length > 0 ? (
                        loaiTSList.map(lts => (
                          <tr key={lts.maLoaiTS} className="hover:bg-slate-50 transition">
                            <td className="p-3 font-mono font-bold text-emerald-800">{lts.maLoaiTS}</td>
                            <td className="p-3 font-semibold text-slate-900">{lts.tenLoaiTS}</td>
                            <td className="p-3 text-slate-700 font-mono">
                              <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-800 font-bold">
                                {lts.nhomTaiSan}
                              </span>
                            </td>
                            <td className="p-3 text-center font-bold text-emerald-700">{lts.nienHanNam} năm</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="p-8 text-center text-slate-400">Chưa có danh mục loại tài sản.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SUB-TAB 3: NGƯỜI DÙNG & PHÂN QUYỀN (UC04) */}
            {adminSubTab === 'nguoidung' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Quản Lý Danh Sách Người Dùng & Phân Quyền RBAC (UC04)</h3>
                    <p className="text-xs text-slate-500">Cấp phát tài khoản cán bộ/giáo viên, gán vai trò & quản lý kích hoạt/khóa tài khoản</p>
                  </div>
                  {currentUser.vaiTro === 'QuanTri' && (
                    <button
                      onClick={() => setModalState(prev => ({ ...prev, themNguoiDung: true }))}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition">
                      <UserPlus className="w-4 h-4" /> + Cấp Phát Tài Khoản Mới
                    </button>
                  )}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-600 uppercase font-semibold">
                      <tr>
                        <th className="p-3">Mã ND</th>
                        <th className="p-3">Họ và tên</th>
                        <th className="p-3">Username</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Đơn vị công tác</th>
                        <th className="p-3 text-center">Vai trò (RBAC)</th>
                        <th className="p-3 text-center">Trạng thái</th>
                        <th className="p-3 text-center">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {nguoiDungList.length > 0 ? (
                        nguoiDungList.map(nd => {
                          const pbName = phongBanList.find(p => p.maPB === nd.maPB)?.tenPB || nd.maPB;
                          const isActive = nd.trangThaiTK === 'HoatDong';
                          return (
                            <tr key={nd.maND} className="hover:bg-slate-50 transition">
                              <td className="p-3 font-mono font-bold text-emerald-800">{nd.maND}</td>
                              <td className="p-3 font-bold text-slate-900">{nd.hoTen}</td>
                              <td className="p-3 font-mono text-slate-600">{nd.tenDangNhap}</td>
                              <td className="p-3 text-slate-600">{nd.email}</td>
                              <td className="p-3 text-slate-800">{pbName}</td>
                              <td className="p-3 text-center">
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                  nd.vaiTro === 'ThuKho' ? 'bg-amber-100 text-amber-800' :
                                  nd.vaiTro === 'LanhDao' ? 'bg-purple-100 text-purple-800' :
                                  nd.vaiTro === 'QuanTri' ? 'bg-rose-100 text-rose-800' :
                                  'bg-emerald-100 text-emerald-800'
                                }`}>
                                  {nd.vaiTro}
                                </span>
                              </td>
                              <td className="p-3 text-center">
                                <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                                  isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                }`}>
                                  {isActive ? 'Hoạt động' : 'Đang khóa'}
                                </span>
                              </td>
                              <td className="p-3 text-center">
                                {currentUser.vaiTro === 'QuanTri' && (
                                  <button
                                    onClick={() => handleToggleUserStatus(nd.maND)}
                                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 mx-auto transition ${
                                      isActive ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200' :
                                      'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                                    }`}
                                  >
                                    {isActive ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                                    {isActive ? 'Khóa TK' : 'Mở khóa'}
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={8} className="p-8 text-center text-slate-400">Chưa có danh sách người dùng.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SUB-TAB 4: THAM SỐ CAI (UC04 - BR18) */}
            {adminSubTab === 'thamso' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Cấu Hình 7 Tham Số Kinh Tế Giả Định Tính Toán Chỉ Số CAI & NCAV (UC04)</h3>
                    <p className="text-xs text-slate-500">Khớp 100% với 4 giả định kinh tế trong Mục 3.3.4 Báo cáo tiểu luận & Quy tắc BR15, BR18</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-600 uppercase font-semibold">
                      <tr>
                        <th className="p-3">Mã tham số</th>
                        <th className="p-3">Tên tham số kinh tế</th>
                        <th className="p-3 text-right">Giá trị thiết lập</th>
                        <th className="p-3 text-center">Đơn vị tính</th>
                        <th className="p-3 text-center">Ngày cập nhật</th>
                        <th className="p-3 text-center">Hiệu chỉnh</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {thamSoCAIList.length > 0 ? (
                        thamSoCAIList.map(ts => (
                          <tr key={ts.maThamSo} className="hover:bg-slate-50 transition">
                            <td className="p-3 font-mono font-bold text-emerald-800">{ts.maThamSo}</td>
                            <td className="p-3 font-bold text-slate-800">{ts.tenThamSo}</td>
                            <td className="p-3 text-right font-mono font-extrabold text-emerald-700 text-sm">
                              {Number(ts.giaTri).toLocaleString('vi-VN')}
                            </td>
                            <td className="p-3 text-center font-semibold text-slate-600">{ts.donViTinh}</td>
                            <td className="p-3 text-center text-slate-500">{ts.ngayCapNhat || 'Hệ thống'}</td>
                            <td className="p-3 text-center">
                              {currentUser.vaiTro === 'QuanTri' && (
                                <button
                                  onClick={() => {
                                    setFormSuaThamSo({
                                      maThamSo: ts.maThamSo,
                                      tenThamSo: ts.tenThamSo,
                                      giaTri: ts.giaTri,
                                      donViTinh: ts.donViTinh
                                    });
                                    setModalState(prev => ({ ...prev, suaThamSo: ts }));
                                  }}
                                  className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 rounded font-bold border text-[11px] transition"
                                >
                                  Sửa giá trị
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-400">Chưa có danh sách tham số CAI.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ============================================================== */}
      {/* 4. MODALS NGHIỆP VỤ (KHỚP 100% CÁC SƠ ĐỒ USE CASE & SEQUENCES) */}
      {/* ============================================================== */}

      {/* MODAL 1: LẬP YÊU CẦU MƯỢN (UC08 - BR02, BR03, BR05, BR13) */}
      {modalState.lapMuon && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-3 border-b">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" /> Lập Yêu Cầu Mượn Thiết Bị (UC08)
              </h3>
              <button onClick={() => setModalState(prev => ({ ...prev, lapMuon: false }))} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmitLapMuon} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Chọn một hoặc nhiều thiết bị muốn mượn (*):</label>
              {isDepartmentLocked && (
                <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-xs text-rose-800 mb-3 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Tạm chặn mượn mới:</strong> {lyDoKhoaMuon}.</span>
                </div>
              )}

                <div className="max-h-48 overflow-y-auto border rounded-xl divide-y bg-slate-50">
                  {taiSanList
                    .filter(ts => ts.trangThai === 'SanSangChiaSe')
                    .filter(ts => ts.maPBSoHuu !== currentUser.maPB)
                    .map(ts => {
                      const pbName = phongBanList.find(p => p.maPB === ts.maPBSoHuu)?.tenPB || ts.maPBSoHuu;
                      const daChon = formMuon.dsMaTS.includes(ts.maTS);
                      return (
                        <label key={ts.maTS} className={`flex items-center gap-2 p-2 cursor-pointer ${daChon ? 'bg-emerald-50' : ''}`}>
                          <input
                            type="checkbox"
                            checked={daChon}
                            disabled={isDepartmentLocked}
                            onChange={(e) => setFormMuon(prev => ({
                              ...prev,
                              dsMaTS: e.target.checked ? [...prev.dsMaTS, ts.maTS] : prev.dsMaTS.filter(m => m !== ts.maTS)
                            }))}
                          />
                          <span className="font-semibold text-slate-800">{ts.maTS} - {ts.tenTS}</span>
                          <span className="text-slate-500">(Thuộc: {pbName}, hiện trạng {ts.hienTrang}%)</span>
                        </label>
                      );
                    })}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  * <strong>BR03, BR05</strong>: Chỉ hiển thị thiết bị Sẵn sàng chia sẻ của khoa khác. Các thiết bị được chọn dùng chung một khoảng thời gian mượn (tối đa 30 ngày - BR02).
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Ngày bắt đầu mượn:</label>
                  <input
                    type="date"
                    value={formMuon.ngayMuon}
                    onChange={(e) => setFormMuon(prev => ({ ...prev, ngayMuon: e.target.value }))}
                    required
                    className="w-full p-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Ngày hẹn trả:</label>
                  <input
                    type="date"
                    value={formMuon.ngayHenTra}
                    onChange={(e) => setFormMuon(prev => ({ ...prev, ngayHenTra: e.target.value }))}
                    required
                    className="w-full p-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Mục đích sử dụng chung:</label>
                <textarea
                  rows={2}
                  value={formMuon.mucDichSuDung}
                  onChange={(e) => setFormMuon(prev => ({ ...prev, mucDichSuDung: e.target.value }))}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Ghi chú cho các thiết bị (GhiChuMucDich):</label>
                <input
                  type="text"
                  value={formMuon.ghiChuMucDich}
                  onChange={(e) => setFormMuon(prev => ({ ...prev, ghiChuMucDich: e.target.value }))}
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setModalState(prev => ({ ...prev, lapMuon: false }))}
                  className="px-4 py-2 border rounded-xl text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isDepartmentLocked || !formMuon.dsMaTS.length}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-xl font-bold shadow"
                >
                  Gửi yêu cầu ({formMuon.dsMaTS.length} thiết bị)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: DUYỆT PHIẾU MƯỢN (BR05, BR07) */}
      {modalState.duyetMuon && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="font-bold text-slate-900 text-base mb-2">Phê Duyệt Phiếu Mượn: {modalState.duyetMuon.maPM}</h3>
            <p className="text-xs text-slate-500 mb-4">
              Người yêu cầu: <strong>{modalState.duyetMuon.maNguoiMuon}</strong> ({modalState.duyetMuon.maPBMuon}) -
              Thời gian: {modalState.duyetMuon.ngayMuon} → {modalState.duyetMuon.ngayHenTra}<br />
              Thiết bị: <strong>{dsTSCuaPhieu(modalState.duyetMuon.maPM).map(ct => `${ct.maTS} (${tenTaiSan(ct.maTS)})`).join(', ')}</strong><br />
              Mục đích: {modalState.duyetMuon.mucDichSuDung}
            </p>
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Hành động phê duyệt:</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="hanhDong"
                      value="Duyet"
                      checked={formDuyetMuon.hanhDong === 'Duyet'}
                      onChange={() => setFormDuyetMuon(prev => ({ ...prev, hanhDong: 'Duyet' }))}
                    />
                    <span className="font-semibold text-emerald-700">Duyệt (kiểm tra trùng lịch BR04)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="hanhDong"
                      value="TuChoi"
                      checked={formDuyetMuon.hanhDong === 'TuChoi'}
                      onChange={() => setFormDuyetMuon(prev => ({ ...prev, hanhDong: 'TuChoi' }))}
                    />
                    <span className="font-semibold text-rose-700">Từ chối</span>
                  </label>
                </div>
              </div>

              {formDuyetMuon.hanhDong === 'TuChoi' && (
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Lý do từ chối (*):</label>
                  <textarea
                    rows={2}
                    value={formDuyetMuon.lyDoTuChoi}
                    onChange={(e) => setFormDuyetMuon(prev => ({ ...prev, lyDoTuChoi: e.target.value }))}
                    className="w-full p-2 border rounded-xl"
                    placeholder="Nhập lý do từ chối cấp máy..."
                  />
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  onClick={() => setModalState(prev => ({ ...prev, duyetMuon: null }))}
                  className="px-4 py-2 border rounded-xl text-slate-600 font-semibold"
                >
                  Đóng
                </button>
                <button
                  onClick={handleSubmitDuyetMuon}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow"
                >
                  Xác nhận Xử lý
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: HỦY PHIẾU MƯỢN KHI CHỜ DUYỆT (BR17) */}
      {modalState.huyMuon && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="font-bold text-rose-700 text-base mb-2">Hủy Phiếu Mượn: {modalState.huyMuon.maPM}</h3>
            <p className="text-xs text-slate-500 mb-4">
              Theo quy tắc BR17: Người tạo phiếu (hoặc Thủ kho) chỉ được hủy khi phiếu đang Chờ duyệt.
            </p>
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Lý do hủy yêu cầu (*):</label>
                <textarea
                  rows={2}
                  value={formHuyMuon.lyDoHuy}
                  onChange={(e) => setFormHuyMuon(prev => ({ ...prev, lyDoHuy: e.target.value }))}
                  className="w-full p-2 border rounded-xl"
                  placeholder="Nhập lý do rút lại yêu cầu mượn..."
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  onClick={() => setModalState(prev => ({ ...prev, huyMuon: null }))}
                  className="px-4 py-2 border rounded-xl text-slate-600 font-semibold"
                >
                  Đóng
                </button>
                <button
                  onClick={handleSubmitHuyMuon}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow"
                >
                  Xác nhận Hủy Phiếu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: BÀN GIAO XUẤT KHO (UC10 - BR06, BR07) - kiểm tra từng thiết bị */}
      {modalState.banGiao && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-slate-900 text-base mb-1">Bàn Giao Thiết Bị Xuất Kho: {modalState.banGiao.maPM}</h3>
            <p className="text-xs text-slate-500 mb-4">
              Thủ kho: <strong>{currentUser.hoTen}</strong> - Người nhận: <strong>{modalState.banGiao.maNguoiMuon}</strong> ({modalState.banGiao.maPBMuon}) - Hạn trả: {modalState.banGiao.ngayHenTra}
            </p>
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Danh sách phụ kiện kèm theo:</label>
                <input
                  type="text"
                  value={formBanGiao.phuKien}
                  onChange={(e) => setFormBanGiao(prev => ({ ...prev, phuKien: e.target.value }))}
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <span className="font-semibold text-slate-700 block">Đồng kiểm tra từng thiết bị trong phiếu:</span>
                {Object.entries(formBanGiao.items).map(([maTS, it]) => (
                  <div key={maTS} className={`p-3 rounded-xl border ${it.coLoiNgoaiQuan ? 'bg-rose-50 border-rose-200' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="font-bold text-slate-900 mb-1.5">{maTS} - {tenTaiSan(maTS)}</div>
                    <input
                      type="text"
                      placeholder="Tình trạng trước khi giao (TinhTrangTruoc)"
                      value={it.tinhTrangTruoc}
                      onChange={(e) => capNhatItemBanGiao(maTS, 'tinhTrangTruoc', e.target.value)}
                      className="w-full p-2 border rounded-lg bg-white mb-2"
                    />
                    <label className="flex items-center gap-2 font-semibold text-slate-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={it.coLoiNgoaiQuan}
                        onChange={(e) => capNhatItemBanGiao(maTS, 'coLoiNgoaiQuan', e.target.checked)}
                      />
                      <span>Phát hiện lỗi khi thử máy / thiếu phụ kiện</span>
                    </label>
                    {it.coLoiNgoaiQuan && (
                      <input
                        type="text"
                        placeholder="Mô tả lỗi (ghi vào Lịch sử sự cố)..."
                        value={it.moTaLoi}
                        onChange={(e) => capNhatItemBanGiao(maTS, 'moTaLoi', e.target.value)}
                        className="w-full p-2 border rounded-lg bg-white mt-2"
                      />
                    )}
                  </div>
                ))}
                {!Object.keys(formBanGiao.items).length && (
                  <div className="p-3 text-slate-400">Không tải được danh sách thiết bị của phiếu.</div>
                )}
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900">
                <strong>BR06:</strong> Nếu bất kỳ máy nào lỗi, chọn <strong>Hủy bàn giao</strong>: máy lỗi chuyển sang Cần bảo dưỡng, cả phiếu chuyển Đã hủy,
                các máy còn lại giữ Sẵn sàng chia sẻ để người mượn lập phiếu mới.
                <input
                  type="text"
                  placeholder="Lý do hủy bàn giao (khi chọn Hủy)..."
                  value={formBanGiao.lyDoHuy}
                  onChange={(e) => setFormBanGiao(prev => ({ ...prev, lyDoHuy: e.target.value }))}
                  className="w-full p-2 border rounded-lg bg-white mt-2"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button onClick={() => setModalState(prev => ({ ...prev, banGiao: null }))} className="px-4 py-2 border rounded-xl text-slate-600 font-semibold">
                  Đóng
                </button>
                <button onClick={() => handleSubmitBanGiao('Huy')} className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow">
                  Hủy bàn giao (hủy cả phiếu)
                </button>
                <button onClick={() => handleSubmitBanGiao('DaGiao')} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow">
                  Ký xác nhận bàn giao
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: THU HỒI & ĐÁNH GIÁ HAO MÒN TỪNG MÁY (UC11 - BR08, BR09) */}
      {modalState.thuHoi && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-slate-900 text-base mb-1">Biên Bản Thu Hồi Thiết Bị: {modalState.thuHoi.maPM}</h3>
            <p className="text-xs text-slate-500 mb-4">
              Người trả: <strong>{modalState.thuHoi.maNguoiMuon}</strong> - Hạn trả: {modalState.thuHoi.ngayHenTra}
              {modalState.thuHoi.coQuaHan && <span className="ml-2 text-rose-700 font-bold">(Phiếu quá hạn - cờ CoQuaHan được giữ lại để lưu vết BR14)</span>}
            </p>
            <div className="space-y-4 text-xs">
              {Object.entries(formThuHoi.items).map(([maTS, it]) => (
                <div key={maTS} className={`p-3 rounded-xl border space-y-2 ${it.tinhTrangSau === 'Tot' ? 'bg-slate-50 border-slate-200' : 'bg-rose-50 border-rose-200'}`}>
                  <div className="font-bold text-slate-900">{maTS} - {tenTaiSan(maTS)}
                    <span className="font-normal text-slate-500"> (hiện trạng trước mượn: {taiSanList.find(t => t.maTS === maTS)?.hienTrang}%)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={it.tinhTrangSau}
                      onChange={(e) => capNhatItemThuHoi(maTS, 'tinhTrangSau', e.target.value)}
                      className="w-full p-2 border rounded-lg bg-white"
                    >
                      <option value="Tot">Tốt (Sẵn sàng tái chia sẻ)</option>
                      <option value="CanBaoTri">Cần bảo trì / Hiệu chuẩn</option>
                      <option value="HuHong">Hư hỏng (Yêu cầu bồi thường)</option>
                    </select>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Tỷ lệ hao mòn (%)"
                      value={it.tyLeHaoMon}
                      onChange={(e) => capNhatItemThuHoi(maTS, 'tyLeHaoMon', e.target.value)}
                      className="w-full p-2 border rounded-lg bg-white"
                    />
                  </div>
                  {it.tinhTrangSau !== 'Tot' && (
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Mô tả hư hỏng / thiếu phụ kiện..."
                        value={it.moTaHuHong}
                        onChange={(e) => capNhatItemThuHoi(maTS, 'moTaHuHong', e.target.value)}
                        className="w-full p-2 border rounded-lg bg-white"
                      />
                      <input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="Mức độ thiệt hại (%)"
                        value={it.mucDoThietHai}
                        onChange={(e) => capNhatItemThuHoi(maTS, 'mucDoThietHai', e.target.value)}
                        className="w-full p-2 border rounded-lg bg-white"
                      />
                      <span className="col-span-2 text-rose-800">
                        Bồi thường ước tính = {it.mucDoThietHai || 0}% × nguyên giá ={' '}
                        <strong>{Math.round(Number(it.mucDoThietHai || 0) / 100 * Number(taiSanList.find(t => t.maTS === maTS)?.nguyenGia || 0)).toLocaleString('vi-VN')} đ</strong>
                      </span>
                    </div>
                  )}
                </div>
              ))}

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Ghi chú chung của biên bản:</label>
                <textarea
                  rows={2}
                  value={formThuHoi.ghiChu}
                  onChange={(e) => setFormThuHoi(prev => ({ ...prev, ghiChu: e.target.value }))}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button onClick={() => setModalState(prev => ({ ...prev, thuHoi: null }))} className="px-4 py-2 border rounded-xl text-slate-600 font-semibold">
                  Đóng
                </button>
                <button onClick={handleSubmitThuHoi} className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold shadow">
                  Ký xác nhận thu hồi & đóng phiếu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 6: LẬP PHIẾU BẢO DƯỠNG (BR11) */}
      {modalState.lapBaoDuong && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="font-bold text-slate-900 text-base mb-1">Lập Phiếu Bảo Dưỡng / Sửa Chữa (UC13)</h3>
            <p className="text-xs text-slate-500 mb-4">Khởi tạo phiếu sửa chữa đưa tài sản vào trạng thái DangBaoDuong</p>
            <form onSubmit={handleSubmitLapBaoDuong} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Chọn tài sản cần sửa chữa (*):</label>
                <select
                  value={formBaoDuong.maTS}
                  onChange={(e) => setFormBaoDuong(prev => ({ ...prev, maTS: e.target.value }))}
                  required
                  className="w-full p-2.5 border rounded-xl"
                >
                  <option value="">-- Chọn tài sản đang Cần bảo dưỡng --</option>
                  {taiSanList.filter(ts => ts.trangThai === 'CanBaoDuong').map(ts => (
                    <option key={ts.maTS} value={ts.maTS}>{ts.maTS} - {ts.tenTS} ({ts.hienTrang}%)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Đơn vị sửa chữa ngoài:</label>
                <input
                  type="text"
                  value={formBaoDuong.donViSuaChua}
                  onChange={(e) => setFormBaoDuong(prev => ({ ...prev, donViSuaChua: e.target.value }))}
                  required
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nội dung sửa chữa:</label>
                <textarea
                  rows={2}
                  value={formBaoDuong.noiDungSuaChua}
                  onChange={(e) => setFormBaoDuong(prev => ({ ...prev, noiDungSuaChua: e.target.value }))}
                  required
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
                <span className="font-bold text-amber-900 block">Hạng mục thay thế linh kiện (ChiTietHangMuc):</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Hạng mục sửa..."
                    value={formBaoDuong.hangMuc}
                    onChange={(e) => setFormBaoDuong(prev => ({ ...prev, hangMuc: e.target.value }))}
                    className="w-full p-2 border rounded-lg bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Linh kiện thay thế..."
                    value={formBaoDuong.linhKien}
                    onChange={(e) => setFormBaoDuong(prev => ({ ...prev, linhKien: e.target.value }))}
                    className="w-full p-2 border rounded-lg bg-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Đơn giá (VNĐ)"
                    value={formBaoDuong.donGia}
                    onChange={(e) => setFormBaoDuong(prev => ({ ...prev, donGia: e.target.value }))}
                    className="w-full p-2 border rounded-lg bg-white"
                  />
                  <input
                    type="number"
                    placeholder="Số lượng"
                    value={formBaoDuong.soLuong}
                    onChange={(e) => setFormBaoDuong(prev => ({ ...prev, soLuong: e.target.value }))}
                    className="w-full p-2 border rounded-lg bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button type="button" onClick={() => setModalState(prev => ({ ...prev, lapBaoDuong: false }))} className="px-4 py-2 border rounded-xl text-slate-600 font-semibold">
                  Hủy
                </button>
                <button type="submit" className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold shadow">
                  Xác nhận Lập Phiếu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 7: NGHIỆM THU BẢO DƯỠNG KỸ THUẬT (BR12) */}
      {modalState.nghiemThu && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="font-bold text-slate-900 text-base mb-1">Nghiệm Thu Kỹ Thuật: {modalState.nghiemThu.maPBD}</h3>
            <p className="text-xs text-slate-500 mb-4">
              Tài sản: <strong>{modalState.nghiemThu.maTS}</strong> - Người nghiệm thu: <strong>{currentUser.hoTen}</strong>
            </p>
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Hiện trạng kỹ thuật sau sửa (%):</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formNghiemThu.hienTrangSauSuaChua}
                    onChange={(e) => setFormNghiemThu(prev => ({ ...prev, hienTrangSauSuaChua: e.target.value }))}
                    className="w-full p-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Kết luận kiểm định (BR12):</label>
                  <select
                    value={formNghiemThu.ketLuan}
                    onChange={(e) => setFormNghiemThu(prev => ({ ...prev, ketLuan: e.target.value }))}
                    className="w-full p-2 border rounded-xl font-bold"
                  >
                    <option value="Dat">ĐẠT, hiện trạng ≥ 50% (về Sẵn sàng chia sẻ)</option>
                    <option value="KhongTheSua">KHÔNG THỂ SỬA (chuyển Đề xuất thanh lý)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Đơn vị sửa chữa (BR11):</label>
                <input
                  type="text"
                  value={formNghiemThu.donViSuaChua}
                  onChange={(e) => setFormNghiemThu(prev => ({ ...prev, donViSuaChua: e.target.value }))}
                  className="w-full p-2 border rounded-xl mb-3"
                />
                <label className="font-semibold text-slate-700 block mb-1">Nội dung kỹ thuật đã xử lý (BR11):</label>
                <textarea
                  rows={2}
                  value={formNghiemThu.noiDungSuaChua}
                  onChange={(e) => setFormNghiemThu(prev => ({ ...prev, noiDungSuaChua: e.target.value }))}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button onClick={() => setModalState(prev => ({ ...prev, nghiemThu: null }))} className="px-4 py-2 border rounded-xl text-slate-600 font-semibold">
                  Đóng
                </button>
                <button onClick={handleSubmitNghiemThu} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow">
                  Xác nhận Nghiệm Thu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 8: ĐỀ XUẤT THANH LÝ (BR13) */}
      {modalState.deXuatThanhLy && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="font-bold text-purple-900 text-base mb-1">Lập Hồ Sơ Đề Xuất Thanh Lý (UC14 - BR15)</h3>
            <p className="text-xs text-slate-500 mb-4">Hệ thống kiểm tra tự động 1 trong 3 căn cứ: hết niên hạn loại tài sản, chi phí sửa lũy kế ≥ 70% nguyên giá, hoặc phiếu bảo dưỡng gần nhất kết luận Không thể sửa</p>
            <form onSubmit={handleSubmitDeXuatThanhLy} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Chọn tài sản muốn thanh lý (*):</label>
                <select
                  value={formThanhLy.maTS}
                  onChange={(e) => setFormThanhLy(prev => ({ ...prev, maTS: e.target.value }))}
                  required
                  className="w-full p-2.5 border rounded-xl"
                >
                  <option value="">-- Chọn tài sản --</option>
                  {taiSanList
                    .filter(ts => ['SanSangChiaSe', 'CanBaoDuong', 'DeXuatThanhLy'].includes(ts.trangThai))
                    .filter(ts => !thanhLyList.some(tl => tl.maTS === ts.maTS && tl.trangThai === 'ChoDuyet'))
                    .map(ts => (
                    <option key={ts.maTS} value={ts.maTS}>{ts.maTS} - {ts.tenTS} ({ts.trangThai}, mua {ts.namMua})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Lý do đề xuất thanh lý (*):</label>
                <textarea
                  rows={3}
                  value={formThanhLy.lyDoDeXuat}
                  onChange={(e) => setFormThanhLy(prev => ({ ...prev, lyDoDeXuat: e.target.value }))}
                  required
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button type="button" onClick={() => setModalState(prev => ({ ...prev, deXuatThanhLy: false }))} className="px-4 py-2 border rounded-xl text-slate-600 font-semibold">
                  Hủy
                </button>
                <button type="submit" className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold shadow">
                  Gửi Hồ Sơ Lên Lãnh Đạo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 9: PHÊ DUYỆT THANH LÝ CỦA LÃNH ĐẠO (BR14, BR15) */}
      {modalState.pheDuyetThanhLy && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="font-bold text-slate-900 text-base mb-1">Phê Duyệt Hồ Sơ Thanh Lý: {modalState.pheDuyetThanhLy.maHSTL}</h3>
            <p className="text-xs text-slate-500 mb-4">
              Tài sản: <strong>{modalState.pheDuyetThanhLy.maTS} - {tenTaiSan(modalState.pheDuyetThanhLy.maTS)}</strong> - Lý do: {modalState.pheDuyetThanhLy.lyDoDeXuat}
            </p>
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Ý kiến phê duyệt:</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="hanhDongTL"
                      value="Duyet"
                      checked={formPheDuyetThanhLy.hanhDong === 'Duyet'}
                      onChange={() => setFormPheDuyetThanhLy(prev => ({ ...prev, hanhDong: 'Duyet' }))}
                    />
                    <span className="font-semibold text-emerald-700">Ký duyệt thanh lý</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="hanhDongTL"
                      value="BacBo"
                      checked={formPheDuyetThanhLy.hanhDong === 'BacBo'}
                      onChange={() => setFormPheDuyetThanhLy(prev => ({ ...prev, hanhDong: 'BacBo' }))}
                    />
                    <span className="font-semibold text-rose-700">Bác bỏ</span>
                  </label>
                </div>
              </div>

              {formPheDuyetThanhLy.hanhDong === 'Duyet' && (
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Số Quyết định thanh lý (*):</label>
                  <input
                    type="text"
                    value={formPheDuyetThanhLy.soQuyetDinh}
                    onChange={(e) => setFormPheDuyetThanhLy(prev => ({ ...prev, soQuyetDinh: e.target.value }))}
                    className="w-full p-2 border rounded-xl font-mono font-bold"
                  />
                </div>
              )}

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Ý kiến chỉ đạo:</label>
                <textarea
                  rows={2}
                  value={formPheDuyetThanhLy.ghiChuDuyet}
                  onChange={(e) => setFormPheDuyetThanhLy(prev => ({ ...prev, ghiChuDuyet: e.target.value }))}
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button onClick={() => setModalState(prev => ({ ...prev, pheDuyetThanhLy: null }))} className="px-4 py-2 border rounded-xl text-slate-600 font-semibold">
                  Đóng
                </button>
                <button onClick={handleSubmitPheDuyetThanhLy} className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold shadow">
                  Ký Duyệt Hồ Sơ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 10: KHAI BÁO TÀI SẢN NHÀN RỖI (UC05 - BR01) */}
      {modalState.khaiBaoTS && (() => {
        const nhom = loaiTSList.find(l => l.maLoaiTS === formKhaiBaoTS.maLoaiTS)?.nhomTaiSan;
        const o = (field, label, props = {}) => (
          <div>
            <label className="font-semibold text-slate-700 block mb-1">{label}</label>
            <input
              value={formKhaiBaoTS[field]}
              onChange={(e) => setFormKhaiBaoTS(prev => ({ ...prev, [field]: e.target.value }))}
              className="w-full p-2 border rounded-xl"
              {...props}
            />
          </div>
        );
        return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-slate-900 text-base mb-1">Đăng Ký Tài Sản Nhàn Rỗi (UC05)</h3>
            <p className="text-xs text-slate-500 mb-4">
              Phòng ban sở hữu: <strong>{currentUser.tenPB}</strong>. Mã tài sản do hệ thống tự sinh; trạng thái ban đầu: Mới, chờ Thủ kho kiểm nhận (BR01, BR21).
            </p>
            <form onSubmit={handleSubmitKhaiBaoTS} className="space-y-3 text-xs">
              {o('tenTS', 'Tên tài sản (*):', { required: true })}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Loại tài sản (*):</label>
                  <select
                    value={formKhaiBaoTS.maLoaiTS}
                    onChange={(e) => setFormKhaiBaoTS(prev => ({ ...prev, maLoaiTS: e.target.value }))}
                    required
                    className="w-full p-2 border rounded-xl"
                  >
                    <option value="">-- Chọn loại --</option>
                    {loaiTSList.map(lts => (
                      <option key={lts.maLoaiTS} value={lts.maLoaiTS}>{lts.tenLoaiTS} ({lts.nhomTaiSan})</option>
                    ))}
                  </select>
                </div>
                {o('soSeri', 'Số seri (*, không trùng):', { required: true, className: 'w-full p-2 border rounded-xl font-mono' })}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {o('nguyenGia', 'Nguyên giá VNĐ (*):', { type: 'number', min: 1, required: true })}
                {o('namMua', 'Năm đưa vào SD (*):', { type: 'number', min: 1990, max: new Date().getFullYear(), required: true })}
                {o('hienTrang', 'Hiện trạng % (*, ≥ 50):', { type: 'number', min: 0, max: 100, required: true })}
              </div>
              {o('viTriLuuTru', 'Vị trí lưu trữ:')}
              {o('hinhAnh', 'Đường dẫn hình ảnh:')}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Mô tả / thông số kỹ thuật:</label>
                <textarea
                  rows={2}
                  value={formKhaiBaoTS.moTa}
                  onChange={(e) => setFormKhaiBaoTS(prev => ({ ...prev, moTa: e.target.value }))}
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              {/* Thuộc tính riêng theo nhóm tài sản (Single Table Inheritance - Hình 9) */}
              {nhom === 'DoDac' && (
                <div className="grid grid-cols-2 gap-3 p-3 bg-sky-50 border border-sky-200 rounded-xl">
                  {o('doChinhXac', 'Độ chính xác:')}
                  {o('chuKyKiemDinh', 'Chu kỳ kiểm định (tháng):', { type: 'number', min: 1 })}
                </div>
              )}
              {nhom === 'CNTT' && (
                <div className="grid grid-cols-2 gap-3 p-3 bg-sky-50 border border-sky-200 rounded-xl">
                  {o('cauHinhCPU', 'Cấu hình CPU:')}
                  {o('dungLuongRAM', 'Dung lượng RAM:')}
                </div>
              )}
              {nhom === 'ThietBiChung' && (
                <div className="grid grid-cols-2 gap-3 p-3 bg-sky-50 border border-sky-200 rounded-xl">
                  {o('congSuat', 'Công suất:')}
                  {o('phuKienDiKem', 'Phụ kiện đi kèm:')}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button type="button" onClick={() => setModalState(prev => ({ ...prev, khaiBaoTS: false }))} className="px-4 py-2 border rounded-xl text-slate-600 font-semibold">
                  Hủy
                </button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow">
                  Lưu Khai Báo
                </button>
              </div>
            </form>
          </div>
        </div>
        );
      })()}

      {/* MODAL: KIỂM NHẬN TÀI SẢN MỚI (UC12 - BR21) */}
      {modalState.kiemNhan && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="font-bold text-slate-900 text-base mb-1">Kiểm Nhận Tài Sản: {modalState.kiemNhan.maTS}</h3>
            <p className="text-xs text-slate-500 mb-4">
              {modalState.kiemNhan.tenTS} - Số seri: <strong>{modalState.kiemNhan.soSeri}</strong> - Đơn vị khai báo: {phongBanList.find(p => p.maPB === modalState.kiemNhan.maPBSoHuu)?.tenPB || modalState.kiemNhan.maPBSoHuu}
            </p>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nguyên giá xác nhận (VNĐ):</label>
                  <input type="number" min="1" value={formKiemNhan.nguyenGia}
                    onChange={(e) => setFormKiemNhan(prev => ({ ...prev, nguyenGia: e.target.value }))}
                    className="w-full p-2 border rounded-xl font-mono" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Hiện trạng thực tế (%):</label>
                  <input type="number" min="0" max="100" value={formKiemNhan.hienTrang}
                    onChange={(e) => setFormKiemNhan(prev => ({ ...prev, hienTrang: e.target.value }))}
                    className="w-full p-2 border rounded-xl" />
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Ghi chú kiểm nhận:</label>
                <input type="text" value={formKiemNhan.ghiChu}
                  onChange={(e) => setFormKiemNhan(prev => ({ ...prev, ghiChu: e.target.value }))}
                  className="w-full p-2 border rounded-xl" />
              </div>
              <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-sky-900">
                <strong>BR21:</strong> Hiện trạng đạt ngưỡng tối thiểu (50%) thì tài sản vào kho dùng chung (Sẵn sàng chia sẻ); dưới ngưỡng thì chuyển Cần bảo dưỡng.
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button onClick={() => setModalState(prev => ({ ...prev, kiemNhan: null }))} className="px-4 py-2 border rounded-xl text-slate-600 font-semibold">
                  Đóng
                </button>
                <button onClick={handleSubmitKiemNhan} className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold shadow">
                  Xác nhận kiểm nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 11: LỊCH SỬ TRẠNG THÁI TÀI SẢN */}
      {modalState.lichSuTaiSan && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[85vh] flex flex-col">
            <div className="flex justify-between items-center mb-3 pb-3 border-b">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <History className="w-5 h-5 text-emerald-600" />
                Lịch Sử Trạng Thái: {modalState.lichSuTaiSan.maTS}
              </h3>
              <button onClick={() => setModalState(prev => ({ ...prev, lichSuTaiSan: null }))} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 space-y-3 pr-1 text-xs">
              {lichSuChiTiet.length > 0 ? (
                lichSuChiTiet.map((ls, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                    <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg font-bold font-mono">
                      #{ls.maLichSu || idx+1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-900">
                          {ls.trangThaiCu || 'Khởi tạo'} <ArrowRight className="inline w-3 h-3 text-slate-400" /> <span className="text-emerald-700">{ls.trangThaiMoi}</span>
                        </span>
                        <span className="text-[11px] text-slate-400">{ls.ngayThayDoi?.replace('T', ' ').slice(0, 16)}</span>
                      </div>
                      <p className="text-slate-600 mt-1">{ls.lyDo || 'Cập nhật tự động qua quy trình hệ thống'}</p>
                      <div className="text-[11px] text-slate-400 mt-0.5">Thực hiện bởi: {ls.maNguoiThucHien || '---'}{ls.maPM ? ` - Phiếu: ${ls.maPM}` : ''}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-400">
                  Chưa có bản ghi lịch sử trạng thái nào cho thiết bị này.
                </div>
              )}
            </div>
            <div className="pt-3 border-t text-right">
              <button
                onClick={() => setModalState(prev => ({ ...prev, lichSuTaiSan: null }))}
                className="px-4 py-2 bg-slate-800 text-white rounded-xl font-bold text-xs"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL MỚI 1: THÊM PHÒNG BAN MỚI (UC02) */}
      {modalState.themPhongBan && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-4 pb-3 border-b">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-emerald-600" /> Thêm Phòng Ban / Khoa Mới (UC02)
              </h3>
              <button onClick={() => setModalState(prev => ({ ...prev, themPhongBan: false }))} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmitThemPhongBan} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Mã phòng ban (Ví dụ: PB06):</label>
                <input
                  type="text"
                  value={formPhongBan.maPB}
                  onChange={(e) => setFormPhongBan(prev => ({ ...prev, maPB: e.target.value }))}
                  required
                  className="w-full p-2.5 border rounded-xl font-mono"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Tên phòng ban / khoa:</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Khoa Quản lý Đất đai"
                  value={formPhongBan.tenPB}
                  onChange={(e) => setFormPhongBan(prev => ({ ...prev, tenPB: e.target.value }))}
                  required
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Trưởng đơn vị:</label>
                <input
                  type="text"
                  placeholder="Ví dụ: PGS.TS. Nguyễn Văn A"
                  value={formPhongBan.truongDonVi}
                  onChange={(e) => setFormPhongBan(prev => ({ ...prev, truongDonVi: e.target.value }))}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Địa điểm:</label>
                  <input
                    type="text"
                    value={formPhongBan.diaDiem}
                    onChange={(e) => setFormPhongBan(prev => ({ ...prev, diaDiem: e.target.value }))}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Số điện thoại:</label>
                  <input
                    type="text"
                    value={formPhongBan.soDienThoai}
                    onChange={(e) => setFormPhongBan(prev => ({ ...prev, soDienThoai: e.target.value }))}
                    className="w-full p-2.5 border rounded-xl font-mono"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setModalState(prev => ({ ...prev, themPhongBan: false }))}
                  className="px-4 py-2 border rounded-xl text-slate-600 font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow"
                >
                  Lưu Phòng Ban (UC02)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL MỚI 2: THÊM LOẠI TÀI SẢN (UC03) */}
      {modalState.themLoaiTS && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-4 pb-3 border-b">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-600" /> Thêm Danh Mục Loại Tài Sản Mới (UC03)
              </h3>
              <button onClick={() => setModalState(prev => ({ ...prev, themLoaiTS: false }))} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmitThemLoaiTS} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Mã loại tài sản (Ví dụ: LTS-04):</label>
                <input
                  type="text"
                  value={formLoaiTS.maLoaiTS}
                  onChange={(e) => setFormLoaiTS(prev => ({ ...prev, maLoaiTS: e.target.value }))}
                  required
                  className="w-full p-2.5 border rounded-xl font-mono"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Tên loại tài sản:</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Thiết bị Thí nghiệm Hóa Môi trường"
                  value={formLoaiTS.tenLoaiTS}
                  onChange={(e) => setFormLoaiTS(prev => ({ ...prev, tenLoaiTS: e.target.value }))}
                  required
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Phân nhóm:</label>
                  <select
                    value={formLoaiTS.nhomTaiSan}
                    onChange={(e) => setFormLoaiTS(prev => ({ ...prev, nhomTaiSan: e.target.value }))}
                    className="w-full p-2.5 border rounded-xl font-semibold"
                  >
                    <option value="DoDac">Đo Đạc (DoDac)</option>
                    <option value="CNTT">Công Nghệ Thông Tin (CNTT)</option>
                    <option value="ThietBiChung">Thiết Bị Chung</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Niên hạn chuẩn (năm):</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={formLoaiTS.nienHanNam}
                    onChange={(e) => setFormLoaiTS(prev => ({ ...prev, nienHanNam: Number(e.target.value) }))}
                    className="w-full p-2.5 border rounded-xl font-mono font-bold"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setModalState(prev => ({ ...prev, themLoaiTS: false }))}
                  className="px-4 py-2 border rounded-xl text-slate-600 font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow"
                >
                  Lưu Loại Tài Sản (UC03)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL MỚI 3: CẤP PHÁT TÀI KHOẢN NGƯỜI DÙNG (UC04) */}
      {modalState.themNguoiDung && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-4 pb-3 border-b">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-600" /> Cấp Phát Tài Khoản Cán Bộ / Giáo Viên (UC04)
              </h3>
              <button onClick={() => setModalState(prev => ({ ...prev, themNguoiDung: false }))} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmitThemNguoiDung} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Mã người dùng:</label>
                  <input
                    type="text"
                    value={formNguoiDung.maND}
                    onChange={(e) => setFormNguoiDung(prev => ({ ...prev, maND: e.target.value }))}
                    required
                    className="w-full p-2.5 border rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Tên đăng nhập (Username):</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: giaovien01"
                    value={formNguoiDung.tenDangNhap}
                    onChange={(e) => setFormNguoiDung(prev => ({ ...prev, tenDangNhap: e.target.value }))}
                    required
                    className="w-full p-2.5 border rounded-xl font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Họ và tên cán bộ:</label>
                <input
                  type="text"
                  placeholder="Ví dụ: TS. Vũ Đức Đam"
                  value={formNguoiDung.hoTen}
                  onChange={(e) => setFormNguoiDung(prev => ({ ...prev, hoTen: e.target.value }))}
                  required
                  className="w-full p-2.5 border rounded-xl font-bold"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Mật khẩu ban đầu:</label>
                <input
                  type="password"
                  value={formNguoiDung.matKhau}
                  onChange={(e) => setFormNguoiDung(prev => ({ ...prev, matKhau: e.target.value }))}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Email trường:</label>
                <input
                  type="email"
                  placeholder="Ví dụ: vddam@hcmunre.edu.vn"
                  value={formNguoiDung.email}
                  onChange={(e) => setFormNguoiDung(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Đơn vị công tác:</label>
                  <select
                    value={formNguoiDung.maPB}
                    onChange={(e) => setFormNguoiDung(prev => ({ ...prev, maPB: e.target.value }))}
                    required
                    className="w-full p-2.5 border rounded-xl"
                  >
                    <option value="">-- Chọn phòng ban --</option>
                    {phongBanList.map(pb => (
                      <option key={pb.maPB} value={pb.maPB}>{pb.tenPB}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Vai trò phân quyền (RBAC):</label>
                  <select
                    value={formNguoiDung.vaiTro}
                    onChange={(e) => setFormNguoiDung(prev => ({ ...prev, vaiTro: e.target.value }))}
                    className="w-full p-2.5 border rounded-xl font-semibold"
                  >
                    <option value="NhanVien">Cán bộ / Giáo viên (NhanVien)</option>
                    <option value="ThuKho">Thủ kho thiết bị (ThuKho)</option>
                    <option value="LanhDao">Lãnh đạo đơn vị (LanhDao)</option>
                    <option value="QuanTri">Quản trị viên (QuanTri)</option>
                  </select>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 italic">
                * Để trống mật khẩu thì dùng mặc định <strong>123456</strong>; máy chủ luôn băm SHA-256 trước khi lưu.
              </p>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setModalState(prev => ({ ...prev, themNguoiDung: false }))}
                  className="px-4 py-2 border rounded-xl text-slate-600 font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow"
                >
                  Cấp Tài Khoản (UC04)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL MỚI 4: HIỆU CHỈNH THAM SỐ KINH TẾ CAI (UC04 - BR18) */}
      {modalState.suaThamSo && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-4 pb-3 border-b">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-600" /> Sửa Tham Số CAI (BR18)
              </h3>
              <button onClick={() => setModalState(prev => ({ ...prev, suaThamSo: null }))} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateThamSoCAI} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-500 block mb-0.5">Mã tham số:</label>
                <div className="p-2 bg-slate-100 rounded-lg font-mono font-bold text-slate-700">
                  {formSuaThamSo.maThamSo}
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Tên tham số:</label>
                <p className="text-slate-800 font-medium">{formSuaThamSo.tenThamSo}</p>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Giá trị mới ({formSuaThamSo.donViTinh}):
                </label>
                <input
                  type="number"
                  step="any"
                  value={formSuaThamSo.giaTri}
                  onChange={(e) => setFormSuaThamSo(prev => ({ ...prev, giaTri: Number(e.target.value) }))}
                  required
                  className="w-full p-2.5 border rounded-xl font-mono font-bold text-emerald-700 text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setModalState(prev => ({ ...prev, suaThamSo: null }))}
                  className="px-4 py-2 border rounded-xl text-slate-600 font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow"
                >
                  Lưu Cập Nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER BẢN QUYỀN ĐỒ ÁN */}
      <footer className="bg-white border-t border-slate-200 py-3 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>Đồ án Cuối kỳ Môn học: <strong>Phương pháp Phát triển Phần mềm Hướng Đối tượng (OOSD)</strong></span>
          <span>Sinh viên: <strong>Trần Nguyên</strong> (MSSV: <strong>1250080121</strong> - Lớp: <strong>12_ĐH_CNPM2</strong>)</span>
          <span>Giảng viên hướng dẫn: <strong>ThS. Phạm Trọng Huynh</strong></span>
        </div>
      </footer>
    </div>
  );
}
