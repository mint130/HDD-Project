package com.HDD.management.model;

import com.HDD.management.converter.ERoleConverter;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Convert(converter = ERoleConverter.class)
    private ERole name;
}
