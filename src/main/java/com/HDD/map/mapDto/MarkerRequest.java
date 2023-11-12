package com.HDD.map.mapDto;

import lombok.Getter;
import org.springframework.stereotype.Service;

@Getter
@Service
public class MarkerRequest {
    private String lat;
    private String lng;
    private String storeName;
    private String address;
    private String phoneNum;
    private String category;
    private String likesNumber;
}
