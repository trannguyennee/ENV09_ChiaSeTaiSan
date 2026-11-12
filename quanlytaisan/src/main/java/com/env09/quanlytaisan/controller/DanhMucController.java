package com.env09.quanlytaisan.controller;

import com.env09.quanlytaisan.dto.ApiResponse;
import com.env09.quanlytaisan.entity.*;
import com.env09.quanlytaisan.service.DanhMucService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/danh-muc")
@CrossOrigin("*")
@Tag(name = "6. Danh mục & Quản trị hệ thống", description = "Các API phục vụ UC02 (Phòng ban), UC03 (Loại tài sản), UC04 (Người dùng, Phân quyền & Tham số CAI)")
public class DanhMucController {

    @Autowired
    private DanhMucService danhMucService;

    // UC02: Phòng ban
    @GetMapping("/phong-ban")
    @Operation(summary = "Lấy danh sách tất cả các phòng ban / khoa đào tạo (UC02)")
    public ApiResponse<List<PhongBan>> getAllPhongBan() {
        return ApiResponse.thanhCong("Lấy danh sách phòng ban thành công!", danhMucService.getAllPhongBan());
    }

    @PostMapping("/phong-ban")
    @Operation(summary = "Thêm mới phòng ban / khoa đào tạo (UC02)")
    public ApiResponse<PhongBan> themPhongBan(@RequestBody PhongBan phongBan) {
        return ApiResponse.thanhCong("Thêm phòng ban mới thành công!", danhMucService.themPhongBan(phongBan));
    }

    // UC03: Loại tài sản
    @GetMapping("/loai-tai-san")
    @Operation(summary = "Lấy danh mục các loại tài sản theo nhóm (UC03)")
    public ApiResponse<List<LoaiTaiSan>> getAllLoaiTaiSan() {
        return ApiResponse.thanhCong("Lấy danh mục loại tài sản thành công!", danhMucService.getAllLoaiTaiSan());
    }

    @PostMapping("/loai-tai-san")
    @Operation(summary = "Thêm mới loại tài sản (UC03)")
    public ApiResponse<LoaiTaiSan> themLoaiTaiSan(@RequestBody LoaiTaiSan loaiTaiSan) {
        return ApiResponse.thanhCong("Thêm loại tài sản mới thành công!", danhMucService.themLoaiTaiSan(loaiTaiSan));
    }

    // UC04: Người dùng & Phân quyền
    @GetMapping("/nguoi-dung")
    @Operation(summary = "Lấy danh sách người dùng / tài khoản cán bộ trong hệ thống (UC04)")
    public ApiResponse<List<NguoiDung>> getAllNguoiDung() {
        return ApiResponse.thanhCong("Lấy danh sách người dùng thành công!", danhMucService.getAllNguoiDung());
    }

    @PostMapping("/nguoi-dung")
    @Operation(summary = "Cấp phát tài khoản mới cho cán bộ/giáo viên (UC04)")
    public ApiResponse<NguoiDung> themNguoiDung(@RequestBody NguoiDung nguoiDung) {
        return ApiResponse.thanhCong("Cấp phát tài khoản người dùng thành công!", danhMucService.themNguoiDung(nguoiDung));
    }

    @PutMapping("/nguoi-dung/{maND}/trang-thai")
    @Operation(summary = "Khóa hoặc Mở khóa tài khoản người dùng (UC04)")
    public ApiResponse<NguoiDung> toggleTrangThaiNguoiDung(@PathVariable String maND) {
        NguoiDung nd = danhMucService.toggleTrangThaiNguoiDung(maND);
        if (nd == null) {
            return ApiResponse.thatBai("Không tìm thấy người dùng!");
        }
        return ApiResponse.thanhCong("Cập nhật trạng thái tài khoản thành công!", nd);
    }

    // UC04: Tham số kinh tế CAI
    @GetMapping("/tham-so-cai")
    @Operation(summary = "Lấy danh sách 7 tham số tính toán CAI (TS01 - TS07)")
    public ApiResponse<List<ThamSoCAI>> getAllThamSoCAI() {
        return ApiResponse.thanhCong("Lấy danh sách tham số CAI thành công!", danhMucService.getAllThamSoCAI());
    }

    @PutMapping("/tham-so-cai/{maThamSo}")
    @Operation(summary = "Cập nhật giá trị tham số mềm TS01 - TS07 (UC04 - BR-EXTRA-02)")
    public ApiResponse<ThamSoCAI> capNhatThamSoCAI(@PathVariable String maThamSo, @RequestParam BigDecimal giaTri) {
        ThamSoCAI ts = danhMucService.capNhatThamSoCAI(maThamSo, giaTri);
        if (ts == null) {
            return ApiResponse.thatBai("Không tìm thấy tham số CAI!");
        }
        return ApiResponse.thanhCong("Cập nhật tham số CAI thành công!", ts);
    }

    // Vòng đời tài sản (Hình 10)
    @GetMapping("/lich-su-tai-san/{maTS}")
    @Operation(summary = "Xem toàn bộ lịch sử biến động trạng thái vòng đời của một tài sản (Hình 10)")
    public ApiResponse<List<LichSuTrangThaiTaiSan>> getLichSuByMaTS(@PathVariable String maTS) {
        return ApiResponse.thanhCong("Lấy lịch sử tài sản thành công!", danhMucService.getLichSuByMaTS(maTS));
    }
}
