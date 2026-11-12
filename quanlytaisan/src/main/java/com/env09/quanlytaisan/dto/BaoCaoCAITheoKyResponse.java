package com.env09.quanlytaisan.dto;

import lombok.*;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BaoCaoCAITheoKyResponse {
    private List<Map<String, Object>> danhSachChiTiet;
    private Map<String, Object> tongHopKy;
}
