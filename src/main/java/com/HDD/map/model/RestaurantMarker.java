package com.HDD.map.model;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Entity
@Table(name = "restaurant_marker")
@Getter
@Setter
@AllArgsConstructor
public class RestaurantMarker {

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

    private int category; // 1: 한식, 2: 일식, 3: 양식, 4: 중식


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    public int getLikesCount() {
        return likesCount;
    }

    public void setLikesCount(int likesCount) {
        this.likesCount = likesCount;
    }

    public int getDislikesCount() {
        return dislikesCount;
    }

    public void setDislikesCount(int dislikesCount) {
        this.dislikesCount = dislikesCount;
    }

    public int getCategory() {
        return category;
    }

    public void setCategory(int category) {
        this.category = category;
    }

    public RestaurantMarker(){

    }

    public RestaurantMarker(double lat, double lng, String storeName, String address, String phoneNum, int category) {
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