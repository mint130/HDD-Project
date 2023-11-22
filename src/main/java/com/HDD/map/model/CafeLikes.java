package com.HDD.map.model;

import com.HDD.management.model.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Table(name = "cafe_likes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CafeLikes {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "cafeMarker_id")
    private CafeMarker cafeMarker;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public CafeLikes(CafeMarker cafeMarker, Member member) {
        this.cafeMarker = cafeMarker;
        this.member = member;
    }
}
