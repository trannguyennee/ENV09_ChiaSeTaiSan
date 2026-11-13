# Kiểm thử bổ sung: UC03, UC04, UC06, UC07, UC15, BR16, BR19, BR20 (chạy trên CSDL ENV09_Test mới tạo, server cổng 8090)
import os, json, time, datetime, urllib.request, urllib.error, urllib.parse, sys, io, subprocess
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
BASE = 'http://localhost:8090/api'
KQ = []

def call(method, path, body=None, token=None, params=None):
    url = BASE + path + ('?' + urllib.parse.urlencode(params) if params else '')
    req = urllib.request.Request(url, data=json.dumps(body).encode() if body is not None else None, method=method)
    req.add_header('Content-Type', 'application/json')
    if token: req.add_header('Authorization', 'Bearer ' + token)
    try:
        with urllib.request.urlopen(req, timeout=30) as r: return r.status, json.loads(r.read().decode() or 'null')
    except urllib.error.HTTPError as e:
        t = e.read().decode()
        try: return e.code, json.loads(t)
        except Exception: return e.code, {'message': t[:200]}

def sql(q):
    r = subprocess.run(['sqlcmd', '-S', 'localhost', '-U', os.environ.get('DB_USERNAME', 'sa'), '-P', os.environ.get('DB_PASSWORD', ''), '-C', '-d', 'ENV09_Test', '-W', '-h', '-1',
                        '-Q', 'SET NOCOUNT ON; ' + q], capture_output=True)
    return (r.stdout + r.stderr).decode('utf-8', errors='replace').strip()

def check(ten, dk, ct=''):
    KQ.append((ten, bool(dk)))
    print(('DAT  ' if dk else 'TRUOT') + ' | ' + ten + ((' | ' + str(ct)[:160]) if ct else ''))

ok = lambda r: r[0] == 200 and r[1] and r[1].get('success') is True
msg = lambda r: (r[1] or {}).get('message', '')
data = lambda r: (r[1] or {}).get('data')

for _ in range(90):
    try: urllib.request.urlopen('http://localhost:8090/index.html', timeout=2); break
    except Exception: time.sleep(1)

today = datetime.date.today()
d = lambda n: (today + datetime.timedelta(days=n)).isoformat()
def login(u, p):
    r = call('POST', '/auth/login', {'tenDangNhap': u, 'matKhau': p})
    return r[1]['data']['Token'] if ok(r) else None
T_QT, T_TK, T_NV, T_MT, T_LD = login('admin', 'Admin@123'), login('thukho', 'ThuKho@123'), login('gv_cntt', 'User@123'), login('gv_mt', 'User@123'), login('lanhdao', 'User@123')
assert all([T_QT, T_TK, T_NV, T_MT, T_LD])

# ===== UC03: Quản lý loại tài sản =====
loai = {'maLoaiTS': 'LOAI-99', 'tenLoaiTS': 'Máy đo bụi PM2.5', 'nhomTaiSan': 'ThietBiChung', 'nienHanNam': 5}
check('UC03: Nhân viên không thêm được loại tài sản (403)', call('POST', '/danh-muc/loai-tai-san', loai, T_NV)[0] == 403)
r = call('POST', '/danh-muc/loai-tai-san', loai, T_QT); check('UC03: Quản trị thêm loại tài sản hợp lệ', ok(r), msg(r))
check('UC03: loại mới hiện trong danh mục', any(x['maLoaiTS'] == 'LOAI-99' for x in data(call('GET', '/danh-muc/loai-tai-san', token=T_QT))))
check('UC03: trùng mã loại bị chặn', not ok(call('POST', '/danh-muc/loai-tai-san', dict(loai, tenLoaiTS='Khác tên'), T_QT)))
check('UC03: nhóm tài sản không hợp lệ bị chặn', not ok(call('POST', '/danh-muc/loai-tai-san', dict(loai, maLoaiTS='LOAI-98', nhomTaiSan='Khac'), T_QT)))
check('UC03: niên hạn 0 năm bị chặn', not ok(call('POST', '/danh-muc/loai-tai-san', dict(loai, maLoaiTS='LOAI-97', nienHanNam=0), T_QT)))

