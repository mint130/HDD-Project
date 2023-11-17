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

    public CafeMarker(){

    }

    public CafeMarker(double lat, double lng, String storeName, String address, String phoneNum)
    {
        this.lat = lat;
        this.lng = lng;
        this.storeName = storeName;
        this.address = address;
        this.phoneNum = phoneNum;
        likesCount = 0;
        dislikesCount = 0;
    }
}
