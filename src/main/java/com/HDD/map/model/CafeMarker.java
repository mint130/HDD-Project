package com.HDD.map.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Table(name = "cafe_marker")
@Getter
@Setter
@AllArgsConstructor
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

    private int dislikesCount = 0;

    private int category; // 1: 카공 2: 프랜차이즈 3: 커피/디저트 4: 아이스크림

    public CafeMarker(){

    }

    public CafeMarker(double lat, double lng, String storeName, String address, String phoneNum, int category)
    {
        this.lat = lat;
        this.lng = lng;
        this.storeName = storeName;
        this.address = address;
        this.phoneNum = phoneNum;
        this.category = category;
        likesCount = 0;
        dislikesCount = 0;
    }
}
