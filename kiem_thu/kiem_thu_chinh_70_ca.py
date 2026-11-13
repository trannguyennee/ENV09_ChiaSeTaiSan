import os, json, time, datetime, urllib.request, urllib.error, urllib.parse, sys, io, subprocess
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

BASE = 'http://localhost:8090/api'
KQ = []

def call(method, path, body=None, token=None, params=None):
    url = BASE + path + ('?' + urllib.parse.urlencode(params) if params else '')
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header('Content-Type', 'application/json')
    if token:
        req.add_header('Authorization', 'Bearer ' + token)
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status, json.loads(r.read().decode() or 'null')
    except urllib.error.HTTPError as e:
        txt = e.read().decode()
        try:
            return e.code, json.loads(txt)
        except Exception:
            return e.code, {'message': txt[:200]}

def sql(q):
    r = subprocess.run(['sqlcmd', '-S', 'localhost', '-U', os.environ.get('DB_USERNAME', 'sa'), '-P', os.environ.get('DB_PASSWORD', ''), '-C', '-d', 'ENV09_Test', '-W', '-h', '-1',
                        '-Q', 'SET NOCOUNT ON; ' + q], capture_output=True)
    return (r.stdout + r.stderr).decode('utf-8', errors='replace').strip()

def check(ten, dk, ct=''):
    KQ.append((ten, bool(dk)))
    print(('DAT  ' if dk else 'TRUOT') + ' | ' + ten + ((' | ' + str(ct)[:150]) if ct else ''))

def ok(res): return res[0] == 200 and res[1] and res[1].get('success') is True
def msg(res): return (res[1] or {}).get('message', '')

for _ in range(90):
    try:
        urllib.request.urlopen('http://localhost:8090/index.html', timeout=2); break
    except Exception:
        time.sleep(1)

today = datetime.date.today()
d = lambda n: (today + datetime.timedelta(days=n)).isoformat()

def login(u, p):
    r = call('POST', '/auth/login', {'tenDangNhap': u, 'matKhau': p})
    return r[1]['data']['Token'] if ok(r) else None

def lap(token, ds, n1=0, n2=4):
    return call('POST', '/phieu-muon/lap-yeu-cau', {'ngayMuon': d(n1), 'ngayHenTra': d(n2), 'mucDichSuDung': 'Kiểm thử',
                'danhSachTaiSan': [{'MaTS': m, 'GhiChuMucDich': 'test'} for m in ds]}, token)

def ts_map(tk):
    return {t['maTS']: t for t in call('GET', '/tai-san', token=tk)[1]['data']}

def pm_map(tk):
    return {p['maPM']: p for p in call('GET', '/phieu-muon', token=tk)[1]['data']}

# ===================== HỒI QUY (luồng chính đã kiểm ở bước 1) =====================
check('Chưa đăng nhập bị chặn 401', call('GET', '/tai-san')[0] == 401)
check('Pass-the-hash bị từ chối', not ok(call('POST', '/auth/login', {'tenDangNhap': 'thukho', 'matKhau': '8f5f450f1def47c6b1beabcb445ced26f7798366856de53c35250041b5bfcd3b'})))
T_NV, T_NV2, T_TK, T_LD, T_QT = login('gv_mt', 'User@123'), login('gv_cntt', 'User@123'), login('thukho', 'ThuKho@123'), login('lanhdao', 'User@123'), login('admin', 'Admin@123')
check('Đăng nhập đủ vai trò', all([T_NV, T_NV2, T_TK, T_LD, T_QT]))