# ===== UC04: Quản lý người dùng & phân quyền =====
nd = {'maND': 'ND-GV09', 'maPB': 'PB-CNTT', 'tenDangNhap': 'gv_test', 'matKhau': 'Test@123', 'hoTen': 'Giảng viên Kiểm Thử',
      'email': 'gv.test@hcmunre.edu.vn', 'vaiTro': 'NhanVien'}
check('UC04: Nhân viên không cấp được tài khoản (403)', call('POST', '/danh-muc/nguoi-dung', nd, T_NV)[0] == 403)
r = call('POST', '/danh-muc/nguoi-dung', nd, T_QT); check('UC04: Quản trị cấp tài khoản mới', ok(r), msg(r))
mk = sql("SELECT MatKhau FROM NguoiDung WHERE MaND='ND-GV09'")
check('UC04: mật khẩu lưu dạng băm SHA-256, không lưu nguyên văn', len(mk) == 64 and mk != 'Test@123', mk)
check('UC04: tài khoản mới đăng nhập được', login('gv_test', 'Test@123') is not None)
check('UC04: trùng tên đăng nhập bị chặn', not ok(call('POST', '/danh-muc/nguoi-dung', dict(nd, maND='ND-GV08', email='x8@hcmunre.edu.vn'), T_QT)))
check('UC04: email sai định dạng bị chặn', not ok(call('POST', '/danh-muc/nguoi-dung', dict(nd, maND='ND-GV07', tenDangNhap='gv_t7', email='abc'), T_QT)))
check('UC04: vai trò không hợp lệ bị chặn', not ok(call('POST', '/danh-muc/nguoi-dung', dict(nd, maND='ND-GV06', tenDangNhap='gv_t6', email='x6@hcmunre.edu.vn', vaiTro='Admin'), T_QT)))
r = call('PUT', '/danh-muc/nguoi-dung/ND-GV09/trang-thai', token=T_QT)
check('UC04: khóa tài khoản -> không đăng nhập được', ok(r) and data(r)['trangThaiTK'] == 'Khoa' and login('gv_test', 'Test@123') is None)
r = call('PUT', '/danh-muc/nguoi-dung/ND-GV09/trang-thai', token=T_QT)
check('UC04: mở khóa -> đăng nhập lại được', ok(r) and data(r)['trangThaiTK'] == 'HoatDong' and login('gv_test', 'Test@123') is not None)

# ===== UC06: Tra cứu tài sản khả dụng =====
r = call('POST', '/tai-san/khai-bao', {'tenTS': 'Máy đo bụi Kanomax 3443', 'soSeri': 'SN-KANO-3443', 'maLoaiTS': 'LOAI-99', 'namMua': 2024,
          'nguyenGia': 42000000, 'hienTrang': 90, 'viTriLuuTru': 'Kho Khoa CNTT'}, T_NV)
MA_MOI = data(r)
ds = data(call('GET', '/tai-san/san-sang-chia-se', token=T_NV))
check('UC06: danh sách khả dụng chỉ gồm máy Sẵn sàng chia sẻ, hiện trạng >= 50%',
      ds and all(t['trangThai'] == 'SanSangChiaSe' and t['hienTrang'] >= 50 for t in ds), f'{len(ds)} máy')
check('UC06: máy vừa khai báo (Mới, chưa kiểm nhận) không xuất hiện', MA_MOI and all(t['maTS'] != MA_MOI for t in ds), MA_MOI)
check('UC06: máy Cần bảo dưỡng (TS-0006) không xuất hiện', all(t['maTS'] != 'TS-0006' for t in ds))
check('UC06: số máy khớp view v_DanhSachTaiSan_SanSangChiaSe', str(len(ds)) == sql('SELECT COUNT(*) FROM v_DanhSachTaiSan_SanSangChiaSe'),
      sql('SELECT COUNT(*) FROM v_DanhSachTaiSan_SanSangChiaSe'))

