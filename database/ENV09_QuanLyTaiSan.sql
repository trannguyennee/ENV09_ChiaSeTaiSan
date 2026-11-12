

USE master;
GO

SET ANSI_NULLS ON;
GO
SET QUOTED_IDENTIFIER ON;
GO

IF EXISTS (SELECT name FROM sys.databases WHERE name = N'ENV09_QuanLyTaiSan')
BEGIN
    ALTER DATABASE ENV09_QuanLyTaiSan SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE ENV09_QuanLyTaiSan;
END
GO

CREATE DATABASE ENV09_QuanLyTaiSan;
GO

USE ENV09_QuanLyTaiSan;
GO

SET ANSI_NULLS ON;
GO
SET QUOTED_IDENTIFIER ON;
GO


-- PHẦN 1: TẠO 14 BẢNG CƠ SỞ DỮ LIỆU (KHỚP ĐẶC TẢ ERD HÌNH 36 & CLASS DIAGRAM HÌNH 9)


-- 1. BẢNG PHÒNG BAN (Mục 4.2.1 Word / ERD Hình 36)
CREATE TABLE PhongBan (
    MaPB VARCHAR(20) NOT NULL,
    TenPB NVARCHAR(100) NOT NULL,
    DiaDiem NVARCHAR(150) NULL,
    SoDienThoai VARCHAR(20) NULL,
    TruongDonVi NVARCHAR(100) NULL,
    CONSTRAINT PK_PhongBan PRIMARY KEY (MaPB),
    CONSTRAINT UQ_PhongBan_TenPB UNIQUE (TenPB)
);
GO

-- 2. BẢNG NGƯỜI DÙNG / TÀI KHOẢN (Mục 4.2.2 Word / ERD Hình 36)
CREATE TABLE NguoiDung (
    MaND VARCHAR(20) NOT NULL,
    MaPB VARCHAR(20) NOT NULL,
    TenDangNhap VARCHAR(50) NOT NULL,
    MatKhau VARCHAR(255) NOT NULL,     -- Chuỗi băm SHA-256 (64 hex ký tự thường)
    HoTen NVARCHAR(120) NOT NULL,
    Email VARCHAR(100) NULL,
    VaiTro NVARCHAR(30) NOT NULL,      -- 'NhanVien', 'ThuKho', 'QuanTri', 'LanhDao'
    TrangThaiTK NVARCHAR(30) NOT NULL DEFAULT N'HoatDong', -- 'HoatDong', 'Khoa'
    MaXacNhanReset VARCHAR(20) NULL,
    HanReset DATETIME NULL,
    CONSTRAINT PK_NguoiDung PRIMARY KEY (MaND),
    CONSTRAINT UQ_NguoiDung_TenDangNhap UNIQUE (TenDangNhap),
    CONSTRAINT FK_NguoiDung_PhongBan FOREIGN KEY (MaPB) REFERENCES PhongBan(MaPB),
    CONSTRAINT CK_NguoiDung_VaiTro CHECK (VaiTro IN (N'NhanVien', N'ThuKho', N'QuanTri', N'LanhDao')),
    CONSTRAINT CK_NguoiDung_TrangThaiTK CHECK (TrangThaiTK IN (N'HoatDong', N'Khoa'))
);
GO

-- Tạo Filtered Unique Index cho Email: Cho phép nhiều dòng NULL nhưng nếu có Email thì phải duy nhất
CREATE UNIQUE NONCLUSTERED INDEX UQ_NguoiDung_Email 
ON NguoiDung(Email) 
WHERE Email IS NOT NULL;
GO

-- 3. BẢNG LOẠI TÀI SẢN (Mục 4.2.3 Word / ERD Hình 36)
CREATE TABLE LoaiTaiSan (
    MaLoaiTS VARCHAR(20) NOT NULL,
    TenLoaiTS NVARCHAR(100) NOT NULL,
    NhomTaiSan NVARCHAR(30) NOT NULL,  -- 'DoDac', 'CNTT', 'ThietBiChung'
    NienHanNam INT NOT NULL CHECK (NienHanNam > 0),
    CONSTRAINT PK_LoaiTaiSan PRIMARY KEY (MaLoaiTS),
    CONSTRAINT CK_LoaiTaiSan_Nhom CHECK (NhomTaiSan IN (N'DoDac', N'CNTT', N'ThietBiChung'))
);
GO

-- 4. BẢNG TÀI SẢN (Mục 4.2.4 Word / ERD Hình 36 - Single Table Inheritance)
CREATE TABLE TaiSan (
    MaTS VARCHAR(20) NOT NULL,
    MaLoaiTS VARCHAR(20) NOT NULL,
    MaPBSoHuu VARCHAR(20) NOT NULL,
    TenTS NVARCHAR(150) NOT NULL,
    SoSeri VARCHAR(50) NOT NULL,
    NguyenGia DECIMAL(18, 2) NOT NULL CHECK (NguyenGia > 0),
    NamMua INT NOT NULL CHECK (NamMua >= 1990 AND NamMua <= YEAR(GETDATE())),
    HienTrang INT NOT NULL CHECK (HienTrang >= 0 AND HienTrang <= 100),
    TrangThai NVARCHAR(30) NOT NULL DEFAULT N'Moi',
    ViTriLuuTru NVARCHAR(150) NULL,
    HinhAnh VARCHAR(255) NULL,
    MoTa NVARCHAR(500) NULL,
    -- 6 Cột đặc thù kế thừa từ 3 lớp con theo Sơ đồ Lớp (Hình 9) & ERD (Hình 36)
    DoChinhXac NVARCHAR(50) NULL,      -- ThietBiDoDac: Sai số / độ chính xác
    ChuKyKiemDinh INT NULL,            -- ThietBiDoDac: Chu kỳ kiểm định (tháng)
    CauHinhCPU NVARCHAR(100) NULL,     -- ThietBiCNTT: Thông số CPU
    DungLuongRAM NVARCHAR(50) NULL,    -- ThietBiCNTT: Dung lượng RAM
    CongSuat NVARCHAR(50) NULL,        -- ThietBiChung: Công suất tiêu thụ
    PhuKienDiKem NVARCHAR(255) NULL,   -- ThietBiChung: Phụ kiện kèm theo
    CONSTRAINT PK_TaiSan PRIMARY KEY (MaTS),
    CONSTRAINT UQ_TaiSan_SoSeri UNIQUE (SoSeri),
    CONSTRAINT FK_TaiSan_LoaiTaiSan FOREIGN KEY (MaLoaiTS) REFERENCES LoaiTaiSan(MaLoaiTS),
    CONSTRAINT FK_TaiSan_PhongBan FOREIGN KEY (MaPBSoHuu) REFERENCES PhongBan(MaPB),
    CONSTRAINT CK_TaiSan_TrangThai CHECK (TrangThai IN (
        N'Moi', N'SanSangChiaSe', N'DangMuon', N'CanBaoDuong', N'DangBaoDuong', N'DeXuatThanhLy', N'DaThanhLy'
    ))
);
GO

-- 5. BẢNG PHIẾU MƯỢN (Mục 4.2.5 Word / ERD Hình 36: 6 trạng thái Hình 11, LyDoTuChoi, LyDoHuy)
CREATE TABLE PhieuMuon (
    MaPM VARCHAR(20) NOT NULL,
    MaNguoiMuon VARCHAR(20) NOT NULL,
    MaPBMuon VARCHAR(20) NOT NULL,
    MaNguoiDuyet VARCHAR(20) NULL,
    NgayLap DATETIME NOT NULL DEFAULT GETDATE(),
    NgayMuon DATE NOT NULL,
    NgayHenTra DATE NOT NULL,
    MucDichSuDung NVARCHAR(255) NOT NULL,
    TrangThai NVARCHAR(20) NOT NULL DEFAULT N'ChoDuyet',
    CoQuaHan BIT NOT NULL DEFAULT 0,    -- Cờ quá hạn thực tế (BR14)
    NgayDuyet DATETIME NULL,
    LyDoTuChoi NVARCHAR(255) NULL,
    LyDoHuy NVARCHAR(255) NULL,
    CONSTRAINT PK_PhieuMuon PRIMARY KEY (MaPM),
    CONSTRAINT FK_PhieuMuon_NguoiMuon FOREIGN KEY (MaNguoiMuon) REFERENCES NguoiDung(MaND),
    CONSTRAINT FK_PhieuMuon_PhongBan FOREIGN KEY (MaPBMuon) REFERENCES PhongBan(MaPB),
    CONSTRAINT FK_PhieuMuon_NguoiDuyet FOREIGN KEY (MaNguoiDuyet) REFERENCES NguoiDung(MaND),
    CONSTRAINT CK_PhieuMuon_ThoiHan CHECK (NgayHenTra >= NgayMuon AND DATEDIFF(DAY, NgayMuon, NgayHenTra) + 1 <= 30),
    CONSTRAINT CK_PhieuMuon_TrangThai CHECK (TrangThai IN (
        N'ChoDuyet', N'DaDuyet', N'DangThucHien', N'HoanTat', N'TuChoi', N'DaHuy'
    ))
);
GO

-- 6. BẢNG CHI TIẾT PHIẾU MƯỢN (Mục 4.2.7 Word / ERD Hình 36: TinhTrangSau Tot/CanBaoTri/HuHong)
CREATE TABLE ChiTietPhieuMuon (
    MaPM VARCHAR(20) NOT NULL,
    MaTS VARCHAR(20) NOT NULL,
    GhiChuMucDich NVARCHAR(255) NULL,
    TinhTrangTruoc NVARCHAR(255) NULL, -- Mô tả hiện trạng máy lúc giao nhận kho
    TinhTrangSau NVARCHAR(20) NULL,    -- 'Tot', 'CanBaoTri', 'HuHong'
    TyLeHaoMon INT NULL CHECK (TyLeHaoMon IS NULL OR (TyLeHaoMon >= 0 AND TyLeHaoMon <= 100)),
    GhiChuSau NVARCHAR(255) NULL,
    CONSTRAINT PK_ChiTietPhieuMuon PRIMARY KEY (MaPM, MaTS),
    CONSTRAINT FK_CTPM_PhieuMuon FOREIGN KEY (MaPM) REFERENCES PhieuMuon(MaPM),
    CONSTRAINT FK_CTPM_TaiSan FOREIGN KEY (MaTS) REFERENCES TaiSan(MaTS),
    CONSTRAINT CK_CTPM_TinhTrangSau CHECK (TinhTrangSau IS NULL OR TinhTrangSau IN (N'Tot', N'CanBaoTri', N'HuHong'))
);
GO

-- 7. BẢNG BIÊN BẢN BÀN GIAO (Mục 4.2.8 Word / ERD Hình 36)
CREATE TABLE BienBanBanGiao (
    MaBBBG VARCHAR(20) NOT NULL,
    MaPM VARCHAR(20) NOT NULL,
    MaNguoiGiao VARCHAR(20) NOT NULL,
    MaNguoiNhan VARCHAR(20) NOT NULL,
    NgayGiao DATETIME NOT NULL DEFAULT GETDATE(),
    PhuKienKemTheo NVARCHAR(255) NULL,
    TrangThaiGiao NVARCHAR(50) NOT NULL DEFAULT N'DaGiao',
    CONSTRAINT PK_BienBanBanGiao PRIMARY KEY (MaBBBG),
    CONSTRAINT UQ_BBBG_MaPM UNIQUE (MaPM),
    CONSTRAINT FK_BBBG_PhieuMuon FOREIGN KEY (MaPM) REFERENCES PhieuMuon(MaPM),
    CONSTRAINT FK_BBBG_NguoiGiao FOREIGN KEY (MaNguoiGiao) REFERENCES NguoiDung(MaND),
    CONSTRAINT FK_BBBG_NguoiNhan FOREIGN KEY (MaNguoiNhan) REFERENCES NguoiDung(MaND),
    CONSTRAINT CK_BBBG_TrangThaiGiao CHECK (TrangThaiGiao IN (N'DaGiao', N'Huy'))
);
GO

-- 8. BẢNG BIÊN BẢN THU HỒI (Mục 4.2.9 Word / ERD Hình 36: GhiChu, SoNgayMuonThucTe)
CREATE TABLE BienBanThuHoi (
    MaBBTH VARCHAR(20) NOT NULL,
    MaPM VARCHAR(20) NOT NULL,
    MaNguoiThuHoi VARCHAR(20) NOT NULL,
    MaNguoiTra VARCHAR(20) NOT NULL,
    NgayThuHoi DATETIME NOT NULL DEFAULT GETDATE(),
    SoNgayMuonThucTe INT NOT NULL CHECK (SoNgayMuonThucTe >= 1),
    GhiChu NVARCHAR(255) NULL,
    CONSTRAINT PK_BienBanThuHoi PRIMARY KEY (MaBBTH),
    CONSTRAINT UQ_BBTH_MaPM UNIQUE (MaPM),
    CONSTRAINT FK_BBTH_PhieuMuon FOREIGN KEY (MaPM) REFERENCES PhieuMuon(MaPM),
    CONSTRAINT FK_BBTH_NguoiThuHoi FOREIGN KEY (MaNguoiThuHoi) REFERENCES NguoiDung(MaND),
    CONSTRAINT FK_BBTH_NguoiTra FOREIGN KEY (MaNguoiTra) REFERENCES NguoiDung(MaND)
);
GO

-- 9. BẢNG LỊCH SỬ SỰ CỐ (Mục 4.2.10 Word / ERD Hình 36: MucDoThietHai %, ChiPhiBoiThuong)
CREATE TABLE LichSuSuCo (
    MaSuCo VARCHAR(20) NOT NULL,
    MaTS VARCHAR(20) NOT NULL,
    MaBBBG VARCHAR(20) NULL,
    MaBBTH VARCHAR(20) NULL,
    MaPBChiuTrachNhiem VARCHAR(20) NULL,
    NgayPhatSinh DATETIME NOT NULL DEFAULT GETDATE(),
    MoTaHuHong NVARCHAR(255) NOT NULL,
    MucDoThietHai INT NOT NULL DEFAULT 0 CHECK (MucDoThietHai >= 0 AND MucDoThietHai <= 100),
    ChiPhiBoiThuong DECIMAL(18, 2) NOT NULL DEFAULT 0 CHECK (ChiPhiBoiThuong >= 0),
    CONSTRAINT PK_LichSuSuCo PRIMARY KEY (MaSuCo),
    CONSTRAINT FK_LSSC_TaiSan FOREIGN KEY (MaTS) REFERENCES TaiSan(MaTS),
    CONSTRAINT FK_LSSC_BBBG FOREIGN KEY (MaBBBG) REFERENCES BienBanBanGiao(MaBBBG),
    CONSTRAINT FK_LSSC_BBTH FOREIGN KEY (MaBBTH) REFERENCES BienBanThuHoi(MaBBTH),
    CONSTRAINT FK_LSSC_PhongBan FOREIGN KEY (MaPBChiuTrachNhiem) REFERENCES PhongBan(MaPB),
    CONSTRAINT CK_LSSC_BienBan CHECK (NOT (MaBBBG IS NOT NULL AND MaBBTH IS NOT NULL))
);
GO

-- 10. BẢNG PHIẾU BẢO DƯỠNG (Mục 4.2.11 Word / ERD Hình 36: TrangThaiBaoDuong, HienTrangSauSuaChua)
CREATE TABLE PhieuBaoDuong (
    MaPBD VARCHAR(20) NOT NULL,
    MaTS VARCHAR(20) NOT NULL,
    MaNguoiLap VARCHAR(20) NOT NULL,
    NgayLapPhieu DATETIME NOT NULL DEFAULT GETDATE(),
    DonViSuaChua NVARCHAR(150) NULL,
    NoiDungSuaChua NVARCHAR(255) NULL,
    TrangThaiBaoDuong NVARCHAR(20) NOT NULL DEFAULT N'DangBaoDuong',
    NgayKetThuc DATETIME NULL,
    HienTrangSauSuaChua INT NULL CHECK (HienTrangSauSuaChua IS NULL OR (HienTrangSauSuaChua >= 0 AND HienTrangSauSuaChua <= 100)),
    CONSTRAINT PK_PhieuBaoDuong PRIMARY KEY (MaPBD),
    CONSTRAINT FK_PBD_TaiSan FOREIGN KEY (MaTS) REFERENCES TaiSan(MaTS),
    CONSTRAINT FK_PBD_NguoiLap FOREIGN KEY (MaNguoiLap) REFERENCES NguoiDung(MaND),
    CONSTRAINT CK_PBD_TrangThai CHECK (TrangThaiBaoDuong IN (N'DangBaoDuong', N'DaNghiemThu', N'KhongTheSua'))
);
GO

-- 11. BẢNG CHI TIẾT BẢO DƯỠNG (Mục 4.2.12 Word / ERD Hình 36: MaChiTietBD INT IDENTITY, HangMucSuaChua)
CREATE TABLE ChiTietBaoDuong (
    MaChiTietBD INT IDENTITY(1,1) NOT NULL,
    MaPBD VARCHAR(20) NOT NULL,
    HangMucSuaChua NVARCHAR(150) NOT NULL,
    LinhKienThayThe NVARCHAR(150) NULL,
    DonGia DECIMAL(18, 2) NOT NULL CHECK (DonGia >= 0),
    SoLuong INT NOT NULL DEFAULT 1 CHECK (SoLuong > 0),
    ThanhTien AS (DonGia * SoLuong) PERSISTED,
    CONSTRAINT PK_ChiTietBaoDuong PRIMARY KEY (MaChiTietBD),
    CONSTRAINT FK_CTBD_PhieuBaoDuong FOREIGN KEY (MaPBD) REFERENCES PhieuBaoDuong(MaPBD)
);
GO