body = {'tenTS': 'Máy đo pH', 'soSeri': 'SN-E2E-1', 'maLoaiTS': 'LOAI-05', 'namMua': 2024, 'nguyenGia': 12000000, 'hienTrang': 40}
check('BR01: hiện trạng 40% bị chặn', not ok(call('POST', '/tai-san/khai-bao', body, T_NV)))
body['hienTrang'] = 90
r = call('POST', '/tai-san/khai-bao', body, T_NV); TS_MOI = r[1].get('data')
check('UC05: khai báo hợp lệ', ok(r), msg(r))
check('BR01 mới: tài sản vừa khai báo ở trạng thái Mới', ts_map(T_TK)[TS_MOI]['trangThai'] == 'Moi')
check('BR03/BR10: máy Mới chưa kiểm nhận không mượn được', not ok(lap(T_NV2, [TS_MOI])))
check('Phân quyền: Nhân viên không kiểm nhận được (403)', call('POST', '/tai-san/kiem-nhan', {'maTS': TS_MOI, 'hienTrang': 90}, T_NV)[0] == 403)
r = call('POST', '/tai-san/kiem-nhan', {'maTS': TS_MOI, 'nguyenGia': 11500000, 'hienTrang': 90, 'ghiChu': 'Đúng seri'}, T_TK)
t = ts_map(T_TK)[TS_MOI]
check('BR21: Thủ kho kiểm nhận đạt -> Sẵn sàng chia sẻ, cập nhật nguyên giá', ok(r) and t['trangThai'] == 'SanSangChiaSe' and float(t['nguyenGia']) == 11500000, msg(r))
check('BR21: chỉ kiểm nhận được tài sản đang Mới', not ok(call('POST', '/tai-san/kiem-nhan', {'maTS': TS_MOI}, T_TK)))
r = call('POST', '/tai-san/khai-bao', {**body, 'soSeri': 'SN-E2E-2', 'hienTrang': 60}, T_NV); TS_MOI2 = r[1].get('data')
r = call('POST', '/tai-san/kiem-nhan', {'maTS': TS_MOI2, 'hienTrang': 40, 'ghiChu': 'Thực tế xuống cấp'}, T_TK)
check('BR21: kiểm nhận hiện trạng thực tế 40% -> Cần bảo dưỡng', ok(r) and ts_map(T_TK)[TS_MOI2]['trangThai'] == 'CanBaoDuong', msg(r))
r = call('POST', '/tai-san/khai-bao', {**body, 'soSeri': 'SN-E2E-3'}, T_NV); TS_MOI3 = r[1].get('data')
r = call('POST', '/thanh-ly/de-xuat', {'maTS': TS_MOI3, 'lyDoDeXuat': 'x'}, T_TK)
check('Không lập hồ sơ thanh lý cho tài sản chưa kiểm nhận', not ok(r) and 'kiểm nhận' in msg(r), msg(r))
lich_su = call('GET', f'/danh-muc/lich-su-tai-san/{TS_MOI}', token=T_TK)[1]['data']
check('Lịch sử vòng đời: Khởi tạo Mới -> Sẵn sàng chia sẻ, ghi người kiểm nhận', [(x['trangThaiCu'], x['trangThaiMoi']) for x in reversed(lich_su)] == [(None, 'Moi'), ('Moi', 'SanSangChiaSe')] and lich_su[0]['maNguoiThucHien'] == 'ND-TK01')
check('BR05: mượn máy của đơn vị mình bị chặn', not ok(lap(T_NV, ['TS-0005'])))
check('BR02: quá 30 ngày bị chặn', not ok(lap(T_NV, ['TS-0002'], 0, 40)))
check('BR03: máy Cần bảo dưỡng không mượn được', not ok(lap(T_NV, ['TS-0006'])))
r = lap(T_NV, ['TS-0002', 'TS-0004']); PM_A = r[1].get('data'); check('UC08: phiếu nhiều thiết bị', ok(r), msg(r))
r = lap(T_NV2, ['TS-0001']); PM_B = r[1].get('data'); check('UC08: phiếu B', ok(r))
r = lap(T_NV, ['TS-0001']); PM_C = r[1].get('data'); check('UC08: phiếu C trùng lịch vẫn lập được', ok(r))
check('Phân quyền: NV không duyệt được', call('POST', '/phieu-muon/duyet', {'maPM': PM_A, 'hanhDong': 'Duyet'}, T_NV)[0] == 403)
check('UC09: duyệt A', ok(call('POST', '/phieu-muon/duyet', {'maPM': PM_A, 'hanhDong': 'Duyet'}, T_TK)))
check('UC09: duyệt B', ok(call('POST', '/phieu-muon/duyet', {'maPM': PM_B, 'hanhDong': 'Duyet'}, T_TK)))
check('BR04: duyệt C trùng lịch bị chặn', not ok(call('POST', '/phieu-muon/duyet', {'maPM': PM_C, 'hanhDong': 'Duyet'}, T_TK)))
check('BR17: chủ phiếu hủy phiếu chờ duyệt', ok(call('POST', '/phieu-muon/huy', params={'maPM': PM_C, 'lyDoHuy': 'x'}, token=T_NV)))

