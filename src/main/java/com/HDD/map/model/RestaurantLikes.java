package com.HDD.map.model;

import com.HDD.management.model.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Table(name = "restaurant_likes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantLikes {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "restaurant_id")
    private RestaurantMarker restaurantMarker;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public RestaurantLikes(RestaurantMarker restaurantMarker, Member member) {
        this.restaurantMarker = restaurantMarker;
        this.member = member;
    }
}
