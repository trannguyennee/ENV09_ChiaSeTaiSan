package com.env09.quanlytaisan.controller;

import com.env09.quanlytaisan.config.PhienDangNhapService.NguoiDungPhien;
import com.env09.quanlytaisan.config.XacThucInterceptor;
import com.env09.quanlytaisan.dto.ApiResponse;
import com.env09.quanlytaisan.dto.DeXuatThanhLyRequest;
import com.env09.quanlytaisan.dto.PheDuyetThanhLyRequest;
import com.env09.quanlytaisan.entity.HoSoThanhLy;
import com.env09.quanlytaisan.service.ThanhLyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/thanh-ly")
@CrossOrigin("*")
@Tag(name = "5. Quản lý Hồ sơ Thanh lý", description = "Các API phục vụ UC14 và Quy tắc BR15 (3 căn cứ thanh lý)")
public class ThanhLyController {

    @Autowired
    private ThanhLyService thanhLyService;

    @PostMapping("/de-xuat")
    @Operation(summary = "Thủ kho lập hồ sơ đề xuất thanh lý tài sản, kiểm tra tự động 3 căn cứ BR15 (sp_DeXuatThanhLy_BR15)")
    public ApiResponse<String> deXuatThanhLy(@RequestBody DeXuatThanhLyRequest req,
                                             @RequestAttribute(XacThucInterceptor.THUOC_TINH_NGUOI_DUNG) NguoiDungPhien nguoiDung) {
        req.setMaNguoiDeXuat(nguoiDung.maND());
        return thanhLyService.deXuatThanhLy(req);
    }

    @PostMapping("/phe-duyet")
    @Operation(summary = "Lãnh đạo đơn vị phê duyệt hoặc bác bỏ hồ sơ thanh lý (sp_PheDuyetThanhLy)")
    public ApiResponse<String> pheDuyetThanhLy(@RequestBody PheDuyetThanhLyRequest req,
                                               @RequestAttribute(XacThucInterceptor.THUOC_TINH_NGUOI_DUNG) NguoiDungPhien nguoiDung) {
        req.setMaNguoiDuyet(nguoiDung.maND());
        return thanhLyService.pheDuyetThanhLy(req);
    }

    @GetMapping("/danh-sach")
    @Operation(summary = "Lấy danh sách toàn bộ hồ sơ thanh lý trong hệ thống")
    public ApiResponse<List<HoSoThanhLy>> getAllHoSoThanhLy() {
        return ApiResponse.thanhCong("Lấy danh sách hồ sơ thanh lý thành công!", thanhLyService.getAllHoSoThanhLy());
    }
}