def ban_giao(pm, kq, items, nhan, ly_do=None):
    return call('POST', '/giao-nhan/ban-giao', {'maPM': pm, 'maNguoiNhan': nhan, 'phuKienKemTheo': 'Cáp', 'trangThaiGiao': kq,
                'lyDoHuy': ly_do, 'danhSachGiao': items}, T_TK)
def it(ma, loi=False): return {'MaTS': ma, 'TinhTrangTruoc': 'Tốt', 'CoLoiNgoaiQuan': loi, 'MoTaLoi': 'Lỗi' if loi else None}
check('Trạng thái bàn giao sai bị chặn', not ok(ban_giao(PM_A, 'HoatDongTot', [it('TS-0002'), it('TS-0004')], 'ND-GV02')))
check('BR06: có máy lỗi mà xuất kho bị chặn', not ok(ban_giao(PM_A, 'DaGiao', [it('TS-0002'), it('TS-0004', True)], 'ND-GV02')))
r = ban_giao(PM_A, 'DaGiao', [it('TS-0002'), it('TS-0004')], 'ND-GV02'); check('UC10: bàn giao A', ok(r), msg(r))
r = ban_giao(PM_B, 'Huy', [it('TS-0001', True)], 'ND-GV01', 'Máy lỗi'); check('UC10: hủy bàn giao B', ok(r), msg(r))
check('BR06: máy lỗi -> CanBaoDuong', ts_map(T_TK)['TS-0001']['trangThai'] == 'CanBaoDuong')

def thu_hoi(pm, items, tra):
    return call('POST', '/giao-nhan/thu-hoi', {'maPM': pm, 'maNguoiTra': tra, 'ghiChu': 't', 'danhSachThuHoi': items}, T_TK)
items_A = [{'MaTS': 'TS-0002', 'TinhTrangSau': 'Tot', 'TyLeHaoMon': 2},
           {'MaTS': 'TS-0004', 'TinhTrangSau': 'HuHong', 'TyLeHaoMon': 10, 'MoTaHuHong': 'Gãy bản lề', 'MucDoThietHai': 20}]
check('Thu hồi kèm máy ngoài phiếu bị chặn', not ok(thu_hoi(PM_A, items_A + [{'MaTS': 'TS-0003', 'TinhTrangSau': 'Tot'}], 'ND-GV02')))
r = thu_hoi(PM_A, items_A, 'ND-GV02'); check('UC11: thu hồi A', ok(r), msg(r))
t = ts_map(T_TK)
check('BR09: phân luồng máy tốt / hỏng', t['TS-0002']['trangThai'] == 'SanSangChiaSe' and t['TS-0004']['trangThai'] == 'CanBaoDuong')
r = call('POST', '/bao-duong/lap-phieu', {'maTS': 'TS-0004', 'donViSuaChua': 'Dell', 'noiDungSuaChua': 'Thay',
          'danhSachHangMuc': [{'HangMucSuaChua': 'Bản lề', 'DonGia': 30000000, 'SoLuong': 1}]}, T_TK); PBD = r[1].get('data')
