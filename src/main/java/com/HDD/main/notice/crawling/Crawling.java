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

// main : https://www.hongik.ac.kr/front/boardlist.do?bbsConfigFK=3&siteGubun=1&amp;menuGubun=1
// ce : https://www.hongik.ac.kr/front/boardlist.do?bbsConfigFK=54&siteGubun=1&menuGubun=1

public class Crawling {

    public List<Notice> getData(String major) throws IOException {
        List<Notice> notices = new ArrayList<>();
        Document doc = Jsoup.connect("https://www.hongik.ac.kr/front/boardlist.do?bbsConfigFK=" + MajorCode.getECode(major) + "&siteGubun=1&menuGubun=1").get();

        Elements subject = doc.select("div.subject");

        for(Element element : subject){
            Notice notice = new Notice(element.getElementsByClass("text").text(), element.getElementsByAttribute("href").attr("href"));
            notices.add(notice);
            System.out.println("notice = " + notice.getTitle());

        }
        return notices;
    }
}