-- 12. BẢNG HỒ SƠ THANH LÝ (Mục 4.2.13 Word / ERD Hình 36: LyDoDeXuat, TrangThai, SoQuyetDinh)
CREATE TABLE HoSoThanhLy (
    MaHSTL VARCHAR(20) NOT NULL,
    MaTS VARCHAR(20) NOT NULL,
    MaNguoiDeXuat VARCHAR(20) NOT NULL,
    NgayDeXuat DATETIME NOT NULL DEFAULT GETDATE(),
    LyDoDeXuat NVARCHAR(255) NOT NULL,
    TrangThai NVARCHAR(20) NOT NULL DEFAULT N'ChoDuyet',
    MaNguoiDuyet VARCHAR(20) NULL,
    NgayDuyet DATETIME NULL,
    SoQuyetDinh NVARCHAR(50) NULL,
    GhiChuDuyet NVARCHAR(255) NULL,
    CONSTRAINT PK_HoSoThanhLy PRIMARY KEY (MaHSTL),
    CONSTRAINT FK_HSTL_TaiSan FOREIGN KEY (MaTS) REFERENCES TaiSan(MaTS),
    CONSTRAINT FK_HSTL_NguoiDeXuat FOREIGN KEY (MaNguoiDeXuat) REFERENCES NguoiDung(MaND),
    CONSTRAINT FK_HSTL_NguoiDuyet FOREIGN KEY (MaNguoiDuyet) REFERENCES NguoiDung(MaND),
    CONSTRAINT CK_HSTL_TrangThai CHECK (TrangThai IN (N'ChoDuyet', N'DaDuyet', N'BacBo'))
);
GO

-- 13. BẢNG LỊCH SỬ TRẠNG THÁI TÀI SẢN (Mục 4.2.6 Word / ERD Hình 36: MaLichSu INT IDENTITY)
CREATE TABLE LichSuTrangThaiTaiSan (
    MaLichSu INT IDENTITY(1,1) NOT NULL,
    MaTS VARCHAR(20) NOT NULL,
    TrangThaiCu NVARCHAR(30) NULL,
    TrangThaiMoi NVARCHAR(30) NOT NULL,
    NgayThayDoi DATETIME NOT NULL DEFAULT GETDATE(),
    MaNguoiThucHien VARCHAR(20) NULL,
    MaPM VARCHAR(20) NULL,
    LyDo NVARCHAR(255) NULL,
    CONSTRAINT PK_LichSuTrangThaiTaiSan PRIMARY KEY (MaLichSu),
    CONSTRAINT FK_LSTTS_TaiSan FOREIGN KEY (MaTS) REFERENCES TaiSan(MaTS),
    CONSTRAINT FK_LSTTS_NguoiDung FOREIGN KEY (MaNguoiThucHien) REFERENCES NguoiDung(MaND),
    CONSTRAINT FK_LSTTS_PhieuMuon FOREIGN KEY (MaPM) REFERENCES PhieuMuon(MaPM)
);
GO

-- 14. BẢNG THAM SỐ CAI (Mục 4.2.14 Word / ERD Hình 36: 7 tham số chuẩn TS01 - TS07)
CREATE TABLE ThamSoCAI (
    MaThamSo VARCHAR(20) NOT NULL,
    TenThamSo NVARCHAR(100) NOT NULL,
    GiaTri DECIMAL(18, 4) NOT NULL,
    DonViTinh NVARCHAR(30) NOT NULL,
    NgayCapNhat DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT PK_ThamSoCAI PRIMARY KEY (MaThamSo)
);
GO

-- ==========================================================================================
-- PHẦN 2: TẠO 7 SEQUENCES TỰ ĐỘNG SINH KHÓA CHÍNH (TIẾP NỐI AN TOÀN)
-- ==========================================================================================

-- Seq_TaiSan bắt đầu từ 7 để chừa TS-0001 đến TS-0006 cho dữ liệu mẫu ban đầu
CREATE SEQUENCE Seq_TaiSan START WITH 7 INCREMENT BY 1;
GO

CREATE SEQUENCE Seq_PhieuMuon START WITH 1 INCREMENT BY 1;
GO

CREATE SEQUENCE Seq_BBBG START WITH 1 INCREMENT BY 1;
GO

CREATE SEQUENCE Seq_BBTH START WITH 1 INCREMENT BY 1;
GO

CREATE SEQUENCE Seq_SuCo START WITH 1 INCREMENT BY 1;
GO

CREATE SEQUENCE Seq_PBD START WITH 1 INCREMENT BY 1;
GO

CREATE SEQUENCE Seq_HSTL START WITH 1 INCREMENT BY 1;
GO

-- ==========================================================================================
-- PHẦN 2B: HÀM ĐỌC THAM SỐ MỀM TỪ BẢNG ThamSoCAI (BR-EXTRA-02)
-- Mọi view/procedure đọc ngưỡng qua hàm này thay vì ghi cứng hằng số
-- ==========================================================================================
CREATE OR ALTER FUNCTION dbo.fn_ThamSo (@MaThamSo VARCHAR(20), @MacDinh DECIMAL(18, 4))
RETURNS DECIMAL(18, 4)
AS
BEGIN
    DECLARE @GiaTri DECIMAL(18, 4);
    SELECT @GiaTri = GiaTri FROM dbo.ThamSoCAI WHERE MaThamSo = @MaThamSo;
    RETURN ISNULL(@GiaTri, @MacDinh);
END;
GO

-- ==========================================================================================
-- PHẦN 3: TẠO 3 TRIGGERS BẢO TOÀN VÒNG ĐỜI & GHI LỊCH SỬ DUY NHẤT (SESSION_CONTEXT)
-- ==========================================================================================

-- TRIGGER 1: KIỂM SOÁT MA TRẬN CHUYỂN TRẠNG THÁI VÒNG ĐỜI TÀI SẢN (HÌNH 10) & GHI LỊCH SỬ TỰ ĐỘNG
CREATE OR ALTER TRIGGER trg_Validate_ChuyenTrangThaiTaiSan
ON TaiSan
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF UPDATE(TrangThai)
    BEGIN
        -- 1. Kiểm tra ma trận chuyển trạng thái hợp lệ theo đúng Hình 10 State Machine Diagram
        IF EXISTS (
            SELECT 1 
            FROM inserted i
            INNER JOIN deleted d ON i.MaTS = d.MaTS
            WHERE i.TrangThai <> d.TrangThai
              AND NOT (
                  -- Moi -> SanSangChiaSe (kiểm nhận đạt), CanBaoDuong (kiểm nhận hiện trạng dưới ngưỡng)
                  (d.TrangThai = N'Moi' AND i.TrangThai IN (N'SanSangChiaSe', N'CanBaoDuong'))
                  -- SanSangChiaSe -> DangMuon, CanBaoDuong, DeXuatThanhLy
                  OR (d.TrangThai = N'SanSangChiaSe' AND i.TrangThai IN (N'DangMuon', N'CanBaoDuong', N'DeXuatThanhLy'))
                  -- DangMuon -> SanSangChiaSe (trả máy tốt), CanBaoDuong (trả máy hỏng/xuống cấp)
                  OR (d.TrangThai = N'DangMuon' AND i.TrangThai IN (N'SanSangChiaSe', N'CanBaoDuong'))
                  -- CanBaoDuong -> DangBaoDuong, DeXuatThanhLy (Tuyệt đối KHÔNG sang SanSangChiaSe trực tiếp)
                  OR (d.TrangThai = N'CanBaoDuong' AND i.TrangThai IN (N'DangBaoDuong', N'DeXuatThanhLy'))
                  -- DangBaoDuong -> SanSangChiaSe (nghiệm thu đạt), DeXuatThanhLy (nghiệm thu không đạt)
                  OR (d.TrangThai = N'DangBaoDuong' AND i.TrangThai IN (N'SanSangChiaSe', N'DeXuatThanhLy'))
                  -- DeXuatThanhLy -> DaThanhLy (duyệt), CanBaoDuong (bác bỏ & < 50%), SanSangChiaSe (bác bỏ & >= 50%)
                  OR (d.TrangThai = N'DeXuatThanhLy' AND i.TrangThai IN (N'DaThanhLy', N'CanBaoDuong', N'SanSangChiaSe'))
                  -- DaThanhLy: Trạng thái kết thúc - KHÔNG ĐƯỢC CHUYỂN ĐI BẤT KỲ ĐÂU
              )
        )
        BEGIN
            DECLARE @OldState NVARCHAR(30), @NewState NVARCHAR(30), @ErrTS VARCHAR(20);
            SELECT TOP 1 @OldState = d.TrangThai, @NewState = i.TrangThai, @ErrTS = i.MaTS
            FROM inserted i INNER JOIN deleted d ON i.MaTS = d.MaTS
            WHERE i.TrangThai <> d.TrangThai;

            DECLARE @Msg NVARCHAR(500) = N'Lỗi vi phạm vòng đời tài sản (Hình 10): Không cho phép chuyển trạng thái tài sản [' + @ErrTS + N'] từ [' + @OldState + N'] sang [' + @NewState + N'].';
            THROW 50030, @Msg, 1;
        END

        -- 2. Đọc ngữ cảnh thực hiện từ SESSION_CONTEXT (được thiết lập trước trong Stored Procedure)
        DECLARE @CtxMaND VARCHAR(20) = CAST(SESSION_CONTEXT(N'MaND') AS VARCHAR(20));
        DECLARE @CtxMaPM VARCHAR(20) = CAST(SESSION_CONTEXT(N'MaPM') AS VARCHAR(20));
        DECLARE @CtxLyDo NVARCHAR(255) = CAST(SESSION_CONTEXT(N'LyDo') AS NVARCHAR(255));

        IF @CtxLyDo IS NULL
            SET @CtxLyDo = N'Cập nhật trạng thái vòng đời tài sản (Hình 10)';

        -- 3. Ghi vết lịch sử DUY NHẤT 1 DÒNG cho mỗi lần đổi trạng thái (chống ghi trùng lặp)
        INSERT INTO LichSuTrangThaiTaiSan (
            MaTS, 
            TrangThaiCu, 
            TrangThaiMoi, 
            NgayThayDoi, 
            MaNguoiThucHien,
            MaPM,
            LyDo
        )
        SELECT 
            i.MaTS,
            d.TrangThai AS TrangThaiCu,
            i.TrangThai AS TrangThaiMoi,
            GETDATE(),
            @CtxMaND,
            @CtxMaPM,
            @CtxLyDo
        FROM inserted i
        INNER JOIN deleted d ON i.MaTS = d.MaTS
        WHERE i.TrangThai <> d.TrangThai;
    END
END;
GO

-- TRIGGER 2: RÀNG BUỘC TOÀN VẸN DỮ LIỆU - CHẶN XÓA TÀI SẢN ĐÃ CÓ PHÁT SINH GIAO DỊCH (BR16)
CREATE OR ALTER TRIGGER trg_TaiSan_PreventDelete
ON TaiSan
INSTEAD OF DELETE
AS
BEGIN
    SET NOCOUNT ON;
    IF EXISTS (
        SELECT 1 FROM deleted d
        WHERE EXISTS (SELECT 1 FROM ChiTietPhieuMuon ct WHERE ct.MaTS = d.MaTS)
           OR EXISTS (SELECT 1 FROM PhieuBaoDuong bd WHERE bd.MaTS = d.MaTS)
           OR EXISTS (SELECT 1 FROM LichSuSuCo sc WHERE sc.MaTS = d.MaTS)
    )
    BEGIN
        THROW 50031, N'Vi phạm BR16: Không thể xóa tài sản đã có phát sinh giao dịch mượn trả, bảo dưỡng hoặc sự cố. Vui lòng sử dụng quy trình đề xuất thanh lý.', 1;
        RETURN;
    END

    DELETE FROM TaiSan WHERE MaTS IN (SELECT MaTS FROM deleted);
END;
GO

-- TRIGGER 3: BR10 - CHẶN ĐƯA THIẾT BỊ KHÔNG KHẢ DỤNG VÀO CHI TIẾT PHIẾU MƯỢN Ở TẦNG CSDL
CREATE OR ALTER TRIGGER trg_CTPM_ChanTaiSanKhongKhaDung_BR10
ON ChiTietPhieuMuon
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;
    IF EXISTS (
        SELECT 1 FROM inserted i
        INNER JOIN TaiSan ts ON ts.MaTS = i.MaTS
        WHERE ts.TrangThai IN (N'Moi', N'CanBaoDuong', N'DangBaoDuong', N'DeXuatThanhLy', N'DaThanhLy')
    )
    BEGIN
        THROW 50056, N'Vi phạm BR10: Thiết bị chưa kiểm nhận, đang cần bảo dưỡng, đang bảo dưỡng, đề xuất thanh lý hoặc đã thanh lý không được đưa vào phiếu mượn.', 1;
    END
END;
GO

-- ==========================================================================================
-- PHẦN 4: TẠO 5 VIEWS TỔNG HỢP VÀ TÍNH TOÁN CHỈ SỐ CAI / NCAV (BR18, BR19, BR20)
-- ==========================================================================================

-- VIEW 1: DANH SÁCH TÀI SẢN SẴN SÀNG CHIA SẺ KÈM THÔNG TIN PHÂN LOẠI & ĐƠN VỊ (BR03, BR10)
CREATE OR ALTER VIEW v_DanhSachTaiSan_SanSangChiaSe
AS
SELECT 
    ts.MaTS,
    ts.TenTS,
    ts.SoSeri,
    lts.MaLoaiTS,
    lts.TenLoaiTS,
    lts.NhomTaiSan,
    pb.MaPB AS MaPBSoHuu,
    pb.TenPB AS TenPBSoHuu,
    ts.NamMua,
    ts.NguyenGia,
    ts.HienTrang,
    ts.TrangThai,
    ts.ViTriLuuTru,
    ts.HinhAnh,
    ts.MoTa,
    ts.DoChinhXac,
    ts.ChuKyKiemDinh,
    ts.CauHinhCPU,
    ts.DungLuongRAM,
    ts.CongSuat,
    ts.PhuKienDiKem
FROM TaiSan ts
INNER JOIN LoaiTaiSan lts ON ts.MaLoaiTS = lts.MaLoaiTS
INNER JOIN PhongBan pb ON ts.MaPBSoHuu = pb.MaPB
WHERE ts.TrangThai = N'SanSangChiaSe' AND ts.HienTrang >= dbo.fn_ThamSo('TS04', 50);
GO

-- VIEW 2: TỔNG HỢP CHI PHÍ BẢO DƯỠNG THEO TỪNG TÀI SẢN (BR11, BR12, BR15)
-- Tính cả phiếu DaNghiemThu và KhongTheSua vì đều là chi phí bảo dưỡng phát sinh thực tế
CREATE OR ALTER VIEW v_TongHopChiPhiBaoDuong
AS
SELECT 
    ts.MaTS,
    ts.TenTS,
    ts.NguyenGia,
    COUNT(DISTINCT pbd.MaPBD) AS SoLanBaoDuong,
    ISNULL(SUM(ctbd.ThanhTien), 0) AS TongChiPhiBaoDuongLuyKe,
    CASE 
        WHEN ts.NguyenGia > 0 THEN ROUND((ISNULL(SUM(ctbd.ThanhTien), 0) / ts.NguyenGia) * 100, 2)
        ELSE 0 
    END AS TyLeChiPhiTrenNguyenGia_PhanTram
FROM TaiSan ts
LEFT JOIN PhieuBaoDuong pbd ON ts.MaTS = pbd.MaTS AND pbd.TrangThaiBaoDuong IN (N'DaNghiemThu', N'KhongTheSua')
LEFT JOIN ChiTietBaoDuong ctbd ON pbd.MaPBD = ctbd.MaPBD
GROUP BY ts.MaTS, ts.TenTS, ts.NguyenGia;
GO

