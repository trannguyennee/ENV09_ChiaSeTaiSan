package com.env09.quanlytaisan.dto;

import lombok.Data;

@Data
public class NghiemThuBaoDuongRequest {
    private String maPBD;              // Mã phiếu bảo dưỡng
    private String maNguoiNghiemThu;   // Mã người nghiệm thu (Thủ kho)
    private String donViSuaChua;       // Đơn vị sửa chữa ngoài (BR11)
    private String noiDungSuaChua;     // Nội dung kỹ thuật đã xử lý (BR11)
    private Integer hienTrangSauSuaChua; // Hiện trạng kỹ thuật sau sửa (0-100%) (BR12)
    private String ketLuan;            // 'Dat' (về SanSangChiaSe) hoặc 'KhongTheSua' (sang DeXuatThanhLy)
}