check('UC13: lập phiếu bảo dưỡng', ok(r))
check('BR12: nghiệm thu đạt nhưng 40% bị chặn', not ok(call('POST', '/bao-duong/nghiem-thu', {'maPBD': PBD, 'ketLuan': 'Dat', 'hienTrangSauSuaChua': 40}, T_TK)))
check('BR12: Không thể sửa -> Đề xuất thanh lý', ok(call('POST', '/bao-duong/nghiem-thu', {'maPBD': PBD, 'ketLuan': 'KhongTheSua', 'hienTrangSauSuaChua': 30}, T_TK)))
r = call('POST', '/thanh-ly/de-xuat', {'maTS': 'TS-0004', 'lyDoDeXuat': 'x'}, T_TK); HS = r[1].get('data'); check('BR15: đề xuất thanh lý', ok(r))
check('Phân quyền: Thủ kho không ký thanh lý', call('POST', '/thanh-ly/phe-duyet', {'maHSTL': HS, 'hanhDong': 'Duyet'}, T_TK)[0] == 403)
check('UC14: Lãnh đạo duyệt thanh lý', ok(call('POST', '/thanh-ly/phe-duyet', {'maHSTL': HS, 'hanhDong': 'Duyet', 'soQuyetDinh': 'QD'}, T_LD)))
check('BR15: không đủ căn cứ bị chặn', not ok(call('POST', '/thanh-ly/de-xuat', {'maTS': 'TS-0005', 'lyDoDeXuat': 'x'}, T_TK)))
check('UC02: trùng mã phòng ban bị chặn', not ok(call('POST', '/danh-muc/phong-ban', {'maPB': 'PB-MT', 'tenPB': 'X'}, T_QT)))
check('TS03 > 30 bị chặn', not ok(call('PUT', '/danh-muc/tham-so-cai/TS03', params={'giaTri': 45}, token=T_QT)))

# ===================== CA MỚI (bước 3) =====================
# N1. BR06: chưa đến ngày bắt đầu mượn thì không bàn giao
r = lap(T_NV2, ['TS-0003'], 2, 4); PM_D = r[1].get('data')
call('POST', '/phieu-muon/duyet', {'maPM': PM_D, 'hanhDong': 'Duyet'}, T_TK)
r = ban_giao(PM_D, 'DaGiao', [it('TS-0003')], 'ND-GV01')
check('BR06 mới: chưa đến ngày bắt đầu mượn -> không bàn giao', not ok(r) and 'ngày bắt đầu' in msg(r), msg(r))

# N2. BR06: máy còn Đang mượn (phiếu trước trả trễ) thì phiếu sau không được bàn giao
r = lap(T_NV2, ['TS-0005'], 0, 1); PM_E = r[1].get('data')
r2 = lap(T_NV2, ['TS-0005'], 3, 5); PM_F = r2[1].get('data')
check('Lập 2 phiếu E, F cùng máy, lịch không trùng', ok(r) and ok(r2))
check('Duyệt E và F (không trùng lịch)', ok(call('POST', '/phieu-muon/duyet', {'maPM': PM_E, 'hanhDong': 'Duyet'}, T_TK))
      and ok(call('POST', '/phieu-muon/duyet', {'maPM': PM_F, 'hanhDong': 'Duyet'}, T_TK)))
check('Bàn giao E', ok(ban_giao(PM_E, 'DaGiao', [it('TS-0005')], 'ND-GV01')))
sql(f"UPDATE PhieuMuon SET NgayMuon = CAST(GETDATE() AS DATE) WHERE MaPM = '{PM_F}'")  # giả lập: đã đến ngày mượn của F
r = ban_giao(PM_F, 'DaGiao', [it('TS-0005')], 'ND-GV01')
check('BR06 mới: máy còn Đang mượn -> phiếu sau không bàn giao được', not ok(r) and 'Sẵn sàng chia sẻ' in msg(r), msg(r))

# N3. BR14 + BR13: phiếu quá hạn -> bật cờ, đơn vị bị chặn mượn mới
sql(f"UPDATE PhieuMuon SET NgayMuon = DATEADD(DAY,-10,CAST(GETDATE() AS DATE)), NgayHenTra = DATEADD(DAY,-9,CAST(GETDATE() AS DATE)) WHERE MaPM = '{PM_E}'")
r = call('POST', '/he-thong/quet-qua-han', token=T_TK)
check('BR14: quét bật cờ quá hạn cho phiếu E', ok(r) and r[1]['data']['SoLuongPhieuQuaHan'] >= 1 and pm_map(T_TK)[PM_E]['coQuaHan'] is True, r[1].get('data'))
r = lap(T_NV2, ['TS-0003'], 6, 7)
check('BR13: đơn vị có phiếu quá hạn bị chặn lập phiếu mới', not ok(r) and 'BR13' in msg(r), msg(r))

