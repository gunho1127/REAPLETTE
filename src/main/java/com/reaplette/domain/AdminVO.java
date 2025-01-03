package com.reaplette.domain;

import lombok.Data;

@Data
public class AdminVO {
    private String adminId; // 관리자 ID
    private String adminPw; // 관리자 비밀번호
    private String adminUsername; // 관리자 이름
    private String adminProfileImagePath; // 관리자 프로필 이미지 경로
    private int isDelete; // 삭제 여부 (기본값 1: 삭제되지 않음)
    private String loginType; // 로그인 타입
}