-- VIEW 3: TÍNH TOÁN GIÁ TRỊ TRÁNH MUA VÀ CAI THEO TỪNG LƯỢT MƯỢN (BR18, BR19)
-- Mượn ngắn hạn (D <= TS02 ngày, mặc định 7): V = D * TS01 (mặc định 0.015) * NguyenGia (BR18 - Giả định A3)
-- Mượn trung/dài hạn (D > TS02): V = 100% * NguyenGia (BR19 - Giả định A4). Tham số đọc từ ThamSoCAI (BR-EXTRA-02)
CREATE OR ALTER VIEW v_ChiSoCAI_ChiTietTungLuotMuon
AS
SELECT
    pm.MaPM,
    ct.MaTS,
    ts.TenTS,
    lts.TenLoaiTS,
    pb_sh.TenPB AS DonViSoHuu,
    pb_m.TenPB AS DonViMuon,
    bbg.NgayGiao,
    bbth.NgayThuHoi,
    bbth.SoNgayMuonThucTe AS D,          -- Số ngày khai thác thực tế (thống kê hiệu suất)
    dc.D_TinhCAI,                        -- Số ngày dùng để tính CAI (không vượt số ngày đăng ký)
    ts.NguyenGia,
    -- Phân loại mượn ngắn hạn / dài hạn theo BR18, BR19
    CASE
        WHEN dc.D_TinhCAI <= p.NguongNgayNganHan THEN N'NganHan'
        ELSE N'DaiHan'
    END AS LoaiThoiHanMuon,
    -- Giá trị tránh mua mới theo lượt
    CAST(ROUND(
        CASE
            WHEN dc.D_TinhCAI <= p.NguongNgayNganHan THEN dc.D_TinhCAI * ts.NguyenGia * p.TyLeThueNgay
            ELSE ts.NguyenGia
        END, 2) AS DECIMAL(18,2)) AS GiaTriTranhMuaMoi,
    -- CAI theo lượt = Giá trị tránh mua mới / Nguyên giá
    CASE
        WHEN ts.NguyenGia > 0 THEN
            ROUND((
                CASE
                    WHEN dc.D_TinhCAI <= p.NguongNgayNganHan THEN dc.D_TinhCAI * ts.NguyenGia * p.TyLeThueNgay
                    ELSE ts.NguyenGia
                END
            ) / ts.NguyenGia, 4)
        ELSE 0
    END AS ChiSoCAI_Luot
FROM PhieuMuon pm
INNER JOIN ChiTietPhieuMuon ct ON pm.MaPM = ct.MaPM
INNER JOIN TaiSan ts ON ct.MaTS = ts.MaTS
INNER JOIN LoaiTaiSan lts ON ts.MaLoaiTS = lts.MaLoaiTS
INNER JOIN PhongBan pb_sh ON ts.MaPBSoHuu = pb_sh.MaPB
INNER JOIN PhongBan pb_m ON pm.MaPBMuon = pb_m.MaPB
INNER JOIN BienBanBanGiao bbg ON pm.MaPM = bbg.MaPM AND bbg.TrangThaiGiao = N'DaGiao'
INNER JOIN BienBanThuHoi bbth ON pm.MaPM = bbth.MaPM
CROSS JOIN (SELECT dbo.fn_ThamSo('TS01', 0.015) AS TyLeThueNgay, dbo.fn_ThamSo('TS02', 7) AS NguongNgayNganHan) p
CROSS APPLY (
    SELECT CASE
        WHEN bbth.SoNgayMuonThucTe < DATEDIFF(DAY, pm.NgayMuon, pm.NgayHenTra) + 1 THEN bbth.SoNgayMuonThucTe
        ELSE DATEDIFF(DAY, pm.NgayMuon, pm.NgayHenTra) + 1
    END AS D_TinhCAI
) dc
WHERE pm.TrangThai = N'HoanTat';
GO

-- VIEW 4: TỔNG HỢP HIỆU QUẢ KHAI THÁC CAI THEO TỪNG THIẾT BỊ (BR18, BR19)
CREATE OR ALTER VIEW v_ChiSoCAI_HieuQuaKhaiThac
AS
SELECT 
    ts.MaTS,
    ts.TenTS,
    ts.SoSeri,
    ts.NguyenGia,
    pb.TenPB AS DonViSoHuu,
    COUNT(v.MaPM) AS TongSoLuotMuon,
    ISNULL(SUM(v.D), 0) AS TongSoNgayMuonLuyKe,
    ISNULL(SUM(v.GiaTriTranhMuaMoi), 0) AS TongGiaTriTranhMuaMoi,
    CASE 
        WHEN ts.NguyenGia > 0 THEN ROUND((ISNULL(SUM(v.GiaTriTranhMuaMoi), 0) / ts.NguyenGia), 4)
        ELSE 0 
    END AS ChiSoCAI_LuyKe,
    ISNULL(cp.TongChiPhiBaoDuongLuyKe, 0) AS TongChiPhiBaoDuong,
    (ISNULL(SUM(v.GiaTriTranhMuaMoi), 0) - ISNULL(cp.TongChiPhiBaoDuongLuyKe, 0)) AS GiaTriTranhMuaRong_NCAV
FROM TaiSan ts
INNER JOIN PhongBan pb ON ts.MaPBSoHuu = pb.MaPB
LEFT JOIN v_ChiSoCAI_ChiTietTungLuotMuon v ON ts.MaTS = v.MaTS
LEFT JOIN v_TongHopChiPhiBaoDuong cp ON ts.MaTS = cp.MaTS
GROUP BY ts.MaTS, ts.TenTS, ts.SoSeri, ts.NguyenGia, pb.TenPB, cp.TongChiPhiBaoDuongLuyKe;
GO

-- VIEW 5: BÁO CÁO TỔNG HỢP KPI TOÀN TRƯỜNG & NCAV (BR20 - CÔNG THỨC TOÁN HỌC TRANG 73 WORD)
CREATE OR ALTER VIEW v_TongHopKPI_CAI_NCAV
AS
SELECT 
    COUNT(DISTINCT ts.MaTS) AS TongSoTaiSan,
    ISNULL(SUM(ts.NguyenGia), 0) AS TongNguyenGiaTaiSan,
    ISNULL((SELECT SUM(GiaTriTranhMuaMoi) FROM v_ChiSoCAI_ChiTietTungLuotMuon), 0) AS TongGiaTriTranhMuaMoi,
    ISNULL((
        SELECT SUM(ctbd.ThanhTien) 
        FROM ChiTietBaoDuong ctbd 
        INNER JOIN PhieuBaoDuong pbd ON ctbd.MaPBD = pbd.MaPBD 
        WHERE pbd.TrangThaiBaoDuong IN (N'DaNghiemThu', N'KhongTheSua')
    ), 0) AS TongChiPhiBaoDuong,
    ISNULL((SELECT SUM(ChiPhiBoiThuong) FROM LichSuSuCo), 0) AS TongChiPhiBoiThuong,
    -- NCAV = TongGiaTriTranhMuaMoi - TongChiPhiBaoDuong (BR20 - Công thức chuẩn trang 73 Word)
    (
        ISNULL((SELECT SUM(GiaTriTranhMuaMoi) FROM v_ChiSoCAI_ChiTietTungLuotMuon), 0)
        - ISNULL((
            SELECT SUM(ctbd.ThanhTien) 
            FROM ChiTietBaoDuong ctbd 
            INNER JOIN PhieuBaoDuong pbd ON ctbd.MaPBD = pbd.MaPBD 
            WHERE pbd.TrangThaiBaoDuong IN (N'DaNghiemThu', N'KhongTheSua')
        ), 0)
    ) AS GiaTriTranhMuaMoiRong_NCAV,
    -- Tỷ suất hiệu quả kinh tế CAI toàn hệ thống (%) = NCAV / ChiPhiBaoDuong * 100 (NULL khi chưa có chi phí bảo dưỡng)
    CASE 
        WHEN ISNULL((
            SELECT SUM(ctbd.ThanhTien) 
            FROM ChiTietBaoDuong ctbd 
            INNER JOIN PhieuBaoDuong pbd ON ctbd.MaPBD = pbd.MaPBD 
            WHERE pbd.TrangThaiBaoDuong IN (N'DaNghiemThu', N'KhongTheSua')
        ), 0) > 0 
        THEN ROUND((
            (
                ISNULL((SELECT SUM(GiaTriTranhMuaMoi) FROM v_ChiSoCAI_ChiTietTungLuotMuon), 0)
                - ISNULL((
                    SELECT SUM(ctbd.ThanhTien) 
                    FROM ChiTietBaoDuong ctbd 
                    INNER JOIN PhieuBaoDuong pbd ON ctbd.MaPBD = pbd.MaPBD 
                    WHERE pbd.TrangThaiBaoDuong IN (N'DaNghiemThu', N'KhongTheSua')
                ), 0)
            ) 
            / (
                SELECT SUM(ctbd.ThanhTien) 
                FROM ChiTietBaoDuong ctbd 
                INNER JOIN PhieuBaoDuong pbd ON ctbd.MaPBD = pbd.MaPBD 
                WHERE pbd.TrangThaiBaoDuong IN (N'DaNghiemThu', N'KhongTheSua')
            )
        ) * 100, 2)
        ELSE NULL 
    END AS TySuatHieuQua_ROI_CAI_PhanTram
FROM TaiSan ts;
GO

-- ==========================================================================================
-- PHẦN 5: TẠO 14 STORED PROCEDURES NGHIỆP VỤ (GẮN CHẶT 21 BR VÀ AN TOÀN TRANSACTION)
-- ==========================================================================================

-- PROC 1: KHAI BÁO TÀI SẢN MỚI VÀO HỆ THỐNG (BR01)
CREATE OR ALTER PROCEDURE sp_KhaiBaoTaiSan_BR01
    @TenTS NVARCHAR(150),
    @SoSeri VARCHAR(50),
    @MaLoaiTS VARCHAR(20),
    @MaPBSoHuu VARCHAR(20),
    @NamMua INT,
    @NguyenGia DECIMAL(18, 2),
    @HienTrang INT,
    @ViTriLuuTru NVARCHAR(150) = NULL,
    @HinhAnh VARCHAR(255) = NULL,
    @MoTa NVARCHAR(500) = NULL,
    @DoChinhXac NVARCHAR(50) = NULL,
    @ChuKyKiemDinh INT = NULL,
    @CauHinhCPU NVARCHAR(100) = NULL,
    @DungLuongRAM NVARCHAR(50) = NULL,
    @CongSuat NVARCHAR(50) = NULL,
    @PhuKienDiKem NVARCHAR(255) = NULL,
    @MaNDThucHien VARCHAR(20),
    @MaTS_Output VARCHAR(20) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- 1. Đọc ngưỡng hiện trạng tối thiểu từ bảng ThamSoCAI (TS04: 50%)
        DECLARE @HienTrangToiThieu INT;
        SELECT @HienTrangToiThieu = CAST(GiaTri AS INT) FROM ThamSoCAI WHERE MaThamSo = 'TS04';
        IF @HienTrangToiThieu IS NULL SET @HienTrangToiThieu = 50;

        -- 2. Kiểm tra nghiệp vụ BR01: Hiện trạng phải đạt từ ngưỡng tối thiểu trở lên
        IF (@HienTrang < @HienTrangToiThieu)
        BEGIN
            THROW 50001, N'Vi phạm BR01: Tài sản có hiện trạng dưới ngưỡng tối thiểu (TS04, mặc định 50%) không đủ điều kiện đưa vào hệ thống chia sẻ dùng chung.', 1;
        END

        -- 3. Kiểm tra trùng số Seri
        IF EXISTS (SELECT 1 FROM TaiSan WHERE SoSeri = @SoSeri)
        BEGIN
            THROW 50002, N'Vi phạm BR01: Số Seri tài sản đã tồn tại trên hệ thống.', 1;
        END

        -- 4. Tự sinh mã tài sản tiếp nối qua Sequence
        SET @MaTS_Output = 'TS-' + RIGHT('0000' + CAST(NEXT VALUE FOR Seq_TaiSan AS VARCHAR), 4);

        -- 5. Thêm bản ghi tài sản
        INSERT INTO TaiSan (
            MaTS, MaLoaiTS, MaPBSoHuu, TenTS, SoSeri, NguyenGia, NamMua, HienTrang, 
            TrangThai, ViTriLuuTru, HinhAnh, MoTa,
            DoChinhXac, ChuKyKiemDinh, CauHinhCPU, DungLuongRAM, CongSuat, PhuKienDiKem
        )
        VALUES (
            @MaTS_Output, @MaLoaiTS, @MaPBSoHuu, @TenTS, @SoSeri, @NguyenGia, @NamMua, @HienTrang,
            N'Moi', @ViTriLuuTru, @HinhAnh, @MoTa,
            @DoChinhXac, @ChuKyKiemDinh, @CauHinhCPU, @DungLuongRAM, @CongSuat, @PhuKienDiKem
        );

        -- 6. Ghi vết lịch sử khởi tạo ban đầu (INSERT vào TaiSan không kích hoạt UPDATE trigger)
        INSERT INTO LichSuTrangThaiTaiSan (MaTS, TrangThaiCu, TrangThaiMoi, NgayThayDoi, MaNguoiThucHien, LyDo)
        VALUES (@MaTS_Output, NULL, N'Moi', GETDATE(), @MaNDThucHien, N'Khai báo tài sản mới, chờ Thủ kho kiểm nhận (BR01)');

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        EXEC sp_set_session_context 'MaND', NULL;
        EXEC sp_set_session_context 'MaPM', NULL;
        EXEC sp_set_session_context 'LyDo', NULL;
        THROW;
    END CATCH
END;
GO

-- PROC 2: LẬP YÊU CẦU MƯỢN TÀI SẢN (BR02, BR03, BR05, BR13)
CREATE OR ALTER PROCEDURE sp_LapYeuCauMuon_BR02_BR13
    @MaNDMuon VARCHAR(20),
    @NgayMuon DATE,
    @NgayHenTra DATE,
    @MucDichSuDung NVARCHAR(255),
    @DanhSachTS_JSON NVARCHAR(MAX),
    @MaPM_Output VARCHAR(20) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- 1. Lấy thông tin phòng ban của người mượn trực tiếp từ bảng NguoiDung (chống giả mạo)
        DECLARE @MaPBMuon VARCHAR(20);
        SELECT @MaPBMuon = MaPB FROM NguoiDung WHERE MaND = @MaNDMuon;
        IF (@MaPBMuon IS NULL)
        BEGIN
            THROW 50003, N'Người dùng không tồn tại hoặc chưa được gán phòng ban.', 1;
        END

        -- 2. Đọc hạn mức thời gian và số phiếu từ bảng ThamSoCAI
        DECLARE @SoNgayMax INT, @HanNgachPhieu INT;
        SELECT @SoNgayMax = CAST(GiaTri AS INT) FROM ThamSoCAI WHERE MaThamSo = 'TS03';
        IF @SoNgayMax IS NULL SET @SoNgayMax = 30;

        SELECT @HanNgachPhieu = CAST(GiaTri AS INT) FROM ThamSoCAI WHERE MaThamSo = 'TS06';
        IF @HanNgachPhieu IS NULL SET @HanNgachPhieu = 5;

        -- 3. Kiểm tra BR02: Thời hạn mượn
        DECLARE @SoNgayMuon INT = DATEDIFF(DAY, @NgayMuon, @NgayHenTra) + 1;
        IF (@SoNgayMuon < 1 OR @SoNgayMuon > @SoNgayMax)
        BEGIN
            THROW 50004, N'Vi phạm BR02: Thời gian mượn phải từ 1 đến tối đa số ngày quy định tại TS03 (mặc định 30 ngày).', 1;
        END

        IF (@NgayMuon < CAST(GETDATE() AS DATE))
        BEGIN
            THROW 50005, N'Vi phạm BR02: Ngày bắt đầu mượn không thể ở trong quá khứ.', 1;
        END

        -- 4. Parse JSON danh sách tài sản yêu cầu
        DECLARE @ListTS TABLE (MaTS VARCHAR(20), GhiChuMucDich NVARCHAR(255));
        INSERT INTO @ListTS (MaTS, GhiChuMucDich)
        SELECT MaTS, GhiChuMucDich
        FROM OPENJSON(@DanhSachTS_JSON)
        WITH (
            MaTS VARCHAR(20) '$.MaTS',
            GhiChuMucDich NVARCHAR(255) '$.GhiChuMucDich'
        );

        IF NOT EXISTS (SELECT 1 FROM @ListTS)
        BEGIN
            THROW 50006, N'Danh sách tài sản mượn không được để trống.', 1;
        END

        -- Mỗi thiết bị chỉ xuất hiện 1 lần và phải tồn tại trong hệ thống
        IF EXISTS (SELECT MaTS FROM @ListTS GROUP BY MaTS HAVING COUNT(*) > 1)
           OR EXISTS (SELECT 1 FROM @ListTS l WHERE l.MaTS IS NULL OR NOT EXISTS (SELECT 1 FROM TaiSan ts WHERE ts.MaTS = l.MaTS))
        BEGIN
            THROW 50045, N'Danh sách tài sản mượn có mã trùng lặp hoặc mã tài sản không tồn tại.', 1;
        END

        -- 5. Kiểm tra BR05: Ngăn mượn thiết bị của chính đơn vị mình sở hữu
        IF EXISTS (
            SELECT 1 
            FROM @ListTS l
            INNER JOIN TaiSan ts ON l.MaTS = ts.MaTS
            WHERE ts.MaPBSoHuu = @MaPBMuon
        )
        BEGIN
            THROW 50041, N'Vi phạm BR05: Không được mượn thiết bị thuộc quyền sở hữu của chính đơn vị bạn qua kho chia sẻ (vui lòng điều chuyển nội bộ).', 1;
        END

        -- 6. Kiểm tra BR13 điều kiện 1: Đơn vị đang có phiếu nào bị quá hạn chưa hoàn tất không
        IF EXISTS (
            SELECT 1 
            FROM PhieuMuon 
            WHERE MaPBMuon = @MaPBMuon 
              AND TrangThai = N'DangThucHien' 
              AND CoQuaHan = 1
        )
        BEGIN
            THROW 50042, N'Vi phạm BR13: Đơn vị bạn hiện có phiếu mượn đang bị quá hạn chưa hoàn tất thu hồi. Vui lòng hoàn trả thiết bị trước khi đăng ký mượn mới.', 1;
        END

        -- 7. Kiểm tra BR13 điều kiện 2: Hạn ngạch số phiếu chưa hoàn tất (ChoDuyet + DaDuyet + DangThucHien < 5)
        DECLARE @SoPhieuDangMo INT;
        SELECT @SoPhieuDangMo = COUNT(MaPM)
        FROM PhieuMuon WITH (UPDLOCK, HOLDLOCK)
        WHERE MaPBMuon = @MaPBMuon 
          AND TrangThai IN (N'ChoDuyet', N'DaDuyet', N'DangThucHien');

        IF (@SoPhieuDangMo >= @HanNgachPhieu)
        BEGIN
            DECLARE @MsgBR13 NVARCHAR(500) = N'Vi phạm BR13: Đơn vị đã đạt hạn ngạch tối đa ' + CAST(@HanNgachPhieu AS NVARCHAR) + N' phiếu mượn chưa hoàn tất (hiện có ' + CAST(@SoPhieuDangMo AS NVARCHAR) + N' phiếu đang xử lý/thực hiện).';
            THROW 50043, @MsgBR13, 1;
        END

        -- 8. Kiểm tra BR03: Từng tài sản phải đang ở trạng thái SanSangChiaSe
        IF EXISTS (
            SELECT 1 
            FROM @ListTS l
            INNER JOIN TaiSan ts WITH (UPDLOCK, HOLDLOCK) ON l.MaTS = ts.MaTS
            WHERE ts.TrangThai <> N'SanSangChiaSe' OR ts.HienTrang < dbo.fn_ThamSo('TS04', 50)
        )
        BEGIN
            THROW 50007, N'Vi phạm BR03: Có tài sản trong danh sách hiện không ở trạng thái Sẵn sàng chia sẻ hoặc hiện trạng dưới ngưỡng tối thiểu (TS04).', 1;
        END

        -- 9. Sinh mã phiếu mượn tiếp nối qua Sequence
        SET @MaPM_Output = 'PM-' + CAST(YEAR(GETDATE()) AS VARCHAR) + '-' + RIGHT('0000' + CAST(NEXT VALUE FOR Seq_PhieuMuon AS VARCHAR), 4);

        -- 10. Tạo phiếu mượn ở trạng thái ChoDuyet
        INSERT INTO PhieuMuon (
            MaPM, MaNguoiMuon, MaPBMuon, NgayLap, NgayMuon, NgayHenTra, 
            MucDichSuDung, TrangThai, CoQuaHan
        )
        VALUES (
            @MaPM_Output, @MaNDMuon, @MaPBMuon, GETDATE(), @NgayMuon, @NgayHenTra,
            @MucDichSuDung, N'ChoDuyet', 0
        );

        -- 11. Thêm chi tiết phiếu mượn
        INSERT INTO ChiTietPhieuMuon (MaPM, MaTS, GhiChuMucDich, TinhTrangTruoc, TinhTrangSau, TyLeHaoMon, GhiChuSau)
        SELECT @MaPM_Output, MaTS, GhiChuMucDich, NULL, NULL, NULL, NULL
        FROM @ListTS;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        EXEC sp_set_session_context 'MaND', NULL;
        EXEC sp_set_session_context 'MaPM', NULL;
        EXEC sp_set_session_context 'LyDo', NULL;
        THROW;
    END CATCH
