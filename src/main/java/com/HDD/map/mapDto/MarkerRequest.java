package com.HDD.map.mapDto;

import lombok.Getter;
import org.springframework.stereotype.Service;

@Getter
@Service
public class MarkerRequest {
    private double lat;
    private double lng;
    private String storeName;
    private String address;
    private String phoneNum;
    private int category;
    private int likes;
}