# N4. BR18 mới: trả trễ không làm tăng CAI (đăng ký 2 ngày, giữ thực tế 11 ngày)
sql(f"UPDATE BienBanBanGiao SET NgayGiao = DATEADD(DAY,-10,GETDATE()) WHERE MaPM = '{PM_E}'")
r = thu_hoi(PM_E, [{'MaTS': 'TS-0005', 'TinhTrangSau': 'Tot', 'TyLeHaoMon': 1}], 'ND-GV01')
check('Thu hồi phiếu E trả trễ', ok(r), msg(r))
row = sql(f"SELECT CONCAT(D,'|',D_TinhCAI,'|',CAST(GiaTriTranhMuaMoi AS BIGINT)) FROM v_ChiSoCAI_ChiTietTungLuotMuon WHERE MaPM = '{PM_E}'")
check('BR18 mới: D thực tế 11, D tính CAI 2, V = 2 x 1,5% x 15tr = 450.000 (không phải 15tr)', row.strip() == '11|2|450000', row)
r = call('GET', '/bao-cao-cai/theo-ky', params={'tuNgay': today.isoformat(), 'denNgay': today.isoformat()}, token=T_LD)
ds = [x for x in r[1]['data']['danhSachChiTiet'] if x['MaPM'] == PM_E] if ok(r) else []
check('Báo cáo theo kỳ dùng cùng cách tính (450.000)', ds and float(ds[0]['GiaTriTranhMuaMoi']) == 450000, ds[:1])
check('BR14: cờ quá hạn được giữ sau khi hoàn tất', pm_map(T_TK)[PM_E]['coQuaHan'] is True and pm_map(T_TK)[PM_E]['trangThai'] == 'HoanTat')
r = lap(T_NV2, ['TS-0003'], 6, 7); PM_G1 = r[1].get('data')
check('BR13: thu hồi xong thì quyền mượn tự khôi phục', ok(r), msg(r))

# N5. BR-EXTRA-01 mới: không đến nhận máy quá TS07 (3) ngày kể từ ngày mượn -> tự hủy
sql(f"UPDATE PhieuMuon SET NgayMuon = DATEADD(DAY,-4,CAST(GETDATE() AS DATE)) WHERE MaPM = '{PM_F}'")
r = call('POST', '/he-thong/quet-qua-han', token=T_TK)
pm = pm_map(T_TK)
check('BR-EXTRA-01: phiếu F quá 3 ngày không nhận máy -> Đã hủy', pm[PM_F]['trangThai'] == 'DaHuy' and 'BR-EXTRA-01' in (pm[PM_F]['lyDoHuy'] or ''), pm[PM_F]['lyDoHuy'])
check('BR-EXTRA-01: phiếu D chưa đến ngày mượn vẫn giữ Đã duyệt', pm[PM_D]['trangThai'] == 'DaDuyet')

# N6. BR13: hạn ngạch 5 phiếu chưa hoàn tất
mo = [p for p in pm.values() if p['maPBMuon'] == 'PB-CNTT' and p['trangThai'] in ('ChoDuyet', 'DaDuyet', 'DangThucHien')]
for _ in range(5 - len(mo)):
    lap(T_NV2, ['TS-0007'], 8, 9)
r = lap(T_NV2, ['TS-0007'], 8, 9)
check('BR13: phiếu thứ 6 chưa hoàn tất bị chặn (hạn ngạch 5)', not ok(r) and 'hạn ngạch' in msg(r), msg(r))

# N7. BR09 mới: hư hỏng bắt buộc mô tả + mức thiệt hại > 0
r = lap(T_NV, ['TS-0003'], 0, 1); PM_H = r[1].get('data')
check('Duyệt + bàn giao phiếu H (TS-0003)', ok(call('POST', '/phieu-muon/duyet', {'maPM': PM_H, 'hanhDong': 'Duyet'}, T_TK))
      and ok(ban_giao(PM_H, 'DaGiao', [it('TS-0003')], 'ND-GV02')))
