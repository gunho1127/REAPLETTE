package com.reaplette.domain;

import lombok.Data;

@Data
public class AlertVO {
    private int alertId; // 알림 ID
    private String alertType; // 알림 유형
    private String id; // 사용자 ID
    private String alertContent; // 알림 내용
    private String date;  // 알림 날짜 (YY/MM/DD 형식)
}
