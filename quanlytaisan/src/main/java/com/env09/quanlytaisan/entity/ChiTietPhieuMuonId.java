package com.env09.quanlytaisan.entity;

import lombok.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChiTietPhieuMuonId implements Serializable {
    private String maPM;
    private String maTS;
}