END;
GO

-- PROC 3: PHÊ DUYỆT HOẶC TỪ CHỐI PHIẾU MƯỢN (BR04 - SERIALIZABLE CONCURRENCY LOCK)
CREATE OR ALTER PROCEDURE sp_DuyetPhieuMuon_KhoaLich_BR04
    @MaPM VARCHAR(20),
    @MaNguoiDuyet VARCHAR(20),
    @HanhDong NVARCHAR(20), -- 'Duyet' hoặc 'TuChoi'
    @LyDoTuChoi NVARCHAR(255) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- 1. Kiểm tra phiếu mượn tồn tại và ở trạng thái ChoDuyet
        DECLARE @TrangThaiHienTai NVARCHAR(20), @NgayMuon DATE, @NgayHenTra DATE;
        SELECT 
            @TrangThaiHienTai = TrangThai,
            @NgayMuon = NgayMuon,
            @NgayHenTra = NgayHenTra
        FROM PhieuMuon WITH (UPDLOCK, HOLDLOCK) 
        WHERE MaPM = @MaPM;

        IF (@TrangThaiHienTai IS NULL)
        BEGIN
            THROW 50008, N'Phiếu mượn không tồn tại.', 1;
        END

        IF (@TrangThaiHienTai <> N'ChoDuyet')
        BEGIN
            THROW 50009, N'Chỉ có thể phê duyệt hoặc từ chối phiếu mượn đang ở trạng thái Chờ duyệt (ChoDuyet).', 1;
        END

        -- Kiểm tra phiếu mượn đã quá hạn trả thực tế chưa (tránh duyệt phiếu đã hết hạn)
        IF (@NgayHenTra < CAST(GETDATE() AS DATE))
        BEGIN
            THROW 50044, N'Vi phạm BR04: Phiếu mượn đã quá ngày hẹn trả, không thể duyệt (hệ thống sẽ tự động hủy).', 1;
        END

        IF (@HanhDong = N'Duyet')
        BEGIN
            -- 2. Kiểm tra BR04: Chống xung đột trùng lịch (khoảng ngày giao nhau với các phiếu DaDuyet hoặc DangThucHien)
            IF EXISTS (
                SELECT 1
                FROM ChiTietPhieuMuon cur
                JOIN PhieuMuon pc ON pc.MaPM = cur.MaPM
                JOIN ChiTietPhieuMuon ot WITH (UPDLOCK, HOLDLOCK) ON ot.MaTS = cur.MaTS AND ot.MaPM <> cur.MaPM
                JOIN PhieuMuon po ON po.MaPM = ot.MaPM
                WHERE cur.MaPM = @MaPM
                  AND po.TrangThai IN (N'DaDuyet', N'DangThucHien')
                  AND NOT (pc.NgayHenTra < po.NgayMuon OR pc.NgayMuon > po.NgayHenTra)
            )
            BEGIN
                THROW 50040, N'Vi phạm BR04: Thiết bị trong phiếu đã có phiếu khác được duyệt trùng lịch mượn (xung đột khoảng thời gian).', 1;
            END

            -- 3. Kiểm tra tính khả dụng hiện tại của thiết bị
            IF EXISTS (
                SELECT 1 
                FROM ChiTietPhieuMuon ct
                INNER JOIN TaiSan ts WITH (UPDLOCK, HOLDLOCK) ON ct.MaTS = ts.MaTS
                WHERE ct.MaPM = @MaPM AND (ts.TrangThai <> N'SanSangChiaSe' OR ts.HienTrang < dbo.fn_ThamSo('TS04', 50))
            )
            BEGIN
                THROW 50010, N'Một hoặc nhiều tài sản trong phiếu không còn ở trạng thái Sẵn sàng chia sẻ.', 1;
            END

            -- 4. Phê duyệt thành công -> Chuyển sang DaDuyet (chưa đổi trạng thái tài sản cho đến khi bàn giao tại kho)
            UPDATE PhieuMuon
            SET TrangThai = N'DaDuyet',
                MaNguoiDuyet = @MaNguoiDuyet,
                NgayDuyet = GETDATE()
            WHERE MaPM = @MaPM;
        END
        ELSE IF (@HanhDong = N'TuChoi')
        BEGIN
            -- Từ chối yêu cầu mượn -> Chuyển sang TuChoi kèm lý do
            UPDATE PhieuMuon
            SET TrangThai = N'TuChoi',
                MaNguoiDuyet = @MaNguoiDuyet,
                NgayDuyet = GETDATE(),
                LyDoTuChoi = ISNULL(@LyDoTuChoi, N'Thủ kho từ chối yêu cầu mượn')
            WHERE MaPM = @MaPM;
        END
        ELSE
        BEGIN
            THROW 50011, N'Hành động không hợp lệ. Chỉ chấp nhận Duyet hoặc TuChoi.', 1;
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        EXEC sp_set_session_context 'MaND', NULL;
        EXEC sp_set_session_context 'MaPM', NULL;
        EXEC sp_set_session_context 'LyDo', NULL;
        THROW;
    END CATCH
END;
GO

-- PROC 4: HỦY PHIẾU MƯỢN KHI ĐANG CHỜ DUYỆT HOẶC ĐÃ DUYỆT (BR17)
CREATE OR ALTER PROCEDURE sp_HuyPhieuMuon_ChoDuyet_BR17
    @MaPM VARCHAR(20),
    @MaNDYeuCau VARCHAR(20),
    @LyDoHuy NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        DECLARE @TrangThaiHienTai NVARCHAR(20), @MaNguoiMuon VARCHAR(20);
        SELECT @TrangThaiHienTai = TrangThai, @MaNguoiMuon = MaNguoiMuon 
        FROM PhieuMuon WITH (UPDLOCK, HOLDLOCK)
        WHERE MaPM = @MaPM;

        IF (@TrangThaiHienTai IS NULL)
        BEGIN
            THROW 50012, N'Phiếu mượn không tồn tại.', 1;
        END

        -- Kiểm tra trạng thái: Người mượn chỉ được tự hủy khi phiếu đang ChoDuyet (BR17)
        IF (@TrangThaiHienTai <> N'ChoDuyet')
        BEGIN
            IF (@TrangThaiHienTai = N'DaDuyet')
            BEGIN
                THROW 50013, N'Phiếu mượn đã được phê duyệt, người mượn không thể tự hủy. Vui lòng liên hệ Thủ kho để xử lý.', 1;
            END
            ELSE
            BEGIN
                THROW 50013, N'Chỉ có thể hủy yêu cầu mượn khi đang ở trạng thái Chờ duyệt.', 1;
            END
        END

        -- 1. Kiểm tra người yêu cầu hủy phải tồn tại trong hệ thống (chống mã rác)
        IF NOT EXISTS (SELECT 1 FROM NguoiDung WHERE MaND = @MaNDYeuCau)
        BEGIN
            THROW 50015, N'Mã người dùng yêu cầu hủy không tồn tại trong hệ thống.', 1;
        END

        -- 2. Kiểm tra quyền: Người yêu cầu hủy phải là chính chủ người mượn hoặc là Thủ kho/Quản trị (triệt tiêu kẽ hở NULL)
        DECLARE @VaiTroYeuCau NVARCHAR(50);
        SELECT @VaiTroYeuCau = VaiTro FROM NguoiDung WHERE MaND = @MaNDYeuCau;

        IF (@MaNDYeuCau <> @MaNguoiMuon AND ISNULL(@VaiTroYeuCau, N'') NOT IN (N'ThuKho', N'QuanTri'))
        BEGIN
            THROW 50014, N'Bạn không phải là người tạo phiếu mượn này và không có quyền hủy phiếu.', 1;
        END

        -- Chuyển trạng thái phiếu mượn sang DaHuy
        UPDATE PhieuMuon
        SET TrangThai = N'DaHuy',
            LyDoHuy = @LyDoHuy
        WHERE MaPM = @MaPM;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        EXEC sp_set_session_context 'MaND', NULL;
        EXEC sp_set_session_context 'MaPM', NULL;
        EXEC sp_set_session_context 'LyDo', NULL;
        THROW;
    END CATCH
END;
GO

