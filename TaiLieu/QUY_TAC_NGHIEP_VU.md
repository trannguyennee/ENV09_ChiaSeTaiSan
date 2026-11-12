# HỒ SƠ QUY TẮC NGHIỆP VỤ (BR01 - BR21) VÀ MÔ HÌNH CAI
**DỰ ÁN:** ENV-09 - HỆ THỐNG CHIA SẺ VÀ TÁI SỬ DỤNG TÀI SẢN NỘI BỘ  
**ĐƠN VỊ:** ĐẠI HỌC TÀI NGUYÊN VÀ MÔI TRƯỜNG TP.HCM (HCMUNRE)  
**SINH VIÊN:** TRẦN NGUYÊN - MSSV: 1250080121 - LỚP: 12_ĐH_CNPM2  
**GIẢNG VIÊN HƯỚNG DẪN:** ThS. PHẠM TRỌNG HUYNH  

---

## MỤC 0: BA QUYẾT ĐỊNH NGHIỆP VỤ CỐT LÕI 
1. **Một phiếu mượn nhiều thiết bị (Giữ nguyên):**  
   - Bảng `ChiTietPhieuMuon` lưu từng thiết bị cụ thể thuộc phiếu mượn (cùng khoảng thời gian). Hệ thống kiểm tra điều kiện khả dụng độc lập cho từng thiết bị.
   - Khi trả máy: Kiểm tra và đánh giá hao mòn riêng cho từng máy.
2. **Một máy bị lỗi khi xuất kho bàn giao $\rightarrow$ Hủy cả phiếu:**  
   - Nếu bất kỳ thiết bị nào trong phiếu bị lỗi lúc thử máy bàn giao $\rightarrow$ Thủ kho bấm **Hủy xuất kho** (`HuyBanGiao`):
     - Thiết bị lỗi chuyển sang `CanBaoDuong`, ghi nhận vào `LichSuSuCo`.
     - Toàn bộ phiếu mượn chuyển sang `DaHuy`.
     - Các thiết bị còn lại trong phiếu giữ nguyên `SanSangChiaSe` để người khác mượn.
     - Người mượn lập phiếu mới cho nhu cầu còn lại (tránh bài toán xuất kho một phần phức tạp).
3. **Chi phí bồi thường hư hỏng:**  
   - Cột `MucDoThietHai` chuẩn hóa thành kiểu **Số nguyên `%`** (ví dụ: 20%, 50%, 100%).
   - Hệ thống tự động tính chi phí bồi thường ước tính theo công thức:
     $$\text{ChiPhiBoiThuong} = \frac{\text{MucDoThietHai}}{100} \times \text{NguyenGia}$$

---

## PHẦN 1: BẢNG 21 QUY TẮC NGHIỆP VỤ CHÍNH THỨC (BR01 - BR21)
*(Đã giải quyết triệt để xung đột logic BR15 $\leftrightarrow$ BR12, bổ sung đầy đủ thuộc tính và ràng buộc)*

