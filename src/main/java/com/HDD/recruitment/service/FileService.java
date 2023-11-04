package com.HDD.recruitment.service;

import com.HDD.common.CustomMultipartFile;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;
import org.apache.commons.fileupload.DefaultFileItem;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;

@Service
public class FileService {

    @Value("${firebase.bucket-name}")
    private String firebaseBucket;

    public String uploadFiles(MultipartFile file, String nameFile) throws Exception {
        Bucket bucket = StorageClient.getInstance().bucket(firebaseBucket);
        InputStream content = new ByteArrayInputStream(file.getBytes());
        Blob blob = bucket.create(nameFile.toString(), content, file.getContentType());
        return blob.getMediaLink();
    }

    public void deleteFile(String id) throws IOException {
        Bucket bucket = StorageClient.getInstance().bucket(firebaseBucket);
        if (StringUtils.isEmpty(id)) {
            throw new IOException("invalid file name");
        }

        Blob blob = bucket.get(id);
        if (blob == null) {
            throw new IOException("file not found");
        }
        blob.delete();
    }

    // 이미지 이름 -> 스토리지 URL 변환
    public String getImageUrl(String id) {
        Bucket bucket = StorageClient.getInstance().bucket(firebaseBucket);
        Blob blob = bucket.get(id.toString());
        return blob.getMediaLink();
    }

    // 이미지 url -> MultipartFile 변환
    public MultipartFile getFile(String id) throws  IOException{
        String url = getImageUrl(id);
        File file = new File(url, id);
       // FileItem fileItem = new DiskFileItem("originFile", Files.probeContentType(file.toPath()), false, file.getName(), (int) file.length(), file.getParentFile());
//        FileItem fileItem = new DefaultFileItem(file.getName(), Files.probeContentType(file.toPath()), false, file.getName(), (int) file.length(), file);
        try {
            InputStream input = new FileInputStream(file);
//            OutputStream os = fileItem.getOutputStream();
        } catch (IOException e) {
            System.out.println("안됨");
        }
        MultipartFile multipartFile = new CustomMultipartFile(Files.readAllBytes(file.toPath()), id, id, "MultipartFile", file.length());
        return multipartFile;
    }

}