-- PROC 5: LẬP BIÊN BẢN BÀN GIAO XUẤT KHO (BR06, BR07, UC10)
CREATE OR ALTER PROCEDURE sp_LapBienBanBanGiao_BR06_BR07
    @MaPM VARCHAR(20),
    @MaNguoiGiao VARCHAR(20),
    @MaNguoiNhan VARCHAR(20),
    @PhuKienKemTheo NVARCHAR(255) = NULL,
    @TrangThaiGiao NVARCHAR(50), -- 'DaGiao' hoặc 'Huy'
    @ChiTietGiao_JSON NVARCHAR(MAX),
    @LyDoHuy NVARCHAR(255) = NULL,
    @MaBBBG_Output VARCHAR(20) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- 1. Kiểm tra phiếu mượn
        DECLARE @TrangThaiPM NVARCHAR(20), @NgayHenTra DATE, @NgayMuonPM DATE;
        SELECT @TrangThaiPM = TrangThai, @NgayHenTra = NgayHenTra, @NgayMuonPM = NgayMuon
        FROM PhieuMuon WITH (UPDLOCK, HOLDLOCK)
        WHERE MaPM = @MaPM;

        IF (@TrangThaiPM IS NULL)
        BEGIN
            THROW 50008, N'Phiếu mượn không tồn tại.', 1;
        END

        IF (@TrangThaiPM <> N'DaDuyet')
        BEGIN
            THROW 50014, N'Chỉ có thể bàn giao xuất kho cho phiếu mượn đã được phê duyệt (DaDuyet).', 1;
        END

        IF (CAST(GETDATE() AS DATE) > @NgayHenTra)
        BEGIN
            THROW 50015, N'Vi phạm BR06: Đã quá ngày hẹn trả của phiếu mượn, không thể tiến hành bàn giao thiết bị.', 1;
        END

        -- 2. Parse JSON danh sách kiểm tra thiết bị khi giao
        DECLARE @ListGiao TABLE (
            MaTS VARCHAR(20),
            TinhTrangTruoc NVARCHAR(255),
            CoLoiNgoaiQuan BIT,
            MoTaLoi NVARCHAR(255)
        );

        INSERT INTO @ListGiao (MaTS, TinhTrangTruoc, CoLoiNgoaiQuan, MoTaLoi)
        SELECT MaTS, TinhTrangTruoc, CoLoiNgoaiQuan, MoTaLoi
        FROM OPENJSON(@ChiTietGiao_JSON)
        WITH (
            MaTS VARCHAR(20) '$.MaTS',
            TinhTrangTruoc NVARCHAR(255) '$.TinhTrangTruoc',
            CoLoiNgoaiQuan BIT '$.CoLoiNgoaiQuan',
            MoTaLoi NVARCHAR(255) '$.MoTaLoi'
        );

        -- Kiểm tra máy trong JSON phải thuộc chi tiết phiếu mượn
        IF EXISTS (
            SELECT 1 FROM @ListGiao g
            WHERE NOT EXISTS (SELECT 1 FROM ChiTietPhieuMuon ct WHERE ct.MaPM = @MaPM AND ct.MaTS = g.MaTS)
        )
        BEGIN
            THROW 50016, N'Có tài sản trong danh sách bàn giao không thuộc phiếu mượn này.', 1;
        END

        -- Chỉ chấp nhận 2 kết quả bàn giao theo CHECK của BienBanBanGiao
        IF (@TrangThaiGiao IS NULL OR @TrangThaiGiao NOT IN (N'DaGiao', N'Huy'))
        BEGIN
            THROW 50046, N'Trạng thái bàn giao không hợp lệ. Chỉ chấp nhận DaGiao hoặc Huy.', 1;
        END

        -- BR06: Có bất kỳ máy nào lỗi khi thử máy thì không được xuất kho, phải chọn Hủy bàn giao
        IF (@TrangThaiGiao = N'DaGiao' AND EXISTS (SELECT 1 FROM @ListGiao WHERE CoLoiNgoaiQuan = 1))
        BEGIN
            THROW 50047, N'Vi phạm BR06: Có thiết bị bị lỗi khi kiểm tra bàn giao. Vui lòng chọn Hủy bàn giao (hủy cả phiếu) thay vì xuất kho.', 1;
        END

        -- Người nhận máy phải là cán bộ thuộc đơn vị mượn
        IF NOT EXISTS (
            SELECT 1 FROM NguoiDung nd
            INNER JOIN PhieuMuon pm ON pm.MaPM = @MaPM
            WHERE nd.MaND = @MaNguoiNhan AND nd.MaPB = pm.MaPBMuon
        )
        BEGIN
            THROW 50048, N'Người nhận máy phải là cán bộ thuộc đơn vị mượn của phiếu.', 1;
        END

        -- 3. Sinh mã BBBG tiếp nối
        SET @MaBBBG_Output = 'BBBG-' + CAST(YEAR(GETDATE()) AS VARCHAR) + '-' + RIGHT('0000' + CAST(NEXT VALUE FOR Seq_BBBG AS VARCHAR), 4);

        -- Ghi thông tin người thực hiện vào SESSION_CONTEXT cho Trigger
        EXEC sp_set_session_context 'MaND', @MaNguoiGiao;
        EXEC sp_set_session_context 'MaPM', @MaPM;

        IF (@TrangThaiGiao = N'DaGiao')
        BEGIN
            -- BR06: Chưa đến ngày bắt đầu mượn thì chưa được xuất kho (tránh chiếm lịch của phiếu khác)
            IF (CAST(GETDATE() AS DATE) < @NgayMuonPM)
            BEGIN
                THROW 50054, N'Vi phạm BR06: Chưa đến ngày bắt đầu mượn của phiếu, chưa thể bàn giao thiết bị.', 1;
            END

            -- BR06: Mọi máy phải đang Sẵn sàng chia sẻ và đạt hiện trạng tối thiểu tại thời điểm xuất kho
            -- (chặn trường hợp phiếu trước trả trễ, máy vẫn đang Đang mượn hoặc vừa chuyển Cần bảo dưỡng)
            IF EXISTS (
                SELECT 1 FROM ChiTietPhieuMuon ct
                INNER JOIN TaiSan ts WITH (UPDLOCK, HOLDLOCK) ON ts.MaTS = ct.MaTS
                WHERE ct.MaPM = @MaPM
                  AND (ts.TrangThai <> N'SanSangChiaSe' OR ts.HienTrang < dbo.fn_ThamSo('TS04', 50))
            )
            BEGIN
                THROW 50055, N'Vi phạm BR06: Có thiết bị trong phiếu hiện không ở trạng thái Sẵn sàng chia sẻ (đang được mượn, cần bảo dưỡng hoặc thanh lý). Vui lòng chờ thiết bị được hoàn trả hoặc Hủy bàn giao.', 1;
            END

            -- Kiểm tra danh sách bàn giao phải đủ 100% số máy trong phiếu mượn
            DECLARE @SoMayTrongPhieu INT, @SoMayTrongJSON INT;
            SELECT @SoMayTrongPhieu = COUNT(*) FROM ChiTietPhieuMuon WHERE MaPM = @MaPM;
            SELECT @SoMayTrongJSON = COUNT(DISTINCT MaTS) FROM @ListGiao;

            IF (@SoMayTrongJSON <> @SoMayTrongPhieu)
            BEGIN
                THROW 50017, N'Vi phạm BR06: Danh sách máy bàn giao xuất kho phải đầy đủ toàn bộ các thiết bị đã đăng ký trong phiếu mượn.', 1;
            END

            -- Tạo biên bản bàn giao thành công
            INSERT INTO BienBanBanGiao (MaBBBG, MaPM, MaNguoiGiao, MaNguoiNhan, NgayGiao, PhuKienKemTheo, TrangThaiGiao)
            VALUES (@MaBBBG_Output, @MaPM, @MaNguoiGiao, @MaNguoiNhan, GETDATE(), @PhuKienKemTheo, N'DaGiao');

            -- Cập nhật hiện trạng ban đầu vào chi tiết phiếu
            UPDATE ct
            SET ct.TinhTrangTruoc = g.TinhTrangTruoc
            FROM ChiTietPhieuMuon ct
            INNER JOIN @ListGiao g ON ct.MaTS = g.MaTS
            WHERE ct.MaPM = @MaPM;

            -- Thiết lập ngữ cảnh lý do chuyển trạng thái
            EXEC sp_set_session_context 'LyDo', N'Bàn giao xuất kho cho người mượn theo phiếu (BR06)';

            -- Chuyển trạng thái tất cả máy sang DangMuon (Trigger tự động ghi nhận lịch sử)
            UPDATE ts
            SET ts.TrangThai = N'DangMuon'
            FROM TaiSan ts
            INNER JOIN ChiTietPhieuMuon ct ON ts.MaTS = ct.MaTS
            WHERE ct.MaPM = @MaPM;

            -- Cập nhật trạng thái phiếu mượn sang DangThucHien (Hình 11)
            UPDATE PhieuMuon
            SET TrangThai = N'DangThucHien'
            WHERE MaPM = @MaPM;
        END
        ELSE IF (@TrangThaiGiao = N'Huy')
        BEGIN
            -- HỦY BÀN GIAO: Xử lý theo UC10 luồng 3.2 hoặc hủy theo BR17
            INSERT INTO BienBanBanGiao (MaBBBG, MaPM, MaNguoiGiao, MaNguoiNhan, NgayGiao, PhuKienKemTheo, TrangThaiGiao)
            VALUES (@MaBBBG_Output, @MaPM, @MaNguoiGiao, @MaNguoiNhan, GETDATE(), @PhuKienKemTheo, N'Huy');

            -- Cập nhật lý do hủy vào phiếu mượn
            DECLARE @NoiDungHuy NVARCHAR(255) = ISNULL(@LyDoHuy, N'Hủy bàn giao xuất kho tại thời điểm kiểm tra thiết bị');
            UPDATE PhieuMuon
            SET TrangThai = N'DaHuy',
                LyDoHuy = @NoiDungHuy
            WHERE MaPM = @MaPM;

            -- Xử lý từng máy: Nếu có lỗi ngoại quan chuyển sang CanBaoDuong và ghi sự cố
            DECLARE @ErrTS VARCHAR(20), @ErrMoTa NVARCHAR(255);
            DECLARE curErr CURSOR LOCAL FAST_FORWARD FOR 
                SELECT MaTS, MoTaLoi FROM @ListGiao WHERE CoLoiNgoaiQuan = 1;
            
            OPEN curErr;
            FETCH NEXT FROM curErr INTO @ErrTS, @ErrMoTa;
            WHILE @@FETCH_STATUS = 0
            BEGIN
                -- Ghi nhận sự cố ngoại quan gắn với BBBG
                DECLARE @MaSC VARCHAR(20) = 'SC-' + CAST(YEAR(GETDATE()) AS VARCHAR) + '-' + RIGHT('0000' + CAST(NEXT VALUE FOR Seq_SuCo AS VARCHAR), 4);
                INSERT INTO LichSuSuCo (MaSuCo, MaTS, MaBBBG, MaBBTH, MaPBChiuTrachNhiem, NgayPhatSinh, MoTaHuHong, MucDoThietHai, ChiPhiBoiThuong)
                VALUES (@MaSC, @ErrTS, @MaBBBG_Output, NULL, NULL, GETDATE(), ISNULL(@ErrMoTa, N'Sự cố ngoại quan phát hiện lúc bàn giao kho (UC10)'), 0, 0);

                -- Chuyển trạng thái máy lỗi sang CanBaoDuong
                EXEC sp_set_session_context 'LyDo', N'Phát hiện sự cố ngoại quan lúc xuất kho bàn giao, chuyển bảo dưỡng (UC10)';
                UPDATE TaiSan SET TrangThai = N'CanBaoDuong' WHERE MaTS = @ErrTS;

                FETCH NEXT FROM curErr INTO @ErrTS, @ErrMoTa;
            END
            CLOSE curErr;
            DEALLOCATE curErr;
        END

        -- Xóa context sau khi thành công
        EXEC sp_set_session_context 'MaND', NULL;
        EXEC sp_set_session_context 'MaPM', NULL;
        EXEC sp_set_session_context 'LyDo', NULL;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        EXEC sp_set_session_context 'MaND', NULL;
        EXEC sp_set_session_context 'MaPM', NULL;
        EXEC sp_set_session_context 'LyDo', NULL;
        THROW;
    END CATCH
END;
GO

-- PROC 6: LẬP BIÊN BẢN THU HỒI, ĐÁNH GIÁ HAO MÒN & ĐÓNG PHIẾU MƯỢN (BR08, BR09 - GỌI 1 LẦN CHO CẢ PHIẾU)
CREATE OR ALTER PROCEDURE sp_LapBienBanThuHoi_BR08_BR09
    @MaPM VARCHAR(20),
    @MaNguoiThuHoi VARCHAR(20),
    @MaNguoiTra VARCHAR(20),
    @GhiChu NVARCHAR(255) = NULL,
    @ChiTietThuHoi_JSON NVARCHAR(MAX),
    @MaBBTH_Output VARCHAR(20) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- 1. Kiểm tra trạng thái phiếu mượn
        DECLARE @TrangThaiPM NVARCHAR(20), @NgayGiaoKho DATETIME, @MaPBMuon VARCHAR(20);
        SELECT @TrangThaiPM = pm.TrangThai, @NgayGiaoKho = bbg.NgayGiao, @MaPBMuon = pm.MaPBMuon
        FROM PhieuMuon pm WITH (UPDLOCK, HOLDLOCK)
        LEFT JOIN BienBanBanGiao bbg ON pm.MaPM = bbg.MaPM AND bbg.TrangThaiGiao = N'DaGiao'
        WHERE pm.MaPM = @MaPM;

        IF (@TrangThaiPM IS NULL)
        BEGIN
            THROW 50008, N'Phiếu mượn không tồn tại.', 1;
        END

        IF (@TrangThaiPM <> N'DangThucHien')
        BEGIN
            THROW 50018, N'Chỉ có thể thu hồi đóng phiếu mượn đang ở trạng thái Đang thực hiện (DangThucHien).', 1;
        END

        -- 2. Tính số ngày mượn thực tế
        DECLARE @SoNgayMuonThucTe INT = 1;
        IF (@NgayGiaoKho IS NOT NULL)
        BEGIN
            SET @SoNgayMuonThucTe = DATEDIFF(DAY, CAST(@NgayGiaoKho AS DATE), CAST(GETDATE() AS DATE)) + 1;
            IF (@SoNgayMuonThucTe < 1) SET @SoNgayMuonThucTe = 1;
        END

        -- 3. Parse JSON danh sách thu hồi từng máy
        DECLARE @ListTH TABLE (
            MaTS VARCHAR(20),
            TinhTrangSau NVARCHAR(20), -- 'Tot', 'CanBaoTri', 'HuHong'
            TyLeHaoMon INT,            -- % hao mòn (0 - 100)
            GhiChuSau NVARCHAR(255),
            MoTaHuHong NVARCHAR(255),
            MucDoThietHai INT          -- % thiệt hại (0 - 100)
        );

        INSERT INTO @ListTH (MaTS, TinhTrangSau, TyLeHaoMon, GhiChuSau, MoTaHuHong, MucDoThietHai)
        SELECT MaTS, TinhTrangSau, TyLeHaoMon, GhiChuSau, MoTaHuHong, MucDoThietHai
        FROM OPENJSON(@ChiTietThuHoi_JSON)
        WITH (
            MaTS VARCHAR(20) '$.MaTS',
            TinhTrangSau NVARCHAR(20) '$.TinhTrangSau',
            TyLeHaoMon INT '$.TyLeHaoMon',
            GhiChuSau NVARCHAR(255) '$.GhiChuSau',
            MoTaHuHong NVARCHAR(255) '$.MoTaHuHong',
            MucDoThietHai INT '$.MucDoThietHai'
        );

        -- Bắt buộc đánh giá TinhTrangSau cho toàn bộ máy thu hồi (không được để trống)
        IF EXISTS (SELECT 1 FROM @ListTH WHERE TinhTrangSau IS NULL OR LTRIM(RTRIM(TinhTrangSau)) = '')
        BEGIN
            THROW 50019, N'Vi phạm BR08: Mọi tài sản thu hồi bắt buộc phải được đánh giá tình trạng kỹ thuật (Tot, CanBaoTri hoặc HuHong).', 1;
        END

        -- Kiểm tra bắt buộc phải thu hồi ĐẦY ĐỦ 100% tài sản trong phiếu
        IF EXISTS (
            SELECT 1 FROM ChiTietPhieuMuon ct
            WHERE ct.MaPM = @MaPM AND NOT EXISTS (SELECT 1 FROM @ListTH th WHERE th.MaTS = ct.MaTS)
        )
        BEGIN
            THROW 50020, N'Vi phạm BR09: Phải thu hồi và đánh giá hiện trạng đầy đủ cho tất cả tài sản trong phiếu mượn cùng một lúc.', 1;
        END

        -- Chặn tài sản lạ (không thuộc phiếu) hoặc khai báo trùng: tránh đổi trạng thái nhầm máy của phiếu khác
        IF EXISTS (
            SELECT 1 FROM @ListTH th
            WHERE NOT EXISTS (SELECT 1 FROM ChiTietPhieuMuon ct WHERE ct.MaPM = @MaPM AND ct.MaTS = th.MaTS)
        )
           OR EXISTS (SELECT MaTS FROM @ListTH GROUP BY MaTS HAVING COUNT(*) > 1)
        BEGIN
            THROW 50049, N'Danh sách thu hồi có tài sản không thuộc phiếu mượn này hoặc bị khai báo trùng.', 1;
        END

        -- BR08: Giá trị đánh giá từng máy phải hợp lệ
        IF EXISTS (
            SELECT 1 FROM @ListTH
            WHERE TinhTrangSau NOT IN (N'Tot', N'CanBaoTri', N'HuHong')
               OR ISNULL(TyLeHaoMon, 0) NOT BETWEEN 0 AND 100
               OR ISNULL(MucDoThietHai, 0) NOT BETWEEN 0 AND 100
        )
        BEGIN
            THROW 50050, N'Vi phạm BR08: TinhTrangSau chỉ nhận Tot/CanBaoTri/HuHong; Tỷ lệ hao mòn và Mức độ thiệt hại phải trong khoảng 0 - 100%.', 1;
        END

        -- BR09: Máy hư hỏng bắt buộc có mô tả hư hỏng và mức độ thiệt hại > 0% để tính bồi thường
        IF EXISTS (
            SELECT 1 FROM @ListTH
            WHERE TinhTrangSau = N'HuHong'
              AND (LTRIM(RTRIM(ISNULL(MoTaHuHong, N''))) = N'' OR ISNULL(MucDoThietHai, 0) <= 0)
        )
        BEGIN
            THROW 50053, N'Vi phạm BR09: Thiết bị hư hỏng bắt buộc nhập mô tả hư hỏng và mức độ thiệt hại lớn hơn 0%.', 1;
        END

        -- 4. Tạo biên bản thu hồi
        SET @MaBBTH_Output = 'BBTH-' + CAST(YEAR(GETDATE()) AS VARCHAR) + '-' + RIGHT('0000' + CAST(NEXT VALUE FOR Seq_BBTH AS VARCHAR), 4);

        INSERT INTO BienBanThuHoi (MaBBTH, MaPM, MaNguoiThuHoi, MaNguoiTra, NgayThuHoi, SoNgayMuonThucTe, GhiChu)
        VALUES (@MaBBTH_Output, @MaPM, @MaNguoiThuHoi, @MaNguoiTra, GETDATE(), @SoNgayMuonThucTe, @GhiChu);

        -- Thiết lập ngữ cảnh người thực hiện cho Trigger
        EXEC sp_set_session_context 'MaND', @MaNguoiThuHoi;
        EXEC sp_set_session_context 'MaPM', @MaPM;

        -- 5. Duyệt qua từng tài sản để cập nhật hiện trạng, phân luồng và ghi sự cố nếu có
        DECLARE @TS_Ma VARCHAR(20), @TS_Status NVARCHAR(20), @TS_HaoMon INT;
        DECLARE @TS_GhiChu NVARCHAR(255), @TS_HuHong NVARCHAR(255), @TS_ThietHai INT;

        DECLARE curTH CURSOR LOCAL FAST_FORWARD FOR 
            SELECT MaTS, TinhTrangSau, TyLeHaoMon, GhiChuSau, MoTaHuHong, MucDoThietHai FROM @ListTH;

        OPEN curTH;
        FETCH NEXT FROM curTH INTO @TS_Ma, @TS_Status, @TS_HaoMon, @TS_GhiChu, @TS_HuHong, @TS_ThietHai;

        WHILE @@FETCH_STATUS = 0
        BEGIN
            -- Cập nhật đánh giá vào ChiTietPhieuMuon
            UPDATE ChiTietPhieuMuon
            SET TinhTrangSau = @TS_Status,
                TyLeHaoMon = ISNULL(@TS_HaoMon, 0),
                GhiChuSau = @TS_GhiChu
            WHERE MaPM = @MaPM AND MaTS = @TS_Ma;

            -- Lấy nguyên giá và hiện trạng hiện tại của máy
            DECLARE @CurNguyenGia DECIMAL(18, 2), @CurHienTrang INT;
            SELECT @CurNguyenGia = NguyenGia, @CurHienTrang = HienTrang FROM TaiSan WHERE MaTS = @TS_Ma;

            -- Tính hiện trạng mới sau khi trừ hao mòn (không âm)
            DECLARE @NewHienTrang INT = @CurHienTrang - ISNULL(@TS_HaoMon, 0);
            IF (@NewHienTrang < 0) SET @NewHienTrang = 0;

            -- Phân luồng trạng thái máy theo BR08, BR09 và Hình 10
            IF (@TS_Status = N'Tot' AND @NewHienTrang >= dbo.fn_ThamSo('TS04', 50))
            BEGIN
                -- Máy trả tốt và hiện trạng >= 50% -> Đưa về SanSangChiaSe
                EXEC sp_set_session_context 'LyDo', N'Thu hồi thiết bị tình trạng tốt, đưa về kho sẵn sàng chia sẻ (BR08)';
                UPDATE TaiSan 
                SET TrangThai = N'SanSangChiaSe', HienTrang = @NewHienTrang 
                WHERE MaTS = @TS_Ma;
            END
            ELSE
            BEGIN
                -- Máy cần bảo trì, hỏng hoặc hiện trạng < 50% -> Đưa sang CanBaoDuong
                EXEC sp_set_session_context 'LyDo', N'Thu hồi thiết bị phát hiện hỏng hóc hoặc hiện trạng dưới 50%, chuyển bảo dưỡng (BR09)';
                UPDATE TaiSan 
                SET TrangThai = N'CanBaoDuong', HienTrang = @NewHienTrang 
                WHERE MaTS = @TS_Ma;

                -- Nếu có hư hỏng hoặc có tỷ lệ thiệt hại -> Ghi nhận sự cố bồi thường
                IF (@TS_Status = N'HuHong' OR ISNULL(@TS_ThietHai, 0) > 0)
                BEGIN
                    DECLARE @TienBoiThuong DECIMAL(18, 2) = 0;
                    IF (ISNULL(@TS_ThietHai, 0) > 0)
                    BEGIN
                        SET @TienBoiThuong = ROUND((CAST(@TS_ThietHai AS DECIMAL) / 100.0) * @CurNguyenGia, 2);
                    END

                    DECLARE @NewSC VARCHAR(20) = 'SC-' + CAST(YEAR(GETDATE()) AS VARCHAR) + '-' + RIGHT('0000' + CAST(NEXT VALUE FOR Seq_SuCo AS VARCHAR), 4);
                    INSERT INTO LichSuSuCo (MaSuCo, MaTS, MaBBBG, MaBBTH, MaPBChiuTrachNhiem, NgayPhatSinh, MoTaHuHong, MucDoThietHai, ChiPhiBoiThuong)
                    VALUES (
                        @NewSC, @TS_Ma, NULL, @MaBBTH_Output, @MaPBMuon, GETDATE(), 
                        ISNULL(@TS_HuHong, N'Hư hỏng ghi nhận khi thu hồi sau mượn'), 
                        ISNULL(@TS_ThietHai, 0), @TienBoiThuong
                    );
                END
            END

            FETCH NEXT FROM curTH INTO @TS_Ma, @TS_Status, @TS_HaoMon, @TS_GhiChu, @TS_HuHong, @TS_ThietHai;
        END

        CLOSE curTH;
        DEALLOCATE curTH;

        -- 6. Đóng phiếu mượn sang HoanTat (Hình 11), giữ nguyên cờ CoQuaHan để lưu vết lịch sử (BR14)
        UPDATE PhieuMuon
        SET TrangThai = N'HoanTat'
        WHERE MaPM = @MaPM;

        -- Xóa context sau khi thành công
        EXEC sp_set_session_context 'MaND', NULL;
        EXEC sp_set_session_context 'MaPM', NULL;
        EXEC sp_set_session_context 'LyDo', NULL;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        EXEC sp_set_session_context 'MaND', NULL;
        EXEC sp_set_session_context 'MaPM', NULL;
        EXEC sp_set_session_context 'LyDo', NULL;
        THROW;
    END CATCH
