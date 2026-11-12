package com.env09.quanlytaisan.dto;

public class PheDuyetThanhLyRequest {
    private String maHSTL;
    private String maNguoiDuyet;
    private String hanhDong; // 'Duyet' hoặc 'BacBo'
    private String soQuyetDinh;
    private String ghiChuDuyet;

    public PheDuyetThanhLyRequest() {}

    public String getMaHSTL() { return maHSTL; }
    public void setMaHSTL(String maHSTL) { this.maHSTL = maHSTL; }

    public String getMaNguoiDuyet() { return maNguoiDuyet; }
    public void setMaNguoiDuyet(String maNguoiDuyet) { this.maNguoiDuyet = maNguoiDuyet; }

    public String getHanhDong() { return hanhDong; }
    public void setHanhDong(String hanhDong) { this.hanhDong = hanhDong; }

    public String getSoQuyetDinh() { return soQuyetDinh; }
    public void setSoQuyetDinh(String soQuyetDinh) { this.soQuyetDinh = soQuyetDinh; }

    public String getGhiChuDuyet() { return ghiChuDuyet; }
    public void setGhiChuDuyet(String ghiChuDuyet) { this.ghiChuDuyet = ghiChuDuyet; }
}
