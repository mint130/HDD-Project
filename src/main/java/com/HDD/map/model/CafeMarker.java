package com.HDD.map.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Table(name = "cafe_marker")
@Getter
@Setter
public class CafeMarker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double lat; //위도

    private double lng; //경도

    private String storeName;

    private String address;

    private String phoneNum;

    private int likesCount = 0;
}