END;
GO

-- PROC 7: LẬP PHIẾU BẢO DƯỠNG (UC11, BR11)
CREATE OR ALTER PROCEDURE sp_LapPhieuBaoDuong
    @MaTS VARCHAR(20),
    @MaNguoiLap VARCHAR(20),
    @DonViSuaChua NVARCHAR(150),
    @NoiDungSuaChua NVARCHAR(255),
    @ChiTietHangMuc_JSON NVARCHAR(MAX),
    @MaPBD_Output VARCHAR(20) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- 1. Kiểm tra trạng thái máy: Phải đang ở CanBaoDuong
        DECLARE @TrangThaiTS NVARCHAR(30);
        SELECT @TrangThaiTS = TrangThai FROM TaiSan WITH (UPDLOCK, HOLDLOCK) WHERE MaTS = @MaTS;

        IF (@TrangThaiTS IS NULL)
        BEGIN
            THROW 50021, N'Tài sản không tồn tại.', 1;
        END

        IF (@TrangThaiTS <> N'CanBaoDuong')
        BEGIN
            THROW 50022, N'Chỉ có thể lập phiếu bảo dưỡng cho tài sản đang ở trạng thái Cần bảo dưỡng (CanBaoDuong).', 1;
        END

        -- 2. Parse JSON danh sách hạng mục bảo dưỡng
        DECLARE @ListCT TABLE (
            HangMucSuaChua NVARCHAR(150),
            LinhKienThayThe NVARCHAR(150),
            DonGia DECIMAL(18, 2),
            SoLuong INT
        );

        INSERT INTO @ListCT (HangMucSuaChua, LinhKienThayThe, DonGia, SoLuong)
        SELECT HangMucSuaChua, LinhKienThayThe, DonGia, SoLuong
        FROM OPENJSON(@ChiTietHangMuc_JSON)
        WITH (
            HangMucSuaChua NVARCHAR(150) '$.HangMucSuaChua',
            LinhKienThayThe NVARCHAR(150) '$.LinhKienThayThe',
            DonGia DECIMAL(18, 2) '$.DonGia',
            SoLuong INT '$.SoLuong'
        );

        IF NOT EXISTS (SELECT 1 FROM @ListCT)
        BEGIN
            THROW 50023, N'Phiếu bảo dưỡng bắt buộc phải có ít nhất một hạng mục sửa chữa/linh kiện thay thế.', 1;
        END

        -- 3. Sinh mã phiếu bảo dưỡng tiếp nối
        SET @MaPBD_Output = 'PBD-' + CAST(YEAR(GETDATE()) AS VARCHAR) + '-' + RIGHT('0000' + CAST(NEXT VALUE FOR Seq_PBD AS VARCHAR), 4);

        INSERT INTO PhieuBaoDuong (MaPBD, MaTS, MaNguoiLap, NgayLapPhieu, DonViSuaChua, NoiDungSuaChua, TrangThaiBaoDuong)
        VALUES (@MaPBD_Output, @MaTS, @MaNguoiLap, GETDATE(), @DonViSuaChua, @NoiDungSuaChua, N'DangBaoDuong');

        -- 4. Thêm chi tiết các hạng mục
        INSERT INTO ChiTietBaoDuong (MaPBD, HangMucSuaChua, LinhKienThayThe, DonGia, SoLuong)
        SELECT @MaPBD_Output, HangMucSuaChua, LinhKienThayThe, DonGia, SoLuong
        FROM @ListCT;

        -- 5. Chuyển trạng thái máy sang DangBaoDuong (Hình 10)
        EXEC sp_set_session_context 'MaND', @MaNguoiLap;
        EXEC sp_set_session_context 'LyDo', N'Lập phiếu bảo dưỡng, đưa máy vào trạng thái Đang bảo dưỡng (Hình 10)';
        
        UPDATE TaiSan SET TrangThai = N'DangBaoDuong' WHERE MaTS = @MaTS;

        EXEC sp_set_session_context 'MaND', NULL;
        EXEC sp_set_session_context 'LyDo', NULL;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        EXEC sp_set_session_context 'MaND', NULL;
        EXEC sp_set_session_context 'MaPM', NULL;
        EXEC sp_set_session_context 'LyDo', NULL;
        THROW;
    END CATCH
END;
GO

-- PROC 8: NGHIỆM THU BẢO DƯỠNG THIẾT BỊ (UC12, BR11, BR12)
CREATE OR ALTER PROCEDURE sp_NghiemThuBaoDuong_BR11_BR12
    @MaPBD VARCHAR(20),
    @MaNguoiNghiemThu VARCHAR(20),
    @KetLuan NVARCHAR(20), -- 'Dat' hoặc 'KhongTheSua'
    @HienTrangSauSuaChua INT = NULL,
    @DonViSuaChuaCapNhat NVARCHAR(150) = NULL,
    @NoiDungSuaChuaCapNhat NVARCHAR(255) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- 1. Kiểm tra phiếu bảo dưỡng
        DECLARE @MaTS VARCHAR(20), @TrangThaiPBD NVARCHAR(20), @DonViCu NVARCHAR(150), @NoiDungCu NVARCHAR(255);
        SELECT 
            @MaTS = MaTS, 
            @TrangThaiPBD = TrangThaiBaoDuong,
            @DonViCu = DonViSuaChua,
            @NoiDungCu = NoiDungSuaChua
        FROM PhieuBaoDuong WITH (UPDLOCK, HOLDLOCK)
        WHERE MaPBD = @MaPBD;

        IF (@TrangThaiPBD IS NULL)
        BEGIN
            THROW 50024, N'Phiếu bảo dưỡng không tồn tại.', 1;
        END

        IF (@TrangThaiPBD <> N'DangBaoDuong')
        BEGIN
            THROW 50025, N'Chỉ có thể nghiệm thu phiếu bảo dưỡng đang ở trạng thái Đang bảo dưỡng (DangBaoDuong).', 1;
        END

        -- Kiểm tra BR11: Bắt buộc có thông tin đơn vị sửa chữa và nội dung kỹ thuật xử lý
        DECLARE @FinalDonVi NVARCHAR(150) = COALESCE(@DonViSuaChuaCapNhat, @DonViCu);
        DECLARE @FinalNoiDung NVARCHAR(255) = COALESCE(@NoiDungSuaChuaCapNhat, @NoiDungCu);
        IF (@FinalDonVi IS NULL OR LTRIM(RTRIM(@FinalDonVi)) = '' OR @FinalNoiDung IS NULL OR LTRIM(RTRIM(@FinalNoiDung)) = '')
        BEGIN
            THROW 50026, N'Vi phạm BR11: Nghiệm thu bảo dưỡng bắt buộc phải ghi nhận đầy đủ Đơn vị sửa chữa và Nội dung kỹ thuật đã xử lý.', 1;
        END

        -- Cập nhật đơn vị và nội dung nếu có bổ sung lúc nghiệm thu
        IF (@DonViSuaChuaCapNhat IS NOT NULL OR @NoiDungSuaChuaCapNhat IS NOT NULL)
        BEGIN
            UPDATE PhieuBaoDuong 
            SET DonViSuaChua = @FinalDonVi, NoiDungSuaChua = @FinalNoiDung
            WHERE MaPBD = @MaPBD;
        END

        EXEC sp_set_session_context 'MaND', @MaNguoiNghiemThu;

        IF (@KetLuan = N'Dat')
        BEGIN
            -- Kiểm tra BR12: Hiện trạng kỹ thuật sau sửa chữa phải đạt từ 50% trở lên
            IF (@HienTrangSauSuaChua IS NULL OR @HienTrangSauSuaChua < dbo.fn_ThamSo('TS04', 50))
            BEGIN
                THROW 50027, N'Vi phạm BR12: Nghiệm thu đạt yêu cầu bắt buộc hiện trạng thiết bị sau sửa chữa phải đạt ngưỡng tối thiểu TS04 (mặc định 50%) trở lên để phục hồi trạng thái chia sẻ.', 1;
            END

            -- Cập nhật phiếu bảo dưỡng hoàn tất thành công
            UPDATE PhieuBaoDuong
            SET TrangThaiBaoDuong = N'DaNghiemThu',
                NgayKetThuc = GETDATE(),
                HienTrangSauSuaChua = @HienTrangSauSuaChua
            WHERE MaPBD = @MaPBD;

            -- Phục hồi tài sản về SanSangChiaSe (Hình 10)
            EXEC sp_set_session_context 'LyDo', N'Nghiệm thu bảo dưỡng đạt yêu cầu kỹ thuật, đưa về Sẵn sàng chia sẻ (BR12)';
            UPDATE TaiSan
            SET TrangThai = N'SanSangChiaSe',
                HienTrang = @HienTrangSauSuaChua
            WHERE MaTS = @MaTS;
        END
        ELSE IF (@KetLuan = N'KhongTheSua')
        BEGIN
            -- Nghiệm thu không thể sửa chữa -> Cập nhật phiếu
            UPDATE PhieuBaoDuong
            SET TrangThaiBaoDuong = N'KhongTheSua',
                NgayKetThuc = GETDATE(),
                HienTrangSauSuaChua = ISNULL(@HienTrangSauSuaChua, 0)
            WHERE MaPBD = @MaPBD;

            -- Chuyển thiết bị sang DeXuatThanhLy (Hình 10)
            EXEC sp_set_session_context 'LyDo', N'Nghiệm thu xác nhận không thể sửa chữa, chuyển sang Đề xuất thanh lý (BR12, Hình 10)';
            UPDATE TaiSan
            SET TrangThai = N'DeXuatThanhLy',
                HienTrang = ISNULL(@HienTrangSauSuaChua, 0)
            WHERE MaTS = @MaTS;
        END
        ELSE
        BEGIN
            THROW 50028, N'Kết luận nghiệm thu không hợp lệ. Chỉ chấp nhận Dat hoặc KhongTheSua.', 1;
        END

        EXEC sp_set_session_context 'MaND', NULL;
        EXEC sp_set_session_context 'LyDo', NULL;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        EXEC sp_set_session_context 'MaND', NULL;
        EXEC sp_set_session_context 'MaPM', NULL;
        EXEC sp_set_session_context 'LyDo', NULL;
        THROW;
    END CATCH
END;
GO

-- PROC 9: ĐỀ XUẤT THANH LÝ TÀI SẢN (UC14, BR15 - KIỂM TRA ĐỦ 3 CĂN CỨ)
CREATE OR ALTER PROCEDURE sp_DeXuatThanhLy_BR15
    @MaTS VARCHAR(20),
    @MaNguoiDeXuat VARCHAR(20),
    @LyDoDeXuat NVARCHAR(255),
    @MaHSTL_Output VARCHAR(20) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- 1. Kiểm tra tài sản tồn tại và không đang trong giao dịch mượn
        DECLARE @TrangThaiTS NVARCHAR(30), @NamMua INT, @NguyenGia DECIMAL(18, 2), @NienHanNam INT;
        SELECT 
            @TrangThaiTS = ts.TrangThai,
            @NamMua = ts.NamMua,
            @NguyenGia = ts.NguyenGia,
            @NienHanNam = lts.NienHanNam
        FROM TaiSan ts WITH (UPDLOCK, HOLDLOCK)
        INNER JOIN LoaiTaiSan lts ON ts.MaLoaiTS = lts.MaLoaiTS
        WHERE ts.MaTS = @MaTS;

        IF (@TrangThaiTS IS NULL)
        BEGIN
            THROW 50021, N'Tài sản không tồn tại.', 1;
        END

        IF (@TrangThaiTS = N'DangMuon')
        BEGIN
            THROW 50029, N'Vi phạm BR15: Thiết bị đang trong quá trình mượn, không thể lập hồ sơ đề xuất thanh lý.', 1;
        END

        IF (@TrangThaiTS = N'DaThanhLy')
        BEGIN
            THROW 50030, N'Tài sản đã được thanh lý trước đó.', 1;
        END

        -- Đang gửi sửa: phải nghiệm thu phiếu bảo dưỡng trước (kết luận KhongTheSua sẽ tự chuyển Đề xuất thanh lý)
        IF (@TrangThaiTS = N'Moi')
        BEGIN
            THROW 50057, N'Thiết bị chưa được Thủ kho kiểm nhận vào kho, không thể lập hồ sơ thanh lý.', 1;
        END

        IF (@TrangThaiTS = N'DangBaoDuong')
        BEGIN
            THROW 50051, N'Thiết bị đang bảo dưỡng. Vui lòng nghiệm thu phiếu bảo dưỡng trước khi lập hồ sơ thanh lý.', 1;
        END

        -- Thiết bị đã có lịch mượn được duyệt (chờ bàn giao) thì không được rút khỏi kho
        IF EXISTS (
            SELECT 1 FROM ChiTietPhieuMuon ct
            INNER JOIN PhieuMuon pm ON pm.MaPM = ct.MaPM
            WHERE ct.MaTS = @MaTS AND pm.TrangThai = N'DaDuyet'
        )
        BEGIN
            THROW 50052, N'Thiết bị đang có phiếu mượn đã duyệt chờ bàn giao, không thể lập hồ sơ thanh lý lúc này.', 1;
        END

        -- Chống tạo nhiều hồ sơ chờ duyệt cho cùng một máy
        IF EXISTS (SELECT 1 FROM HoSoThanhLy WHERE MaTS = @MaTS AND TrangThai = N'ChoDuyet')
        BEGIN
            THROW 50031, N'Tài sản này hiện đã có hồ sơ đề xuất thanh lý đang ở trạng thái Chờ duyệt.', 1;
        END

        -- 2. Kiểm tra nghiệp vụ BR15: Bắt buộc thỏa mãn ít nhất 1 trong 3 căn cứ thanh lý
        DECLARE @CanCu1_HetNienHan BIT = 0;
        DECLARE @CanCu2_ChiPhiSuaLon BIT = 0;
        DECLARE @CanCu3_KhongTheSua BIT = 0;

        -- Căn cứ 1: Hết niên hạn sử dụng
        DECLARE @TuoiTaiSan INT = YEAR(GETDATE()) - @NamMua;
        IF (@TuoiTaiSan >= @NienHanNam)
        BEGIN
            SET @CanCu1_HetNienHan = 1;
        END

        -- Căn cứ 2: Lũy kế chi phí sửa chữa bảo dưỡng >= 70% nguyên giá (tính cả phiếu DaNghiemThu và KhongTheSua)
        DECLARE @TongChiPhiBaoDuong DECIMAL(18, 2) = 0;
        SELECT @TongChiPhiBaoDuong = ISNULL(SUM(ctbd.ThanhTien), 0)
        FROM PhieuBaoDuong pbd
        INNER JOIN ChiTietBaoDuong ctbd ON pbd.MaPBD = ctbd.MaPBD
        WHERE pbd.MaTS = @MaTS AND pbd.TrangThaiBaoDuong IN (N'DaNghiemThu', N'KhongTheSua');

        DECLARE @NguongChiPhi DECIMAL(18, 4);
        SELECT @NguongChiPhi = GiaTri FROM ThamSoCAI WHERE MaThamSo = 'TS05';
        IF @NguongChiPhi IS NULL SET @NguongChiPhi = 0.7;

        IF (@NguyenGia > 0 AND (@TongChiPhiBaoDuong / @NguyenGia) >= @NguongChiPhi)
        BEGIN
            SET @CanCu2_ChiPhiSuaLon = 1;
        END

        -- Căn cứ 3: Phiếu bảo dưỡng GẦN ĐÂY NHẤT của máy có kết luận không thể sửa chữa
        DECLARE @KetLuanGanNhat NVARCHAR(20);
        SELECT TOP 1 @KetLuanGanNhat = TrangThaiBaoDuong
        FROM PhieuBaoDuong
        WHERE MaTS = @MaTS
        ORDER BY NgayLapPhieu DESC;

        IF (@KetLuanGanNhat = N'KhongTheSua')
        BEGIN
            SET @CanCu3_KhongTheSua = 1;
        END

        IF (@CanCu1_HetNienHan = 0 AND @CanCu2_ChiPhiSuaLon = 0 AND @CanCu3_KhongTheSua = 0)
        BEGIN
            THROW 50032, N'Vi phạm BR15: Tài sản không thỏa bất kỳ căn cứ thanh lý nào trong 3 căn cứ quy định (1. Hết niên hạn sử dụng, 2. Chi phí sửa chữa lũy kế >= 70% nguyên giá, 3. Phiếu bảo dưỡng gần nhất kết luận không thể phục hồi).', 1;
        END

        -- 3. Sinh mã hồ sơ thanh lý tiếp nối
        SET @MaHSTL_Output = 'HSTL-' + CAST(YEAR(GETDATE()) AS VARCHAR) + '-' + RIGHT('0000' + CAST(NEXT VALUE FOR Seq_HSTL AS VARCHAR), 4);

        INSERT INTO HoSoThanhLy (MaHSTL, MaTS, MaNguoiDeXuat, NgayDeXuat, LyDoDeXuat, TrangThai)
        VALUES (@MaHSTL_Output, @MaTS, @MaNguoiDeXuat, GETDATE(), @LyDoDeXuat, N'ChoDuyet');

        -- 4. Chuyển trạng thái máy sang DeXuatThanhLy nếu chưa ở trạng thái này
        IF (@TrangThaiTS <> N'DeXuatThanhLy')
        BEGIN
            EXEC sp_set_session_context 'MaND', @MaNguoiDeXuat;
            EXEC sp_set_session_context 'LyDo', N'Lập hồ sơ đề xuất thanh lý đủ điều kiện BR15';
            
            UPDATE TaiSan SET TrangThai = N'DeXuatThanhLy' WHERE MaTS = @MaTS;

            EXEC sp_set_session_context 'MaND', NULL;
            EXEC sp_set_session_context 'LyDo', NULL;
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        EXEC sp_set_session_context 'MaND', NULL;
        EXEC sp_set_session_context 'MaPM', NULL;
        EXEC sp_set_session_context 'LyDo', NULL;
        THROW;
    END CATCH
