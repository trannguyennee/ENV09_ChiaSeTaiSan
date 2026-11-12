package com.env09.quanlytaisan.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;
import java.util.List;

public class BanGiaoRequest {
    private String maPM;
    private String maNguoiGiao;
    private String maNguoiNhan;
    private String phuKienKemTheo;
    private String trangThaiGiao; // 'DaGiao' hoặc 'Huy' (BR06)
    private String lyDoHuy;       // Lý do hủy bàn giao (khi TrangThaiGiao = Huy)
    private List<ChiTietBanGiaoItem> danhSachGiao;

    public String getLyDoHuy() { return lyDoHuy; }
    public void setLyDoHuy(String lyDoHuy) { this.lyDoHuy = lyDoHuy; }

    public BanGiaoRequest() {}

    public static class ChiTietBanGiaoItem {
        @JsonProperty("MaTS")
        private String maTS;

        @JsonProperty("TinhTrangTruoc")
        private String tinhTrangTruoc;

        @JsonProperty("CoLoiNgoaiQuan")
        private Boolean coLoiNgoaiQuan = false;

        @JsonProperty("MoTaLoi")
        private String moTaLoi;

        public ChiTietBanGiaoItem() {}

        public String getMaTS() { return maTS; }
        public void setMaTS(String maTS) { this.maTS = maTS; }

        public String getTinhTrangTruoc() { return tinhTrangTruoc; }
        public void setTinhTrangTruoc(String tinhTrangTruoc) { this.tinhTrangTruoc = tinhTrangTruoc; }

        public Boolean getCoLoiNgoaiQuan() { return coLoiNgoaiQuan; }
        public void setCoLoiNgoaiQuan(Boolean coLoiNgoaiQuan) { this.coLoiNgoaiQuan = coLoiNgoaiQuan; }

        public String getMoTaLoi() { return moTaLoi; }
        public void setMoTaLoi(String moTaLoi) { this.moTaLoi = moTaLoi; }

        // Tương thích ngược
        public String getMoTaHuHong() { return moTaLoi; }
        public void setMoTaHuHong(String moTaHuHong) { this.moTaLoi = moTaHuHong; }
    }

    public String getMaPM() { return maPM; }
    public void setMaPM(String maPM) { this.maPM = maPM; }

    public String getMaNguoiGiao() { return maNguoiGiao; }
    public void setMaNguoiGiao(String maNguoiGiao) { this.maNguoiGiao = maNguoiGiao; }

    public String getMaNguoiNhan() { return maNguoiNhan; }
    public void setMaNguoiNhan(String maNguoiNhan) { this.maNguoiNhan = maNguoiNhan; }

    public String getPhuKienKemTheo() { return phuKienKemTheo; }
    public void setPhuKienKemTheo(String phuKienKemTheo) { this.phuKienKemTheo = phuKienKemTheo; }

    public String getTrangThaiGiao() { return trangThaiGiao; }
    public void setTrangThaiGiao(String trangThaiGiao) { this.trangThaiGiao = trangThaiGiao; }

    public List<ChiTietBanGiaoItem> getDanhSachGiao() { return danhSachGiao; }
    public void setDanhSachGiao(List<ChiTietBanGiaoItem> danhSachGiao) { this.danhSachGiao = danhSachGiao; }
}