r = thu_hoi(PM_H, [{'MaTS': 'TS-0003', 'TinhTrangSau': 'HuHong', 'TyLeHaoMon': 5}], 'ND-GV02')
check('BR09 mới: hư hỏng không có mô tả / thiệt hại bị chặn', not ok(r) and 'BR09' in msg(r), msg(r))
r = thu_hoi(PM_H, [{'MaTS': 'TS-0003', 'TinhTrangSau': 'HuHong', 'TyLeHaoMon': 5, 'MoTaHuHong': 'Nứt ống kính', 'MucDoThietHai': 10}], 'ND-GV02')
check('Thu hồi hư hỏng đủ thông tin', ok(r), msg(r))
bt = sql("SELECT TOP 1 CAST(ChiPhiBoiThuong AS BIGINT) FROM LichSuSuCo WHERE MaTS='TS-0003' ORDER BY NgayPhatSinh DESC")
check('Bồi thường = 10% x 120tr = 12.000.000', bt.strip() == '12000000', bt)

# N8. Bác bỏ thanh lý máy đã kết luận Không thể sửa -> Cần bảo dưỡng (không quay lại kho)
r = call('POST', '/bao-duong/lap-phieu', {'maTS': 'TS-0003', 'donViSuaChua': 'Trimble', 'noiDungSuaChua': 'Thay',
          'danhSachHangMuc': [{'HangMucSuaChua': 'Ống kính', 'DonGia': 1000000, 'SoLuong': 1}]}, T_TK); PBD2 = r[1].get('data')
check('Nghiệm thu Không thể sửa với hiện trạng 60%', ok(call('POST', '/bao-duong/nghiem-thu', {'maPBD': PBD2, 'ketLuan': 'KhongTheSua', 'hienTrangSauSuaChua': 60}, T_TK)))
r = call('POST', '/thanh-ly/de-xuat', {'maTS': 'TS-0003', 'lyDoDeXuat': 'Không thể sửa'}, T_TK)
check('Còn phiếu D đã duyệt chờ giao máy hỏng -> chưa cho lập hồ sơ thanh lý', not ok(r), msg(r))
r = ban_giao(PM_D, 'Huy', [it('TS-0003')], 'ND-GV01', 'Thiết bị hỏng, không thể bàn giao')
check('Thủ kho hủy bàn giao phiếu D', ok(r), msg(r))
r = call('POST', '/thanh-ly/de-xuat', {'maTS': 'TS-0003', 'lyDoDeXuat': 'Không thể sửa'}, T_TK); HS2 = r[1].get('data')
check('Đề xuất thanh lý theo căn cứ 3', ok(r), msg(r))
check('Lãnh đạo bác bỏ', ok(call('POST', '/thanh-ly/phe-duyet', {'maHSTL': HS2, 'hanhDong': 'BacBo', 'ghiChuDuyet': 'x'}, T_LD)))
check('Bác bỏ máy Không thể sửa (60%) -> Cần bảo dưỡng, không về kho', ts_map(T_TK)['TS-0003']['trangThai'] == 'CanBaoDuong', ts_map(T_TK)['TS-0003']['trangThai'])

# N9. BR10 trigger: chèn thẳng máy không khả dụng vào chi tiết phiếu bị CSDL chặn
out = sql(f"INSERT INTO ChiTietPhieuMuon (MaPM, MaTS) VALUES ('{PM_D}', 'TS-0001')")
check('BR10 trigger: CSDL chặn INSERT máy Cần bảo dưỡng vào phiếu', '50056' in out or 'BR10' in out, out[:120])

# N10. Tham số: TS02 <= TS03, TS07 hợp lệ
call('PUT', '/danh-muc/tham-so-cai/TS03', params={'giaTri': 10}, token=T_QT)
check('TS02 > TS03 bị chặn', not ok(call('PUT', '/danh-muc/tham-so-cai/TS02', params={'giaTri': 15}, token=T_QT)))
check('TS03 < TS02 bị chặn', not ok(call('PUT', '/danh-muc/tham-so-cai/TS03', params={'giaTri': 5}, token=T_QT)))
call('PUT', '/danh-muc/tham-so-cai/TS03', params={'giaTri': 30}, token=T_QT)
check('TS07 = 40 bị chặn, TS07 = 2 hợp lệ', not ok(call('PUT', '/danh-muc/tham-so-cai/TS07', params={'giaTri': 40}, token=T_QT))
      and ok(call('PUT', '/danh-muc/tham-so-cai/TS07', params={'giaTri': 2}, token=T_QT)))

dat = sum(1 for k in KQ if k[1])
print(f'\nTONG KET: {dat}/{len(KQ)} ca kiem thu DAT')
