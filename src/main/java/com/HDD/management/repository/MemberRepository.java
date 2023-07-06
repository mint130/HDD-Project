package com.HDD.management.repository;

import com.HDD.management.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findBySid(String sid);
    Optional<Member> findByEmail(String email);
    Boolean existsBySid(String sid);
    Boolean existsByEmail(String email);
    Boolean existsByNickname(String nickname);
}
