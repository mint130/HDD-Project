package com.HDD.recruitment.service;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

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

    // 되는지 모름
    public String getImageUrl(String id) {
        Bucket bucket = StorageClient.getInstance().bucket(firebaseBucket);
        Blob blob = bucket.get(id.toString());
        return blob.getMediaLink();
    }
}
