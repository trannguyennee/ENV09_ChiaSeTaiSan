package com.env09.quanlytaisan.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class KiemNhanTaiSanRequest {
    private String maTS;            // Tài sản đang ở trạng thái Mới
    private BigDecimal nguyenGia;   // Nguyên giá xác nhận (để trống thì giữ giá đã khai báo)
    private Integer hienTrang;      // Hiện trạng xác nhận (%) (để trống thì giữ giá trị đã khai báo)
    private String ghiChu;          // Ghi chú kiểm nhận
}
