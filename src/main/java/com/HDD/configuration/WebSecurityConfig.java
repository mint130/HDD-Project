package com.HDD.configuration;

import com.HDD.management.repository.MemberRepository;
import com.HDD.management.security.MemberDetailService;
import com.HDD.management.token.AuthTokenFilter;
import com.HDD.management.token.JwtAuthenticationEntryPoint;
import com.HDD.management.token.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
//@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends BCryptPasswordEncoder {

    @Autowired
    private JwtAuthenticationEntryPoint unauthorizedHandler;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private JwtUtils jwtUtils;



    // 기존의 configure(web)
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() throws Exception {
        return (web) -> web.ignoring().requestMatchers("/css/**", "/script/**", "image/**", "/fonts/**", "lib/**");
    }

    // 기존의 configure(Http)
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests()
                .requestMatchers("/", "/home","/api/auth/**").permitAll()
                .requestMatchers("/recruitment/**", "/promotion", "/map/**").hasRole("MEMBER")
                .requestMatchers("/promotion/add").hasRole("ADMIN")
                .anyRequest().authenticated();

                // 로그아웃 추가
//                .authorizeHttpRequests(auth->auth
//                .requestMatchers("/", "/home", "/api/auth/**").permitAll()
//                .anyRequest().authenticated()
//                 )
//                .logout(logout -> logout
//                        .logoutRequestMatcher(new AntPathRequestMatcher("/api/auth/signout"))
//                        .logoutSuccessUrl("/")
//                        //.deleteCookies()
//                        .invalidateHttpSession(true)
//                );

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        DelegatingPasswordEncoder delegatingPasswordEncoder = (DelegatingPasswordEncoder) PasswordEncoderFactories.createDelegatingPasswordEncoder();
        delegatingPasswordEncoder.setDefaultPasswordEncoderForMatches(new BCryptPasswordEncoder());

        return delegatingPasswordEncoder;
    }

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter(jwtUtils, new MemberDetailService(memberRepository, passwordEncoder()));
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