| Mã BR | Tên quy tắc nghiệp vụ | Biểu thức điều kiện & Xử lý chi tiết | Xử lý khi vi phạm |
| :---: | :--- | :--- | :--- |
| **BR01** | **Ràng buộc đăng ký tài sản nhàn rỗi** | `TenTS != empty` AND `NguyenGia > 0` AND `SoSeri IS UNIQUE` *(không trùng số seri)* AND `NamMua <= Year(CurrentDate)` AND `HienTrang >= 50%` *(quy tắc chất lượng tối thiểu)*. Khởi tạo `TaiSan.TrangThai = 'Moi'` *(chờ Thủ kho kiểm nhận theo BR21 trước khi vào kho dùng chung)*. | Báo lỗi biểu mẫu; từ chối tiếp nhận thiết bị có hiện trạng < 50% hoặc trùng số seri vào kho dùng chung. |
| **BR02** | **Tính hợp lệ thời gian mượn** | `NgayMuon >= CurrentDate` AND `NgayHenTra >= NgayMuon`. Số ngày mượn kế hoạch: `D = (NgayHenTra - NgayMuon) + 1 <= 30` ngày. *(Áp dụng cho từng thiết bị trong phiếu)*. | Báo lỗi: "Thời gian mượn không hợp lệ hoặc vượt quá hạn mức tối đa 30 ngày". |
| **BR03** | **Điều kiện khả dụng của thiết bị** | Thiết bị chỉ được phép chọn lập yêu cầu mượn khi và chỉ khi: `TaiSan.TrangThai == 'SanSangChiaSe'`. *(Kiểm tra độc lập cho từng thiết bị trong danh sách chọn)*. | Vô hiệu hóa nút chọn thiết bị, báo: "Thiết bị đang bận / bảo dưỡng / thanh lý". |
| **BR04** | **Chống xung đột trùng lịch (Serializable Lock)** | Áp dụng mức cô lập giao dịch `SERIALIZABLE` / `UPDLOCK`: Hai khoảng thời gian mượn trên cùng một thiết bị không được giao nhau `NOT (NgayMuonA <= NgayHenTraB AND NgayHenTraA >= NgayMuonB)` đối với các phiếu ở trạng thái `DaDuyet` hoặc `DangThucHien`. Lịch ở trạng thái `ChoDuyet` không giữ lịch. *(Kiểm tra cho từng thiết bị)*. | Báo lỗi trùng lịch và chặn duyệt phiếu đối với khung giờ đã có người giữ máy. |
| **BR05** | **Ràng buộc mượn khác đơn vị sở hữu** | `PhieuMuon.MaPBMuon != TaiSan.MaPBSoHuu`. Đơn vị sở hữu gốc không được mượn thiết bị của chính đơn vị mình qua kho chia sẻ (phải điều chuyển nội bộ phòng lab). *(Kiểm tra cho từng thiết bị)*. | Thông báo: "Thiết bị thuộc quyền sở hữu của đơn vị bạn, vui lòng điều chuyển nội bộ". |
| **BR06** | **Điều kiện lập Biên bản bàn giao xuất kho** | Chỉ lập `BienBanBanGiao` khi `PhieuMuon.TrangThai == 'DaDuyet'` AND `NgayMuon <= CurrentDate <= NgayHenTra` *(chưa đến ngày bắt đầu mượn thì chưa xuất kho, tránh chiếm lịch phiếu khác)*. Khi xuất kho, **mọi thiết bị trong phiếu phải đang `SanSangChiaSe` và `HienTrang >= 50%`** *(chặn trường hợp phiếu trước trả trễ, máy còn `DangMuon`, hoặc máy vừa chuyển `CanBaoDuong`)*. Người nhận máy phải thuộc đơn vị mượn. Khi thử máy bàn giao thực tế: **Nếu bất kỳ thiết bị nào bị lỗi $\rightarrow$ Hủy cả phiếu mượn** (`HuyBanGiao`): chuyển thiết bị lỗi sang `CanBaoDuong`, ghi nhận vào `LichSuSuCo`; chuyển `PhieuMuon.TrangThai = 'DaHuy'`; các thiết bị còn lại trong phiếu giữ nguyên `SanSangChiaSe`. | Nếu chưa duyệt: không mở form giao máy. Nếu máy lỗi: hủy phiếu, chặn xuất kho thiết bị hỏng. |
| **BR07** | **Xác thực bàn giao & Chuyển trạng thái mượn** | Khi lưu `BienBanBanGiao` thành công (có xác nhận của Thủ kho và Người nhận): Trong cùng 1 giao dịch (Transaction), cập nhật toàn bộ thiết bị trong chi tiết sang `TaiSan.TrangThai = 'DangMuon'` và `PhieuMuon.TrangThai = 'DangThucHien'`. | Thực thi đồng thời trong 1 Transaction CSDL; thất bại thì Rollback toàn bộ. |
| **BR08** | **Điều kiện lập Biên bản thu hồi** | Chỉ lập `BienBanThuHoi` khi `PhieuMuon.TrangThai == 'DangThucHien'`. Bắt buộc kiểm tra và nhập `TinhTrangSau` ('Tot', 'HuHong', 'CanBaoTri') và `TyLeHaoMon` (%) độc lập cho từng máy trong `ChiTietPhieuMuon`. | Chặn lưu biên bản thu hồi nếu chưa hoàn tất đánh giá hiện trạng cho từng thiết bị. |
| **BR09** | **Cập nhật hao mòn & Phân luồng sau thu hồi** | Cho từng máy trong chi tiết:<br>1. Tính lại hiện trạng: `TaiSan.HienTrang = MAX(0, TaiSan.HienTrang - TyLeHaoMon)`.<br>2. Phân luồng:<br>- Nếu `TinhTrangSau == 'Tot'` AND `HienTrang >= 50%` $\rightarrow$ `TaiSan.TrangThai = 'SanSangChiaSe'`.<br>- Nếu `TinhTrangSau IN ('HuHong', 'CanBaoTri')` HOẶC `HienTrang < 50%` $\rightarrow$ `TaiSan.TrangThai = 'CanBaoDuong'`.<br>3. Nếu `TinhTrangSau == 'HuHong'`: **bắt buộc** nhập `MoTaHuHong` và `MucDoThietHai > 0` (%), hệ thống tính `ChiPhiBoiThuong = (MucDoThietHai / 100) * NguyenGia` và ghi vào `LichSuSuCo`.<br>4. Đóng phiếu: `PhieuMuon.TrangThai = 'HoanTat'`. | Tự động phân luồng vòng đời tài sản; tự động tính tiền bồi thường và ghi biên bản sự cố. |
| **BR10** | **Khóa mượn đối với thiết bị không khả dụng** | Thiết bị ở trạng thái `Moi` (chưa kiểm nhận), `CanBaoDuong`, `DangBaoDuong`, `DeXuatThanhLy`, `DaThanhLy` bị ẩn 100% khỏi danh sách tra cứu của Nhân viên (UC06) và màn hình lập phiếu mượn. | Chặn truy cập trên giao diện; Trigger CSDL `trg_CTPM_ChanTaiSanKhongKhaDung_BR10` chặn INSERT vào `ChiTietPhieuMuon`. |
| **BR11** | **Điều kiện hoàn tất phiếu bảo dưỡng** | Phiếu bảo dưỡng chỉ được nghiệm thu/kết thúc khi: `DonViSuaChua != empty` AND `NoiDungSuaChua != empty` AND `TongChiPhi >= 0` *(cho phép = 0 đối với sửa chữa bảo hành miễn phí)*. | Chặn lưu nghiệm thu bảo dưỡng nếu thiếu thông tin đơn vị hoặc nội dung kỹ thuật. |
| **BR12** | **Nghiệm thu bảo dưỡng & Bất biến hiện trạng** | Khi nghiệm thu bảo dưỡng, Thủ kho nhập `HienTrangSauSuaChua` thực tế:<br>- Nếu `HienTrangSauSuaChua >= 50%`: Cập nhật `TaiSan.HienTrang = HienTrangSauSuaChua`, `TaiSan.TrangThai = 'SanSangChiaSe'`, `PhieuBaoDuong.TrangThaiBaoDuong = 'DaNghiemThu'`, `NgayKetThuc = CurrentDate`.<br>- Nếu không thể sửa hoặc `HienTrangSauSuaChua < 50%`: Không cho phép về kho chia sẻ. Thủ kho chọn kết thúc \"Không thể sửa\" $\rightarrow$ `PhieuBaoDuong.TrangThaiBaoDuong = 'KhongTheSua'`, chuyển `TaiSan.TrangThai = 'DeXuatThanhLy'` (kích hoạt theo điều kiện 3 của BR15).<br>- Nếu Lãnh đạo **bác bỏ** thanh lý một máy có phiếu bảo dưỡng gần nhất kết luận `KhongTheSua`, máy chuyển về `CanBaoDuong` (không quay lại kho chia sẻ dù hiện trạng còn >= 50%). | Đảm bảo bất biến thiết bị lưu hành trên kho dùng chung luôn có hiện trạng kỹ thuật $\ge 50\%$. |
| **BR13** | **Hạn ngạch mượn & Khóa quyền mượn phòng ban** | Quyền mượn được suy ra động từ CSDL: Một phòng ban chỉ được duyệt lập phiếu mượn mới khi và chỉ khi:<br>1. Số lượng phiếu chưa hoàn tất `Count(PhieuMuon đang ChoDuyet + DaDuyet + DangThucHien của phòng) < 5` *(hạn ngạch đếm theo số phiếu, không đếm số thiết bị)*.<br>2. Phòng ban không có phiếu nào đang mượn mà bị quá hạn: `Count(PhieuMuon WHERE MaPBMuon = @MaPB AND TrangThai = 'DangThucHien' AND CoQuaHan = 1) == 0`. | Tự động từ chối tiếp nhận yêu cầu mượn mới; cảnh báo đơn vị xử lý hoàn trả thiết bị quá hạn. |
| **BR14** | **Quy tắc kích hoạt cờ Quá hạn** | Chạy kiểm tra định kỳ (hàng ngày): Nếu `PhieuMuon.TrangThai == 'DangThucHien'` AND `CAST(GETDATE() AS date) > NgayHenTra` $\rightarrow$ Bật cờ `CoQuaHan = 1`. Cờ `CoQuaHan` được giữ nguyên vĩnh viễn khi phiếu chuyển sang `HoanTat` để lưu vết lịch sử vi phạm. | Tự động kích hoạt hạn chế quyền mượn theo BR13 cho đến khi hoàn tất biên bản thu hồi. |
| **BR15** | **Tiêu chuẩn lập hồ sơ đề xuất thanh lý** | Thiết bị được phép lập đề xuất thanh lý khi thỏa mãn **ít nhất 1 trong 3 điều kiện**:<br>1. Hết niên hạn sử dụng: `(Year(CurrentDate) - NamMua) >= LoaiTaiSan.NienHanNam`.<br>2. Chi phí sửa chữa quá lớn: Tổng chi phí các đợt bảo dưỡng kết thúc `TongChiPhiBaoDuongLuyKe >= 0.7 * NguyenGia`.<br>3. **Không thể phục hồi sau bảo dưỡng:** Kết thúc phiếu bảo dưỡng với kết luận 'Không thể sửa' hoặc `HienTrangSauSuaChua < 50%` (theo BR12). | Chặn tạo hồ sơ thanh lý nếu thiết bị không thỏa mãn bất kỳ điều kiện nào trong 3 điều kiện trên. |
| **BR16** | **Ràng buộc toàn vẹn dữ liệu (Restrict Deletion)** | Không cho phép xóa Phòng ban hoặc Loại tài sản nếu đang có tài sản trực thuộc. Không cho phép xóa Tài sản nếu đã có dữ liệu phát sinh trong `ChiTietPhieuMuon`, `LichSuSuCo` hoặc `PhieuBaoDuong`. | Hệ thống bắt lỗi ràng buộc Foreign Key và hiển thị thông báo nghiệp vụ thân thiện. |
| **BR17** | **Độc quyền hủy yêu cầu mượn tài sản** | - Cán bộ mượn chỉ được tự bấm Hủy phiếu khi phiếu ở trạng thái `ChoDuyet`.<br>- Khi phiếu đã `DaDuyet`, chỉ Thủ kho mới có quyền hủy xuất kho (`HuyBanGiao`) nếu phát hiện lỗi thiết bị hoặc quá hạn nhận máy. | Khóa nút Hủy trên giao diện người dùng khi phiếu đã qua bước xét duyệt. |
| **BR18** | **Mô hình CAI: Tiết kiệm mượn ngắn hạn ($D \le 7$)** | Số ngày mượn thực tế: `D_ThucTe = DATEDIFF(day, NgayGiao, NgayThuHoi) + 1` *(tối thiểu 1 ngày, dùng cho thống kê hiệu suất)*. Số ngày **tính CAI**: `D = MIN(D_ThucTe, DATEDIFF(day, NgayMuon, NgayHenTra) + 1)` *(không vượt số ngày đã đăng ký, để việc trả trễ không làm tăng giá trị tránh mua mới)*. Với `D <= 7` ngày: Giá trị tránh mua mới tính theo chi phí thuê ngoài thị trường (1.5% nguyên giá/ngày):<br>$$V_{\text{tranh\_mua}} = D \times 0.015 \times NguyenGia$$ | Hệ thống tự động tính toán độc lập cho từng dòng thiết bị trong phiếu thu hồi. |
| **BR19** | **Mô hình CAI: Tiết kiệm mượn trung/dài hạn ($D \ge 8$)** | Với `D >= 8` ngày: Hệ thống giả định nếu không có kho chia sẻ, đơn vị sẽ lập dự toán xin ngân sách mua sắm mới thiết bị. Do đó, lượt mượn giúp triệt tiêu nhu cầu mua mới, giá trị tránh mua mới được tính bằng 100% nguyên giá tham chiếu:<br>$$V_{\text{tranh\_mua}} = NguyenGia$$ | Ghi nhận giá trị tránh mua mới tối đa cho đợt mượn; xem đây là cận trên của giá trị tránh mua mới tích lũy. |
| **BR20** | **Chỉ số tiết kiệm ròng thực tế (Net Savings)** | Tiết kiệm ròng trong kỳ báo cáo (từ ngày $T_1$ đến $T_2$):<br>$$NCAV = \sum V_{\text{tranh\_mua}} - \sum ChiPhiBaoDuong$$<br>*(Trong đó: $\sum V_{\text{tranh\_mua}}$ lấy từ các phiếu `HoanTat` có `NgayThuHoi` trong kỳ; $\sum ChiPhiBaoDuong$ lấy từ các `PhieuBaoDuong` có `NgayKetThuc` trong kỳ)*. | Hiển thị rõ ràng số khấu trừ chi phí duy tu trên Báo cáo Dashboard CAI (Hình 53). |
| **BR21** | **Kiểm nhận tài sản mới khai báo** | Tài sản ở trạng thái `Moi` chỉ được đưa vào kho dùng chung sau khi Thủ kho đối chiếu thực tế (số seri, phụ kiện, tình trạng) và xác nhận/điều chỉnh `NguyenGia`, `HienTrang`: nếu `HienTrang >= 50%` $
ightarrow$ `SanSangChiaSe`; nếu `HienTrang < 50%` $
ightarrow$ `CanBaoDuong`. Tài sản `Moi` không được mượn (BR03, BR10) và không được lập hồ sơ thanh lý. | Chỉ vai trò Thủ kho được kiểm nhận; chặn kiểm nhận tài sản không ở trạng thái `Moi`. |

