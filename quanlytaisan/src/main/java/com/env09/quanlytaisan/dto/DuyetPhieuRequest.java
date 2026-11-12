package com.env09.quanlytaisan.dto;

public class DuyetPhieuRequest {
    private String maPM;
    private String maNguoiDuyet;
    private String hanhDong; // 'Duyet' hoặc 'TuChoi'
    private String lyDoTuChoi;
    private String ghiChuDuyet; // Tương thích ngược

    public DuyetPhieuRequest() {}

    public String getMaPM() { return maPM; }
    public void setMaPM(String maPM) { this.maPM = maPM; }

    public String getMaNguoiDuyet() { return maNguoiDuyet; }
    public void setMaNguoiDuyet(String maNguoiDuyet) { this.maNguoiDuyet = maNguoiDuyet; }

    public String getHanhDong() { return hanhDong; }
    public void setHanhDong(String hanhDong) { this.hanhDong = hanhDong; }

    public String getLyDoTuChoi() {
        if (lyDoTuChoi != null && !lyDoTuChoi.isBlank()) return lyDoTuChoi;
        return ghiChuDuyet;
    }
    public void setLyDoTuChoi(String lyDoTuChoi) { this.lyDoTuChoi = lyDoTuChoi; }

    public String getGhiChuDuyet() { return getLyDoTuChoi(); }
    public void setGhiChuDuyet(String ghiChuDuyet) { this.ghiChuDuyet = ghiChuDuyet; }
}
