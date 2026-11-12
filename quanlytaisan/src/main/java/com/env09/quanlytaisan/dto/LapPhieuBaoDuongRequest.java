package com.env09.quanlytaisan.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;
import java.util.List;

public class LapPhieuBaoDuongRequest {
    private String maTS;
    private String maNguoiLap;
    private String donViSuaChua;
    private String noiDungSuaChua;
    private List<ChiTietHangMucItem> danhSachHangMuc;

    public LapPhieuBaoDuongRequest() {}

    public static class ChiTietHangMucItem {
        @JsonProperty("HangMucSuaChua")
        private String hangMucSuaChua;

        @JsonProperty("LinhKienThayThe")
        private String linhKienThayThe;

        @JsonProperty("DonGia")
        private BigDecimal donGia;

        @JsonProperty("SoLuong")
        private Integer soLuong;

        public ChiTietHangMucItem() {}

        public String getHangMucSuaChua() { return hangMucSuaChua; }
        public void setHangMucSuaChua(String hangMucSuaChua) { this.hangMucSuaChua = hangMucSuaChua; }

        public String getLinhKienThayThe() { return linhKienThayThe; }
        public void setLinhKienThayThe(String linhKienThayThe) { this.linhKienThayThe = linhKienThayThe; }

        public BigDecimal getDonGia() { return donGia; }
        public void setDonGia(BigDecimal donGia) { this.donGia = donGia; }

        public Integer getSoLuong() { return soLuong; }
        public void setSoLuong(Integer soLuong) { this.soLuong = soLuong; }
    }

    public String getMaTS() { return maTS; }
    public void setMaTS(String maTS) { this.maTS = maTS; }

    public String getMaNguoiLap() { return maNguoiLap; }
    public void setMaNguoiLap(String maNguoiLap) { this.maNguoiLap = maNguoiLap; }

    public String getDonViSuaChua() { return donViSuaChua; }
    public void setDonViSuaChua(String donViSuaChua) { this.donViSuaChua = donViSuaChua; }

    public String getNoiDungSuaChua() { return noiDungSuaChua; }
    public void setNoiDungSuaChua(String noiDungSuaChua) { this.noiDungSuaChua = noiDungSuaChua; }

    public List<ChiTietHangMucItem> getDanhSachHangMuc() { return danhSachHangMuc; }
    public void setDanhSachHangMuc(List<ChiTietHangMucItem> danhSachHangMuc) { this.danhSachHangMuc = danhSachHangMuc; }
}
