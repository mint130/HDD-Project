package com.HDD.management.converter;

import com.HDD.management.model.ERole;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.EnumSet;
import java.util.NoSuchElementException;

@Converter
public class ERoleConverter implements AttributeConverter<ERole, String> {

    @Override
    public String convertToDatabaseColumn(ERole attribute) {
        return attribute.getId();
    }

    @Override
    public ERole convertToEntityAttribute(String dbData) {
        return EnumSet.allOf(ERole.class).stream()
                .filter(e -> e.getId().equals(dbData))
                .findAny()
                .orElseThrow(() -> new NoSuchElementException());
    }
}
