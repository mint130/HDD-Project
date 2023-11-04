package com.HDD.main.notice.crawling;

import com.HDD.main.notice.model.MajorCode;
import com.HDD.main.notice.model.Notice;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Crawling {

    // 기본 학과 + 전체 공지 크롤링
    public List<Notice> getNotice(String major) throws IOException {
        List<Notice> notices = new ArrayList<>();

        if(MajorCode.isBasic(major)) {
            Document doc = Jsoup.connect("https://"+ MajorCode.getCode(major) + ".hongik.ac.kr/dept/index.html").get();
            Elements subject = doc.select("div.in ul li");

            for(Element element : subject){
                String title = element.getElementsByAttribute("href").text();
                String url = "https://" + MajorCode.getCode(major) + ".hongik.ac.kr" + element.getElementsByAttribute("href").attr("href");
                Notice notice = new Notice(title, url);
                notices.add(notice);
                System.out.println("notice = " + notice.getTitle());

            }
        }
        else {
            // 전체 공지사항
            if (major == "main") {
                Document doc = Jsoup.connect("https://www.hongik.ac.kr/index.do").get();
                Elements subject = doc.select("div.subject");

                for (Element element : subject) {
                    String title = element.getElementsByClass("category").text() + " " + element.getElementsByClass("text").text();
                    String url = "https://www.hongik.ac.kr/" + element.getElementsByAttribute("href").attr("href");
                    Notice notice = new Notice(title, url);
                    notices.add(notice);
                }
            }
            else if(major == "civil"){

            } else if (major == "me") {
                Document doc = Jsoup.connect("https://me.hongik.ac.kr/bbs/board.php?tbl=bbs61").get();
                Elements subject = doc.select("div.product_wrap");

                System.out.println(subject.toString());
                for (Element element : subject) {
                    String title = element.getElementsByAttribute("h5").text();
                    String url = element.getElementsByAttribute("href").attr("href");
                    Notice notice = new Notice(title, url);
                    notices.add(notice);
                }
            }

        }
        return notices;
    }
}