END;
GO

-- PROC 10: PHÊ DUYỆT HỒ SƠ THANH LÝ (UC15, HÌNH 10)
CREATE OR ALTER PROCEDURE sp_PheDuyetThanhLy
    @MaHSTL VARCHAR(20),
    @MaNguoiDuyet VARCHAR(20),
    @HanhDong NVARCHAR(20), -- 'Duyet' hoặc 'BacBo'
    @SoQuyetDinh NVARCHAR(50) = NULL,
    @GhiChuDuyet NVARCHAR(255) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- 1. Kiểm tra hồ sơ thanh lý
        DECLARE @MaTS VARCHAR(20), @TrangThaiHS NVARCHAR(20);
        SELECT @MaTS = MaTS, @TrangThaiHS = TrangThai
        FROM HoSoThanhLy WITH (UPDLOCK, HOLDLOCK)
        WHERE MaHSTL = @MaHSTL;

        IF (@TrangThaiHS IS NULL)
        BEGIN
            THROW 50033, N'Hồ sơ thanh lý không tồn tại.', 1;
        END

        IF (@TrangThaiHS <> N'ChoDuyet')
        BEGIN
            THROW 50034, N'Chỉ có thể phê duyệt hoặc bác bỏ hồ sơ thanh lý đang ở trạng thái Chờ duyệt (ChoDuyet).', 1;
        END

        EXEC sp_set_session_context 'MaND', @MaNguoiDuyet;

        IF (@HanhDong = N'Duyet')
        BEGIN
            -- Phê duyệt thanh lý thành công
            UPDATE HoSoThanhLy
            SET TrangThai = N'DaDuyet',
                MaNguoiDuyet = @MaNguoiDuyet,
                NgayDuyet = GETDATE(),
                SoQuyetDinh = @SoQuyetDinh,
                GhiChuDuyet = @GhiChuDuyet
            WHERE MaHSTL = @MaHSTL;

            -- Chuyển trạng thái máy sang DaThanhLy (Trạng thái kết thúc của Hình 10)
            DECLARE @LyDoContext NVARCHAR(255) = N'Lãnh đạo phê duyệt thanh lý theo QĐ: ' + ISNULL(@SoQuyetDinh, N'');
            EXEC sp_set_session_context 'LyDo', @LyDoContext;
            UPDATE TaiSan SET TrangThai = N'DaThanhLy' WHERE MaTS = @MaTS;
        END
        ELSE IF (@HanhDong = N'BacBo')
        BEGIN
            -- Bác bỏ thanh lý
            UPDATE HoSoThanhLy
            SET TrangThai = N'BacBo',
                MaNguoiDuyet = @MaNguoiDuyet,
                NgayDuyet = GETDATE(),
                GhiChuDuyet = @GhiChuDuyet
            WHERE MaHSTL = @MaHSTL;

            -- Phân luồng trả lại trạng thái máy theo hiện trạng kỹ thuật (Hình 10)
            DECLARE @HienTrangHienTai INT, @KetLuanBDGanNhat NVARCHAR(20);
            SELECT @HienTrangHienTai = HienTrang FROM TaiSan WHERE MaTS = @MaTS;
            SELECT TOP 1 @KetLuanBDGanNhat = TrangThaiBaoDuong FROM PhieuBaoDuong WHERE MaTS = @MaTS ORDER BY NgayLapPhieu DESC;

            -- Máy có phiếu bảo dưỡng gần nhất kết luận Không thể sửa thì không quay lại kho chia sẻ (BR12)
            IF (@HienTrangHienTai >= dbo.fn_ThamSo('TS04', 50) AND ISNULL(@KetLuanBDGanNhat, N'') <> N'KhongTheSua')
            BEGIN
                -- Máy còn tốt (>= 50%) -> Phục hồi về SanSangChiaSe
                EXEC sp_set_session_context 'LyDo', N'Bác bỏ thanh lý, máy còn hiện trạng >= 50% đưa về Sẵn sàng chia sẻ (Hình 10)';
                UPDATE TaiSan SET TrangThai = N'SanSangChiaSe' WHERE MaTS = @MaTS;
            END
            ELSE
            BEGIN
                -- Máy xuống cấp (< 50%) hoặc đã kết luận Không thể sửa -> Chuyển về CanBaoDuong
                EXEC sp_set_session_context 'LyDo', N'Bác bỏ thanh lý, máy hiện trạng < 50% hoặc đã kết luận Không thể sửa, chuyển về Cần bảo dưỡng (Hình 10)';
                UPDATE TaiSan SET TrangThai = N'CanBaoDuong' WHERE MaTS = @MaTS;
            END
        END
        ELSE
        BEGIN
            THROW 50035, N'Hành động không hợp lệ. Chỉ chấp nhận Duyet hoặc BacBo.', 1;
        END

        EXEC sp_set_session_context 'MaND', NULL;
        EXEC sp_set_session_context 'LyDo', NULL;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        EXEC sp_set_session_context 'MaND', NULL;
        EXEC sp_set_session_context 'MaPM', NULL;
        EXEC sp_set_session_context 'LyDo', NULL;
        THROW;
    END CATCH
END;
GO

-- PROC 11: QUÉT QUÁ HẠN VÀ TỰ ĐỘNG HỦY PHIẾU (BR14, UC17 - TÁC VỤ NỀN)
CREATE OR ALTER PROCEDURE sp_QuetQuaHan_Va_TuDongHuy_BR14
    @SoLuongPhieuQuaHan INT OUTPUT,
    @SoLuongPhieuTuDongHuy INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- 1. Quét các phiếu đang thực hiện nhưng quá ngày hẹn trả -> Bật cờ CoQuaHan = 1 (BR14)
        UPDATE PhieuMuon
        SET CoQuaHan = 1
        WHERE TrangThai = N'DangThucHien'
          AND NgayHenTra < CAST(GETDATE() AS DATE)
          AND CoQuaHan = 0;

        SET @SoLuongPhieuQuaHan = @@ROWCOUNT;

        -- 2. Tự động hủy các phiếu đã duyệt nhưng người mượn không đến nhận máy (BR-EXTRA-01):
        --    quá TS07 ngày (mặc định 3) kể từ ngày bắt đầu mượn, hoặc đã quá ngày hẹn trả
        UPDATE PhieuMuon
        SET TrangThai = N'DaHuy',
            LyDoHuy = N'Hệ thống tự động hủy do người mượn không đến nhận thiết bị (BR-EXTRA-01)'
        WHERE TrangThai = N'DaDuyet'
          AND (
              NgayHenTra < CAST(GETDATE() AS DATE)
              OR DATEADD(DAY, CAST(dbo.fn_ThamSo('TS07', 3) AS INT), NgayMuon) < CAST(GETDATE() AS DATE)
          );

        SET @SoLuongPhieuTuDongHuy = @@ROWCOUNT;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        EXEC sp_set_session_context 'MaND', NULL;
        EXEC sp_set_session_context 'MaPM', NULL;
        EXEC sp_set_session_context 'LyDo', NULL;
        THROW;
    END CATCH
END;
GO

-- PROC 12: BÁO CÁO CHỈ SỐ CAI VÀ NCAV THEO KỲ BÁO CÁO (BR20 - HÌNH 53 BIỂU ĐỒ HỌC KỲ)
CREATE OR ALTER PROCEDURE sp_BaoCaoCAI_TheoKy
    @TuNgay DATE,
    @DenNgay DATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Đọc động tỷ lệ ngày ngắn hạn (TS01) và số ngày ngưỡng ngắn hạn (TS02) từ ThamSoCAI
    DECLARE @TyLeNganHan DECIMAL(18, 4) = dbo.fn_ThamSo('TS01', 0.015);
    DECLARE @NgayNganHanMax INT = CAST(dbo.fn_ThamSo('TS02', 7) AS INT);

    -- Bảng 1: Chi tiết từng lượt mượn hoàn tất có ngày thu hồi trong kỳ.
    -- Số ngày tính CAI = MIN(số ngày thực tế, số ngày đăng ký): trả trễ không làm tăng giá trị tránh mua (BR18)
    SELECT
        pm.MaPM,
        ct.MaTS,
        ts.TenTS,
        lts.TenLoaiTS,
        pb_sh.TenPB AS DonViSoHuu,
        pb_m.TenPB AS DonViMuon,
        bbg.NgayGiao,
        bbth.NgayThuHoi,
        bbth.SoNgayMuonThucTe,
        dc.D_TinhCAI AS SoNgayTinhCAI,
        CASE
            WHEN dc.D_TinhCAI <= @NgayNganHanMax THEN N'NganHan'
            ELSE N'DaiHan'
        END AS LoaiThoiHanMuon,
        ts.NguyenGia,
        CAST(ROUND(
            CASE
                WHEN dc.D_TinhCAI <= @NgayNganHanMax THEN dc.D_TinhCAI * ts.NguyenGia * @TyLeNganHan
                ELSE ts.NguyenGia
            END, 2) AS DECIMAL(18,2)) AS GiaTriTranhMuaMoi,
        CASE
            WHEN ts.NguyenGia > 0 THEN
                ROUND((
                    CASE
                        WHEN dc.D_TinhCAI <= @NgayNganHanMax THEN dc.D_TinhCAI * ts.NguyenGia * @TyLeNganHan
                        ELSE ts.NguyenGia
                    END
                ) / ts.NguyenGia, 4)
            ELSE 0
        END AS ChiSoCAI_Luot
    FROM PhieuMuon pm
    INNER JOIN ChiTietPhieuMuon ct ON pm.MaPM = ct.MaPM
    INNER JOIN TaiSan ts ON ct.MaTS = ts.MaTS
    INNER JOIN LoaiTaiSan lts ON ts.MaLoaiTS = lts.MaLoaiTS
    INNER JOIN PhongBan pb_sh ON ts.MaPBSoHuu = pb_sh.MaPB
    INNER JOIN PhongBan pb_m ON pm.MaPBMuon = pb_m.MaPB
    INNER JOIN BienBanBanGiao bbg ON pm.MaPM = bbg.MaPM AND bbg.TrangThaiGiao = N'DaGiao'
    INNER JOIN BienBanThuHoi bbth ON pm.MaPM = bbth.MaPM
    CROSS APPLY (
        SELECT CASE
            WHEN bbth.SoNgayMuonThucTe < DATEDIFF(DAY, pm.NgayMuon, pm.NgayHenTra) + 1 THEN bbth.SoNgayMuonThucTe
            ELSE DATEDIFF(DAY, pm.NgayMuon, pm.NgayHenTra) + 1
        END AS D_TinhCAI
    ) dc
    WHERE pm.TrangThai = N'HoanTat'
      AND CAST(bbth.NgayThuHoi AS DATE) >= @TuNgay
      AND CAST(bbth.NgayThuHoi AS DATE) <= @DenNgay;

    -- Bảng 2: Tổng hợp chỉ số hiệu quả kinh tế và giá trị tránh mua ròng (NCAV) của toàn kỳ (Hình 53)
    DECLARE @TongTranhMuaKy DECIMAL(18,2), @TongBaoDuongKy DECIMAL(18,2), @TongBoiThuongKy DECIMAL(18,2);

    SELECT @TongTranhMuaKy = ISNULL(SUM(
        CASE
            WHEN dc.D_TinhCAI <= @NgayNganHanMax THEN dc.D_TinhCAI * ts.NguyenGia * @TyLeNganHan
            ELSE ts.NguyenGia
        END
    ), 0)
    FROM PhieuMuon pm
    INNER JOIN ChiTietPhieuMuon ct ON pm.MaPM = ct.MaPM
    INNER JOIN TaiSan ts ON ct.MaTS = ts.MaTS
    INNER JOIN BienBanBanGiao bbg ON pm.MaPM = bbg.MaPM AND bbg.TrangThaiGiao = N'DaGiao'
    INNER JOIN BienBanThuHoi bbth ON pm.MaPM = bbth.MaPM
    CROSS APPLY (
        SELECT CASE
            WHEN bbth.SoNgayMuonThucTe < DATEDIFF(DAY, pm.NgayMuon, pm.NgayHenTra) + 1 THEN bbth.SoNgayMuonThucTe
            ELSE DATEDIFF(DAY, pm.NgayMuon, pm.NgayHenTra) + 1
        END AS D_TinhCAI
    ) dc
    WHERE pm.TrangThai = N'HoanTat'
      AND CAST(bbth.NgayThuHoi AS DATE) >= @TuNgay
      AND CAST(bbth.NgayThuHoi AS DATE) <= @DenNgay;

    SELECT @TongBaoDuongKy = ISNULL(SUM(ctbd.ThanhTien), 0)
    FROM ChiTietBaoDuong ctbd
    INNER JOIN PhieuBaoDuong pbd ON ctbd.MaPBD = pbd.MaPBD
    WHERE pbd.TrangThaiBaoDuong IN (N'DaNghiemThu', N'KhongTheSua')
      AND CAST(pbd.NgayKetThuc AS DATE) >= @TuNgay
      AND CAST(pbd.NgayKetThuc AS DATE) <= @DenNgay;

    SELECT @TongBoiThuongKy = ISNULL(SUM(ChiPhiBoiThuong), 0)
    FROM LichSuSuCo
    WHERE CAST(NgayPhatSinh AS DATE) >= @TuNgay
      AND CAST(NgayPhatSinh AS DATE) <= @DenNgay;

    SELECT
        @TuNgay AS TuNgay,
        @DenNgay AS DenNgay,
        @TongTranhMuaKy AS TongGiaTriTranhMuaMoi_Ky,
        @TongBaoDuongKy AS TongChiPhiBaoDuong_Ky,
        @TongBoiThuongKy AS TongChiPhiBoiThuong_Ky,
        (@TongTranhMuaKy - @TongBaoDuongKy) AS GiaTriTranhMuaMoiRong_NCAV_Ky,
        CASE
            WHEN @TongBaoDuongKy > 0 THEN ROUND((@TongTranhMuaKy - @TongBaoDuongKy) / @TongBaoDuongKy * 100, 2)
            ELSE NULL
        END AS TySuatHieuQuaKhaiThac_ROI_Ky;
END;
GO