### HAI QUY TẮC BỔ SUNG QUAN TRỌNG:
* **BR-EXTRA-01 (Tự động hủy phiếu Đã duyệt không đến nhận máy):** Khi chạy quét định kỳ hàng ngày, nếu phiếu mượn mang trạng thái `DaDuyet` mà người mượn vẫn chưa đến nhận máy sau `TS07` ngày (mặc định 3) kể từ `NgayMuon` (`CurrentDate > NgayMuon + TS07`) hoặc đã quá `NgayHenTra` $\rightarrow$ Hệ thống tự động chuyển `PhieuMuon.TrangThai = 'DaHuy'`. Lịch mượn của thiết bị tự động được giải phóng vì tài sản vẫn đang ở trạng thái `SanSangChiaSe`.
* **BR-EXTRA-02 (Cấu hình tham số hệ thống qua bảng `ThamSoCAI`):** Toàn bộ các hằng số tính toán mềm được lưu tại bảng `ThamSoCAI`, bao gồm:
  - `TS01_TY_LE_THUE_NGAY`: `0.0150` (1.5%/ngày - dùng cho BR18).
  - `TS02_NGUONG_NGAY_NGAN_HAN`: `7` (ngày - phân định BR18 và BR19).
  - `TS03_HAN_MUC_MUON_TOI_DA`: `30` (ngày - dùng cho BR02).
  - `TS04_HIEN_TRANG_TOI_THIEU`: `50` (% - ngưỡng lưu hành kho dùng chung BR01, BR09, BR12).
  - `TS05_TY_LE_THANH_LY_SUA_CHUA`: `0.7000` (70% chi phí sửa lũy kế BR15).
  - `TS06_HAN_MUC_PHIEU`: `5` (số lượng phiếu chưa hoàn tất tối đa của một phòng ban theo BR13).
  - `TS07_SO_NGAY_CHO_NHAN_MAY`: `3` (ngày - tự hủy phiếu Đã duyệt không đến nhận máy theo BR-EXTRA-01).
  - Ràng buộc miền giá trị: `TS02 <= TS03 <= 30` (không vượt CHECK 30 ngày của bảng `PhieuMuon`), `TS07` từ 0 đến 30 ngày.

