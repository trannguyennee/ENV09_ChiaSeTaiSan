package com.env09.quanlytaisan.dto;

public class DeXuatThanhLyRequest {
    private String maTS;
    private String maNguoiDeXuat;
    private String lyDoDeXuat;

    public DeXuatThanhLyRequest() {}

    public String getMaTS() { return maTS; }
    public void setMaTS(String maTS) { this.maTS = maTS; }

    public String getMaNguoiDeXuat() { return maNguoiDeXuat; }
    public void setMaNguoiDeXuat(String maNguoiDeXuat) { this.maNguoiDeXuat = maNguoiDeXuat; }

    public String getLyDoDeXuat() { return lyDoDeXuat; }
    public void setLyDoDeXuat(String lyDoDeXuat) { this.lyDoDeXuat = lyDoDeXuat; }
}
