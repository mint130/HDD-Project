package com.HDD.map.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Entity
@Table(name = "restaurant_marker")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantMarker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private double lat; //위도
    @NotNull
    private double lng; //경도
    @NotNull
    private String storeName;
    @NotNull
    private String address;
    private String phoneNum;
    private int likesNumber;
    private int dislikes;
    @NotNull
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

    public int getLikesNumber() {
        return likesNumber;
    }

    public void setLikesNumber(int likesNumber) {
        this.likesNumber = likesNumber;
    }

    public int getDislikes() {
        return dislikes;
    }

    public void setDislikes(int dislikes) {
        this.dislikes = dislikes;
    }

    public int getCategory() {
        return category;
    }

    public void setCategory(int category) {
        this.category = category;
    }

    public RestaurantMarker(double lat, double lng, String storeName, String address, String phoneNum, int category) {
        this.lat = lat;
        this.lng = lng;
        this.storeName = storeName;
        this.address = address;
        this.phoneNum = phoneNum;
        this.category = category;
    }
}