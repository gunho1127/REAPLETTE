package com.reaplette.domain;

import lombok.Data;

@Data
public class PreferenceVO {
    private String id; // 사용자 ID
    private String bookId; // 책 ID
    private String category; // 카테고리
    private String author; // 저자
}

