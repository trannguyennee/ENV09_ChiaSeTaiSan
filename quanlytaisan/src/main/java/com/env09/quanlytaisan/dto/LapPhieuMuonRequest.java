package com.env09.quanlytaisan.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDate;
import java.util.List;

public class LapPhieuMuonRequest {
    private String maNDMuon;
    private String maPBMuon;
    private LocalDate ngayMuon;
    private LocalDate ngayHenTra;
    private String mucDichSuDung;
    private List<ItemYeuCauMuon> danhSachTaiSan;

    public LapPhieuMuonRequest() {}

    public static class ItemYeuCauMuon {
        @JsonProperty("MaTS")
        private String maTS;

        @JsonProperty("GhiChuMucDich")
        private String ghiChuMucDich;

        public ItemYeuCauMuon() {}
        public ItemYeuCauMuon(String maTS, String ghiChuMucDich) {
            this.maTS = maTS;
            this.ghiChuMucDich = ghiChuMucDich;
        }

        public String getMaTS() { return maTS; }
        public void setMaTS(String maTS) { this.maTS = maTS; }

        public String getGhiChuMucDich() { return ghiChuMucDich; }
        public void setGhiChuMucDich(String ghiChuMucDich) { this.ghiChuMucDich = ghiChuMucDich; }
    }

    public String getMaNDMuon() { return maNDMuon; }
    public void setMaNDMuon(String maNDMuon) { this.maNDMuon = maNDMuon; }

    public String getMaPBMuon() { return maPBMuon; }
    public void setMaPBMuon(String maPBMuon) { this.maPBMuon = maPBMuon; }

    public LocalDate getNgayMuon() { return ngayMuon; }
    public void setNgayMuon(LocalDate ngayMuon) { this.ngayMuon = ngayMuon; }

    public LocalDate getNgayHenTra() { return ngayHenTra; }
    public void setNgayHenTra(LocalDate ngayHenTra) { this.ngayHenTra = ngayHenTra; }

    public String getMucDichSuDung() { return mucDichSuDung; }
    public void setMucDichSuDung(String mucDichSuDung) { this.mucDichSuDung = mucDichSuDung; }

    public List<ItemYeuCauMuon> getDanhSachTaiSan() { return danhSachTaiSan; }
    public void setDanhSachTaiSan(List<ItemYeuCauMuon> danhSachTaiSan) { this.danhSachTaiSan = danhSachTaiSan; }
}