# ===== Ghi số liệu KPI trước khi phát sinh giao dịch (dùng cho BR20) =====
KEY = 'GiaTriTranhMuaMoiRong_NCAV'
kpi0 = data(call('GET', '/bao-cao-cai/tong-hop-kpi-ncav', token=T_LD))
ncav0 = float(kpi0[KEY])

# ===== BR19: lượt mượn dài hạn (>= 8 ngày) -> V = 100% nguyên giá =====
r = call('POST', '/phieu-muon/lap-yeu-cau', {'ngayMuon': d(0), 'ngayHenTra': d(9), 'mucDichSuDung': 'Quan trắc tiếng ồn dài ngày',
          'danhSachTaiSan': [{'MaTS': 'TS-0005', 'GhiChuMucDich': ''}]}, T_NV); PM = data(r)
check('BR19: lập phiếu mượn 10 ngày', ok(r), msg(r))
call('POST', '/phieu-muon/duyet', {'maPM': PM, 'hanhDong': 'Duyet'}, T_TK)
r = call('POST', '/giao-nhan/ban-giao', {'maPM': PM, 'maNguoiNhan': 'ND-GV01', 'phuKienKemTheo': 'Cáp', 'trangThaiGiao': 'DaGiao',
          'danhSachGiao': [{'MaTS': 'TS-0005', 'TinhTrangTruoc': 'Tốt', 'CoLoiNgoaiQuan': False}]}, T_TK)
sql(f"UPDATE PhieuMuon SET NgayMuon = DATEADD(DAY,-9,CAST(GETDATE() AS DATE)), NgayHenTra = CAST(GETDATE() AS DATE) WHERE MaPM='{PM}';"
    f"UPDATE BienBanBanGiao SET NgayGiao = DATEADD(DAY,-9,GETDATE()) WHERE MaPM='{PM}'")
r = call('POST', '/giao-nhan/thu-hoi', {'maPM': PM, 'maNguoiTra': 'ND-GV01', 'ghiChu': 'Trả đúng hạn',
          'danhSachThuHoi': [{'MaTS': 'TS-0005', 'TinhTrangSau': 'Tot', 'TyLeHaoMon': 1}]}, T_TK)
check('BR19: thu hồi đúng hạn sau 10 ngày', ok(r), msg(r))
v = sql(f"SELECT CONCAT(D_TinhCAI,'|',CAST(GiaTriTranhMuaMoi AS BIGINT),'|',ChiSoCAI_Luot,'|',LoaiThoiHanMuon) FROM v_ChiSoCAI_ChiTietTungLuotMuon WHERE MaPM='{PM}'")
p = v.split('|')
check('BR19: D >= 8 ngày -> dài hạn, V = 100% nguyên giá = 15.000.000, CAI lượt = 1',
      len(p) == 4 and int(p[0]) >= 8 and p[1] == '15000000' and float(p[2]) == 1 and p[3] == 'DaiHan', v)

# ===== UC07: Xem lịch sử mượn - trả =====
ds_pm = data(call('GET', '/phieu-muon/phong-ban/PB-CNTT', token=T_NV))
check('UC07: lịch sử đơn vị chỉ gồm phiếu của Khoa CNTT và có phiếu vừa hoàn tất',
      ds_pm and all(x['maPBMuon'] == 'PB-CNTT' for x in ds_pm) and any(x['maPM'] == PM and x['trangThai'] == 'HoanTat' for x in ds_pm), f'{len(ds_pm)} phiếu')
ls = data(call('GET', '/danh-muc/lich-su-tai-san/TS-0005', token=T_NV))
check('UC07: lịch sử vòng đời TS-0005 ghi Sẵn sàng -> Đang mượn -> Sẵn sàng theo phiếu',
      any(x['trangThaiMoi'] == 'DangMuon' and x['maPM'] == PM for x in ls) and any(x['trangThaiCu'] == 'DangMuon' and x['trangThaiMoi'] == 'SanSangChiaSe' for x in ls))