---

## PHẦN 2: BẢNG ĐẶC TẢ SƠ ĐỒ LỚP (CLASS DIAGRAM)

| Lớp (Class) | Thuộc tính thêm mới | Thuộc tính / Phương thức bỏ hoặc đổi |
| :--- | :--- | :--- |
| **PhongBan** | `DiaDiem: String` | **Bỏ:** `TrangThaiKhoa`, `khoaQuyenMuon()`, `moKhoaQuyenMuon()` *(vì khóa suy ra từ dữ liệu theo BR13)*. |
| **NguoiDung** | `TenDangNhap: String`, `MaXacNhanReset: String`, `HanReset: DateTime` | `MatKhau` lưu chuỗi hash (SHA-256). |
| **LoaiTaiSan** | — | Đổi `DinhMucSuDung` $\rightarrow$ `NienHanNam: Integer`. Giữ `NhomTaiSan` làm discriminator. |
| **TaiSan** | `ViTriLuuTru: String`, `HinhAnh: String`, `MoTa: String`. Thêm quan hệ sở hữu tới `PhongBan`. | Đổi `capNhatTrangThai()` $\rightarrow$ `chuyenTrangThai(maNDThucHien)` *(để ghi vết vào lịch sử)*. |
| **PhieuMuon** | `LyDoTuChoi: String`, `LyDoHuy: String`. Thêm quan hệ tới `NguoiDung` (người mượn, người duyệt). | `TrangThai` có 6 giá trị; giữ cờ `CoQuaHan: Boolean`; đổi `quetQuaHan()` $\rightarrow$ `danhDauQuaHan()`; thêm `tuDongHuy()`, `huyBanGiao()`. |
| **ChiTietPhieuMuon** | `TinhTrangTruoc: String`, `TinhTrangSau: String`, `TyLeHaoMon: Integer`, `GhiChuSau: String` | **Bỏ:** `TrangThaiXacNhan` *(đã chuyển chi tiết vào tình trạng trước/sau)*. |
| **BienBanBanGiao** | Quan hệ tới `NguoiDung` (người giao, người nhận). | **Bỏ:** `TinhTrangMay` *(đã chuyển xuống `ChiTietPhieuMuon`)*; giữ `TrangThaiGiao` (`DaGiao` / `Huy`). |
| **BienBanThuHoi** | `GhiChu: String`; quan hệ tới `NguoiDung` (người thu hồi, người trả). | **Bỏ:** `TyLeHaoMon`, `DanhGiaTinhTrang`, `TrangThaiThuHoi` *(đã chuyển xuống chi tiết)*; giữ `SoNgayMuonThucTe`. |
| **LichSuSuCo** | Quan hệ tới `PhongBan` (`MaPBChiuTrachNhiem`); liên kết `BienBanBanGiao 0..1`. | `MucDoThietHai` đổi thành kiểu số nguyên (%); bỏ `TrachNhiemDonVi` *(thay bằng quan hệ `PhongBan`)*; `BienBanThuHoi 0..1 — 0..* LichSuSuCo`. |
| **PhieuBaoDuong** | `NoiDungSuaChua: String`, `HienTrangSauSuaChua: Integer`, quan hệ tới `NguoiDung` (người lập). | **Bỏ:** `TongChiPhi` *(tính động bằng SUM chi tiết)*; đổi `NgayNghiemThu` $\rightarrow$ `NgayKetThuc: DateTime`. |
| **ThamSoCAI** | — | **Bỏ:** Mũi tên nét đứt từ `PhieuMuon`. `ThamSoCAI` đứng độc lập. |
| **HoSoThanhLy** *(Mới)* | `MaHSTL: String`, `NgayDeXuat: DateTime`, `LyDoDeXuat: String`, `TrangThai: String`, `NgayDuyet: DateTime`, `SoQuyetDinh: String`, `GhiChuDuyet: String`. | Quan hệ: `TaiSan 1 — 0..* HoSoThanhLy`; `NguoiDung` (người đề xuất, người duyệt). |
| **LichSuTrangThaiTaiSan** *(Mới)* | `MaLichSu: Integer`, `TrangThaiCu: String`, `TrangThaiMoi: String`, `NgayThayDoi: DateTime`, `LyDo: String`. | Quan hệ: `TaiSan 1 — 0..* LichSuTrangThaiTaiSan`; `NguoiDung` (người thực hiện). |