-- PROC 14: THỦ KHO KIỂM NHẬN TÀI SẢN MỚI KHAI BÁO (BR21 - UC12)
-- Thủ kho đối chiếu thực tế, xác nhận hoặc điều chỉnh nguyên giá và hiện trạng:
-- hiện trạng >= TS04 -> Sẵn sàng chia sẻ; dưới ngưỡng -> Cần bảo dưỡng
CREATE OR ALTER PROCEDURE sp_KiemNhanTaiSan_BR21
    @MaTS VARCHAR(20),
    @MaNguoiKiemNhan VARCHAR(20),
    @NguyenGia DECIMAL(18, 2) = NULL,
    @HienTrang INT = NULL,
    @GhiChu NVARCHAR(255) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        DECLARE @TrangThaiTS NVARCHAR(30), @NguyenGiaCu DECIMAL(18, 2), @HienTrangCu INT;
        SELECT @TrangThaiTS = TrangThai, @NguyenGiaCu = NguyenGia, @HienTrangCu = HienTrang
        FROM TaiSan WITH (UPDLOCK, HOLDLOCK)
        WHERE MaTS = @MaTS;

        IF (@TrangThaiTS IS NULL)
        BEGIN
            THROW 50021, N'Tài sản không tồn tại.', 1;
        END

        IF (@TrangThaiTS <> N'Moi')
        BEGIN
            THROW 50058, N'Vi phạm BR21: Chỉ kiểm nhận tài sản đang ở trạng thái Mới.', 1;
        END

        DECLARE @NguyenGiaMoi DECIMAL(18, 2) = ISNULL(@NguyenGia, @NguyenGiaCu);
        DECLARE @HienTrangMoi INT = ISNULL(@HienTrang, @HienTrangCu);
        IF (@NguyenGiaMoi <= 0 OR @HienTrangMoi < 0 OR @HienTrangMoi > 100)
        BEGIN
            THROW 50059, N'Vi phạm BR21: Nguyên giá phải lớn hơn 0 và hiện trạng trong khoảng 0 - 100%.', 1;
        END

        DECLARE @TrangThaiMoi NVARCHAR(30) =
            CASE WHEN @HienTrangMoi >= dbo.fn_ThamSo('TS04', 50) THEN N'SanSangChiaSe' ELSE N'CanBaoDuong' END;
        DECLARE @LyDo NVARCHAR(255) = N'Thủ kho kiểm nhận tài sản (BR21)' + ISNULL(N': ' + @GhiChu, N'');

        EXEC sp_set_session_context 'MaND', @MaNguoiKiemNhan;
        EXEC sp_set_session_context 'LyDo', @LyDo;

        UPDATE TaiSan
        SET NguyenGia = @NguyenGiaMoi,
            HienTrang = @HienTrangMoi,
            TrangThai = @TrangThaiMoi
        WHERE MaTS = @MaTS;

        EXEC sp_set_session_context 'MaND', NULL;
        EXEC sp_set_session_context 'LyDo', NULL;

        COMMIT TRANSACTION;

        SELECT @TrangThaiMoi AS TrangThaiMoi;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        EXEC sp_set_session_context 'MaND', NULL;
        EXEC sp_set_session_context 'MaPM', NULL;
        EXEC sp_set_session_context 'LyDo', NULL;
        THROW;
    END CATCH
END;
GO

-- PROC 13: XÁC THỰC ĐĂNG NHẬP (UC01 - CHẶN TRỰC TIẾP TÀI KHOẢN BỊ KHÓA)
CREATE OR ALTER PROCEDURE sp_DangNhap_XacThuc
    @TenDangNhap VARCHAR(50),
    @MatKhauSHA256 VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    -- Kiểm tra tài khoản tồn tại và khớp mật khẩu
    IF NOT EXISTS (
        SELECT 1 FROM NguoiDung 
        WHERE TenDangNhap = @TenDangNhap AND MatKhau = @MatKhauSHA256
    )
    BEGIN
        THROW 50036, N'Tên đăng nhập hoặc mật khẩu không chính xác.', 1;
    END

    -- Kiểm tra tài khoản có bị khóa không
    IF EXISTS (
        SELECT 1 FROM NguoiDung 
        WHERE TenDangNhap = @TenDangNhap AND MatKhau = @MatKhauSHA256 AND TrangThaiTK = N'Khoa'
    )
    BEGIN
        THROW 50037, N'Tài khoản của bạn hiện đang bị khóa.', 1;
    END

    -- Trả về thông tin người dùng hợp lệ
    SELECT 
        nd.MaND,
        nd.HoTen,
        nd.Email,
        nd.VaiTro,
        nd.TrangThaiTK,
        nd.MaPB,
        pb.TenPB
    FROM NguoiDung nd
    INNER JOIN PhongBan pb ON nd.MaPB = pb.MaPB
    WHERE nd.TenDangNhap = @TenDangNhap AND nd.MatKhau = @MatKhauSHA256 AND nd.TrangThaiTK = N'HoatDong';
END;
GO

-- ==========================================================================================
-- PHẦN 6: NẠP DỮ LIỆU BAN ĐẦU (SEED DATA MẪU PHỤC VỤ DEMO BẢO VỆ ĐỒ ÁN)
-- ==========================================================================================

-- 1. Nạp Phòng Ban
INSERT INTO PhongBan (MaPB, TenPB, DiaDiem, SoDienThoai, TruongDonVi) VALUES
('PB-CNTT', N'Khoa Công nghệ Thông tin', N'Tòa A - Tầng 3', '028-38351056', N'TS. Nguyễn Văn A'),
('PB-MT', N'Khoa Môi trường', N'Tòa B - Tầng 2', '028-38351057', N'PGS.TS. Trần Thị B'),
('PB-TD', N'Khoa Trắc địa - Bản đồ', N'Tòa C - Tầng 1', '028-38351058', N'TS. Lê Văn C'),
('PB-QT', N'Phòng Quản trị Thiết bị', N'Tòa Nhà Hiệu bộ - Tầng 1', '028-38351059', N'ThS. Phạm Trọng D');
GO

-- 2. Nạp Người Dùng (Mật khẩu băm SHA-256 chữ thường chuẩn RFC)
-- Admin@123   -> e86f78a8a3caf0b60d8e74e5942aa6d86dc150cd3c03338aef25b7d2d7e3acc7
-- ThuKho@123  -> 8f5f450f1def47c6b1beabcb445ced26f7798366856de53c35250041b5bfcd3b
-- User@123    -> 3e7c19576488862816f13b512cacf3e4ba97dd97243ea0bd6a2ad1642d86ba72
INSERT INTO NguoiDung (MaND, MaPB, TenDangNhap, MatKhau, HoTen, Email, VaiTro, TrangThaiTK) VALUES
('ND-QT01', 'PB-QT', 'admin', 'e86f78a8a3caf0b60d8e74e5942aa6d86dc150cd3c03338aef25b7d2d7e3acc7', N'Quản trị viên Hệ thống', 'admin@hcmunre.edu.vn', N'QuanTri', N'HoatDong'),
('ND-TK01', 'PB-QT', 'thukho', '8f5f450f1def47c6b1beabcb445ced26f7798366856de53c35250041b5bfcd3b', N'Thủ kho Thiết bị', 'thukho@hcmunre.edu.vn', N'ThuKho', N'HoatDong'),
('ND-GV01', 'PB-CNTT', 'gv_cntt', '3e7c19576488862816f13b512cacf3e4ba97dd97243ea0bd6a2ad1642d86ba72', N'Giảng viên Nguyễn Văn An', 'an.nv@hcmunre.edu.vn', N'NhanVien', N'HoatDong'),
('ND-GV02', 'PB-MT', 'gv_mt', '3e7c19576488862816f13b512cacf3e4ba97dd97243ea0bd6a2ad1642d86ba72', N'Giảng viên Trần Thị Bình', 'binh.tt@hcmunre.edu.vn', N'NhanVien', N'HoatDong'),
('ND-LD01', 'PB-QT', 'lanhdao', '3e7c19576488862816f13b512cacf3e4ba97dd97243ea0bd6a2ad1642d86ba72', N'Lãnh đạo Ban Giám hiệu', 'lanhdao@hcmunre.edu.vn', N'LanhDao', N'HoatDong');
GO

-- 3. Nạp Loại Tài Sản
INSERT INTO LoaiTaiSan (MaLoaiTS, TenLoaiTS, NhomTaiSan, NienHanNam) VALUES
('LOAI-01', N'Máy toàn đạc điện tử', N'DoDac', 10),
('LOAI-02', N'Máy định vị vệ tinh GPS RTK', N'DoDac', 8),
('LOAI-03', N'Máy chiếu hội thảo', N'CNTT', 5),
('LOAI-04', N'Máy tính xách tay chuyên dụng', N'CNTT', 4),
('LOAI-05', N'Máy đo độ ồn đa năng', N'ThietBiChung', 6);
GO

-- 4. Nạp Tham Số CAI (TS01 -> TS07)
INSERT INTO ThamSoCAI (MaThamSo, TenThamSo, GiaTri, DonViTinh) VALUES
('TS01', N'Tỷ lệ giá trị sử dụng ngày ngắn hạn (Giả định A3)', 0.0150, N'%/ngày'),
('TS02', N'Số ngày tối đa tính ngắn hạn (Giả định A3/A4)', 7.0000, N'ngày'),
('TS03', N'Thời hạn mượn tối đa cho một phiếu (BR02)', 30.0000, N'ngày'),
('TS04', N'Ngưỡng hiện trạng tối thiểu đưa vào chia sẻ (BR01)', 50.0000, N'%'),
('TS05', N'Tỷ lệ chi phí bảo dưỡng tối đa trước khi thanh lý (BR15)', 0.7000, N'lần nguyên giá'),
('TS06', N'Hạn ngạch số phiếu mượn chưa hoàn tất tối đa (BR13)', 5.0000, N'phiếu'),
('TS07', N'Số ngày chờ nhận máy trước khi tự hủy phiếu đã duyệt (BR-EXTRA-01)', 3.0000, N'ngày');
GO

-- 5. Nạp Danh Sách Tài Sản Mẫu (TS-0001 -> TS-0006)
INSERT INTO TaiSan (
    MaTS, MaLoaiTS, MaPBSoHuu, TenTS, SoSeri, NguyenGia, NamMua, HienTrang, 
    TrangThai, ViTriLuuTru, DoChinhXac, ChuKyKiemDinh, CauHinhCPU, DungLuongRAM, CongSuat, PhuKienDiKem
) VALUES
('TS-0001', 'LOAI-01', 'PB-TD', N'Máy toàn đạc Leica TS06 Plus', 'SN-LEICA-001', 150000000, 2021, 90, N'SanSangChiaSe', N'Phòng Lab Trắc địa C102', '1.5mm + 2ppm', 12, NULL, NULL, NULL, NULL),
('TS-0002', 'LOAI-03', 'PB-CNTT', N'Máy chiếu Panasonic PT-VX610', 'SN-PANA-992', 25000000, 2022, 85, N'SanSangChiaSe', N'Kho Thiết bị Tòa A', NULL, NULL, NULL, NULL, '320W', N'Dây nguồn, Cáp HDMI, Remote'),
('TS-0003', 'LOAI-02', 'PB-TD', N'Bộ GPS RTK Trimble R10', 'SN-TRIMBLE-88', 120000000, 2020, 80, N'SanSangChiaSe', N'Phòng Lab Trắc địa C102', '8mm + 1ppm', 12, NULL, NULL, NULL, NULL),
('TS-0004', 'LOAI-04', 'PB-CNTT', N'Laptop Dell Precision 7550', 'SN-DELL-7550', 35000000, 2023, 95, N'SanSangChiaSe', N'Văn phòng Khoa CNTT', NULL, NULL, 'Intel Core i7-10875H', '32GB DDR4', NULL, NULL),
('TS-0005', 'LOAI-05', 'PB-MT', N'Máy đo độ ồn Rion NL-52', 'SN-RION-520', 15000000, 2021, 80, N'SanSangChiaSe', N'Phòng Thí nghiệm Môi trường B201', NULL, NULL, NULL, NULL, NULL, N'Đầu lọc gió, Vali chống sốc'),
('TS-0006', 'LOAI-03', 'PB-CNTT', N'Máy chiếu Sony VPL-EX570', 'SN-SONY-570', 18000000, 2019, 45, N'CanBaoDuong', N'Kho Thanh lý Tòa Nhà Hiệu bộ', NULL, NULL, NULL, NULL, '290W', N'Dây nguồn');
GO

-- 6. Nạp Phiếu Mượn Mẫu 1 (Ngắn hạn 6 ngày <= 7 ngày theo BR18, A3: 6 * 25.000.000 * 0.015 = 2.250.000)
INSERT INTO PhieuMuon (MaPM, MaNguoiMuon, MaPBMuon, MaNguoiDuyet, NgayLap, NgayMuon, NgayHenTra, MucDichSuDung, TrangThai, CoQuaHan, NgayDuyet)
VALUES ('PM-2026-0000', 'ND-GV02', 'PB-MT', 'ND-TK01', '2026-03-01 08:00', '2026-03-02', '2026-03-07', N'Mượn máy chiếu phục vụ Hội thảo Môi trường', N'HoanTat', 0, '2026-03-01 14:00');

INSERT INTO ChiTietPhieuMuon (MaPM, MaTS, GhiChuMucDich, TinhTrangTruoc, TinhTrangSau, TyLeHaoMon)
VALUES ('PM-2026-0000', 'TS-0002', N'Máy chiếu chính', N'Máy hoạt động tốt, đủ phụ kiện', N'Tot', 2);

INSERT INTO BienBanBanGiao (MaBBBG, MaPM, MaNguoiGiao, MaNguoiNhan, NgayGiao, PhuKienKemTheo, TrangThaiGiao)
VALUES ('BBBG-2026-0000', 'PM-2026-0000', 'ND-TK01', 'ND-GV02', '2026-03-02 08:30', N'Đầy đủ túi đựng, cáp nguồn, cáp HDMI', N'DaGiao');

INSERT INTO BienBanThuHoi (MaBBTH, MaPM, MaNguoiThuHoi, MaNguoiTra, NgayThuHoi, SoNgayMuonThucTe, GhiChu)
VALUES ('BBTH-2026-0000', 'PM-2026-0000', 'ND-TK01', 'ND-GV02', '2026-03-07 16:00', 6, N'Thiết bị trả nguyên vẹn, hoạt động bình thường');
GO

-- 7. Nạp Phiếu Mượn Mẫu 2 (Dài hạn 10 ngày >= 8 ngày theo BR19, A4: 100% * 150.000.000 = 150.000.000)
INSERT INTO PhieuMuon (MaPM, MaNguoiMuon, MaPBMuon, MaNguoiDuyet, NgayLap, NgayMuon, NgayHenTra, MucDichSuDung, TrangThai, CoQuaHan, NgayDuyet)
VALUES ('PM-2026-0001', 'ND-GV01', 'PB-CNTT', 'ND-TK01', '2026-03-10 09:00', '2026-03-11', '2026-03-20', N'Mượn máy toàn đạc phục vụ đề tài nghiên cứu số hóa 3D', N'HoanTat', 0, '2026-03-10 16:00');

INSERT INTO ChiTietPhieuMuon (MaPM, MaTS, GhiChuMucDich, TinhTrangTruoc, TinhTrangSau, TyLeHaoMon)
VALUES ('PM-2026-0001', 'TS-0001', N'Máy đo trắc địa', N'Máy hoạt động chuẩn xác', N'Tot', 3);

INSERT INTO BienBanBanGiao (MaBBBG, MaPM, MaNguoiGiao, MaNguoiNhan, NgayGiao, PhuKienKemTheo, TrangThaiGiao)
VALUES ('BBBG-2026-0001', 'PM-2026-0001', 'ND-TK01', 'ND-GV01', '2026-03-11 08:00', N'Đầy đủ chân máy, sạc, pin', N'DaGiao');

INSERT INTO BienBanThuHoi (MaBBTH, MaPM, MaNguoiThuHoi, MaNguoiTra, NgayThuHoi, SoNgayMuonThucTe, GhiChu)
VALUES ('BBTH-2026-0001', 'PM-2026-0001', 'ND-TK01', 'ND-GV01', '2026-03-20 17:00', 10, N'Thu hồi thiết bị nguyên vẹn, bàn giao kho đúng hạn');
GO

-- 8. Nạp Phiếu Bảo Dưỡng Mẫu Đã Nghiệm Thu Cho TS-0005 (Chi phí 2.500.000)
INSERT INTO PhieuBaoDuong (MaPBD, MaTS, MaNguoiLap, NgayLapPhieu, DonViSuaChua, NoiDungSuaChua, TrangThaiBaoDuong, NgayKetThuc, HienTrangSauSuaChua)
VALUES ('PBD-2026-0000', 'TS-0005', 'ND-TK01', '2026-02-15 09:00', N'Trung tâm Hiệu chuẩn Thiết bị Đo lường Sài Gòn', N'Thay màng lọc cảm biến âm thanh và cân chỉnh độ nhạy', N'DaNghiemThu', '2026-02-20 15:00', 80);

INSERT INTO ChiTietBaoDuong (MaPBD, HangMucSuaChua, LinhKienThayThe, DonGia, SoLuong) VALUES
('PBD-2026-0000', N'Thay màng lọc cảm biến micro', N'Màng lọc chuyên dụng Rion', 1500000, 1),
('PBD-2026-0000', N'Công dịch vụ hiệu chuẩn và vệ sinh mạch', NULL, 1000000, 1);
GO

-- Cập nhật lại các sequence sau khi nạp mẫu
ALTER SEQUENCE Seq_PhieuMuon RESTART WITH 3;
ALTER SEQUENCE Seq_BBBG RESTART WITH 3;
ALTER SEQUENCE Seq_BBTH RESTART WITH 3;
ALTER SEQUENCE Seq_PBD RESTART WITH 2;
GO

PRINT N'Cơ sở dữ liệu ENV09_QuanLyTaiSan phiên bản V5.1 đã được thiết lập hoàn tất và chuẩn xác 100%!';
GO
