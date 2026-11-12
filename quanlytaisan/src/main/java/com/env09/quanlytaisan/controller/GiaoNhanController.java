package com.env09.quanlytaisan.controller;

import com.env09.quanlytaisan.config.PhienDangNhapService.NguoiDungPhien;
import com.env09.quanlytaisan.config.XacThucInterceptor;
import com.env09.quanlytaisan.dto.ApiResponse;
import com.env09.quanlytaisan.dto.BanGiaoRequest;
import com.env09.quanlytaisan.dto.ThuHoiRequest;
import com.env09.quanlytaisan.service.GiaoNhanService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/giao-nhan")
@CrossOrigin("*")
@Tag(name = "3. Bàn giao & Thu hồi", description = "Các API phục vụ UC10, UC11 và Quy tắc BR06, BR07, BR08, BR09")
public class GiaoNhanController {

    @Autowired
    private GiaoNhanService giaoNhanService;

    @PostMapping("/ban-giao")
    @Operation(summary = "Lập biên bản bàn giao và xuất kho (UC10 & BR06, BR07). TrangThaiGiao: DaGiao hoặc Huy")
    public ApiResponse<String> banGiao(@RequestBody BanGiaoRequest request,
                                       @RequestAttribute(XacThucInterceptor.THUOC_TINH_NGUOI_DUNG) NguoiDungPhien nguoiDung) {
        request.setMaNguoiGiao(nguoiDung.maND());
        return giaoNhanService.lapBienBanBanGiao(request);
    }

    @PostMapping("/thu-hoi")
    @Operation(summary = "Lập biên bản thu hồi, trừ hao mòn và phân luồng trạng thái từng máy (UC11 & BR08, BR09)")
    public ApiResponse<String> thuHoi(@RequestBody ThuHoiRequest request,
                                      @RequestAttribute(XacThucInterceptor.THUOC_TINH_NGUOI_DUNG) NguoiDungPhien nguoiDung) {
        request.setMaNguoiThuHoi(nguoiDung.maND());
        return giaoNhanService.lapBienBanThuHoi(request);
    }
}