---

## PHẦN 3: BẢNG ĐẶC TẢ CƠ SỞ DỮ LIỆU ERD (14 BẢNG VẬT LÝ)

1. **PhongBan:** `MaPB` (PK, varchar(20)), `TenPB` (nvarchar(100), UNIQUE, NN), `DiaDiem` (nvarchar(150)), `SoDienThoai` (varchar(20)), `TruongDonVi` (nvarchar(100)).
2. **NguoiDung:** `MaND` (PK, varchar(20)), `MaPB` (FK, varchar(20), NN), `TenDangNhap` (varchar(50), UNIQUE, NN), `MatKhau` (varchar(255), NN - Hash hex), `HoTen` (nvarchar(120), NN), `Email` (varchar(100), UNIQUE), `VaiTro` (nvarchar(30), CHECK: NhanVien, ThuKho, QuanTri, LanhDao), `TrangThaiTK` (nvarchar(30), CHECK: HoatDong, Khoa), `MaXacNhanReset` (varchar(20)), `HanReset` (datetime).
3. **LoaiTaiSan:** `MaLoaiTS` (PK, varchar(20)), `TenLoaiTS` (nvarchar(100), NN), `NhomTaiSan` (nvarchar(30), CHECK: DoDac, CNTT, ThietBiChung), `NienHanNam` (int, CHECK > 0).
4. **TaiSan:** `MaTS` (PK, varchar(20)), `MaLoaiTS` (FK, varchar(20), NN), `MaPBSoHuu` (FK, varchar(20), NN), `TenTS` (nvarchar(150), NN), `SoSeri` (varchar(50), UNIQUE), `NguyenGia` (decimal(18,2), CHECK > 0), `NamMua` (int), `HienTrang` (int, CHECK 0–100), `TrangThai` (varchar(20), CHECK: Moi, SanSangChiaSe, DangMuon, CanBaoDuong, DangBaoDuong, DeXuatThanhLy, DaThanhLy), `ViTriLuuTru` (nvarchar(150)), `HinhAnh` (varchar(255)), `MoTa` (nvarchar(500)), các cột riêng của 3 nhóm thiết bị (NULLable): `DoChinhXac` (nvarchar(50)), `ChuKyKiemDinh` (int), `CauHinhCPU` (nvarchar(100)), `DungLuongRAM` (nvarchar(50)), `CongSuat` (nvarchar(50)), `PhuKienDiKem` (nvarchar(255)).
5. **PhieuMuon:** `MaPM` (PK, varchar(20)), `MaNguoiMuon` (FK, varchar(20), NN), `MaPBMuon` (FK, varchar(20), NN), `MaNguoiDuyet` (FK, varchar(20), NULL), `NgayLap` (datetime, NN), `NgayMuon` (date, NN), `NgayHenTra` (date, NN), `MucDichSuDung` (nvarchar(255)), `TrangThai` (varchar(20), CHECK: ChoDuyet, DaDuyet, DangThucHien, HoanTat, TuChoi, DaHuy), `CoQuaHan` (bit, DEFAULT 0), `NgayDuyet` (datetime), `LyDoTuChoi` (nvarchar(255)), `LyDoHuy` (nvarchar(255)). CHECK: `NgayHenTra >= NgayMuon` AND `DATEDIFF(day, NgayMuon, NgayHenTra) + 1 <= 30` (BR02).
6. **ChiTietPhieuMuon:** PK hỗn hợp `(MaPM, MaTS)`. `GhiChuMucDich` (nvarchar(255)), `TinhTrangTruoc` (nvarchar(255)), `TinhTrangSau` (varchar(20), CHECK: Tot, CanBaoTri, HuHong, NULL), `TyLeHaoMon` (int, CHECK 0–100, NULL), `GhiChuSau` (nvarchar(255)).
7. **BienBanBanGiao:** `MaBBBG` (PK, varchar(20)), `MaPM` (FK, varchar(20), UNIQUE, NN), `MaNguoiGiao` (FK, varchar(20), NN), `MaNguoiNhan` (FK, varchar(20), NN), `NgayGiao` (datetime, NN), `PhuKienKemTheo` (nvarchar(255)), `TrangThaiGiao` (nvarchar(50), CHECK: DaGiao, Huy).
8. **BienBanThuHoi:** `MaBBTH` (PK, varchar(20)), `MaPM` (FK, varchar(20), UNIQUE, NN), `MaNguoiThuHoi` (FK, varchar(20), NN), `MaNguoiTra` (FK, varchar(20), NN), `NgayThuHoi` (datetime, NN), `SoNgayMuonThucTe` (int), `GhiChu` (nvarchar(255)).
9. **LichSuSuCo:** `MaSuCo` (PK, varchar(20)), `MaTS` (FK, varchar(20), NN), `MaBBBG` (FK, varchar(20), NULL), `MaBBTH` (FK, varchar(20), NULL), CHECK: `NOT (MaBBBG IS NOT NULL AND MaBBTH IS NOT NULL)`, `NgayPhatSinh` (datetime, NN), `MoTaHuHong` (nvarchar(255)), `MucDoThietHai` (int, CHECK 0–100), `ChiPhiBoiThuong` (decimal(18,2)), `MaPBChiuTrachNhiem` (FK, varchar(20), NULL).
10. **PhieuBaoDuong:** `MaPBD` (PK, varchar(20)), `MaTS` (FK, varchar(20), NN), `MaNguoiLap` (FK, varchar(20), NN), `NgayLapPhieu` (datetime, NN), `DonViSuaChua` (nvarchar(150)), `NoiDungSuaChua` (nvarchar(255)), `TrangThaiBaoDuong` (varchar(20), CHECK: DangSua, DaNghiemThu, KhongTheSua), `NgayKetThuc` (datetime), `HienTrangSauSuaChua` (int, CHECK 0–100).
11. **ChiTietBaoDuong:** `MaChiTietBD` (PK, int IDENTITY(1,1)), `MaPBD` (FK, varchar(20), NN), `HangMucSuaChua` (nvarchar(150)), `LinhKienThayThe` (nvarchar(150)), `DonGia` (decimal(18,2), CHECK >= 0), `SoLuong` (int, CHECK > 0), `ThanhTien AS (DonGia * SoLuong) PERSISTED`.
12. **HoSoThanhLy:** `MaHSTL` (PK, varchar(20)), `MaTS` (FK, varchar(20), NN), `MaNguoiDeXuat` (FK, varchar(20), NN), `NgayDeXuat` (datetime, NN), `LyDoDeXuat` (nvarchar(255)), `TrangThai` (varchar(20), CHECK: ChoDuyet, DaDuyet, BacBo), `MaNguoiDuyet` (FK, varchar(20), NULL), `NgayDuyet` (datetime), `SoQuyetDinh` (nvarchar(50)), `GhiChuDuyet` (nvarchar(255)).
13. **LichSuTrangThaiTaiSan:** `MaLichSu` (PK, int IDENTITY(1,1)), `MaTS` (FK, varchar(20), NN), `TrangThaiCu` (varchar(20), NULL), `TrangThaiMoi` (varchar(20), NN), `NgayThayDoi` (datetime, NN, DEFAULT GETDATE()), `MaNguoiThucHien` (FK, varchar(20), NULL), `MaPM` (FK, varchar(20), NULL), `LyDo` (nvarchar(255)).
14. **ThamSoCAI:** `MaThamSo` (PK, varchar(20)), `TenThamSo` (nvarchar(100)), `GiaTri` (decimal(18,4)), `DonViTinh` (nvarchar(30)), `NgayCapNhat` (datetime). Nạp sẵn 7 tham số: `TS01` (0.0150), `TS02` (7.0), `TS03` (30.0), `TS04` (50.0), `TS05` (0.7000), `TS06` (5.0), `TS07` (3.0).
