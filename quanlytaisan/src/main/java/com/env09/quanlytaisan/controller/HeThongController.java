package com.env09.quanlytaisan.controller;

import com.env09.quanlytaisan.dto.ApiResponse;
import com.env09.quanlytaisan.service.HeThongService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/he-thong")
@CrossOrigin("*")
@Tag(name = "7. Quản trị & Tự động hóa hệ thống", description = "Các API tác vụ nền: Quét quá hạn và tự động hủy (BR14, UC17)")
public class HeThongController {

    @Autowired
    private HeThongService heThongService;

    @PostMapping("/quet-qua-han")
    @Operation(summary = "Kích hoạt quét quá hạn: Đánh dấu CoQuaHan=1 nếu quá ngày trả, Tự động hủy nếu quá hạn nhận máy (BR14)")
    public ApiResponse<Map<String, Object>> quetQuaHanVaTuDongHuy() {
        return heThongService.quetQuaHanVaTuDongHuy();
    }
}