check('UC07: lịch sử sắp xếp mới nhất trước', all(ls[i]['ngayThayDoi'] >= ls[i + 1]['ngayThayDoi'] for i in range(len(ls) - 1)))

# ===== UC13 + BR20: bảo dưỡng có chi phí -> NCAV = tổng V - tổng chi phí =====
r = call('POST', '/bao-duong/lap-phieu', {'maTS': 'TS-0006', 'donViSuaChua': 'Trung tâm bảo hành Sony', 'noiDungSuaChua': 'Thay bóng đèn',
          'danhSachHangMuc': [{'HangMucSuaChua': 'Thay bóng đèn chiếu', 'DonGia': 2800000, 'SoLuong': 1}]}, T_TK); PBD = data(r)
r = call('POST', '/bao-duong/nghiem-thu', {'maPBD': PBD, 'ketLuan': 'Dat', 'hienTrangSauSuaChua': 80}, T_TK)
check('UC13: nghiệm thu đạt 80% -> máy về Sẵn sàng chia sẻ', ok(r) and sql("SELECT TrangThai FROM TaiSan WHERE MaTS='TS-0006'") == 'SanSangChiaSe', msg(r))
kpi1 = data(call('GET', '/bao-cao-cai/tong-hop-kpi-ncav', token=T_LD))
delta = float(kpi1[KEY]) - ncav0
check('BR20: NCAV tăng đúng 15.000.000 - 2.800.000 = 12.200.000', abs(delta - 12200000) < 1, f'chênh lệch {delta:,.0f}')

# ===== UC15: Báo cáo hiệu suất khai thác =====
bc = {x['MaTS']: x for x in data(call('GET', '/bao-cao-cai/chi-so-tung-tai-san', token=T_LD))}
so_luot = sql("SELECT COUNT(*) FROM v_ChiSoCAI_ChiTietTungLuotMuon WHERE MaTS='TS-0005'")
tong_v = sql("SELECT CAST(SUM(GiaTriTranhMuaMoi) AS BIGINT) FROM v_ChiSoCAI_ChiTietTungLuotMuon WHERE MaTS='TS-0005'")
x = bc.get('TS-0005', {})
check('UC15: báo cáo hiệu suất TS-0005 đúng số lượt mượn và tổng giá trị tránh mua',
      str(x.get('TongSoLuotMuon')) == so_luot and str(int(float(x.get('TongGiaTriTranhMuaMoi', -1)))) == tong_v, f'{x.get("TongSoLuotMuon")} lượt / {tong_v}')
check('UC15: báo cáo đủ mọi tài sản trong kho', len(bc) == int(sql('SELECT COUNT(*) FROM TaiSan')))
check('Phân quyền: Nhân viên không xem được báo cáo CAI (403)', call('GET', '/bao-cao-cai/tong-hop-kpi-ncav', token=T_NV)[0] == 403)

# ===== BR16: ràng buộc chặn xóa =====
out = sql("DELETE FROM PhongBan WHERE MaPB='PB-MT'")
check('BR16: không xóa được phòng ban đang có tài sản', 'Msg' in out and sql("SELECT COUNT(*) FROM PhongBan WHERE MaPB='PB-MT'") == '1', out[:90])
out = sql("DELETE FROM LoaiTaiSan WHERE MaLoaiTS='LOAI-05'")
check('BR16: không xóa được loại tài sản đang có tài sản', 'Msg' in out and sql("SELECT COUNT(*) FROM LoaiTaiSan WHERE MaLoaiTS='LOAI-05'") == '1', out[:90])
out = sql("DELETE FROM TaiSan WHERE MaTS='TS-0005'")
check('BR16: không xóa được tài sản đã có lịch sử mượn', 'Msg' in out and sql("SELECT COUNT(*) FROM TaiSan WHERE MaTS='TS-0005'") == '1', out[:90])

dat = sum(1 for k in KQ if k[1])
print(f'\nTONG KET BO SUNG: {dat}/{len(KQ)} ca kiem thu DAT')
