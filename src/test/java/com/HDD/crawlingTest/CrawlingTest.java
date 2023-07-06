package com.HDD.crawlingTest;

import com.HDD.main.notice.crawling.Crawling;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;

@SpringBootTest
public class CrawlingTest {
    Crawling crawling = new Crawling();

    @Test
    void run() throws IOException {
        // crawling.getData();
    }
}
