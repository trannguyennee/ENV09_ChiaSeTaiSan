package com.env09.quanlytaisan.config;

import com.env09.quanlytaisan.dto.ApiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Set;

/**
 * Kiểm tra token đăng nhập và phân quyền theo vai trò cho toàn bộ /api/** (UC01, UC04).
 * Ma trận quyền bám theo Actor của từng Use Case trong Mục 2.3 báo cáo.
 */
@Component
public class XacThucInterceptor implements HandlerInterceptor {

    public static final String THUOC_TINH_NGUOI_DUNG = "nguoiDungPhien";

    private static final String NV = "NhanVien", TK = "ThuKho", QT = "QuanTri", LD = "LanhDao";

    private record QuyTac(String method, String tienTo, Set<String> vaiTro) {}

    // Quy tắc được duyệt theo thứ tự, quy tắc khớp đầu tiên được áp dụng
    private static final List<QuyTac> MA_TRAN_QUYEN = List.of(
            new QuyTac("POST", "/api/tai-san/khai-bao", Set.of(NV, TK)),                 // UC05
            new QuyTac("POST", "/api/tai-san/kiem-nhan", Set.of(TK)),                    // UC12 - BR21
            new QuyTac("POST", "/api/tai-san/de-xuat-thanh-ly", Set.of(TK)),             // UC14
            new QuyTac("POST", "/api/phieu-muon/lap-yeu-cau", Set.of(NV)),               // UC08
            new QuyTac("POST", "/api/phieu-muon/duyet", Set.of(TK)),                     // UC09
            new QuyTac("POST", "/api/phieu-muon/huy", Set.of(NV, TK, QT)),               // UC08 extend - BR17
            new QuyTac("POST", "/api/giao-nhan/", Set.of(TK)),                           // UC10, UC11
            new QuyTac("POST", "/api/bao-duong/", Set.of(TK)),                           // UC13
            new QuyTac("POST", "/api/thanh-ly/de-xuat", Set.of(TK)),                     // UC14
            new QuyTac("POST", "/api/thanh-ly/phe-duyet", Set.of(LD)),                   // UC14
            new QuyTac("POST", "/api/he-thong/", Set.of(TK, QT)),                        // UC17 (kích hoạt thủ công)
            new QuyTac("GET", "/api/bao-cao-cai/", Set.of(LD, TK)),                      // UC15, UC16
            new QuyTac("GET", "/api/danh-muc/nguoi-dung", Set.of(QT)),                   // UC04
            new QuyTac("POST", "/api/danh-muc/", Set.of(QT)),                            // UC02, UC03, UC04
            new QuyTac("PUT", "/api/danh-muc/", Set.of(QT))                              // UC04
    );

    @Autowired
    private PhienDangNhapService phienDangNhapService;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (HttpMethod.OPTIONS.matches(request.getMethod())) {
            return true;
        }

        String header = request.getHeader("Authorization");
        String token = (header != null && header.startsWith("Bearer ")) ? header.substring(7).trim() : null;
        PhienDangNhapService.NguoiDungPhien nguoiDung = phienDangNhapService.layNguoiDung(token);
        if (nguoiDung == null) {
            return tuChoi(response, HttpServletResponse.SC_UNAUTHORIZED, "Phiên đăng nhập không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại!");
        }

        String uri = request.getRequestURI();
        String method = request.getMethod();
        for (QuyTac quyTac : MA_TRAN_QUYEN) {
            if (quyTac.method().equals(method) && uri.startsWith(quyTac.tienTo())) {
                if (!quyTac.vaiTro().contains(nguoiDung.vaiTro())) {
                    return tuChoi(response, HttpServletResponse.SC_FORBIDDEN,
                            "Vai trò " + nguoiDung.vaiTro() + " không có quyền thực hiện chức năng này.");
                }
                break;
            }
        }

        request.setAttribute(THUOC_TINH_NGUOI_DUNG, nguoiDung);
        return true;
    }

    private boolean tuChoi(HttpServletResponse response, int status, String thongBao) throws Exception {
        response.setStatus(status);
        response.setContentType("application/json");
        response.setCharacterEncoding(StandardCharsets.UTF_8.name());
        response.getWriter().write(objectMapper.writeValueAsString(ApiResponse.thatBai(thongBao)));
        return false;
    }
}
