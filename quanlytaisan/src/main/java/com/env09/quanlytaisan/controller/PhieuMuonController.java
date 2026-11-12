package com.env09.quanlytaisan.controller;

import com.env09.quanlytaisan.config.PhienDangNhapService.NguoiDungPhien;
import com.env09.quanlytaisan.config.XacThucInterceptor;
import com.env09.quanlytaisan.dto.ApiResponse;
import com.env09.quanlytaisan.dto.DuyetPhieuRequest;
import com.env09.quanlytaisan.dto.LapPhieuMuonRequest;
import com.env09.quanlytaisan.entity.ChiTietPhieuMuon;
import com.env09.quanlytaisan.entity.PhieuMuon;
import com.env09.quanlytaisan.service.PhieuMuonService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/phieu-muon")
@CrossOrigin("*")
@Tag(name = "2. Phiếu mượn & Phê duyệt", description = "Các API phục vụ UC08, UC09 và Quy tắc BR02, BR04, BR13, BR17")
public class PhieuMuonController {

    @Autowired
    private PhieuMuonService phieuMuonService;

    @PostMapping("/lap-yeu-cau")
    @Operation(summary = "Lập yêu cầu mượn tài sản (UC08 & BR02, BR03, BR05, BR13: tối đa 30 ngày, tối đa 5 phiếu chưa hoàn tất / phòng ban)")
    public ApiResponse<String> lapYeuCauMuon(@RequestBody LapPhieuMuonRequest request,
                                             @RequestAttribute(XacThucInterceptor.THUOC_TINH_NGUOI_DUNG) NguoiDungPhien nguoiDung) {
        // Người mượn và đơn vị mượn luôn lấy từ phiên đăng nhập, không tin dữ liệu client gửi lên
        request.setMaNDMuon(nguoiDung.maND());
        request.setMaPBMuon(nguoiDung.maPB());
        return phieuMuonService.lapYeuCauMuon(request);
    }

    @PostMapping("/duyet")
    @Operation(summary = "Thủ kho phê duyệt hoặc từ chối phiếu mượn (UC09 & BR04)")
    public ApiResponse<String> duyetPhieuMuon(@RequestBody DuyetPhieuRequest request,
                                              @RequestAttribute(XacThucInterceptor.THUOC_TINH_NGUOI_DUNG) NguoiDungPhien nguoiDung) {
        request.setMaNguoiDuyet(nguoiDung.maND());
        return phieuMuonService.duyetPhieuMuon(request);
    }

    @PostMapping("/huy")
    @Operation(summary = "Người mượn tự hủy phiếu mượn khi đang chờ duyệt (BR17)")
    public ApiResponse<String> huyPhieuMuon(
            @RequestParam String maPM,
            @RequestParam String lyDoHuy,
            @RequestAttribute(XacThucInterceptor.THUOC_TINH_NGUOI_DUNG) NguoiDungPhien nguoiDung
    ) {
        return phieuMuonService.huyPhieuMuonChoDuyet(maPM, nguoiDung.maND(), lyDoHuy);
    }

    @GetMapping
    @Operation(summary = "Xem toàn bộ phiếu mượn")
    public ApiResponse<List<PhieuMuon>> getAllPhieuMuon() {
        return ApiResponse.thanhCong("Lấy danh sách phiếu mượn thành công!", phieuMuonService.getAllPhieuMuon());
    }

    @GetMapping("/phong-ban/{maPB}")
    @Operation(summary = "Lấy phiếu mượn theo phòng ban")
    public ApiResponse<List<PhieuMuon>> getByPhongBan(@PathVariable String maPB) {
        return ApiResponse.thanhCong("Lấy phiếu mượn theo phòng ban thành công!", phieuMuonService.getPhieuMuonByPhongBan(maPB));
    }

    @GetMapping("/chi-tiet")
    @Operation(summary = "Lấy toàn bộ chi tiết thiết bị của các phiếu mượn (một phiếu nhiều thiết bị)")
    public ApiResponse<List<ChiTietPhieuMuon>> getAllChiTiet() {
        return ApiResponse.thanhCong("Lấy chi tiết phiếu mượn thành công!", phieuMuonService.getAllChiTiet());
    }

    @GetMapping("/{maPM}/chi-tiet")
    @Operation(summary = "Lấy danh sách thiết bị thuộc một phiếu mượn (phục vụ bàn giao / thu hồi từng máy)")
    public ApiResponse<List<ChiTietPhieuMuon>> getChiTietByMaPM(@PathVariable String maPM) {
        return ApiResponse.thanhCong("Lấy chi tiết phiếu mượn thành công!", phieuMuonService.getChiTietByMaPM(maPM));
    }
}
