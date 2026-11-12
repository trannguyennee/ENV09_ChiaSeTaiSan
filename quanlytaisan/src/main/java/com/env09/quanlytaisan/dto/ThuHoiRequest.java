package com.env09.quanlytaisan.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;
import java.util.List;

public class ThuHoiRequest {
    private String maPM;
    private String maNguoiThuHoi;
    private String maNguoiTra;
    private String ghiChu;
    private String danhGiaChung; // Tương thích ngược
    private List<ChiTietThuHoiItem> danhSachThuHoi;

    public ThuHoiRequest() {}

    public static class ChiTietThuHoiItem {
        @JsonProperty("MaTS")
        private String maTS;

        @JsonProperty("TinhTrangSau")
        private String tinhTrangSau; // Tot, CanBaoTri, HuHong

        @JsonProperty("TyLeHaoMon")
        private Integer tyLeHaoMon = 0;

        @JsonProperty("GhiChuSau")
        private String ghiChuSau;

        @JsonProperty("MoTaHuHong")
        private String moTaHuHong;

        @JsonProperty("MucDoThietHai")
        private Integer mucDoThietHai = 0;

        private BigDecimal chiPhiBoiThuong;

        public ChiTietThuHoiItem() {}

        public String getMaTS() { return maTS; }
        public void setMaTS(String maTS) { this.maTS = maTS; }

        public String getTinhTrangSau() { return tinhTrangSau; }
        public void setTinhTrangSau(String tinhTrangSau) { this.tinhTrangSau = tinhTrangSau; }

        public Integer getTyLeHaoMon() { return tyLeHaoMon; }
        public void setTyLeHaoMon(Integer tyLeHaoMon) { this.tyLeHaoMon = tyLeHaoMon; }

        public String getGhiChuSau() { return ghiChuSau; }
        public void setGhiChuSau(String ghiChuSau) { this.ghiChuSau = ghiChuSau; }

        public String getMoTaHuHong() { return moTaHuHong; }
        public void setMoTaHuHong(String moTaHuHong) { this.moTaHuHong = moTaHuHong; }

        public Integer getMucDoThietHai() { return mucDoThietHai; }
        public void setMucDoThietHai(Integer mucDoThietHai) { this.mucDoThietHai = mucDoThietHai; }

        public BigDecimal getChiPhiBoiThuong() { return chiPhiBoiThuong; }
        public void setChiPhiBoiThuong(BigDecimal chiPhiBoiThuong) { this.chiPhiBoiThuong = chiPhiBoiThuong; }
    }

    public String getMaPM() { return maPM; }
    public void setMaPM(String maPM) { this.maPM = maPM; }

    public String getMaNguoiThuHoi() { return maNguoiThuHoi; }
    public void setMaNguoiThuHoi(String maNguoiThuHoi) { this.maNguoiThuHoi = maNguoiThuHoi; }

    public String getMaNguoiTra() { return maNguoiTra; }
    public void setMaNguoiTra(String maNguoiTra) { this.maNguoiTra = maNguoiTra; }

    public String getGhiChu() {
        if (ghiChu != null && !ghiChu.isBlank()) return ghiChu;
        return danhGiaChung;
    }
    public void setGhiChu(String ghiChu) { this.ghiChu = ghiChu; }

    public String getDanhGiaChung() { return getGhiChu(); }
    public void setDanhGiaChung(String danhGiaChung) { this.danhGiaChung = danhGiaChung; }

    public List<ChiTietThuHoiItem> getDanhSachThuHoi() { return danhSachThuHoi; }
    public void setDanhSachThuHoi(List<ChiTietThuHoiItem> danhSachThuHoi) { this.danhSachThuHoi = danhSachThuHoi; }
}
