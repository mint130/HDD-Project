package com.HDD.configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;

@Slf4j
@Service
public class FirebaseInitializer {

    @PostConstruct
    public void initialize() {
        try {
            FileInputStream servicAccount = new FileInputStream("src/main/resources/hdd-graduation-firebase-adminsdk-z6p4d-c6b39e72e0.json");
            FirebaseOptions options = new FirebaseOptions.Builder().setCredentials(
                    GoogleCredentials.fromStream(servicAccount)).build();
            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
                log.info("Firebase application has been initialized.");
            }

        } catch (IOException e) {
            log.error(e.getMessage());
        }
    }

}
