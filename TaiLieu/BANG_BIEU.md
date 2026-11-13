# BẢNG BIỂU TRONG BÁO CÁO ĐỒ ÁN ENV-09

Toàn bộ bảng biểu trong báo cáo Word *Hệ thống chia sẻ và tái sử dụng tài sản nội bộ*, xuất nguyên văn để đối chiếu. Số và tên bảng giữ đúng như trong báo cáo; các bảng đặc tả Use Case (mục 2.4) trong báo cáo không đánh số nên được ghi theo tên Use Case.

Gồm **70 bảng có đánh số**, **17 bảng đặc tả Use Case** và **1 bảng danh sách Use Case**.

## Mục lục

- **Chương 1: Giới Thiệu Đề Tài**
  - [Bảng 1. Hiện trạng, hạn chế và hướng giải quyết của hệ thống](#bảng-1-hiện-trạng-hạn-chế-và-hướng-giải-quyết-của-hệ-thống)
  - [Bảng 2. Các bộ phận tham gia hệ thống](#bảng-2-các-bộ-phận-tham-gia-hệ-thống)
  - [Bảng 3. Các phân hệ của hệ thống](#bảng-3-các-phân-hệ-của-hệ-thống)
  - [Bảng 4. Danh sách yêu cầu chức năng](#bảng-4-danh-sách-yêu-cầu-chức-năng)
  - [Bảng 5. Danh sách yêu cầu phi chức năng](#bảng-5-danh-sách-yêu-cầu-phi-chức-năng)
  - [Bảng 6. Danh sách các biểu mẫu và quy định](#bảng-6-danh-sách-các-biểu-mẫu-và-quy-định)
  - [Bảng 7. Biểu mẫu BM1 - Phiếu khai báo tài sản nhàn rỗi](#bảng-7-biểu-mẫu-bm1---phiếu-khai-báo-tài-sản-nhàn-rỗi)
  - [Bảng 8. Biểu mẫu BM2 - Phiếu yêu cầu mượn tài sản](#bảng-8-biểu-mẫu-bm2---phiếu-yêu-cầu-mượn-tài-sản)
  - [Bảng 9. Biểu mẫu BM3 - Biên bản bàn giao thiết bị](#bảng-9-biểu-mẫu-bm3---biên-bản-bàn-giao-thiết-bị)
  - [Bảng 10. Biểu mẫu BM4 - Biên bản thu hồi và đánh giá hao mòn](#bảng-10-biểu-mẫu-bm4---biên-bản-thu-hồi-và-đánh-giá-hao-mòn)
  - [Bảng 11. Biểu mẫu BM5 - Phiếu bảo dưỡng / sửa chữa](#bảng-11-biểu-mẫu-bm5---phiếu-bảo-dưỡng--sửa-chữa)
  - [Bảng 12. Biểu mẫu BM6 - Hồ sơ đề xuất thanh lý](#bảng-12-biểu-mẫu-bm6---hồ-sơ-đề-xuất-thanh-lý)
- **Chương 2: Mô Hình UseCase**
  - [Danh sách các UseCase (mục 2.3, bảng không đánh số trong báo cáo)](#danh-sách-các-usecase-mục-23-bảng-không-đánh-số-trong-báo-cáo)
  - [Đặc tả Use Case “Đăng nhập hệ thống” (mục 2.4.1)](#đặc-tả-use-case-đăng-nhập-hệ-thống-mục-241)
  - [Đặc tả Use Case “Quản lý phòng ban” (mục 2.4.2)](#đặc-tả-use-case-quản-lý-phòng-ban-mục-242)
  - [Đặc tả Use Case “Quản lý loại tài sản” (mục 2.4.3)](#đặc-tả-use-case-quản-lý-loại-tài-sản-mục-243)
  - [Đặc tả Use Case “Quản lý người dùng & phân quyền” (mục 2.4.4)](#đặc-tả-use-case-quản-lý-người-dùng--phân-quyền-mục-244)
  - [Đặc tả Use Case “Đăng ký tài sản nhàn rỗi” (mục 2.4.5)](#đặc-tả-use-case-đăng-ký-tài-sản-nhàn-rỗi-mục-245)
  - [Đặc tả Use Case “Tra cứu tài sản khả dụng” (mục 2.4.6)](#đặc-tả-use-case-tra-cứu-tài-sản-khả-dụng-mục-246)
  - [Đặc tả Use Case “Xem lịch sử mượn-trả & tài sản đóng góp” (mục 2.4.7)](#đặc-tả-use-case-xem-lịch-sử-mượn-trả--tài-sản-đóng-góp-mục-247)
  - [Đặc tả Use Case “Lập yêu cầu mượn tài sản” (mục 2.4.8)](#đặc-tả-use-case-lập-yêu-cầu-mượn-tài-sản-mục-248)
  - [Đặc tả Use Case “Xét duyệt yêu cầu mượn” (mục 2.4.9)](#đặc-tả-use-case-xét-duyệt-yêu-cầu-mượn-mục-249)
  - [Đặc tả Use Case “Lập biên bản bàn giao” (mục 2.4.10)](#đặc-tả-use-case-lập-biên-bản-bàn-giao-mục-2410)
  - [Đặc tả Use Case “Lập biên bản thu hồi & hao mòn” (mục 2.4.11)](#đặc-tả-use-case-lập-biên-bản-thu-hồi--hao-mòn-mục-2411)
  - [Đặc tả Use Case “Đánh giá & chuyển trạng thái vòng đời” (mục 2.4.12)](#đặc-tả-use-case-đánh-giá--chuyển-trạng-thái-vòng-đời-mục-2412)
  - [Đặc tả Use Case “Quản lý bảo dưỡng & sửa chữa” (mục 2.4.13)](#đặc-tả-use-case-quản-lý-bảo-dưỡng--sửa-chữa-mục-2413)
  - [Đặc tả Use Case “Đề xuất & phê duyệt thanh lý tài sản” (mục 2.4.14)](#đặc-tả-use-case-đề-xuất--phê-duyệt-thanh-lý-tài-sản-mục-2414)
  - [Đặc tả Use Case “Xem báo cáo hiệu suất tài sản” (mục 2.4.15)](#đặc-tả-use-case-xem-báo-cáo-hiệu-suất-tài-sản-mục-2415)
  - [Đặc tả Use Case “Xem báo cáo chỉ số tránh mua mới (CAI)” (mục 2.4.16)](#đặc-tả-use-case-xem-báo-cáo-chỉ-số-tránh-mua-mới-cai-mục-2416)
  - [Đặc tả Use Case “Tự động cảnh báo quá hạn mượn” (mục 2.4.17)](#đặc-tả-use-case-tự-động-cảnh-báo-quá-hạn-mượn-mục-2417)
- **Chương 3: Phân tích**
  - [Bảng 13. Danh sách các lớp đối tượng](#bảng-13-danh-sách-các-lớp-đối-tượng)
  - [Bảng 14. Danh sách các quan hệ giữa các lớp](#bảng-14-danh-sách-các-quan-hệ-giữa-các-lớp)
  - [Bảng 15. Thuộc tính của lớp PhongBan](#bảng-15-thuộc-tính-của-lớp-phongban)
  - [Bảng 16. Phương thức của lớp PhongBan](#bảng-16-phương-thức-của-lớp-phongban)
  - [Bảng 17. Thuộc tính của lớp NguoiDung](#bảng-17-thuộc-tính-của-lớp-nguoidung)
  - [Bảng 18. Phương thức của lớp NguoiDung](#bảng-18-phương-thức-của-lớp-nguoidung)
  - [Bảng 19. Thuộc tính của lớp LoaiTaiSan](#bảng-19-thuộc-tính-của-lớp-loaitaisan)
  - [Bảng 20. Phương thức của lớp LoaiTaiSan](#bảng-20-phương-thức-của-lớp-loaitaisan)
  - [Bảng 21. Thuộc tính của lớp TaiSan](#bảng-21-thuộc-tính-của-lớp-taisan)
  - [Bảng 22. Phương thức của lớp TaiSan](#bảng-22-phương-thức-của-lớp-taisan)
  - [Bảng 23. Thuộc tính của lớp TaiSanDoDac](#bảng-23-thuộc-tính-của-lớp-taisandodac)
  - [Bảng 24. Phương thức của lớp TaiSanDoDac](#bảng-24-phương-thức-của-lớp-taisandodac)
  - [Bảng 25. Thuộc tính của lớp TaiSanCNTT](#bảng-25-thuộc-tính-của-lớp-taisancntt)
  - [Bảng 26. Phương thức của lớp TaiSanCNTT](#bảng-26-phương-thức-của-lớp-taisancntt)
  - [Bảng 27. Thuộc tính của lớp TaiSanThietBiChung](#bảng-27-thuộc-tính-của-lớp-taisanthietbichung)
  - [Bảng 28. Phương thức của lớp TaiSanThietBiChung](#bảng-28-phương-thức-của-lớp-taisanthietbichung)
  - [Bảng 29. Thuộc tính của lớp PhieuMuon](#bảng-29-thuộc-tính-của-lớp-phieumuon)
  - [Bảng 30. Phương thức của lớp PhieuMuon](#bảng-30-phương-thức-của-lớp-phieumuon)
  - [Bảng 31. Thuộc tính của lớp ChiTietPhieuMuon](#bảng-31-thuộc-tính-của-lớp-chitietphieumuon)
  - [Bảng 32. Phương thức của lớp ChiTietPhieuMuon](#bảng-32-phương-thức-của-lớp-chitietphieumuon)
  - [Bảng 33. Thuộc tính của lớp BienBanBanGiao](#bảng-33-thuộc-tính-của-lớp-bienbanbangiao)
  - [Bảng 34. Phương thức của lớp BienBanBanGiao](#bảng-34-phương-thức-của-lớp-bienbanbangiao)
  - [Bảng 35. Thuộc tính của lớp BienBanThuHoi](#bảng-35-thuộc-tính-của-lớp-bienbanthuhoi)
  - [Bảng 36. Phương thức của lớp BienBanThuHoi](#bảng-36-phương-thức-của-lớp-bienbanthuhoi)
  - [Bảng 37. Thuộc tính của lớp LichSuSuCo](#bảng-37-thuộc-tính-của-lớp-lichsusuco)
  - [Bảng 38. Phương thức của lớp LichSuSuCo](#bảng-38-phương-thức-của-lớp-lichsusuco)
  - [Bảng 39. Thuộc tính của lớp PhieuBaoDuong](#bảng-39-thuộc-tính-của-lớp-phieubaoduong)
  - [Bảng 40. Phương thức của lớp PhieuBaoDuong](#bảng-40-phương-thức-của-lớp-phieubaoduong)
  - [Bảng 41. Thuộc tính của lớp ChiTietBaoDuong](#bảng-41-thuộc-tính-của-lớp-chitietbaoduong)
  - [Bảng 42. Phương thức của lớp ChiTietBaoDuong](#bảng-42-phương-thức-của-lớp-chitietbaoduong)
  - [Bảng 43. Thuộc tính của lớp HoSoThanhLy](#bảng-43-thuộc-tính-của-lớp-hosothanhly)
  - [Bảng 44. Phương thức của lớp HoSoThanhLy](#bảng-44-phương-thức-của-lớp-hosothanhly)
  - [Bảng 45. Thuộc tính của lớp LichSuTrangThaiTaiSan](#bảng-45-thuộc-tính-của-lớp-lichsutrangthaitaisan)
  - [Bảng 46. Phương thức của lớp LichSuTrangThaiTaiSan](#bảng-46-phương-thức-của-lớp-lichsutrangthaitaisan)
  - [Bảng 47. Thuộc tính của lớp ThamSoCAI](#bảng-47-thuộc-tính-của-lớp-thamsocai)
  - [Bảng 48. Phương thức của lớp ThamSoCAI](#bảng-48-phương-thức-của-lớp-thamsocai)
- **Chương 4: Thiết Kế Dữ Liệu**
  - [Bảng 49. Cấu trúc bảng PhongBan](#bảng-49-cấu-trúc-bảng-phongban)
  - [Bảng 50. Cấu trúc bảng NguoiDung](#bảng-50-cấu-trúc-bảng-nguoidung)
  - [Bảng 51. Cấu trúc bảng LoaiTaiSan](#bảng-51-cấu-trúc-bảng-loaitaisan)
  - [Bảng 52. Cấu trúc bảng TaiSan](#bảng-52-cấu-trúc-bảng-taisan)
  - [Bảng 53. Cấu trúc bảng PhieuMuon](#bảng-53-cấu-trúc-bảng-phieumuon)
  - [Bảng 54. Cấu trúc bảng ChiTietPhieuMuon](#bảng-54-cấu-trúc-bảng-chitietphieumuon)
  - [Bảng 55. Cấu trúc bảng BienBanBanGiao](#bảng-55-cấu-trúc-bảng-bienbanbangiao)
  - [Bảng 56. Cấu trúc bảng BienBanThuHoi](#bảng-56-cấu-trúc-bảng-bienbanthuhoi)
  - [Bảng 57. Cấu trúc bảng LichSuSuCo](#bảng-57-cấu-trúc-bảng-lichsusuco)
  - [Bảng 58. Cấu trúc bảng PhieuBaoDuong](#bảng-58-cấu-trúc-bảng-phieubaoduong)
  - [Bảng 59. Cấu trúc bảng ChiTietBaoDuong](#bảng-59-cấu-trúc-bảng-chitietbaoduong)
  - [Bảng 60. Cấu trúc bảng ThamSoCAI](#bảng-60-cấu-trúc-bảng-thamsocai)
  - [Bảng 61. Cấu trúc bảng HoSoThanhLy](#bảng-61-cấu-trúc-bảng-hosothanhly)
  - [Bảng 62. Cấu trúc bảng LichSuTrangThaiTaiSan](#bảng-62-cấu-trúc-bảng-lichsutrangthaitaisan)
- **Chương 5: Thiết Kế Kiến Trúc**
  - [Bảng 63. Framework và công nghệ sử dụng](#bảng-63-framework-và-công-nghệ-sử-dụng)
  - [Bảng 64. Các gói mã nguồn backend](#bảng-64-các-gói-mã-nguồn-backend)
  - [Bảng 65. Các thủ tục nghiệp vụ](#bảng-65-các-thủ-tục-nghiệp-vụ)
  - [Bảng 66. Ma trận phân quyền chức năng ghi dữ liệu](#bảng-66-ma-trận-phân-quyền-chức-năng-ghi-dữ-liệu)
- **Chương 6: Thiết Kế Giao Diện**
  - [Bảng 67. Danh sách các màn hình](#bảng-67-danh-sách-các-màn-hình)
- **Chương 7: Kết Luận**
  - [Bảng 68. Công cụ sử dụng trong quá trình phát triển](#bảng-68-công-cụ-sử-dụng-trong-quá-trình-phát-triển)
  - [Bảng 69. Kết quả kiểm thử theo nhóm chức năng](#bảng-69-kết-quả-kiểm-thử-theo-nhóm-chức-năng)
  - [Bảng 70. Bảng phân chia công việc](#bảng-70-bảng-phân-chia-công-việc)
- **TÀI LIỆU THAM KHẢO**

---

## Chương 1: Giới Thiệu Đề Tài

### Bảng 1. Hiện trạng, hạn chế và hướng giải quyết của hệ thống

| STT | Hiện trạng | Hạn chế | Hướng giải quyết trong hệ thống |
|---|---|---|---|
| 1 | Thiết bị nhàn rỗi nằm rải rác tại từng khoa | Lãng phí tài sản công, đơn vị khác không biết để mượn | Kho tài sản dùng chung: khai báo, Thủ kho kiểm nhận, tra cứu theo nhiều tiêu chí (UC05, UC06, UC12) |
| 2 | Có nhu cầu đột xuất thì lập tờ trình mua mới hoặc thuê ngoài | Trùng lặp, lãng phí ngân sách mua sắm | Lập yêu cầu mượn trực tuyến, kiểm tra khả dụng và hạn mức (UC08, BR02 - BR05, BR13) |
| 3 | Mượn trả qua tin nhắn, giấy tờ, không biên bản kỹ thuật | Khó quy trách nhiệm hư hỏng, dễ trùng lịch | Xét duyệt có khóa chống trùng lịch, biên bản bàn giao / thu hồi từng máy, tính bồi thường (UC09 - UC11, BR04, BR06 - BR09) |
| 4 | Không theo dõi vòng đời và chi phí bảo dưỡng | Không biết thời điểm thanh lý, không đo được hiệu quả dùng chung | Máy trạng thái vòng đời 7 trạng thái, bảo dưỡng, thanh lý và báo cáo chỉ số tránh mua mới CAI (UC12 - UC16, BR15, BR18 - BR20) |

### Bảng 2. Các bộ phận tham gia hệ thống

| STT | Bộ phận / tác nhân | Nhiệm vụ | Chức năng sử dụng trong hệ thống |
|---|---|---|---|
| 1 | Khoa / Phòng / Viện (Nhân viên) | Đóng góp thiết bị nhàn rỗi, mượn thiết bị phục vụ giảng dạy, nghiên cứu | Khai báo tài sản, tra cứu, lập / hủy yêu cầu mượn, ký giao nhận, xem lịch sử và tài sản đóng góp |
| 2 | Phòng Quản trị Thiết bị (Thủ kho) | Vận hành kho dùng chung, kiểm soát chất lượng thiết bị | Kiểm nhận tài sản, xét duyệt mượn, bàn giao, thu hồi, bảo dưỡng, đề xuất thanh lý, quét quá hạn, xem báo cáo |
| 3 | Ban Giám hiệu (Lãnh đạo đơn vị) | Giám sát hiệu quả sử dụng tài sản công | Xem báo cáo hiệu suất, chỉ số tránh mua mới CAI, phê duyệt hoặc bác bỏ thanh lý |
| 4 | Bộ phận Quản trị hệ thống (Quản trị viên) | Bảo đảm hệ thống vận hành, phân quyền đúng | Quản lý phòng ban, loại tài sản, người dùng, khóa / mở khóa tài khoản, cấu hình 7 tham số TS01 - TS07 |
| 5 | Hệ thống (tác nhân thời gian) | Tự động hóa kiểm soát hạn trả | Quét quá hạn lúc 00:05 hằng ngày, bật cờ quá hạn, tự hủy phiếu không đến nhận máy |

### Bảng 3. Các phân hệ của hệ thống

| STT | Phân hệ | Chức năng chính | Use Case |
|---|---|---|---|
| 1 | Quản lý & khai báo tài sản nhàn rỗi | Khai báo, tra cứu, xem lịch sử và tài sản đóng góp | UC05, UC06, UC07 |
| 2 | Đăng ký & xét duyệt mượn | Lập, hủy, xét duyệt yêu cầu mượn | UC08, UC09 |
| 3 | Bàn giao & thu hồi | Biên bản bàn giao, thu hồi, ghi sự cố, bồi thường | UC10, UC11 |
| 4 | Vòng đời & bảo dưỡng | Kiểm nhận, đánh giá vòng đời, bảo dưỡng, thanh lý | UC12, UC13, UC14 |
| 5 | Báo cáo & tự động hóa | Báo cáo hiệu suất, CAI / NCAV, cảnh báo quá hạn | UC15, UC16, UC17 |
| 6 | Quản trị hệ thống | Đăng nhập, phòng ban, loại tài sản, người dùng, tham số | UC01 - UC04 |

### Bảng 4. Danh sách yêu cầu chức năng

| Mã | Phân hệ | Nội dung yêu cầu | UC / BR |
|---|---|---|---|
| FR01 | Quản trị | Đăng nhập bằng tên đăng nhập, mật khẩu; từ chối tài khoản bị khóa; phân quyền theo vai trò | UC01 |
| FR02 | Quản trị | Thêm, tra cứu phòng ban; chặn trùng mã, trùng tên; không xóa phòng ban đang có tài sản, nhân sự | UC02, BR16 |
| FR03 | Quản trị | Quản lý loại tài sản theo nhóm (Đo đạc, CNTT, Thiết bị chung) và niên hạn sử dụng | UC03 |
| FR04 | Quản trị | Cấp tài khoản, gán phòng ban, vai trò; khóa / mở khóa tài khoản | UC04 |
| FR05 | Quản trị | Cấu hình 7 tham số mềm TS01 - TS07 có kiểm tra miền giá trị | UC04, BR-EXTRA-02 |
| FR06 | Tài sản | Khai báo tài sản nhàn rỗi kèm thuộc tính riêng theo nhóm; kiểm tra hiện trạng, số seri | UC05, BR01 |
| FR07 | Tài sản | Thủ kho kiểm nhận tài sản Mới, xác nhận nguyên giá và hiện trạng trước khi đưa vào kho | UC12, BR21 |
| FR08 | Tài sản | Tra cứu thiết bị Sẵn sàng chia sẻ theo tên, phòng ban, trạng thái; ẩn thiết bị không khả dụng | UC06, BR03, BR10 |
| FR09 | Tài sản | Xem lịch sử mượn - trả, tài sản đơn vị đóng góp và nhật ký vòng đời từng thiết bị | UC07 |
| FR10 | Mượn trả | Lập yêu cầu mượn một hoặc nhiều thiết bị, tối đa 30 ngày, không mượn thiết bị của đơn vị mình | UC08, BR02, BR05 |
| FR11 | Mượn trả | Chặn đơn vị có phiếu quá hạn hoặc đã đủ 5 phiếu chưa hoàn tất | UC08, BR13 |
| FR12 | Mượn trả | Người mượn hủy yêu cầu khi còn Chờ duyệt | UC08, BR17 |
| FR13 | Mượn trả | Thủ kho duyệt / từ chối; chống trùng lịch trong giao dịch khóa | UC09, BR04 |
| FR14 | Giao nhận | Lập biên bản bàn giao, kiểm từng máy, đủ ngày bắt đầu mượn; xuất kho trong một giao dịch | UC10, BR06, BR07 |
| FR15 | Giao nhận | Hủy bàn giao (hủy cả phiếu) khi phát hiện máy lỗi, ghi sự cố | UC10, BR06 |
| FR16 | Giao nhận | Lập biên bản thu hồi, đánh giá hao mòn từng máy, phân luồng trạng thái | UC11, BR08, BR09 |
| FR17 | Giao nhận | Ghi sự cố, tính bồi thường theo mức độ thiệt hại, quy trách nhiệm đơn vị mượn | UC11, BR09 |
| FR18 | Vòng đời | Lập phiếu bảo dưỡng nhiều hạng mục, linh kiện, đơn giá | UC13, BR11 |
| FR19 | Vòng đời | Nghiệm thu bảo dưỡng: đạt (>= 50%) về kho, không thể sửa chuyển đề xuất thanh lý | UC13, BR12 |
| FR20 | Vòng đời | Lập hồ sơ thanh lý khi thỏa 1 trong 3 căn cứ; Lãnh đạo ký duyệt hoặc bác bỏ | UC14, BR15 |
| FR21 | Vòng đời | Ghi nhật ký mọi lần chuyển trạng thái, chặn chuyển sai sơ đồ Hình 11 | UC12 |
| FR22 | Báo cáo | Báo cáo hiệu suất: lượt mượn, số ngày mượn, số lượt mỗi thiết bị được mượn | UC15 |
| FR23 | Báo cáo | Báo cáo CAI / NCAV theo kỳ, thẻ KPI và biểu đồ 4 học kỳ gần nhất | UC16, BR18 - BR20 |
| FR24 | Tự động | Quét quá hạn hằng ngày, bật cờ quá hạn, chặn đơn vị lập phiếu mới | UC17, BR13, BR14 |
| FR25 | Tự động | Tự hủy phiếu Đã duyệt không đến nhận máy sau TS07 ngày | UC17, BR-EXTRA-01 |

### Bảng 5. Danh sách yêu cầu phi chức năng

| Mã | Nhóm | Yêu cầu |
|---|---|---|
| NFR01 | Toàn vẹn dữ liệu | Quy tắc nghiệp vụ cốt lõi được kiểm tra tại CSDL (thủ tục, trigger, CHECK); mọi nghiệp vụ nhiều bước chạy trong một giao dịch, lỗi thì hoàn tác toàn bộ |
| NFR02 | Đồng thời | Khóa UPDLOCK, HOLDLOCK khi kiểm tra trùng lịch, hạn ngạch và trạng thái thiết bị để hai người thao tác cùng lúc không phá vỡ quy tắc |
| NFR03 | Bảo mật | Mật khẩu băm SHA-256 tại máy chủ, không trả chuỗi băm về giao diện; mọi API yêu cầu Token phiên và kiểm tra vai trò |
| NFR04 | Truy vết | Lịch sử trạng thái ghi người thực hiện, thời điểm, phiếu liên quan và lý do; người thực hiện lấy từ phiên đăng nhập |
| NFR05 | Cấu hình | Các ngưỡng, hệ số (30 ngày, 50%, 1,5%/ngày, 7 ngày, 70%, 5 phiếu, 3 ngày) lưu trong bảng ThamSoCAI, thay đổi không cần sửa mã |
| NFR06 | Khả dụng | Giao diện web tiếng Việt; chức năng hiển thị theo vai trò; thông báo lỗi nêu rõ quy tắc bị vi phạm |
| NFR07 | Tương thích | Chạy trên trình duyệt Chrome / Edge phiên bản mới; máy chủ Java 21, SQL Server 2019 trở lên |
| NFR08 | Bảo trì | Kiến trúc phân tầng Controller - Service - Repository; tài liệu API sinh tự động bằng Swagger |
| NFR09 | Kiểm thử | Có bộ kiểm thử API đầu cuối bao phủ các luồng chính và các trường hợp vi phạm quy tắc nghiệp vụ |

### Bảng 6. Danh sách các biểu mẫu và quy định

| Mã | Tên biểu mẫu | Use Case | Quy định |
|---|---|---|---|
| BM1 | Phiếu khai báo tài sản nhàn rỗi | UC05, UC12 | QĐ1 |
| BM2 | Phiếu yêu cầu mượn tài sản | UC08, UC09 | QĐ2 |
| BM3 | Biên bản bàn giao thiết bị | UC10 | QĐ3 |
| BM4 | Biên bản thu hồi và đánh giá hao mòn | UC11 | QĐ4 |
| BM5 | Phiếu bảo dưỡng / sửa chữa | UC13 | QĐ5 |
| BM6 | Hồ sơ đề xuất thanh lý | UC14 | QĐ6 |
| BM7 | Báo cáo chỉ số tránh mua mới (CAI) | UC16 | QĐ7 |

### Bảng 7. Biểu mẫu BM1 - Phiếu khai báo tài sản nhàn rỗi

| STT | Thông tin | Bắt buộc | Ghi chú |
|---|---|---|---|
| 1 | Tên tài sản | Có |   |
| 2 | Loại tài sản | Có | Chọn từ danh mục, quyết định nhóm thông số riêng |
| 3 | Số seri | Có | Duy nhất trong hệ thống |
| 4 | Nguyên giá (VNĐ) | Có | > 0 |
| 5 | Năm đưa vào sử dụng | Có | 1990 đến năm hiện tại |
| 6 | Hiện trạng (%) | Có | 0 - 100 |
| 7 | Vị trí lưu trữ, hình ảnh, mô tả | Không |   |
| 8 | Thông số riêng theo nhóm | Không | Độ chính xác, chu kỳ kiểm định / CPU, RAM / công suất, phụ kiện |

### Bảng 8. Biểu mẫu BM2 - Phiếu yêu cầu mượn tài sản

| STT | Thông tin | Bắt buộc | Ghi chú |
|---|---|---|---|
| 1 | Người mượn, đơn vị mượn | Có | Tự lấy từ phiên đăng nhập |
| 2 | Danh sách thiết bị | Có | Một hoặc nhiều thiết bị |
| 3 | Ngày bắt đầu mượn | Có | Không ở quá khứ |
| 4 | Ngày hẹn trả | Có | Tối đa 30 ngày kể từ ngày mượn |
| 5 | Mục đích sử dụng | Có |   |
| 6 | Ghi chú cho thiết bị | Không |   |

### Bảng 9. Biểu mẫu BM3 - Biên bản bàn giao thiết bị

| STT | Thông tin | Bắt buộc | Ghi chú |
|---|---|---|---|
| 1 | Phiếu mượn | Có | Trạng thái Đã duyệt |
| 2 | Thủ kho giao, cán bộ nhận | Có | Người nhận thuộc đơn vị mượn |
| 3 | Tình trạng trước khi giao (từng máy) | Có |   |
| 4 | Lỗi phát hiện khi thử máy | Không | Đánh dấu và mô tả nếu có |
| 5 | Phụ kiện kèm theo | Không |   |

### Bảng 10. Biểu mẫu BM4 - Biên bản thu hồi và đánh giá hao mòn

| STT | Thông tin | Bắt buộc | Ghi chú |
|---|---|---|---|
| 1 | Phiếu mượn | Có | Trạng thái Đang thực hiện |
| 2 | Thủ kho thu hồi, cán bộ trả | Có |   |
| 3 | Tình trạng sau (từng máy) | Có | Tốt / Cần bảo trì / Hư hỏng |
| 4 | Tỷ lệ hao mòn (%) | Có | 0 - 100 |
| 5 | Mô tả hư hỏng, mức độ thiệt hại (%) | Khi hư hỏng | > 0% |
| 6 | Ghi chú | Không |   |

### Bảng 11. Biểu mẫu BM5 - Phiếu bảo dưỡng / sửa chữa

| STT | Thông tin | Bắt buộc | Ghi chú |
|---|---|---|---|
| 1 | Thiết bị | Có | Trạng thái Cần bảo dưỡng |
| 2 | Đơn vị sửa chữa, nội dung sửa chữa | Có |   |
| 3 | Hạng mục, linh kiện thay thế, đơn giá, số lượng | Có | Ít nhất một hạng mục; thành tiền tự tính |
| 4 | Hiện trạng sau sửa (%), kết luận | Khi nghiệm thu | Đạt / Không thể sửa |

### Bảng 12. Biểu mẫu BM6 - Hồ sơ đề xuất thanh lý

| STT | Thông tin | Bắt buộc | Ghi chú |
|---|---|---|---|
| 1 | Thiết bị | Có | Không đang mượn, không đang bảo dưỡng, đã kiểm nhận |
| 2 | Lý do đề xuất | Có |   |
| 3 | Số quyết định, ý kiến chỉ đạo | Khi phê duyệt | Lãnh đạo nhập |

---

## Chương 2: Mô Hình UseCase

### Danh sách các UseCase (mục 2.3, bảng không đánh số trong báo cáo)

| ID | Tên Use Case | Actor thực hiện | Mô tả tóm tắt nghiệp vụ |
|---|---|---|---|
| UC01 | Đăng nhập hệ thống | Quản Trị Viên, Nhân viên, Thủ kho, Lãnh đạo đơn vị | Xác thực tài khoản người dùng bằng Tên đăng nhập và Mật khẩu (băm SHA-256) để cấp phiên làm việc và quyền truy cập theo đúng vai trò. Tài khoản đang bị khóa sẽ bị từ chối đăng nhập. |
| UC02 | Quản lý phòng ban | Quản Trị Viên | Thêm mới và tra cứu danh mục các Khoa/Phòng/Viện/Trung tâm trong trường; mã và tên phòng ban không được trùng. Ràng buộc toàn vẹn khóa ngoại (BR16): CSDL ngăn chặn xóa phòng ban đang sở hữu tài sản hoặc có nhân sự công tác. |
| UC03 | Quản lý loại tài sản | Quản Trị Viên | Quản lý danh mục phân loại trang thiết bị (CNTT, Đo đạc môi trường, Âm thanh hội trường, Thiết bị thí nghiệm...). Ngăn chặn xóa loại tài sản đang có thiết bị liên kết. |
| UC04 | Quản lý người dùng & phân quyền | Quản Trị Viên | Cấp phát tài khoản cán bộ, gán đơn vị công tác, phân quyền vai trò (Nhân viên, Thủ kho, Admin, Lãnh đạo), khóa/mở khóa tài khoản và cấu hình các tham số kinh tế nền tảng của Chỉ số tránh mua mới (CAI). |
| UC05 | Đăng ký tài sản nhàn rỗi | Nhân viên, Thủ Kho | Khai báo các thiết bị hiện chưa sử dụng tại khoa/phòng lên kho dùng chung toàn trường (Tên máy, Loại tài sản, Số seri, Nguyên giá, Năm mua, Hiện trạng %). Tự động kiểm tra quy tắc BR01 và gán trạng thái ban đầu 'Mới'; tài sản chỉ vào kho dùng chung sau khi Thủ kho kiểm nhận (BR21). |
| UC06 | Tra cứu tài sản khả dụng | Nhân viên, Thủ Kho | Tìm kiếm, tra cứu và lọc danh sách các thiết bị đang ở trạng thái 'Sẵn sàng chia sẻ' trong kho dùng chung theo tên thiết bị, loại máy, khoa quản lý hoặc năm sử dụng. |
| UC07 | Xem lịch sử mượn – trả & tài sản đóng góp | Nhân viên, Thủ Kho | Theo dõi toàn bộ lịch sử các lần lập phiếu mượn/trả của bản thân/phòng ban, đồng thời tra cứu danh sách các tài sản do khoa mình đã đóng góp vào kho chia sẻ dùng chung và hiệu quả khai thác của chúng. |
| UC08 | Lập yêu cầu mượn tài sản | Nhân viên | Chọn một hoặc nhiều thiết bị từ kho khả dụng, chọn khoảng thời gian mượn (<= 30 ngày) và nhập mục đích sử dụng. Ngăn mượn thiết bị của chính đơn vị mình (BR05), kiểm tra hạn ngạch và nợ quá hạn của đơn vị (BR13). Có luồng mở rộng <<extend>> Hủy yêu cầu mượn khi đang chờ duyệt. |
| UC09 | Xét duyệt yêu cầu mượn | Thủ Kho | Thẩm định yêu cầu mượn thiết bị, đưa ra quyết định Phê duyệt hoặc Từ chối kèm lý do. Áp dụng cơ chế khóa Concurrency Lock (Serializable) chống xung đột trùng lịch mượn trên cùng thiết bị (BR04). |
| UC10 | Lập biên bản bàn giao | Thủ Kho, Nhân viên | Thực hiện thủ tục xuất kho bàn giao thiết bị khi có phiếu mượn đã duyệt. Thủ kho và Nhân viên đồng kiểm tra hiện trạng, phụ kiện và cùng ký biên bản điện tử; chuyển trạng thái tài sản sang 'Đang mượn' (BR06, BR07). |
| UC11 | Lập biên bản thu hồi & hao mòn | Thủ Kho, Nhân viên | Tiếp nhận thiết bị hoàn trả về kho, nghiệm thu tình trạng kỹ thuật và hao mòn thực tế. Nếu máy tốt: phục hồi về 'Sẵn sàng chia sẻ' và hoàn tất phiếu mượn; nếu hư hỏng: kích hoạt ghi nhận sự cố và chuyển sang 'Cần bảo dưỡng' (BR08, BR09). |
| UC12 | Đánh giá & chuyển trạng thái vòng đời | Thủ Kho | Kiểm nhận tài sản Mới (BR21), xem lý lịch và nhật ký chuyển trạng thái của thiết bị, từ đó thực hiện nghiệp vụ chuyển trạng thái phù hợp (lập phiếu bảo dưỡng, đề xuất thanh lý). Mọi chuyển trạng thái được kiểm soát theo máy trạng thái vòng đời: Mới -> Sẵn sàng chia sẻ -> Đang mượn -> Cần bảo dưỡng -> Đang bảo dưỡng -> Đề xuất thanh lý -> Đã thanh lý. |
| UC13 | Quản lý bảo dưỡng & sửa chữa | Thủ Kho | Lập phiếu bảo dưỡng cho thiết bị hỏng (chuyển sang 'Đang bảo dưỡng'), theo dõi quá trình sửa chữa, nghiệm thu chất lượng sau sửa chữa, quyết toán chi phí bảo dưỡng phát sinh thực tế (khấu trừ vào CAI theo BR20) và đưa máy về 'Sẵn sàng chia sẻ'. |
| UC14 | Đề xuất & Phê duyệt thanh lý tài sản | Thủ Kho, Lãnh đạo đơn vị | Thủ kho lập hồ sơ đề xuất thanh lý cho thiết bị thỏa ít nhất 1 trong 3 căn cứ BR15 (hết niên hạn của loại tài sản, chi phí sửa lũy kế >= 70% nguyên giá, hoặc bảo dưỡng kết luận Không thể sửa), chuyển sang 'Đề xuất thanh lý'. Lãnh đạo đơn vị / Ban Giám hiệu ký duyệt thanh lý (rút máy khỏi kho lưu hành) hoặc bác bỏ. |
| UC15 | Xem báo cáo hiệu suất tài sản | Lãnh đạo đơn vị, Thủ Kho | Thống kê các lượt mượn đã hoàn tất (thiết bị, đơn vị sở hữu, đơn vị mượn, số ngày mượn thực tế) và số lượt mỗi thiết bị của đơn vị đã được mượn; giúp Ban Giám hiệu nắm bắt mức độ khai thác tài sản công toàn trường. |
| UC16 | Xem báo cáo chỉ số tránh mua mới (CAI) | Lãnh đạo đơn vị, Thủ Kho | Tự động tính toán số tiền ngân sách nhà nước tiết kiệm được ròng (NCAV) dựa trên số ngày mượn thực tế từ các phiếu hoàn tất và khấu trừ chi phí bảo dưỡng theo 4 giả định kinh tế. Trực quan hóa Dashboard KPI với 4 thẻ chỉ số tài chính. |
| UC17 | Tự động cảnh báo quá hạn mượn | Hệ thống | Tiến trình Scheduler chạy ngầm định kỳ (00:05 hàng ngày) quét CSDL: bật cờ CoQuaHan = 1 cho phiếu Đang thực hiện đã quá ngày hẹn trả (BR14), hiển thị cảnh báo trên danh sách phiếu mượn; đơn vị vi phạm tự động bị chặn lập phiếu mới theo BR13. Đồng thời tự hủy phiếu Đã duyệt quá hạn nhận máy (BR-EXTRA-01). |

### Đặc tả Use Case “Đăng nhập hệ thống” (mục 2.4.1)

| Mẫu đặc tả use case |   |
|---|---|
| Tên use case | Đăng nhập hệ thống |
| Actor | Quản trị viên, Nhân viên, Thủ kho, Lãnh đạo đơn vị |
| Mô tả | Use case xác thực danh tính người dùng bằng Tên đăng nhập và Mật khẩu để cấp quyền truy cập hệ thống tương ứng với vai trò (Nhân viên, Thủ kho, Quản trị viên, Lãnh đạo). |
| Tiền điều kiện (Precondition) | Người dùng đã được cấp tài khoản trên hệ thống. |
| Hậu điều kiện (Postcondition) | Người dùng đăng nhập thành công và được chuyển tới giao diện làm việc theo đúng vai trò. |
| Luồng sự kiện chính (Basic flow) |   |
| Actor | Hệ thống |
| 1. Người dùng mở trang đăng nhập hệ thống. | 2. Hệ thống hiển thị biểu mẫu đăng nhập yêu cầu Tên đăng nhập và Mật khẩu. |
| 3. Người dùng nhập Tên đăng nhập, Mật khẩu và bấm nút "Đăng nhập". | 4. Hệ thống kiểm tra và xác thực thông tin đăng nhập trong cơ sở dữ liệu. |
| 5. Người dùng bắt đầu thực hiện các thao tác theo quyền hạn của mình. | 6. Hệ thống xác thực thành công, ghi nhận phiên làm việc và điều hướng người dùng tới giao diện chính phù hợp với vai trò được phân quyền. |
| Luồng sự kiện thay thế (Alternate flow) |   |
| Actor | Hệ thống |
| 4.2 Người dùng nhập lại tên đăng nhập hoặc mật khẩu cho đúng. | 4.1 Nếu Tên đăng nhập hoặc Mật khẩu không chính xác, hệ thống hiển thị thông báo lỗi: "Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại." |
| 4.4 Người dùng liên hệ Quản trị viên để được mở khóa tài khoản. | 4.3 Nếu tài khoản đang ở trạng thái Khóa, hệ thống từ chối đăng nhập và thông báo: "Tài khoản của bạn hiện đang bị khóa!" |

### Đặc tả Use Case “Quản lý phòng ban” (mục 2.4.2)

| Mẫu đặc tả use case |   |
|---|---|
| Tên use case | Quản lý phòng ban |
| Actor | Quản trị viên |
| Mô tả | Use case cho phép Quản trị viên thêm mới và tra cứu danh mục các Khoa, Phòng ban trong trường để làm dữ liệu phân bổ tài sản và người dùng. |
| Tiền điều kiện (Precondition) | Người dùng đã đăng nhập với vai trò Quản trị viên. |
| Hậu điều kiện (Postcondition) | Thông tin phòng ban được lưu trữ và cập nhật vào cơ sở dữ liệu. |
| Luồng sự kiện chính (Basic flow) |   |
| Actor | Hệ thống |
| 1. Quản trị viên chọn chức năng "Quản lý phòng ban". | 2. Hệ thống hiển thị danh sách các phòng ban hiện có trong trường. |
| 3. Quản trị viên bấm nút "Thêm mới", nhập: Mã phòng ban, Tên phòng ban, Địa điểm, Số điện thoại, Trưởng đơn vị và nhấn "Lưu". | 4. Hệ thống kiểm tra tính hợp lệ của thông tin (Mã không trùng, Tên không để trống). |
| 5. Quản trị viên xác nhận lưu thông tin. | 6. Hệ thống lưu phòng ban mới vào cơ sở dữ liệu, cập nhật danh sách hiển thị và thông báo: "Lưu thông tin phòng ban thành công." |
| Luồng sự kiện thay thế (Alternate flow) |   |
| Actor | Hệ thống |
| 3.2 Quản trị viên nhập lại Tên phòng ban khác. | 3.1 Nếu Tên phòng ban đã tồn tại, hệ thống báo lỗi: "Tên phòng ban đã tồn tại." |
| 4.2 Quản trị viên kiểm tra và sửa lại mã phòng ban cho không bị trùng. | 4.1 Nếu Mã phòng ban đã tồn tại, hệ thống báo lỗi: "Mã phòng ban đã tồn tại, vui lòng nhập mã khác." |

### Đặc tả Use Case “Quản lý loại tài sản” (mục 2.4.3)

| Mẫu đặc tả use case |   |
|---|---|
| Tên use case | Quản lý loại tài sản |
| Actor | Quản trị viên |
| Mô tả | Use case cho phép Quản trị viên quản lý danh mục các Loại tài sản (Máy tính, Máy chiếu, Thiết bị thí nghiệm...) dùng làm phân loại khi người dùng khai báo thiết bị. |
| Tiền điều kiện (Precondition) | Quản trị viên đã đăng nhập vào hệ thống. |
| Hậu điều kiện (Postcondition) | Danh mục loại tài sản được lưu vào hệ thống và sẵn sàng cho các chức năng khác sử dụng. |
| Luồng sự kiện chính (Basic flow) |   |
| Actor | Hệ thống |
| 1. Quản trị viên chọn chức năng "Quản lý loại tài sản". | 2. Hệ thống hiển thị danh mục các loại tài sản hiện có. |
| 3. Quản trị viên bấm nút "Thêm mới", nhập: Mã loại, Tên loại tài sản, Nhóm tài sản (Đo đạc / CNTT / Thiết bị chung), Niên hạn tiêu chuẩn (số năm) và nhấn "Lưu". | 4. Hệ thống kiểm tra dữ liệu hợp lệ (Mã loại không trùng, Tên loại không rỗng, Nhóm tài sản hợp lệ, Niên hạn > 0). |
| 5. Quản trị viên xác nhận thông tin. | 6. Hệ thống lưu loại tài sản mới vào cơ sở dữ liệu và hiển thị thông báo thành công. |
| Luồng sự kiện thay thế (Alternate flow) |   |
| Actor | Hệ thống |
| 3.2 Quản trị viên chọn lại Nhóm tài sản hoặc nhập Niên hạn lớn hơn 0. | 3.1 Nếu Nhóm tài sản không hợp lệ hoặc Niên hạn <= 0, hệ thống báo lỗi và không lưu. |
| 4.2 Quản trị viên nhập lại mã loại khác. | 4.1 Nếu Mã loại đã tồn tại, hệ thống hiển thị thông báo lỗi trùng mã. |

### Đặc tả Use Case “Quản lý người dùng & phân quyền” (mục 2.4.4)

| Mẫu đặc tả use case |   |
|---|---|
| Tên use case | Quản lý người dùng & phân quyền |
| Actor | Quản trị viên |
| Mô tả | Use case cho phép Quản trị viên tạo tài khoản cho cán bộ, gán đơn vị công tác, phân quyền vai trò (Nhân viên, Thủ kho, Quản trị viên, Lãnh đạo) và cấu hình các thông số hệ thống. |
| Tiền điều kiện (Precondition) | Quản trị viên đã đăng nhập hệ thống. |
| Hậu điều kiện (Postcondition) | Tài khoản người dùng được tạo mới hoặc cập nhật quyền hạn trong cơ sở dữ liệu. |
| Luồng sự kiện chính (Basic flow) |   |
| Actor | Hệ thống |
| 1. Quản trị viên chọn chức năng "Quản lý người dùng & phân quyền". | 2. Hệ thống hiển thị danh sách người dùng kèm vai trò và trạng thái tài khoản. |
| 3. Quản trị viên bấm nút "Thêm người dùng", nhập: Họ tên, Email, Tên đăng nhập, Mật khẩu ban đầu, chọn Phòng ban và gán Vai trò tương ứng rồi bấm "Lưu". | 4. Hệ thống kiểm tra tính hợp lệ (Tên đăng nhập không trùng, Email đúng định dạng). |
| 5. Quản trị viên xác nhận tạo tài khoản. | 6. Hệ thống băm SHA-256 mật khẩu (để trống thì dùng mật khẩu mặc định), lưu tài khoản ở trạng thái Hoạt động và thông báo cấp tài khoản thành công. |
| Luồng sự kiện thay thế (Alternate flow) |   |
| Actor | Hệ thống |
| 3.2 Quản trị viên bấm "Khóa/Mở khóa tài khoản" hoặc mở mục "Tham số CAI" để sửa giá trị 7 tham số TS01 - TS07. | 3.1 Hệ thống cập nhật trạng thái tài khoản (tài khoản bị khóa bị đăng xuất ngay) hoặc lưu tham số mới sau khi kiểm tra miền giá trị hợp lệ (TS02 <= TS03 <= 30 ngày, TS07 từ 0 đến 30 ngày). |
| 4.2 Quản trị viên nhập lại Tên đăng nhập khác. | 4.1 Nếu Tên đăng nhập đã tồn tại, hệ thống báo lỗi: "Tên đăng nhập đã được sử dụng, vui lòng chọn tên khác." |

### Đặc tả Use Case “Đăng ký tài sản nhàn rỗi” (mục 2.4.5)

| Mẫu đặc tả use case |   |
|---|---|
| Tên use case | Đăng ký tài sản nhàn rỗi |
| Actor | Nhân viên, thủ kho |
| Mô tả | Use case cho phép các khoa, phòng ban khai báo các thiết bị hiện chưa sử dụng lên kho chia sẻ dùng chung của trường để các đơn vị khác có thể mượn lại. |
| Tiền điều kiện (Precondition) | Người dùng đã đăng nhập vào hệ thống với tài khoản hợp lệ. |
| Hậu điều kiện (Postcondition) | Thông tin tài sản được lưu vào hệ thống với trạng thái "Mới"; tài sản hiển thị trong kho dùng chung sau khi Thủ kho kiểm nhận (UC12, BR21). |
| Luồng sự kiện chính (Basic flow) |   |
| Actor | Hệ thống |
| 1. Người dùng chọn chức năng "Đăng ký tài sản nhàn rỗi" và bấm nút "Thêm mới". | 2. Hệ thống hiển thị biểu mẫu đăng ký, tự động điền thông tin phòng ban của người dùng và nạp danh mục Loại tài sản. |
| 3. Người dùng nhập các thông tin: Tên tài sản, Loại tài sản, Số seri, Nguyên giá, Năm đưa vào sử dụng, Tình trạng (%), Vị trí lưu trữ, Hình ảnh, Mô tả và các thông số riêng theo nhóm tài sản (Đo đạc: độ chính xác, chu kỳ kiểm định; CNTT: CPU, RAM; Thiết bị chung: công suất, phụ kiện), sau đó bấm "Lưu". | 4. Hệ thống kiểm tra tính hợp lệ của dữ liệu nhập (các trường bắt buộc không để trống, nguyên giá > 0, số seri không bị trùng, và hiện trạng kỹ thuật phải đạt ≥ 50% theo quy tắc BR01; nếu dưới 50% hệ thống từ chối tiếp nhận vào kho dùng chung). |
| 5. Người dùng xác nhận thông tin đăng ký tài sản. | 6. Hệ thống tạo mã tài sản mới, lưu thông tin vào cơ sở dữ liệu với trạng thái "Mới" và hiển thị thông báo: "Khai báo tài sản thành công, chờ Thủ kho kiểm nhận." |
| Luồng sự kiện thay thế (Alternate flow) |   |
| Actor | Hệ thống |
| 4.2 Người dùng nhập lại các thông tin còn thiếu hoặc sửa lại nguyên giá cho hợp lệ. | 4.1 Nếu người dùng để trống thông tin bắt buộc hoặc nhập nguyên giá không hợp lệ (<= 0), hệ thống hiển thị thông báo lỗi và yêu cầu nhập lại. |
| 4.4 Người dùng kiểm tra lại thiết bị và nhập đúng số seri. | 4.3 Nếu số seri đã tồn tại trong hệ thống, hệ thống hiển thị thông báo: "Số seri này đã được đăng ký, vui lòng kiểm tra lại." |

### Đặc tả Use Case “Tra cứu tài sản khả dụng” (mục 2.4.6)

| Mẫu đặc tả use case |   |
|---|---|
| Tên use case | Tra cứu tài sản khả dụng |
| Actor | Nhân viên, thủ kho |
| Mô tả | Use case cho phép người dùng tìm kiếm và xem danh sách các thiết bị đang có trạng thái "Sẵn sàng chia sẻ" trong kho dùng chung theo nhiều tiêu chí. |
| Tiền điều kiện (Precondition) | Người dùng đã truy cập vào hệ thống. |
| Hậu điều kiện (Postcondition) | Danh sách các thiết bị phù hợp được hiển thị cùng thông tin chi tiết và tình trạng sẵn sàng. |
| Luồng sự kiện chính (Basic flow) |   |
| Actor | Hệ thống |
| 1. Người dùng chọn chức năng "Tra cứu tài sản khả dụng". | 2. Hệ thống hiển thị giao diện tìm kiếm và hiển thị mặc định danh sách các tài sản đang sẵn sàng chia sẻ. |
| 3. Người dùng chọn loại tài sản hoặc nhập từ khóa tìm kiếm (tên thiết bị, đơn vị quản lý, tình trạng máy) và bấm "Tìm kiếm". | 4. Hệ thống truy vấn cơ sở dữ liệu và hiển thị danh sách các tài sản thỏa mãn điều kiện tìm kiếm. |
| 5. Người dùng bấm nút xem lịch sử của thiết bị cần quan tâm hoặc nút "Mượn máy" tại dòng thiết bị. | 6. Hệ thống hiển thị nhật ký trạng thái của thiết bị, hoặc mở biểu mẫu lập phiếu mượn (UC08) với thiết bị đã chọn. Thiết bị Cần bảo dưỡng, Đang bảo dưỡng, Đề xuất thanh lý, Đã thanh lý không hiển thị (BR10). |
| Luồng sự kiện thay thế (Alternate flow) |   |
| Actor | Hệ thống |
| 4.2 Người dùng thay đổi tiêu chí tìm kiếm hoặc bấm nút "Đặt lại" để tìm kiếm lại. | 4.1 Nếu không tìm thấy tài sản nào phù hợp với tiêu chí, hệ thống hiển thị thông báo: "Không tìm thấy tài sản phù hợp với yêu cầu tìm kiếm." |

### Đặc tả Use Case “Xem lịch sử mượn-trả & tài sản đóng góp” (mục 2.4.7)

| Mẫu đặc tả use case |   |
|---|---|
| Tên use case | Xem lịch sử mượn – trả & tài sản đóng góp |
| Actor | Nhân viên, thủ kho |
| Mô tả | Use case cho phép người dùng theo dõi lịch sử các lần mượn - trả tài sản của bản thân hoặc phòng ban mình, đồng thời xem danh sách các thiết bị mà đơn vị mình đã đóng góp vào kho dùng chung. |
| Tiền điều kiện (Precondition) | Người dùng đã đăng nhập vào hệ thống. |
| Hậu điều kiện (Postcondition) | Toàn bộ lịch sử mượn - trả và danh sách tài sản đóng góp được hiển thị rõ ràng trên giao diện. |
| Luồng sự kiện chính (Basic flow) |   |
| Actor | Hệ thống |
| 1. Người dùng chọn chức năng "Xem lịch sử mượn - trả & tài sản đóng góp". | 2. Hệ thống hiển thị giao diện gồm 2 mục: "Lịch sử mượn - trả" và "Tài sản đơn vị đã đóng góp". |
| 3. Người dùng chọn mục "Lịch sử mượn - trả" của đơn vị. | 4. Hệ thống hiển thị danh sách các phiếu mượn của đơn vị kèm thiết bị, người mượn, ngày mượn, hạn trả, trạng thái phiếu và cảnh báo quá hạn. |
| 5. Người dùng chuyển sang mục "Tài sản đơn vị đã đóng góp". | 6. Hệ thống hiển thị danh sách các thiết bị mà phòng ban của người dùng đã khai báo cùng số lần các đơn vị khác đã mượn sử dụng. |
| Luồng sự kiện thay thế (Alternate flow) |   |
| Actor | Hệ thống |
| 4.2 Người dùng bấm nút xem lịch sử của một thiết bị. | 4.1 Hệ thống hiển thị nhật ký chuyển trạng thái vòng đời của thiết bị (thời gian, người thực hiện, phiếu liên quan, lý do). |

### Đặc tả Use Case “Lập yêu cầu mượn tài sản” (mục 2.4.8)

| Mẫu đặc tả use case |   |
|---|---|
| Tên use case | Lập yêu cầu mượn tài sản |
| Actor | Nhân viên |
| Mô tả | Use case cho phép nhân viên chọn một thiết bị từ kho khả dụng, đăng ký khoảng thời gian cần mượn và gửi yêu cầu đến Thủ kho để xét duyệt. |
| Tiền điều kiện (Precondition) | Nhân viên đã đăng nhập và đã chọn được thiết bị ở trạng thái "Sẵn sàng chia sẻ". |
| Hậu điều kiện (Postcondition) | Một phiếu yêu cầu mượn (gồm một hoặc nhiều thiết bị cùng khoảng thời gian) được tạo với trạng thái "Chờ duyệt"; phiếu chờ duyệt chưa giữ lịch thiết bị (BR04). |
| Luồng sự kiện chính (Basic flow) |   |
| Actor | Hệ thống |
| 1. Người dùng bấm nút "Lập yêu cầu mượn" (hoặc nút "Mượn máy" tại dòng thiết bị trong kho). | 2. Hệ thống hiển thị biểu mẫu đăng ký mượn, tự động gắn người mượn, đơn vị mượn và liệt kê các thiết bị Sẵn sàng chia sẻ của khoa khác. |
| 3. Người dùng chọn một hoặc nhiều thiết bị, nhập Ngày bắt đầu mượn, Ngày dự kiến trả, Mục đích sử dụng và nhấn nút "Gửi yêu cầu". | 4. Hệ thống kiểm tra: thiết bị đang Sẵn sàng chia sẻ (BR03), không thuộc phòng ban người mượn (BR05), thời gian mượn không quá 30 ngày (BR02), đơn vị không có phiếu quá hạn và chưa đủ 5 phiếu chưa hoàn tất (BR13). |
| 5. Người dùng kiểm tra lại thông tin và xác nhận gửi phiếu mượn. | 6. Hệ thống lưu phiếu mượn với trạng thái "Chờ duyệt", phiếu xuất hiện trong danh sách chờ duyệt của Thủ kho và hiển thị thông báo: "Lập phiếu mượn thành công!" |
| Luồng sự kiện thay thế (Alternate flow) |   |
| Actor | Hệ thống |
| 4.2 Người dùng chọn thiết bị khác thuộc đơn vị ngoài để mượn. | 4.1 Nếu người dùng chọn mượn thiết bị do chính phòng ban mình quản lý, hệ thống thông báo: "Không thể lập phiếu mượn thiết bị của chính đơn vị mình, vui lòng sử dụng trực tiếp nội bộ." |
| 4.4 Người dùng điều chỉnh lại khoảng thời gian mượn cho phù hợp. | 4.3 Nếu thời gian mượn vượt quá 30 ngày hoặc đơn vị vi phạm BR13 (có phiếu quá hạn / đã đủ 5 phiếu chưa hoàn tất), hệ thống thông báo lý do và không tạo phiếu. |
| 5.2 Người dùng bấm nút "Hủy phiếu" khi phiếu đang ở trạng thái Chờ duyệt. | 5.1 Hệ thống cập nhật trạng thái phiếu thành "Đã hủy" và lưu lý do hủy (BR17). |

### Đặc tả Use Case “Xét duyệt yêu cầu mượn” (mục 2.4.9)

| Mẫu đặc tả use case |   |
|---|---|
| Tên use case | Xét duyệt yêu cầu mượn |
| Actor | Thủ kho |
| Mô tả | Use case cho phép Thủ kho xem danh sách các yêu cầu mượn tài sản đang chờ duyệt, kiểm tra tính hợp lệ và ra quyết định Phê duyệt hoặc Từ chối. |
| Tiền điều kiện (Precondition) | Thủ kho đã đăng nhập vào hệ thống và có ít nhất một phiếu mượn đang chờ duyệt. |
| Hậu điều kiện (Postcondition) | Phiếu mượn được chuyển sang trạng thái "Đã duyệt" hoặc "Bị từ chối"; người mượn xem kết quả trên danh sách phiếu mượn của mình. |
| Luồng sự kiện chính (Basic flow) |   |
| Actor | Hệ thống |
| 1. Thủ kho mở danh sách "Yêu cầu mượn chờ duyệt". | 2. Hệ thống hiển thị danh sách các phiếu mượn đang ở trạng thái Chờ duyệt theo thứ tự thời gian gửi. |
| 3. Thủ kho chọn một phiếu mượn để xem chi tiết thông tin và kiểm tra lịch rảnh của thiết bị. | 4. Hệ thống hiển thị chi tiết thông tin người mượn, mục đích sử dụng và tình trạng lịch mượn của tài sản. |
| 5. Thủ kho chọn "Duyệt" và nhấn nút "Xác nhận xử lý". | 6. Hệ thống kiểm tra trùng lịch với các phiếu đã duyệt/đang thực hiện trong giao dịch khóa (BR04); nếu hợp lệ cập nhật phiếu thành "Đã duyệt", ghi người duyệt và thời điểm duyệt. Nếu trùng lịch, hệ thống báo lỗi và không cho duyệt. |
| Luồng sự kiện thay thế (Alternate flow) |   |
| Actor | Hệ thống |
| 5.2 Thủ kho nhập lý do từ chối và nhấn nút "Xác nhận từ chối". | 5.1 Nếu mục đích mượn không phù hợp hoặc thiết bị có kế hoạch sử dụng đột xuất, Thủ kho chọn "Từ chối". Hệ thống cập nhật trạng thái phiếu thành "Bị từ chối" kèm lý do (phiếu chờ duyệt chưa giữ lịch nên không cần giải phóng lịch). |

### Đặc tả Use Case “Lập biên bản bàn giao” (mục 2.4.10)

| Mẫu đặc tả use case |   |
|---|---|
| Tên use case | Lập biên bản bàn giao |
| Actor | Thủ kho, nhân viên |
| Mô tả | Use case cho phép Thủ kho và người mượn kiểm tra thực tế thiết bị tại kho và cùng xác nhận bàn giao máy khi phiếu mượn đã được duyệt. |
| Tiền điều kiện (Precondition) | Phiếu mượn đã ở trạng thái "Đã duyệt", ngày hiện tại nằm trong khoảng từ ngày bắt đầu mượn đến ngày hẹn trả, mọi thiết bị trong phiếu đang "Sẵn sàng chia sẻ" (BR06) và người mượn có mặt tại kho để nhận thiết bị. |
| Hậu điều kiện (Postcondition) | Biên bản bàn giao được tạo và lưu trữ; trạng thái tài sản chuyển sang "Đang mượn". |
| Luồng sự kiện chính (Basic flow) |   |
| Actor | Hệ thống |
| 1. Thủ kho chọn phiếu mượn đã duyệt từ danh sách chờ bàn giao. | 2. Hệ thống tải thông tin phiếu mượn và mở biểu mẫu Biên bản bàn giao. |
| 3. Thủ kho và Nhân viên cùng kiểm tra từng thiết bị trong phiếu (hoạt động máy, phụ kiện cáp sạc, độ nguyên vẹn). Thủ kho ghi nhận tình trạng từng thiết bị vào biểu mẫu. | 4. Hệ thống kiểm tra đã đến ngày bắt đầu mượn, danh sách bàn giao đủ toàn bộ thiết bị trong phiếu, mọi thiết bị đang Sẵn sàng chia sẻ, không có máy lỗi và người nhận thuộc đơn vị mượn (BR06). |
| 5. Thủ kho và Nhân viên cùng bấm nút "Ký xác nhận bàn giao". | 6. Hệ thống lưu Biên bản bàn giao, chuyển các thiết bị sang "Đang mượn" và phiếu mượn sang "Đang thực hiện" trong cùng một giao dịch (BR07). |
| Luồng sự kiện thay thế (Alternate flow) |   |
| Actor | Hệ thống |
| 3.2 Thủ kho đánh dấu thiết bị lỗi, nhập mô tả lỗi, lý do hủy và bấm "Hủy bàn giao"; người mượn lập phiếu mới nếu còn nhu cầu. | 3.1 Nếu phát hiện bất kỳ thiết bị nào lỗi hoặc thiếu phụ kiện, hệ thống ghi nhận sự cố vào Lịch sử sự cố, chuyển thiết bị lỗi sang "Cần bảo dưỡng" và chuyển cả phiếu mượn sang "Đã hủy"; các thiết bị còn lại giữ "Sẵn sàng chia sẻ" (BR06). |

### Đặc tả Use Case “Lập biên bản thu hồi & hao mòn” (mục 2.4.11)

| Mẫu đặc tả use case |   |
|---|---|
| Tên use case | Lập biên bản thu hồi & hao mòn |
| Actor | Thủ kho, nhân viên |
| Mô tả | Use case cho phép Thủ kho tiếp nhận thiết bị hoàn trả từ người mượn, kiểm tra tình trạng hao mòn và lập biên bản thu hồi để hoàn tất chu kỳ mượn. |
| Tiền điều kiện (Precondition) | Tài sản đang ở trạng thái "Đang mượn" và người mượn mang trả lại kho. |
| Hậu điều kiện (Postcondition) | Biên bản thu hồi được lưu trữ; trạng thái tài sản được khôi phục về "Sẵn sàng chia sẻ" (nếu bình thường) hoặc chuyển sang "Cần bảo dưỡng" (nếu hư hỏng). |
| Luồng sự kiện chính (Basic flow) |   |
| Actor | Hệ thống |
| 1. Thủ kho chọn phiếu mượn đang thực hiện cần thu hồi. | 2. Hệ thống hiển thị danh sách thiết bị của phiếu kèm hiện trạng trước khi mượn và mở biểu mẫu Biên bản thu hồi. |
| 3. Thủ kho và người mượn cùng kiểm tra tình trạng thiết bị sau khi sử dụng và kiểm tra lại đầy đủ phụ kiện. | 4. Thủ kho nhập đánh giá cho từng thiết bị: Tình trạng sau (Tốt / Cần bảo trì / Hư hỏng) và Tỷ lệ hao mòn (%) (BR08). |
| 5. Hai bên bấm nút "Ký xác nhận hoàn trả". | 6. Hệ thống lưu Biên bản thu hồi, trừ hao mòn vào hiện trạng từng máy; máy Tốt và còn >= 50% về "Sẵn sàng chia sẻ", máy hỏng hoặc dưới 50% chuyển "Cần bảo dưỡng" (BR09); cập nhật phiếu mượn sang "Hoàn tất" và ghi nhận số ngày sử dụng thực tế. |
| Luồng sự kiện thay thế (Alternate flow) |   |
| Actor | Hệ thống |
| 2.2 Thủ kho ghi lý do trễ hạn vào phần ghi chú của biên bản. | 2.1 Nếu phiếu đã quá ngày hẹn trả, phiếu đã được bật cờ Quá hạn (BR14); cờ này được giữ lại sau khi hoàn tất để lưu vết vi phạm. |
| 4.2 Thủ kho nhập mô tả hư hỏng và Mức độ thiệt hại (%) cho thiết bị hỏng (bắt buộc, mức thiệt hại lớn hơn 0% - BR09). | 4.1 Nếu thiết bị hỏng hóc hoặc thiếu phụ kiện, hệ thống ghi nhận sự cố, tính chi phí bồi thường = Mức độ thiệt hại (%) x Nguyên giá, quy trách nhiệm cho đơn vị mượn và chuyển thiết bị sang "Cần bảo dưỡng". |

### Đặc tả Use Case “Đánh giá & chuyển trạng thái vòng đời” (mục 2.4.12)

| Mẫu đặc tả use case |   |
|---|---|
| Tên use case | Đánh giá & chuyển trạng thái vòng đời |
| Actor | Thủ kho |
| Mô tả | Use case cho phép Thủ kho kiểm nhận tài sản Mới khai báo (xác nhận nguyên giá, hiện trạng - BR21), xem lý lịch và nhật ký chuyển trạng thái vòng đời của thiết bị, từ đó thực hiện nghiệp vụ chuyển trạng thái phù hợp (lập phiếu bảo dưỡng, đề xuất thanh lý). Mọi chuyển trạng thái được hệ thống kiểm soát theo sơ đồ trạng thái Hình 11. |
| Tiền điều kiện (Precondition) | Thủ kho đã đăng nhập hệ thống và chọn một thiết bị cần đánh giá. |
| Hậu điều kiện (Postcondition) | Trạng thái vòng đời mới được cập nhật thông qua nghiệp vụ tương ứng và tự động ghi vào Lịch sử trạng thái tài sản. |
| Luồng sự kiện chính (Basic flow) |   |
| Actor | Hệ thống |
| 1. Thủ kho mở "Kho tài sản", chọn tài sản trạng thái Mới cần kiểm nhận hoặc thiết bị cần đánh giá. | 2. Hệ thống hiển thị năm mua, hiện trạng (%), trạng thái hiện tại và nhật ký chuyển trạng thái (thời gian, người thực hiện, phiếu liên quan, lý do). |
| 3. Thủ kho chọn nghiệp vụ: "Kiểm nhận" (đối chiếu số seri, xác nhận nguyên giá và hiện trạng thực tế), "Lập phiếu bảo dưỡng" (máy Cần bảo dưỡng) hoặc "Đề xuất thanh lý". | 4. Hệ thống kiểm tra quy tắc chuyển trạng thái hợp lệ (không cho phép chuyển nhảy cóc sai quy trình). |
| 5. Thủ kho xác nhận thao tác. | 6. Hệ thống cập nhật trạng thái mới (kiểm nhận: hiện trạng >= 50% vào "Sẵn sàng chia sẻ", dưới ngưỡng chuyển "Cần bảo dưỡng" - BR21), tự động ghi nhật ký vòng đời và hiển thị thông báo thành công. |
| Luồng sự kiện thay thế (Alternate flow) |   |
| Actor | Hệ thống |
| 2.2 Thủ kho nhấn nút "Chuyển sang đề xuất thanh lý" để chuyển hồ sơ sang quy trình thanh lý. | 2.1 Nếu thiết bị đã dùng quá niên hạn của loại tài sản hoặc chi phí sửa lũy kế >= 70% nguyên giá, thiết bị đủ điều kiện đề xuất thanh lý (BR15). |
| 4.2 Thủ kho chọn lại trạng thái cho đúng quy trình hợp lệ. | 4.1 Nếu Thủ kho chọn chuyển đổi trạng thái không hợp lệ (ví dụ: máy đang mượn mà chọn thanh lý), hệ thống hiển thị thông báo lỗi và không cho lưu. |

### Đặc tả Use Case “Quản lý bảo dưỡng & sửa chữa” (mục 2.4.13)

| Mẫu đặc tả use case |   |
|---|---|
| Tên use case | Quản lý bảo dưỡng & sửa chữa |
| Actor | Thủ kho |
| Mô tả | Use case cho phép Thủ kho lập phiếu theo dõi quá trình sửa chữa cho các thiết bị bị hỏng, ghi nhận chi phí phát sinh và nghiệm thu đưa máy trở lại kho dùng chung. |
| Tiền điều kiện (Precondition) | Thiết bị đang ở trạng thái "Cần bảo dưỡng". |
| Hậu điều kiện (Postcondition) | Phiếu bảo dưỡng được hoàn tất; chi phí sửa chữa được lưu lại; trạng thái tài sản được khôi phục về "Sẵn sàng chia sẻ". |
| Luồng sự kiện chính (Basic flow) |   |
| Actor | Hệ thống |
| 1. Thủ kho mở danh sách "Thiết bị cần bảo dưỡng" và chọn máy cần xử lý. | 2. Hệ thống hiển thị thông tin hư hỏng và mở form Lập phiếu bảo dưỡng. |
| 3. Thủ kho nhập Đơn vị sửa chữa, Nội dung sửa chữa và các hạng mục (hạng mục, linh kiện thay thế, đơn giá, số lượng) rồi bấm "Xác nhận lập phiếu". | 4. Hệ thống cập nhật trạng thái tài sản sang "Đang bảo dưỡng" và tạo phiếu bảo dưỡng mới. |
| 5. Khi hoàn thành sửa chữa, Thủ kho kiểm tra máy, nhập Hiện trạng sau sửa chữa (%), chọn kết luận "Đạt" và bấm "Xác nhận nghiệm thu". | 6. Hệ thống kiểm tra hiện trạng sau sửa >= 50% (BR12), ghi nhận ngày kết thúc và chi phí (tổng thành tiền các hạng mục, khấu trừ vào CAI theo BR20), chuyển thiết bị về "Sẵn sàng chia sẻ". |
| Luồng sự kiện thay thế (Alternate flow) |   |
| Actor | Hệ thống |
| 5.2 Thủ kho chọn kết luận "Không thể sửa chữa - Đề xuất thanh lý". | 5.1 Nếu thiết bị không thể khắc phục hoặc hiện trạng sau sửa dưới 50%, hệ thống chuyển phiếu sang "Không thể sửa" và thiết bị sang "Đề xuất thanh lý" (BR12). |

### Đặc tả Use Case “Đề xuất & phê duyệt thanh lý tài sản” (mục 2.4.14)

| Mẫu đặc tả use case |   |
|---|---|
| Tên use case | Đề xuất & Phê duyệt thanh lý tài sản |
| Actor | Thủ kho, lãnh đạo đơn vị |
| Mô tả | Use case cho phép Thủ kho lập hồ sơ đề xuất thanh lý các tài sản đã hết hạn sử dụng hoặc hỏng nặng, và Lãnh đạo xem xét để ký duyệt rút máy khỏi lưu hành. |
| Tiền điều kiện (Precondition) | Thiết bị thỏa ít nhất 1 trong 3 căn cứ BR15: hết niên hạn của loại tài sản, chi phí sửa lũy kế >= 70% nguyên giá, hoặc phiếu bảo dưỡng gần nhất kết luận Không thể sửa. |
| Hậu điều kiện (Postcondition) | Thiết bị được chuyển sang trạng thái "Đã thanh lý" và rút khỏi danh mục kho chia sẻ. |
| Luồng sự kiện chính (Basic flow) |   |
| Actor | Hệ thống |
| 1. Thủ kho chọn thiết bị cần thanh lý và bấm nút "Lập hồ sơ thanh lý". | 2. Hệ thống mở form đề xuất thanh lý với danh sách thiết bị có thể đề xuất (năm mua, trạng thái hiện tại). |
| 3. Thủ kho chọn thiết bị, nhập lý do đề xuất và nhấn "Gửi hồ sơ lên Lãnh đạo". | 4. Hệ thống kiểm tra căn cứ BR15, tạo Hồ sơ thanh lý trạng thái "Chờ duyệt", chuyển tài sản sang "Đề xuất thanh lý"; hồ sơ hiển thị trong danh sách chờ duyệt của Lãnh đạo. |
| 5. Lãnh đạo đơn vị đăng nhập, xem xét hồ sơ, nhập Số quyết định và bấm "Ký duyệt hồ sơ". | 6. Hệ thống chuyển tài sản sang "Đã thanh lý", rút khỏi kho dùng chung và lưu số quyết định, người duyệt, ngày duyệt vào Hồ sơ thanh lý. |
| Luồng sự kiện thay thế (Alternate flow) |   |
| Actor | Hệ thống |
| 5.2 Lãnh đạo nhập ý kiến chỉ đạo và bấm "Từ chối". | 5.1 Nếu Lãnh đạo bác bỏ, hệ thống cập nhật hồ sơ "Bác bỏ" và chuyển tài sản về "Sẵn sàng chia sẻ" (nếu hiện trạng >= 50% và chưa từng kết luận Không thể sửa) hoặc "Cần bảo dưỡng" (các trường hợp còn lại). |

### Đặc tả Use Case “Xem báo cáo hiệu suất tài sản” (mục 2.4.15)

| Mẫu đặc tả use case |   |
|---|---|
| Tên use case | Xem báo cáo hiệu suất tài sản |
| Actor | Lãnh đạo đơn vị, thủ kho |
| Mô tả | Use case cho phép người dùng xem thống kê số lượt mượn, số ngày mượn thực tế và mức độ sử dụng tài sản của các đơn vị trong trường. |
| Tiền điều kiện (Precondition) | Người dùng có quyền truy cập báo cáo và đã đăng nhập hệ thống. |
| Hậu điều kiện (Postcondition) | Báo cáo hiệu suất được hiển thị dưới dạng bảng số liệu và biểu đồ trực quan. |
| Luồng sự kiện chính (Basic flow) |   |
| Actor | Hệ thống |
| 1. Người dùng chọn chức năng "Báo cáo hiệu suất tài sản". | 2. Hệ thống hiển thị trang Tổng quan với số liệu năm hiện tại và biểu đồ 4 học kỳ gần nhất. |
| 3. Người dùng xem bảng danh sách các lượt mượn đã hoàn tất trong kỳ. | 4. Hệ thống tổng hợp từ các phiếu Hoàn tất: thiết bị, đơn vị sở hữu, đơn vị mượn và số ngày mượn thực tế của từng lượt. |
| 5. Thủ kho mở mục "Tài sản đơn vị đã đóng góp" để xem mức độ khai thác từng thiết bị. | 6. Hệ thống hiển thị số lượt mỗi thiết bị đã được mượn và tỷ lệ thiết bị đang phục vụ của đơn vị. |
| Luồng sự kiện thay thế (Alternate flow) |   |
| Actor | Hệ thống |
| 3.2 Người dùng bấm "Làm mới" sau khi có phiếu mượn mới hoàn tất. | 3.1 Nếu trong kỳ chưa có lượt mượn nào hoàn tất, bảng số liệu hiển thị trống. |

### Đặc tả Use Case “Xem báo cáo chỉ số tránh mua mới (CAI)” (mục 2.4.16)

| Mẫu đặc tả use case |   |
|---|---|
| Tên use case | Xem báo cáo chỉ số tránh mua mới (CAI) |
| Actor | Lãnh đạo đơn vị, thủ kho |
| Mô tả | Use case tự động tính toán số tiền ngân sách tiết kiệm được nhờ việc chia sẻ tài sản dùng chung thay vì phải mua sắm thiết bị mới. |
| Tiền điều kiện (Precondition) | Người dùng có quyền xem báo cáo tài chính/kinh tế và đã đăng nhập hệ thống. |
| Hậu điều kiện (Postcondition) | Báo cáo chỉ số tiết kiệm (CAI) được hiển thị đầy đủ các chỉ số: tổng giá trị tránh mua mới, chi phí bảo dưỡng và số tiền tiết kiệm ròng. |
| Luồng sự kiện chính (Basic flow) |   |
| Actor | Hệ thống |
| 1. Người dùng chọn chức năng "Báo cáo chỉ số tránh mua mới (CAI)". | 2. Hệ thống nạp các thông số tính toán (nguyên giá thiết bị, số ngày mượn thực tế, chi phí bảo dưỡng phát sinh). |
| 3. Người dùng xem các thẻ KPI tổng hợp: tổng giá trị tránh mua mới, chi phí bảo dưỡng, tiết kiệm ròng NCAV và tỷ suất ROI. | 4. Hệ thống tự động tính toán tổng số tiền tiết kiệm được từ các đợt mượn đã hoàn tất trừ đi chi phí bảo dưỡng thực tế. |
| 5. Người dùng xem bảng số liệu chi tiết và các thẻ hiển thị chỉ số tiết kiệm nổi bật. | 6. Hệ thống hiển thị biểu đồ so sánh NCAV qua 4 học kỳ gần nhất (Hình 58). |
| Luồng sự kiện thay thế (Alternate flow) |   |
| Actor | Hệ thống |
| 3.2 Người dùng xem bảng chi tiết từng lượt mượn. | 3.1 Hệ thống hiển thị giá trị tránh mua mới và chỉ số CAI của từng thiết bị qua từng lượt mượn (ngắn hạn <= 7 ngày: 1,5% nguyên giá/ngày; dài hạn: 100% nguyên giá). Số ngày tính CAI không vượt số ngày đã đăng ký nên việc trả trễ không làm tăng giá trị tránh mua (BR18). |

### Đặc tả Use Case “Tự động cảnh báo quá hạn mượn” (mục 2.4.17)

| Mẫu đặc tả use case |   |
|---|---|
| Tên use case | Tự động cảnh báo quá hạn mượn |
| Actor | Hệ thống |
| Mô tả | Use case là tiến trình tự động chạy ngầm định kỳ của hệ thống để quét các phiếu mượn đã quá ngày hẹn trả mà chưa hoàn trả máy, bật cờ quá hạn và tự hủy các phiếu đã duyệt nhưng quá hạn nhận máy. |
| Tiền điều kiện (Precondition) | Hệ thống đang hoạt động bình thường, đồng hồ máy chủ đúng giờ. |
| Hậu điều kiện (Postcondition) | Các phiếu Đang thực hiện quá hạn được bật cờ CoQuaHan = 1 (BR14); các phiếu Đã duyệt quá hạn nhận máy chuyển "Đã hủy" (BR-EXTRA-01). |
| Luồng sự kiện chính (Basic flow) |   |
| Actor | Hệ thống |
| 1. Định kỳ hàng ngày, hệ thống tự động kích hoạt tiến trình kiểm tra hạn trả tài sản. | 2. Hệ thống quét cơ sở dữ liệu tìm tất cả các phiếu mượn đang diễn ra có ngày dự kiến trả nhỏ hơn ngày hiện tại. |
| 3. Hệ thống bật cờ CoQuaHan = 1 cho các phiếu vi phạm (trạng thái phiếu vẫn là Đang thực hiện). | 4. Hệ thống tự động hủy các phiếu Đã duyệt mà người mượn chưa đến nhận máy sau 3 ngày (tham số TS07) kể từ ngày bắt đầu mượn hoặc đã quá ngày hẹn trả (BR-EXTRA-01). |
| 5. Người dùng/Thủ kho mở hệ thống. | 6. Hệ thống hiển thị cảnh báo Quá hạn trên danh sách phiếu mượn; đơn vị có phiếu quá hạn bị chặn lập phiếu mới (BR13) cho đến khi hoàn tất thu hồi. |
| Luồng sự kiện thay thế (Alternate flow) |   |
| Actor | Hệ thống |
| 2.2 Hệ thống ghi nhận kết quả và kết thúc đợt kiểm tra. | 2.1 Nếu không có phiếu mượn nào bị quá hạn, hệ thống không thực hiện khóa quyền và tiếp tục hoạt động bình thường. |

---

## Chương 3: Phân tích

### Bảng 13. Danh sách các lớp đối tượng

| STT | Tên lớp | Nhóm | Vai trò trong hệ thống |
|---|---|---|---|
| 1 | PhongBan | Danh mục | Khoa/Phòng/Viện sở hữu tài sản và có nhân sự công tác; là đơn vị mượn trong phiếu mượn. |
| 2 | NguoiDung | Danh mục | Tài khoản cán bộ sử dụng hệ thống, mỗi tài khoản thuộc một phòng ban và có đúng một vai trò. |
| 3 | LoaiTaiSan | Danh mục | Phân loại thiết bị theo nhóm (Đo đạc, CNTT, Thiết bị chung) và quy định niên hạn sử dụng. |
| 4 | TaiSan | Tài sản | Thiết bị được khai báo vào kho dùng chung; là lớp cha của ba lớp con theo nhóm tài sản và chịu máy trạng thái vòng đời Hình 11. |
| 5 | TaiSanDoDac | Tài sản (lớp con) | Thiết bị đo đạc, trắc địa, quan trắc môi trường; kế thừa TaiSan. |
| 6 | TaiSanCNTT | Tài sản (lớp con) | Thiết bị công nghệ thông tin (máy trạm, laptop, máy chiếu); kế thừa TaiSan. |
| 7 | TaiSanThietBiChung | Tài sản (lớp con) | Thiết bị dùng chung (âm thanh, sự kiện, thiết bị đo đa năng); kế thừa TaiSan. |
| 8 | PhieuMuon | Mượn trả | Yêu cầu mượn một hoặc nhiều thiết bị trong cùng khoảng thời gian; chịu máy trạng thái Hình 12. |
| 9 | ChiTietPhieuMuon | Mượn trả | Lớp liên kết giữa PhieuMuon và TaiSan, lưu tình trạng trước - sau của từng máy. |
| 10 | BienBanBanGiao | Giao nhận | Chứng từ xuất kho giao thiết bị cho đơn vị mượn, hoặc ghi nhận hủy bàn giao. |
| 11 | BienBanThuHoi | Giao nhận | Chứng từ nhận lại thiết bị, đóng phiếu mượn và là căn cứ tính số ngày mượn thực tế. |
| 12 | LichSuSuCo | Giao nhận | Ghi nhận sự cố phát hiện khi bàn giao hoặc thu hồi, kèm chi phí bồi thường và đơn vị chịu trách nhiệm. |
| 13 | PhieuBaoDuong | Vòng đời | Theo dõi một đợt sửa chữa / bảo dưỡng thiết bị và kết quả nghiệm thu. |
| 14 | ChiTietBaoDuong | Vòng đời | Từng hạng mục sửa chữa, linh kiện thay thế của một phiếu bảo dưỡng. |
| 15 | HoSoThanhLy | Vòng đời | Hồ sơ đề xuất thanh lý do Thủ kho lập và Lãnh đạo ký duyệt hoặc bác bỏ. |
| 16 | LichSuTrangThaiTaiSan | Vòng đời | Nhật ký mọi lần chuyển trạng thái vòng đời, do trigger CSDL tự ghi. |
| 17 | ThamSoCAI | Báo cáo | Bảng tham số mềm cấu hình các ngưỡng và hệ số của quy tắc nghiệp vụ, mô hình CAI (BR-EXTRA-02). |

### Bảng 14. Danh sách các quan hệ giữa các lớp

| STT | Lớp nguồn | Lớp đích | Loại quan hệ | Bội số | Ý nghĩa |
|---|---|---|---|---|---|
| 1 | PhongBan | NguoiDung | Kết hợp | 1 - 0..* | Mỗi phòng ban có nhiều cán bộ; mỗi cán bộ thuộc một phòng ban |
| 2 | PhongBan | TaiSan | Kết hợp (sở hữu) | 1 - 0..* | Phòng ban sở hữu tài sản khai báo vào kho |
| 3 | LoaiTaiSan | TaiSan | Kết hợp | 1 - 0..* | Mỗi tài sản thuộc một loại tài sản |
| 4 | TaiSanDoDac, TaiSanCNTT, TaiSanThietBiChung | TaiSan | Tổng quát hóa (kế thừa) | - | Ba lớp con theo NhomTaiSan |
| 5 | NguoiDung | PhieuMuon | Kết hợp | 1 - 0..* | Cán bộ lập phiếu; Thủ kho duyệt phiếu |
| 6 | PhieuMuon | ChiTietPhieuMuon | Hợp thành (composition) | 1 - 1..* | Phiếu gồm một hoặc nhiều dòng thiết bị |
| 7 | TaiSan | ChiTietPhieuMuon | Kết hợp | 1 - 0..* | Một tài sản xuất hiện trong nhiều lượt mượn |
| 8 | PhieuMuon | BienBanBanGiao | Kết hợp | 1 - 0..1 | Mỗi phiếu có tối đa một biên bản bàn giao |
| 9 | PhieuMuon | BienBanThuHoi | Kết hợp | 1 - 0..1 | Mỗi phiếu có tối đa một biên bản thu hồi |
| 10 | BienBanBanGiao | LichSuSuCo | Kết hợp | 0..1 - 0..* | Sự cố phát hiện lúc bàn giao |
| 11 | BienBanThuHoi | LichSuSuCo | Kết hợp | 0..1 - 0..* | Sự cố phát hiện lúc thu hồi |
| 12 | TaiSan | LichSuSuCo | Kết hợp | 1 - 0..* | Lịch sử sự cố của tài sản |
| 13 | TaiSan | PhieuBaoDuong | Kết hợp | 1 - 0..* | Các đợt bảo dưỡng của tài sản |
| 14 | PhieuBaoDuong | ChiTietBaoDuong | Hợp thành (composition) | 1 - 1..* | Phiếu gồm các hạng mục sửa chữa |
| 15 | TaiSan | HoSoThanhLy | Kết hợp | 1 - 0..* | Các hồ sơ đề xuất thanh lý của tài sản |
| 16 | TaiSan | LichSuTrangThaiTaiSan | Kết hợp | 1 - 0..* | Nhật ký chuyển trạng thái vòng đời |

### Bảng 15. Thuộc tính của lớp PhongBan

| STT | Thuộc tính | Kiểu dữ liệu | Ý nghĩa |
|---|---|---|---|
| 1 | MaPB | String | Mã phòng ban |
| 2 | TenPB | String | Tên khoa/phòng ban (duy nhất) |
| 3 | DiaDiem | String | Địa điểm làm việc |
| 4 | SoDienThoai | String | Số điện thoại liên hệ |
| 5 | TruongDonVi | String | Họ tên trưởng đơn vị |

### Bảng 16. Phương thức của lớp PhongBan

| STT | Phương thức | Mô tả |
|---|---|---|
| 1 | themPhongBan() | Thêm phòng ban mới, chặn trùng mã và trùng tên (UC02) |
| 2 | capNhatPhongBan() | Cập nhật thông tin phòng ban |
| 3 | layDanhSach() | Lấy danh sách phòng ban |
| 4 | kiemTraQuyenMuon() | Kiểm tra hạn ngạch phiếu và phiếu quá hạn của đơn vị (BR13) |

### Bảng 17. Thuộc tính của lớp NguoiDung

| STT | Thuộc tính | Kiểu dữ liệu | Ý nghĩa |
|---|---|---|---|
| 1 | MaND | String | Mã cán bộ |
| 2 | TenDangNhap | String | Tên đăng nhập (duy nhất) |
| 3 | HoTen | String | Họ và tên |
| 4 | Email | String | Email nội bộ (duy nhất) |
| 5 | MatKhau | String | Mật khẩu đã băm SHA-256 |
| 6 | VaiTro | String | NhanVien, ThuKho, QuanTri, LanhDao |
| 7 | TrangThaiTK | String | HoatDong hoặc Khoa |
| 8 | MaXacNhanReset | String | Mã xác nhận đặt lại mật khẩu (dự phòng cho hướng phát triển) |
| 9 | HanReset | DateTime | Hạn dùng mã xác nhận |

### Bảng 18. Phương thức của lớp NguoiDung

| STT | Phương thức | Mô tả |
|---|---|---|
| 1 | dangNhap() | Xác thực tên đăng nhập, mật khẩu và trạng thái tài khoản (UC01) |
| 2 | doiMatKhau() | Đổi mật khẩu |
| 3 | guiMaXacNhan() | Gửi mã đặt lại mật khẩu (hướng phát triển) |
| 4 | layThongTin() | Lấy thông tin người dùng của phiên |
| 5 | phanQuyen() | Gán vai trò cho tài khoản (UC04) |
| 6 | khoaMoKhoaTaiKhoan() | Khóa hoặc mở khóa tài khoản; khóa thì hủy phiên đang mở |

### Bảng 19. Thuộc tính của lớp LoaiTaiSan

| STT | Thuộc tính | Kiểu dữ liệu | Ý nghĩa |
|---|---|---|---|
| 1 | MaLoaiTS | String | Mã loại tài sản |
| 2 | TenLoaiTS | String | Tên loại tài sản |
| 3 | NhomTaiSan | String | DoDac, CNTT hoặc ThietBiChung - quyết định lớp con của TaiSan |
| 4 | NienHanNam | Integer | Niên hạn sử dụng (năm), căn cứ 1 của BR15 |

### Bảng 20. Phương thức của lớp LoaiTaiSan

| STT | Phương thức | Mô tả |
|---|---|---|
| 1 | themLoaiTS() | Thêm loại tài sản, chặn trùng mã (UC03) |
| 2 | layDanhSach() | Lấy danh mục loại tài sản |
| 3 | capNhatLoaiTS() | Cập nhật loại tài sản |

### Bảng 21. Thuộc tính của lớp TaiSan

| STT | Thuộc tính | Kiểu dữ liệu | Ý nghĩa |
|---|---|---|---|
| 1 | MaTS | String | Mã tài sản do hệ thống tự sinh |
| 2 | TenTS | String | Tên thiết bị |
| 3 | SoSeri | String | Số seri (duy nhất) |
| 4 | NguyenGia | Decimal | Nguyên giá (> 0), cơ sở tính CAI và bồi thường |
| 5 | NamMua | Integer | Năm đưa vào sử dụng |
| 6 | HienTrang | Integer | Tỷ lệ chất lượng còn lại (0 - 100%) |
| 7 | TrangThai | String | Trạng thái vòng đời (7 trạng thái, khởi tạo Mới) |
| 8 | ViTriLuuTru | String | Vị trí đặt máy |
| 9 | HinhAnh | String | Đường dẫn hình ảnh |
| 10 | MoTa | String | Mô tả, thông số kỹ thuật |

### Bảng 22. Phương thức của lớp TaiSan

| STT | Phương thức | Mô tả |
|---|---|---|
| 1 | dangKyTaiSan() | Khai báo tài sản nhàn rỗi, kiểm tra BR01 (UC05) |
| 2 | kiemNhanTaiSan() | Thủ kho kiểm nhận tài sản Mới, xác nhận nguyên giá và hiện trạng (UC12, BR21) |
| 3 | layDanhSachKhaDung() | Lấy danh sách thiết bị Sẵn sàng chia sẻ (UC06, BR10) |
| 4 | chuyenTrangThai() | Chuyển trạng thái theo ma trận Hình 11, tự ghi lịch sử |
| 5 | capNhatHienTrang() | Trừ hao mòn sau thu hồi hoặc cập nhật sau sửa chữa |
| 6 | danhGiaVongDoi() | Xem lý lịch và nhật ký vòng đời (UC12) |
| 7 | kiemTraDuDieuKienThanhLy() | Kiểm tra 3 căn cứ thanh lý (BR15) |
| 8 | layThongSoKyThuat() | Lấy thông số kỹ thuật (lớp con ghi đè) |

### Bảng 23. Thuộc tính của lớp TaiSanDoDac

| STT | Thuộc tính | Kiểu dữ liệu | Ý nghĩa |
|---|---|---|---|
| 1 | DoChinhXac | String | Sai số / độ chính xác |
| 2 | ChuKyKiemDinh | Integer | Chu kỳ kiểm định (tháng) |

### Bảng 24. Phương thức của lớp TaiSanDoDac

| STT | Phương thức | Mô tả |
|---|---|---|
| 1 | layThongSoKyThuat() | Trả về độ chính xác và chu kỳ kiểm định |
| 2 | kiemTraHanKiemDinh() | Kiểm tra hạn kiểm định thiết bị |

### Bảng 25. Thuộc tính của lớp TaiSanCNTT

| STT | Thuộc tính | Kiểu dữ liệu | Ý nghĩa |
|---|---|---|---|
| 1 | CauHinhCPU | String | Thông số CPU |
| 2 | DungLuongRAM | String | Dung lượng RAM |

### Bảng 26. Phương thức của lớp TaiSanCNTT

| STT | Phương thức | Mô tả |
|---|---|---|
| 1 | layThongSoKyThuat() | Trả về cấu hình CPU, RAM |
| 2 | kiemTraCauHinh() | Kiểm tra cấu hình đáp ứng nhu cầu mượn |

### Bảng 27. Thuộc tính của lớp TaiSanThietBiChung

| STT | Thuộc tính | Kiểu dữ liệu | Ý nghĩa |
|---|---|---|---|
| 1 | CongSuat | String | Công suất tiêu thụ |
| 2 | PhuKienDiKem | String | Phụ kiện kèm theo |

### Bảng 28. Phương thức của lớp TaiSanThietBiChung

| STT | Phương thức | Mô tả |
|---|---|---|
| 1 | layThongSoKyThuat() | Trả về công suất và phụ kiện |
| 2 | kiemTraPhuKien() | Kiểm tra đủ phụ kiện khi giao nhận |

### Bảng 29. Thuộc tính của lớp PhieuMuon

| STT | Thuộc tính | Kiểu dữ liệu | Ý nghĩa |
|---|---|---|---|
| 1 | MaPM | String | Mã phiếu mượn |
| 2 | MaPBMuon | String | Đơn vị mượn |
| 3 | MaNguoiDuyet | String | Thủ kho duyệt |
| 4 | NgayLap | DateTime | Thời điểm lập phiếu |
| 5 | NgayMuon | Date | Ngày bắt đầu mượn |
| 6 | NgayHenTra | Date | Ngày hẹn trả (tối đa 30 ngày) |
| 7 | MucDichSuDung | String | Mục đích sử dụng |
| 8 | TrangThai | String | ChoDuyet, DaDuyet, DangThucHien, HoanTat, TuChoi, DaHuy |
| 9 | CoQuaHan | Boolean | Cờ quá hạn (BR14), giữ lại sau khi hoàn tất |
| 10 | NgayDuyet | DateTime | Thời điểm duyệt / từ chối |
| 11 | LyDoTuChoi | String | Lý do từ chối |
| 12 | LyDoHuy | String | Lý do hủy |

### Bảng 30. Phương thức của lớp PhieuMuon

| STT | Phương thức | Mô tả |
|---|---|---|
| 1 | lapYeuCauMuon() | Lập phiếu, kiểm tra BR02, BR03, BR05, BR13 (UC08) |
| 2 | pheDuyet() | Duyệt phiếu, kiểm tra trùng lịch BR04 (UC09) |
| 3 | tuChoi() | Từ chối kèm lý do (UC09) |
| 4 | huyYeuCau() | Người mượn hủy khi Chờ duyệt (BR17) |
| 5 | tuDongHuy() | Tự hủy phiếu Đã duyệt không đến nhận máy (BR-EXTRA-01) |
| 6 | capNhatTrangThai() | Chuyển trạng thái phiếu theo Hình 12 |
| 7 | danhDauQuaHan() | Bật cờ quá hạn khi quét định kỳ (BR14, UC17) |

### Bảng 31. Thuộc tính của lớp ChiTietPhieuMuon

| STT | Thuộc tính | Kiểu dữ liệu | Ý nghĩa |
|---|---|---|---|
| 1 | GhiChuMucDich | String | Ghi chú mục đích cho thiết bị |
| 2 | TinhTrangTruoc | String | Tình trạng lúc bàn giao |
| 3 | TinhTrangSau | String | Tot, CanBaoTri, HuHong |
| 4 | TyLeHaoMon | Integer | Tỷ lệ hao mòn qua đợt mượn (%) |
| 5 | GhiChuSau | String | Ghi chú khi thu hồi |

### Bảng 32. Phương thức của lớp ChiTietPhieuMuon

| STT | Phương thức | Mô tả |
|---|---|---|
| 1 | themChiTiet() | Thêm thiết bị vào phiếu (trigger chặn thiết bị không khả dụng - BR10) |
| 2 | kiemTraTrungLich() | Kiểm tra trùng lịch khi duyệt (BR04) |
| 3 | layDanhSachThietBi() | Lấy danh sách thiết bị của phiếu |
| 4 | ghiNhanHaoMon() | Ghi tình trạng sau và hao mòn từng máy (BR08) |

### Bảng 33. Thuộc tính của lớp BienBanBanGiao

| STT | Thuộc tính | Kiểu dữ liệu | Ý nghĩa |
|---|---|---|---|
| 1 | MaBBBG | String | Mã biên bản bàn giao |
| 2 | NgayGiao | DateTime | Thời điểm bàn giao |
| 3 | MaNguoiGiao | String | Thủ kho giao |
| 4 | MaNguoiNhan | String | Cán bộ nhận (thuộc đơn vị mượn) |
| 5 | PhuKienKemTheo | String | Phụ kiện kèm theo |
| 6 | TrangThaiGiao | String | DaGiao hoặc Huy |

### Bảng 34. Phương thức của lớp BienBanBanGiao

| STT | Phương thức | Mô tả |
|---|---|---|
| 1 | taoBienBanBanGiao() | Lập biên bản, kiểm tra BR06 (UC10) |
| 2 | layChiTietBanGiao() | Lấy thông tin bàn giao |
| 3 | xacNhanBanGiao() | Xác nhận xuất kho, chuyển máy Đang mượn và phiếu Đang thực hiện (BR07) |
| 4 | huyBanGiao() | Hủy bàn giao, hủy cả phiếu (BR06, BR17) |

### Bảng 35. Thuộc tính của lớp BienBanThuHoi

| STT | Thuộc tính | Kiểu dữ liệu | Ý nghĩa |
|---|---|---|---|
| 1 | MaBBTH | String | Mã biên bản thu hồi |
| 2 | NgayThuHoi | DateTime | Thời điểm thu hồi |
| 3 | MaNguoiThuHoi | String | Thủ kho tiếp nhận |
| 4 | MaNguoiTra | String | Cán bộ hoàn trả |
| 5 | SoNgayMuonThucTe | Integer | Số ngày khai thác thực tế |
| 6 | GhiChu | String | Ghi chú biên bản |

### Bảng 36. Phương thức của lớp BienBanThuHoi

| STT | Phương thức | Mô tả |
|---|---|---|
| 1 | taoBienBanThuHoi() | Lập biên bản, đánh giá từng máy (UC11, BR08) |
| 2 | xacNhanThuHoi() | Trừ hao mòn, phân luồng trạng thái máy, đóng phiếu (BR09) |
| 3 | tinhSoNgayMuonThucTe() | Tính số ngày từ ngày giao đến ngày thu hồi |

### Bảng 37. Thuộc tính của lớp LichSuSuCo

| STT | Thuộc tính | Kiểu dữ liệu | Ý nghĩa |
|---|---|---|---|
| 1 | MaSuCo | String | Mã sự cố |
| 2 | NgayPhatSinh | DateTime | Ngày phát hiện |
| 3 | MoTaHuHong | String | Mô tả hư hỏng |
| 4 | MucDoThietHai | Integer | Mức độ thiệt hại (%) |
| 5 | ChiPhiBoiThuong | Decimal | Bồi thường = MucDoThietHai x NguyenGia |
| 6 | MaPBChiuTrachNhiem | String | Đơn vị chịu trách nhiệm |

### Bảng 38. Phương thức của lớp LichSuSuCo

| STT | Phương thức | Mô tả |
|---|---|---|
| 1 | ghiNhanSuCo() | Ghi nhận sự cố khi hủy bàn giao hoặc thu hồi |
| 2 | tinhChiPhiBoiThuong() | Tính chi phí bồi thường (BR09) |
| 3 | layLichSuTheoMay() | Lấy lịch sử sự cố của một thiết bị |

### Bảng 39. Thuộc tính của lớp PhieuBaoDuong

| STT | Thuộc tính | Kiểu dữ liệu | Ý nghĩa |
|---|---|---|---|
| 1 | MaPBD | String | Mã phiếu bảo dưỡng |
| 2 | MaNguoiLap | String | Thủ kho lập phiếu |
| 3 | NgayLapPhieu | DateTime | Ngày gửi sửa |
| 4 | DonViSuaChua | String | Đơn vị sửa chữa |
| 5 | NoiDungSuaChua | String | Nội dung kỹ thuật |
| 6 | /TongChiPhi | Decimal | Thuộc tính dẫn xuất = tổng thành tiền các hạng mục |
| 7 | TrangThaiBaoDuong | String | DangBaoDuong, DaNghiemThu, KhongTheSua |
| 8 | NgayKetThuc | DateTime | Ngày nghiệm thu / kết thúc |
| 9 | HienTrangSauSuaChua | Integer | Hiện trạng sau sửa (%) |

### Bảng 40. Phương thức của lớp PhieuBaoDuong

| STT | Phương thức | Mô tả |
|---|---|---|
| 1 | lapPhieuBaoDuong() | Lập phiếu cho máy Cần bảo dưỡng, chuyển Đang bảo dưỡng (UC13) |
| 2 | nghiemThuSuaChua() | Nghiệm thu đạt (>= 50%) về Sẵn sàng chia sẻ (BR11, BR12) |
| 3 | khongTheSua() | Kết luận không thể sửa, chuyển Đề xuất thanh lý (BR12) |
| 4 | tongChiPhiTheoQuy() | Tổng chi phí bảo dưỡng theo kỳ (BR20) |

### Bảng 41. Thuộc tính của lớp ChiTietBaoDuong

| STT | Thuộc tính | Kiểu dữ liệu | Ý nghĩa |
|---|---|---|---|
| 1 | MaChiTietBD | Integer | Mã tự tăng |
| 2 | HangMucSuaChua | String | Hạng mục sửa chữa |
| 3 | LinhKienThayThe | String | Linh kiện thay thế |
| 4 | DonGia | Decimal | Đơn giá |
| 5 | SoLuong | Integer | Số lượng |
| 6 | /ThanhTien | Decimal | Thuộc tính dẫn xuất = DonGia x SoLuong |

### Bảng 42. Phương thức của lớp ChiTietBaoDuong

| STT | Phương thức | Mô tả |
|---|---|---|
| 1 | themHangMuc() | Thêm hạng mục vào phiếu |
| 2 | tinhThanhTien() | Tính thành tiền hạng mục |

### Bảng 43. Thuộc tính của lớp HoSoThanhLy

| STT | Thuộc tính | Kiểu dữ liệu | Ý nghĩa |
|---|---|---|---|
| 1 | MaHSTL | String | Mã hồ sơ |
| 2 | MaNguoiDeXuat | String | Thủ kho đề xuất |
| 3 | NgayDeXuat | DateTime | Ngày đề xuất |
| 4 | LyDoDeXuat | String | Lý do đề xuất |
| 5 | TrangThai | String | ChoDuyet, DaDuyet, BacBo |
| 6 | MaNguoiDuyet | String | Lãnh đạo duyệt |
| 7 | NgayDuyet | DateTime | Ngày duyệt |
| 8 | SoQuyetDinh | String | Số quyết định thanh lý |
| 9 | GhiChuDuyet | String | Ý kiến chỉ đạo |

### Bảng 44. Phương thức của lớp HoSoThanhLy

| STT | Phương thức | Mô tả |
|---|---|---|
| 1 | lapHoSo() | Lập hồ sơ khi thỏa BR15 (UC14) |
| 2 | pheDuyet() | Ký duyệt, chuyển tài sản Đã thanh lý |
| 3 | bacBo() | Bác bỏ, đưa tài sản về Sẵn sàng chia sẻ hoặc Cần bảo dưỡng |
| 4 | layHoSoTheoTaiSan() | Lấy hồ sơ của một tài sản |

### Bảng 45. Thuộc tính của lớp LichSuTrangThaiTaiSan

| STT | Thuộc tính | Kiểu dữ liệu | Ý nghĩa |
|---|---|---|---|
| 1 | MaLichSu | Integer | Mã tự tăng |
| 2 | TrangThaiCu | String | Trạng thái trước |
| 3 | TrangThaiMoi | String | Trạng thái sau |
| 4 | NgayThayDoi | DateTime | Thời điểm chuyển |
| 5 | MaNguoiThucHien | String | Người thực hiện |
| 6 | MaPM | String | Phiếu mượn liên quan |
| 7 | LyDo | String | Lý do chuyển |

### Bảng 46. Phương thức của lớp LichSuTrangThaiTaiSan

| STT | Phương thức | Mô tả |
|---|---|---|
| 1 | ghiNhanLichSu() | Ghi một dòng nhật ký khi trạng thái thay đổi |
| 2 | layLichSuTheoTaiSan() | Lấy nhật ký vòng đời của tài sản (UC12) |

### Bảng 47. Thuộc tính của lớp ThamSoCAI

| STT | Thuộc tính | Kiểu dữ liệu | Ý nghĩa |
|---|---|---|---|
| 1 | MaThamSo | String | Mã tham số TS01 - TS07 |
| 2 | TenThamSo | String | Tên diễn giải |
| 3 | GiaTri | Decimal | Giá trị |
| 4 | DonViTinh | String | Đơn vị tính |
| 5 | NgayCapNhat | DateTime | Lần cập nhật gần nhất |

### Bảng 48. Phương thức của lớp ThamSoCAI

| STT | Phương thức | Mô tả |
|---|---|---|
| 1 | layThamSo() | Đọc giá trị tham số |
| 2 | capNhatThamSo() | Cập nhật tham số, kiểm tra miền giá trị (UC04) |
| 3 | tinhToanCAI() | Cung cấp hệ số cho tính CAI (BR18 - BR20) |

---

## Chương 4: Thiết Kế Dữ Liệu

### Bảng 49. Cấu trúc bảng PhongBan

| STT | Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
|---|---|---|---|---|---|
| 1 | MaPB | VARCHAR(20) | PK | NOT NULL | Mã phòng ban |
| 2 | TenPB | NVARCHAR(100) | UNIQUE | NOT NULL | Tên khoa/phòng ban (duy nhất) |
| 3 | DiaDiem | NVARCHAR(150) |   | NULL | Địa điểm làm việc |
| 4 | SoDienThoai | VARCHAR(20) |   | NULL | Số điện thoại liên hệ |
| 5 | TruongDonVi | NVARCHAR(100) |   | NULL | Họ tên trưởng đơn vị |

### Bảng 50. Cấu trúc bảng NguoiDung

| STT | Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
|---|---|---|---|---|---|
| 1 | MaND | VARCHAR(20) | PK | NOT NULL | Mã cán bộ |
| 2 | MaPB | VARCHAR(20) | FK → PhongBan(MaPB) | NOT NULL | Mã phòng ban |
| 3 | TenDangNhap | VARCHAR(50) | UNIQUE | NOT NULL | Tên đăng nhập (duy nhất) |
| 4 | MatKhau | VARCHAR(255) |   | NOT NULL | Mật khẩu đã băm SHA-256 |
| 5 | HoTen | NVARCHAR(120) |   | NOT NULL | Họ và tên |
| 6 | Email | VARCHAR(100) |   | NULL | Email nội bộ (duy nhất) |
| 7 | VaiTro | NVARCHAR(30) |   | NOT NULL; CHECK VaiTro IN ('NhanVien', 'ThuKho', 'QuanTri', 'LanhDao') | NhanVien, ThuKho, QuanTri, LanhDao |
| 8 | TrangThaiTK | NVARCHAR(30) |   | NOT NULL; DEFAULT 'HoatDong'; CHECK TrangThaiTK IN ('HoatDong', 'Khoa') | HoatDong hoặc Khoa |
| 9 | MaXacNhanReset | VARCHAR(20) |   | NULL | Mã xác nhận đặt lại mật khẩu (dự phòng cho hướng phát triển) |
| 10 | HanReset | DATETIME |   | NULL | Hạn dùng mã xác nhận |

### Bảng 51. Cấu trúc bảng LoaiTaiSan

| STT | Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
|---|---|---|---|---|---|
| 1 | MaLoaiTS | VARCHAR(20) | PK | NOT NULL | Loại tài sản |
| 2 | TenLoaiTS | NVARCHAR(100) |   | NOT NULL | Tên loại tài sản |
| 3 | NhomTaiSan | NVARCHAR(30) |   | NOT NULL; CHECK NhomTaiSan IN ('DoDac', 'CNTT', 'ThietBiChung') | DoDac, CNTT hoặc ThietBiChung - quyết định lớp con của TaiSan |
| 4 | NienHanNam | INT |   | NOT NULL; CHECK NienHanNam > 0 | Niên hạn sử dụng (năm), căn cứ 1 của BR15 |

### Bảng 52. Cấu trúc bảng TaiSan

| STT | Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
|---|---|---|---|---|---|
| 1 | MaTS | VARCHAR(20) | PK | NOT NULL | Mã tài sản |
| 2 | MaLoaiTS | VARCHAR(20) | FK → LoaiTaiSan(MaLoaiTS) | NOT NULL | Loại tài sản |
| 3 | MaPBSoHuu | VARCHAR(20) | FK → PhongBan(MaPB) | NOT NULL | Phòng ban sở hữu tài sản |
| 4 | TenTS | NVARCHAR(150) |   | NOT NULL | Tên thiết bị |
| 5 | SoSeri | VARCHAR(50) | UNIQUE | NOT NULL | Số seri (duy nhất) |
| 6 | NguyenGia | DECIMAL(18,2) |   | NOT NULL; CHECK NguyenGia > 0 | Nguyên giá (> 0), cơ sở tính CAI và bồi thường |
| 7 | NamMua | INT |   | NOT NULL; CHECK NamMua >= 1990 AND NamMua <= YEAR(GETDATE()) | Năm đưa vào sử dụng |
| 8 | HienTrang | INT |   | NOT NULL; CHECK HienTrang >= 0 AND HienTrang <= 100 | Tỷ lệ chất lượng còn lại (0 - 100%) |
| 9 | TrangThai | NVARCHAR(30) |   | NOT NULL; DEFAULT 'Moi'; CHECK TrangThai IN ('Moi', 'SanSangChiaSe', 'DangMuon', 'CanBaoDuong', 'DangBaoDuong', 'DeXuatThanhLy', 'DaThanhLy') | Trạng thái vòng đời (7 trạng thái, khởi tạo Mới) |
| 10 | ViTriLuuTru | NVARCHAR(150) |   | NULL | Vị trí đặt máy |
| 11 | HinhAnh | VARCHAR(255) |   | NULL | Đường dẫn hình ảnh |
| 12 | MoTa | NVARCHAR(500) |   | NULL | Mô tả, thông số kỹ thuật |
| 13 | DoChinhXac | NVARCHAR(50) |   | NULL | Sai số / độ chính xác |
| 14 | ChuKyKiemDinh | INT |   | NULL | Chu kỳ kiểm định (tháng) |
| 15 | CauHinhCPU | NVARCHAR(100) |   | NULL | Thông số CPU |
| 16 | DungLuongRAM | NVARCHAR(50) |   | NULL | Dung lượng RAM |
| 17 | CongSuat | NVARCHAR(50) |   | NULL | Công suất tiêu thụ |
| 18 | PhuKienDiKem | NVARCHAR(255) |   | NULL | Phụ kiện kèm theo |

### Bảng 53. Cấu trúc bảng PhieuMuon

| STT | Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
|---|---|---|---|---|---|
| 1 | MaPM | VARCHAR(20) | PK | NOT NULL | Phiếu mượn |
| 2 | MaNguoiMuon | VARCHAR(20) | FK → NguoiDung(MaND) | NOT NULL | Cán bộ lập phiếu mượn |
| 3 | MaPBMuon | VARCHAR(20) | FK → PhongBan(MaPB) | NOT NULL | Đơn vị mượn |
| 4 | MaNguoiDuyet | VARCHAR(20) | FK → NguoiDung(MaND) | NULL | Thủ kho duyệt |
| 5 | NgayLap | DATETIME |   | NOT NULL; DEFAULT GETDATE() | Thời điểm lập phiếu |
| 6 | NgayMuon | DATE |   | NOT NULL; CHECK NgayHenTra >= NgayMuon AND DATEDIFF(DAY, NgayMuon, NgayHenTra) + 1 <= 30 | Ngày bắt đầu mượn |
| 7 | NgayHenTra | DATE |   | NOT NULL | Ngày hẹn trả (tối đa 30 ngày) |
| 8 | MucDichSuDung | NVARCHAR(255) |   | NOT NULL | Mục đích sử dụng |
| 9 | TrangThai | NVARCHAR(20) |   | NOT NULL; DEFAULT 'ChoDuyet'; CHECK TrangThai IN ( 'ChoDuyet', 'DaDuyet', 'DangThucHien', 'HoanTat', 'TuChoi', 'DaHuy' ) | Trạng thái vòng đời (6 trạng thái) |
| 10 | CoQuaHan | BIT |   | NOT NULL; DEFAULT 0 | Cờ quá hạn (BR14), giữ lại sau khi hoàn tất |
| 11 | NgayDuyet | DATETIME |   | NULL | Thời điểm duyệt / từ chối |
| 12 | LyDoTuChoi | NVARCHAR(255) |   | NULL | Lý do từ chối |
| 13 | LyDoHuy | NVARCHAR(255) |   | NULL | Lý do hủy |

### Bảng 54. Cấu trúc bảng ChiTietPhieuMuon

| STT | Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
|---|---|---|---|---|---|
| 1 | MaPM | VARCHAR(20) | PK, FK → PhieuMuon(MaPM) | NOT NULL | Phiếu mượn |
| 2 | MaTS | VARCHAR(20) | PK, FK → TaiSan(MaTS) | NOT NULL | Mã tài sản |
| 3 | GhiChuMucDich | NVARCHAR(255) |   | NULL | Ghi chú mục đích cho thiết bị |
| 4 | TinhTrangTruoc | NVARCHAR(255) |   | NULL | Tình trạng lúc bàn giao |
| 5 | TinhTrangSau | NVARCHAR(20) |   | NULL; CHECK TinhTrangSau IS NULL OR TinhTrangSau IN ('Tot', 'CanBaoTri', 'HuHong') | Tot, CanBaoTri, HuHong |
| 6 | TyLeHaoMon | INT |   | NULL; CHECK TyLeHaoMon IS NULL OR (TyLeHaoMon >= 0 AND TyLeHaoMon <= 100) | Tỷ lệ hao mòn qua đợt mượn (%) |
| 7 | GhiChuSau | NVARCHAR(255) |   | NULL | Ghi chú khi thu hồi |

### Bảng 55. Cấu trúc bảng BienBanBanGiao

| STT | Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
|---|---|---|---|---|---|
| 1 | MaBBBG | VARCHAR(20) | PK | NOT NULL | Biên bản bàn giao (nếu phát sinh lúc giao) |
| 2 | MaPM | VARCHAR(20) | FK → PhieuMuon(MaPM), UNIQUE | NOT NULL | Phiếu mượn |
| 3 | MaNguoiGiao | VARCHAR(20) | FK → NguoiDung(MaND) | NOT NULL | Thủ kho giao |
| 4 | MaNguoiNhan | VARCHAR(20) | FK → NguoiDung(MaND) | NOT NULL | Cán bộ nhận (thuộc đơn vị mượn) |
| 5 | NgayGiao | DATETIME |   | NOT NULL; DEFAULT GETDATE() | Thời điểm bàn giao |
| 6 | PhuKienKemTheo | NVARCHAR(255) |   | NULL | Phụ kiện kèm theo |
| 7 | TrangThaiGiao | NVARCHAR(50) |   | NOT NULL; DEFAULT 'DaGiao'; CHECK TrangThaiGiao IN ('DaGiao', 'Huy') | DaGiao hoặc Huy |

### Bảng 56. Cấu trúc bảng BienBanThuHoi

| STT | Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
|---|---|---|---|---|---|
| 1 | MaBBTH | VARCHAR(20) | PK | NOT NULL | Biên bản thu hồi (nếu phát sinh lúc thu hồi) |
| 2 | MaPM | VARCHAR(20) | FK → PhieuMuon(MaPM), UNIQUE | NOT NULL | Phiếu mượn |
| 3 | MaNguoiThuHoi | VARCHAR(20) | FK → NguoiDung(MaND) | NOT NULL | Thủ kho tiếp nhận |
| 4 | MaNguoiTra | VARCHAR(20) | FK → NguoiDung(MaND) | NOT NULL | Cán bộ hoàn trả |
| 5 | NgayThuHoi | DATETIME |   | NOT NULL; DEFAULT GETDATE() | Thời điểm thu hồi |
| 6 | SoNgayMuonThucTe | INT |   | NOT NULL; CHECK SoNgayMuonThucTe >= 1 | Số ngày khai thác thực tế |
| 7 | GhiChu | NVARCHAR(255) |   | NULL | Ghi chú biên bản |

### Bảng 57. Cấu trúc bảng LichSuSuCo

| STT | Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
|---|---|---|---|---|---|
| 1 | MaSuCo | VARCHAR(20) | PK | NOT NULL | Mã sự cố |
| 2 | MaTS | VARCHAR(20) | FK → TaiSan(MaTS) | NOT NULL | Mã tài sản |
| 3 | MaBBBG | VARCHAR(20) | FK → BienBanBanGiao(MaBBBG) | NULL; CHECK NOT (MaBBBG IS NOT NULL AND MaBBTH IS NOT NULL) | Biên bản bàn giao (nếu phát sinh lúc giao) |
| 4 | MaBBTH | VARCHAR(20) | FK → BienBanThuHoi(MaBBTH) | NULL | Biên bản thu hồi (nếu phát sinh lúc thu hồi) |
| 5 | MaPBChiuTrachNhiem | VARCHAR(20) | FK → PhongBan(MaPB) | NULL | Đơn vị chịu trách nhiệm |
| 6 | NgayPhatSinh | DATETIME |   | NOT NULL; DEFAULT GETDATE() | Ngày phát hiện |
| 7 | MoTaHuHong | NVARCHAR(255) |   | NOT NULL | Mô tả hư hỏng |
| 8 | MucDoThietHai | INT |   | NOT NULL; DEFAULT 0; CHECK MucDoThietHai >= 0 AND MucDoThietHai <= 100 | Mức độ thiệt hại (%) |
| 9 | ChiPhiBoiThuong | DECIMAL(18,2) |   | NOT NULL; DEFAULT 0; CHECK ChiPhiBoiThuong >= 0 | Bồi thường = MucDoThietHai x NguyenGia |

### Bảng 58. Cấu trúc bảng PhieuBaoDuong

| STT | Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
|---|---|---|---|---|---|
| 1 | MaPBD | VARCHAR(20) | PK | NOT NULL | Phiếu bảo dưỡng |
| 2 | MaTS | VARCHAR(20) | FK → TaiSan(MaTS) | NOT NULL | Mã tài sản |
| 3 | MaNguoiLap | VARCHAR(20) | FK → NguoiDung(MaND) | NOT NULL | Thủ kho lập phiếu |
| 4 | NgayLapPhieu | DATETIME |   | NOT NULL; DEFAULT GETDATE() | Ngày gửi sửa |
| 5 | DonViSuaChua | NVARCHAR(150) |   | NULL | Đơn vị sửa chữa |
| 6 | NoiDungSuaChua | NVARCHAR(255) |   | NULL | Nội dung kỹ thuật |
| 7 | TrangThaiBaoDuong | NVARCHAR(20) |   | NOT NULL; DEFAULT 'DangBaoDuong'; CHECK TrangThaiBaoDuong IN ('DangBaoDuong', 'DaNghiemThu', 'KhongTheSua') | DangBaoDuong, DaNghiemThu, KhongTheSua |
| 8 | NgayKetThuc | DATETIME |   | NULL | Ngày nghiệm thu / kết thúc |
| 9 | HienTrangSauSuaChua | INT |   | NULL; CHECK HienTrangSauSuaChua IS NULL OR (HienTrangSauSuaChua >= 0 AND HienTrangSauSuaChua <= 100) | Hiện trạng sau sửa (%) |

### Bảng 59. Cấu trúc bảng ChiTietBaoDuong

| STT | Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
|---|---|---|---|---|---|
| 1 | MaChiTietBD | INT | PK | IDENTITY(1,1); NOT NULL | Mã tự tăng |
| 2 | MaPBD | VARCHAR(20) | FK → PhieuBaoDuong(MaPBD) | NOT NULL | Phiếu bảo dưỡng |
| 3 | HangMucSuaChua | NVARCHAR(150) |   | NOT NULL | Hạng mục sửa chữa |
| 4 | LinhKienThayThe | NVARCHAR(150) |   | NULL | Linh kiện thay thế |
| 5 | DonGia | DECIMAL(18,2) |   | NOT NULL; CHECK DonGia >= 0 | Đơn giá |
| 6 | SoLuong | INT |   | NOT NULL; DEFAULT 1; CHECK SoLuong > 0 | Số lượng |
| 7 | ThanhTien | Tính toán |   | AS (DonGia * SoLuong) PERSISTED | Cột tính toán = DonGia x SoLuong |

### Bảng 60. Cấu trúc bảng ThamSoCAI

| STT | Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
|---|---|---|---|---|---|
| 1 | MaThamSo | VARCHAR(20) | PK | NOT NULL | Mã tham số TS01 - TS07 |
| 2 | TenThamSo | NVARCHAR(100) |   | NOT NULL | Tên diễn giải |
| 3 | GiaTri | DECIMAL(18,4) |   | NOT NULL | Giá trị |
| 4 | DonViTinh | NVARCHAR(30) |   | NOT NULL | Đơn vị tính |
| 5 | NgayCapNhat | DATETIME |   | NOT NULL; DEFAULT GETDATE() | Lần cập nhật gần nhất |

### Bảng 61. Cấu trúc bảng HoSoThanhLy

| STT | Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
|---|---|---|---|---|---|
| 1 | MaHSTL | VARCHAR(20) | PK | NOT NULL | Mã hồ sơ |
| 2 | MaTS | VARCHAR(20) | FK → TaiSan(MaTS) | NOT NULL | Mã tài sản |
| 3 | MaNguoiDeXuat | VARCHAR(20) | FK → NguoiDung(MaND) | NOT NULL | Thủ kho đề xuất |
| 4 | NgayDeXuat | DATETIME |   | NOT NULL; DEFAULT GETDATE() | Ngày đề xuất |
| 5 | LyDoDeXuat | NVARCHAR(255) |   | NOT NULL | Lý do đề xuất |
| 6 | TrangThai | NVARCHAR(20) |   | NOT NULL; DEFAULT 'ChoDuyet'; CHECK TrangThai IN ('ChoDuyet', 'DaDuyet', 'BacBo') | Trạng thái vòng đời (3 trạng thái) |
| 7 | MaNguoiDuyet | VARCHAR(20) | FK → NguoiDung(MaND) | NULL | Thủ kho duyệt |
| 8 | NgayDuyet | DATETIME |   | NULL | Thời điểm duyệt / từ chối |
| 9 | SoQuyetDinh | NVARCHAR(50) |   | NULL | Số quyết định thanh lý |
| 10 | GhiChuDuyet | NVARCHAR(255) |   | NULL | Ý kiến chỉ đạo |

### Bảng 62. Cấu trúc bảng LichSuTrangThaiTaiSan

| STT | Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
|---|---|---|---|---|---|
| 1 | MaLichSu | INT | PK | IDENTITY(1,1); NOT NULL | Mã tự tăng |
| 2 | MaTS | VARCHAR(20) | FK → TaiSan(MaTS) | NOT NULL | Mã tài sản |
| 3 | TrangThaiCu | NVARCHAR(30) |   | NULL | Trạng thái trước |
| 4 | TrangThaiMoi | NVARCHAR(30) |   | NOT NULL | Trạng thái sau |
| 5 | NgayThayDoi | DATETIME |   | NOT NULL; DEFAULT GETDATE() | Thời điểm chuyển |
| 6 | MaNguoiThucHien | VARCHAR(20) | FK → NguoiDung(MaND) | NULL | Người thực hiện chuyển trạng thái |
| 7 | MaPM | VARCHAR(20) | FK → PhieuMuon(MaPM) | NULL | Phiếu mượn |
| 8 | LyDo | NVARCHAR(255) |   | NULL | Lý do chuyển trạng thái |

---

## Chương 5: Thiết Kế Kiến Trúc

### Bảng 63. Framework và công nghệ sử dụng

| Thành phần | Công nghệ | Phiên bản | Vai trò |
|---|---|---|---|
| Ngôn ngữ máy chủ | Java (JDK) | 21 | Ngôn ngữ lập trình backend |
| Framework máy chủ | Spring Boot (Web, Data JPA, JDBC) | 3.3.5 | REST API, tiêm phụ thuộc, tác vụ định kỳ @Scheduled |
| Truy cập dữ liệu | Spring Data JPA / Hibernate | theo Spring Boot | Đọc danh sách, danh mục qua Repository |
| Gọi thủ tục | Spring JDBC SimpleJdbcCall | theo Spring Boot | Gọi 14 thủ tục nghiệp vụ, nhận lỗi THROW |
| Trình điều khiển CSDL | Microsoft JDBC Driver (mssql-jdbc) | theo Spring Boot | Kết nối SQL Server |
| Tài liệu API | springdoc-openapi (Swagger UI) | 2.6.0 | Sinh tài liệu và thử API |
| Tiện ích | Lombok | 1.18.36 | Giảm mã getter / setter |
| Hệ quản trị CSDL | Microsoft SQL Server | 2022 | Bảng, view, thủ tục, trigger, sequence |
| Giao diện | React | 18.3 | Ứng dụng một trang (SPA) |
| Công cụ build giao diện | Vite | 5.4 | Đóng gói giao diện vào thư mục static của Spring Boot |
| Thư viện giao diện | Tailwind CSS, lucide-react, Recharts | 3.4 / 0.453 / 2.13 | Định dạng, biểu tượng, biểu đồ Hình 58 |
| Gọi API | Axios | 1.7 | Gắn Token, chuẩn hóa phản hồi và lỗi |

### Bảng 64. Các gói mã nguồn backend

| Gói | Thành phần | Trách nhiệm |
|---|---|---|
| config | PhienDangNhapService, XacThucInterceptor, WebConfig | Cấp Token phiên 8 giờ, kiểm tra đăng nhập và ma trận quyền theo vai trò |
| controller | 9 controller + GlobalExceptionHandler | Định nghĩa REST API, lấy người thực hiện từ phiên, trả ApiResponse |
| service | 9 service | Kiểm tra đầu vào, chuẩn hóa dữ liệu, gọi DAO / Repository |
| repository | 14 Repository JPA + StoredProcedureDAO | Truy vấn dữ liệu và gọi thủ tục nghiệp vụ |
| entity | 14 lớp thực thể | Ánh xạ 14 bảng CSDL |
| dto | Các lớp yêu cầu / phản hồi | Dữ liệu trao đổi giữa giao diện và máy chủ |

### Bảng 65. Các thủ tục nghiệp vụ

| STT | Thủ tục | Chức năng | UC |
|---|---|---|---|
| 1 | sp_KhaiBaoTaiSan_BR01 | Khai báo tài sản, khởi tạo trạng thái Mới | UC05, BR01 |
| 2 | sp_KiemNhanTaiSan_BR21 | Kiểm nhận tài sản Mới | UC12, BR21 |
| 3 | sp_LapYeuCauMuon_BR02_BR13 | Lập phiếu mượn nhiều thiết bị | UC08 |
| 4 | sp_DuyetPhieuMuon_KhoaLich_BR04 | Duyệt / từ chối, chống trùng lịch | UC09 |
| 5 | sp_HuyPhieuMuon_ChoDuyet_BR17 | Hủy phiếu Chờ duyệt | UC08 |
| 6 | sp_LapBienBanBanGiao_BR06_BR07 | Bàn giao hoặc hủy bàn giao | UC10 |
| 7 | sp_LapBienBanThuHoi_BR08_BR09 | Thu hồi, hao mòn, sự cố, đóng phiếu | UC11 |
| 8 | sp_LapPhieuBaoDuong | Lập phiếu bảo dưỡng | UC13 |
| 9 | sp_NghiemThuBaoDuong_BR11_BR12 | Nghiệm thu bảo dưỡng | UC13 |
| 10 | sp_DeXuatThanhLy_BR15 | Lập hồ sơ thanh lý theo 3 căn cứ | UC14 |
| 11 | sp_PheDuyetThanhLy | Duyệt / bác bỏ thanh lý | UC14 |
| 12 | sp_QuetQuaHan_Va_TuDongHuy_BR14 | Quét quá hạn, tự hủy phiếu không nhận máy | UC17 |
| 13 | sp_BaoCaoCAI_TheoKy | Báo cáo CAI / NCAV theo kỳ | UC16 |
| 14 | sp_DangNhap_XacThuc | Xác thực đăng nhập (dự phòng) | UC01 |

### Bảng 66. Ma trận phân quyền chức năng ghi dữ liệu

| Nhóm chức năng | Nhân viên | Thủ kho | Lãnh đạo | Quản trị viên |
|---|---|---|---|---|
| Khai báo tài sản | x | x |   |   |
| Kiểm nhận tài sản |   | x |   |   |
| Lập yêu cầu mượn | x |   |   |   |
| Hủy yêu cầu mượn (BR17) | x (chủ phiếu) | x |   | x |
| Duyệt phiếu, bàn giao, thu hồi, bảo dưỡng |   | x |   |   |
| Đề xuất thanh lý |   | x |   |   |
| Phê duyệt thanh lý |   |   | x |   |
| Xem báo cáo CAI, hiệu suất |   | x | x |   |
| Quét quá hạn thủ công |   | x |   | x |
| Danh mục, người dùng, tham số |   |   |   | x |

---

## Chương 6: Thiết Kế Giao Diện

### Bảng 67. Danh sách các màn hình

| STT | Màn hình | Vai trò sử dụng | Use Case |
|---|---|---|---|
| 1 | Trang chủ | Thủ kho, Lãnh đạo | UC15, UC16 |
| 2 | Đăng nhập | Tất cả | UC01 |
| 3 | Quản lý danh mục phòng ban | Quản trị viên | UC02 |
| 4 | Quản lý danh mục phân loại và niên hạn | Quản trị viên | UC03 |
| 5 | Quản lý người dùng, phân quyền và tham số CAI | Quản trị viên | UC04 |
| 6 | Đăng ký và khai báo tài sản nhàn rỗi vào kho dùng chung | Nhân viên, Thủ kho | UC05 |
| 7 | Tra cứu và tìm kiếm tài sản khả dụng trong kho dùng chung | Nhân viên | UC06 |
| 8 | Lịch sử mượn trả và danh mục tài sản đóng góp của phòng ban | Nhân viên, Thủ kho | UC07 |
| 9 | Lập phiếu yêu cầu mượn tài sản nội bộ | Nhân viên | UC08 |
| 10 | Xét duyệt yêu cầu mượn và khóa chống trùng lịch | Thủ kho | UC09 |
| 11 | Lập biên bản bàn giao thiết bị xuất kho | Thủ kho, Nhân viên | UC10 |
| 12 | Lập biên bản thu hồi, đánh giá hao mòn và chuyển bảo dưỡng | Thủ kho, Nhân viên | UC11 |
| 13 | Kiểm nhận, đánh giá và chuyển trạng thái vòng đời tài sản | Thủ kho | UC12 |
| 14 | Quản lý bảo dưỡng, hiệu chuẩn kỹ thuật và quyết toán chi phí | Thủ kho | UC13 |
| 15 | Hồ sơ đề xuất và phê duyệt thanh lý tài sản | Thủ kho, Lãnh đạo | UC14, UC17 |
| 16 | Báo cáo hiệu suất khai thác tài sản | Thủ kho, Lãnh đạo | UC15 |
| 17 | Báo cáo chỉ số tránh mua mới (CAI) | Thủ kho, Lãnh đạo | UC16 |
| 18 | Cảnh báo quá hạn mượn và chặn lập phiếu mới | Thủ kho, Hệ thống | UC17 |

---

## Chương 7: Kết Luận

### Bảng 68. Công cụ sử dụng trong quá trình phát triển

| Thành phần | Công cụ | Vai trò |
|---|---|---|
| IDE máy chủ | IntelliJ IDEA | Viết và chạy mã Spring Boot |
| IDE giao diện | Visual Studio Code | Viết mã React |
| Build | Apache Maven 3.9, npm / Node.js | Đóng gói backend và giao diện |
| CSDL | SQL Server 2022, SSMS / sqlcmd | Tạo CSDL, chạy script |
| Thiết kế | draw.io | Vẽ sơ đồ UML, ERD, kiến trúc |
| Kiểm thử API | Swagger UI, script kiểm thử đầu cuối | Kiểm tra API và quy tắc nghiệp vụ |
| Quản lý tiến độ | Microsoft Project | Lập lịch thực hiện đề tài |

### Bảng 69. Kết quả kiểm thử theo nhóm chức năng

| Mã | Use Case / Quy tắc | Nội dung kiểm thử | Kết quả mong đợi |
|---|---|---|---|
| TC01 | UC01, phân quyền | Đăng nhập 4 vai trò; gọi API khi chưa đăng nhập; dùng mã băm thay mật khẩu; Nhân viên gọi chức năng của vai trò khác | Vào đúng giao diện theo vai trò; trả 401 khi chưa đăng nhập; từ chối mã băm; trả 403 khi sai quyền |
| TC02 | UC02 | Thêm phòng ban trùng mã | Bị chặn, báo lỗi trùng mã |
| TC03 | UC03 | Thêm loại tài sản hợp lệ; trùng mã; nhóm không hợp lệ; niên hạn 0 năm | Thêm thành công và hiện trong danh mục; 3 trường hợp sai bị chặn |
| TC04 | UC04 | Cấp tài khoản; trùng tên đăng nhập; email sai; vai trò sai; khóa rồi mở khóa tài khoản | Mật khẩu lưu dạng băm SHA-256; dữ liệu sai bị chặn; khóa thì không đăng nhập được, mở khóa thì đăng nhập lại được |
| TC05 | UC04, BR-EXTRA-02 | Sửa tham số: TS02 > TS03, TS03 < TS02, TS07 = 40 | Bị chặn; TS07 = 2 được chấp nhận |
| TC06 | UC05, BR01 | Khai báo tài sản hiện trạng 40%; khai báo hợp lệ | 40% bị chặn; tài sản mới ở trạng thái Mới |
| TC07 | UC12, BR21 | Thủ kho kiểm nhận đạt; kiểm nhận hiện trạng thực tế 40%; Nhân viên kiểm nhận | Chuyển Sẵn sàng chia sẻ / Cần bảo dưỡng; Nhân viên bị 403; chỉ kiểm nhận được máy Mới |
| TC08 | UC06, BR03, BR10 | Tra cứu thiết bị khả dụng; chèn trực tiếp máy không khả dụng vào phiếu | Chỉ có máy Sẵn sàng chia sẻ, hiện trạng ≥ 50%; trigger CSDL chặn |
| TC09 | UC07 | Xem lịch sử mượn của đơn vị và lịch sử vòng đời tài sản | Đúng phiếu của đơn vị; lịch sử ghi đủ chuyển trạng thái, mới nhất trước |
| TC10 | UC08, BR02, BR05 | Lập phiếu nhiều thiết bị; mượn quá 30 ngày; mượn máy của chính đơn vị | Lập phiếu thành công; 2 trường hợp sai bị chặn |
| TC11 | UC08, BR13 | Đơn vị có phiếu quá hạn hoặc đủ 5 phiếu chưa hoàn tất lập phiếu mới | Bị chặn; thu hồi xong thì quyền mượn tự khôi phục |
| TC12 | UC09, BR04, BR17 | Duyệt hai phiếu trùng lịch cùng máy; chủ phiếu hủy phiếu Chờ duyệt | Phiếu sau bị chặn; hủy thành công |
| TC13 | UC10, BR06 | Bàn giao khi có máy lỗi, chưa đến ngày mượn, máy còn đang mượn; hủy bàn giao | Bị chặn; khi hủy, máy lỗi chuyển Cần bảo dưỡng |
| TC14 | UC11, BR08, BR09 | Thu hồi máy tốt và máy hỏng; thiếu mô tả hư hỏng; trả máy ngoài phiếu | Phân luồng đúng; bồi thường = 10% × 120 triệu = 12 triệu; trường hợp sai bị chặn |
| TC15 | UC13, BR11, BR12 | Nghiệm thu đạt nhưng 40%; kết luận Không thể sửa; nghiệm thu đạt 80% | 40% bị chặn; chuyển Đề xuất thanh lý; máy về Sẵn sàng chia sẻ |
| TC16 | UC14, BR15 | Đề xuất thanh lý thiếu căn cứ; Thủ kho ký duyệt; Lãnh đạo duyệt và bác bỏ | Bị chặn; Thủ kho bị 403; bác bỏ máy Không thể sửa thì về Cần bảo dưỡng |
| TC17 | UC15 | Báo cáo hiệu suất khai thác từng tài sản | Đúng số lượt mượn và tổng giá trị tránh mua; đủ mọi tài sản; Nhân viên bị 403 |
| TC18 | UC16, BR18, BR19 | Lượt mượn ngắn hạn (D tính CAI = 2) và dài hạn (D = 10 ngày) | V = 2 × 1,5% × 15 triệu = 450.000 đ; V = 100% nguyên giá = 15 triệu |
| TC19 | UC16, BR20 | Tính NCAV sau 1 lượt mượn dài hạn và 1 phiếu bảo dưỡng 2,8 triệu | NCAV tăng đúng 12,2 triệu; báo cáo theo kỳ cùng cách tính |
| TC20 | UC17, BR14, BR-EXTRA-01 | Quét quá hạn; phiếu Đã duyệt không nhận máy quá 3 ngày | Bật cờ quá hạn và giữ cờ sau khi hoàn tất; phiếu tự hủy |
| TC21 | BR16 | Xóa phòng ban, loại tài sản, tài sản đang có liên kết | CSDL từ chối xóa |

### Bảng 70. Bảng phân chia công việc

| STT | Hạng mục | Nội dung | Người thực hiện | Kết quả |
|---|---|---|---|---|
| 1 | Khảo sát, phân tích yêu cầu | Khảo sát hiện trạng, xác định 21 quy tắc nghiệp vụ, mô hình CAI | Trần Nguyên | Chương 1 |
| 2 | Mô hình Use Case | 17 Use Case, 6 phân hệ, đặc tả chi tiết | Trần Nguyên | Chương 2 |
| 3 | Phân tích, thiết kế UML | Sơ đồ lớp, trạng thái, hoạt động, tuần tự | Trần Nguyên | Chương 3 |
| 4 | Thiết kế dữ liệu | ERD 14 bảng, thủ tục, trigger, view | Trần Nguyên | Chương 4, script SQL |
| 5 | Thiết kế kiến trúc | Kiến trúc nhiều tầng, phân quyền | Trần Nguyên | Chương 5 |
| 6 | Xây dựng ứng dụng | Backend Spring Boot, giao diện React | Trần Nguyên | Mã nguồn quanlytaisan |
| 7 | Kiểm thử, hoàn thiện báo cáo | 103 ca kiểm thử API, chụp giao diện, báo cáo | Trần Nguyên | Chương 6, 7 |

---

## TÀI LIỆU THAM KHẢO
