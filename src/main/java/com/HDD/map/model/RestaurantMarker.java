package com.HDD.map.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table
public class RestaurantMarker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double lat; //위도
    private double lng; //경도
    private String storeName;
    private String address;
    private String phoneNum;
    private int likes;
    private int dislikes;

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

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public int getDislikes() {
        return dislikes;
    }

    public void setDislikes(int dislikes) {
        this.dislikes = dislikes;
    }

    public RestaurantMarker(){

    }

    public RestaurantMarker(Long id, double lat, double lng, String storeName, String address, String phoneNum, int likes, int dislikes) {
        this.id = id;
        this.lat = lat;
        this.lng = lng;
        this.storeName = storeName;
        this.address = address;
        this.phoneNum = phoneNum;
        this.likes = likes;
        this.dislikes = dislikes;
    }
}
