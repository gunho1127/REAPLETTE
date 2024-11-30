package com.reaplette.mappers;

import com.reaplette.domain.UserVO;
import com.reaplette.mypage.mappers.MyPageMapper;

import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static org.junit.jupiter.api.Assertions.*;

@Log4j2
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class MyPageMapperTests {

    private static final Logger logger = LoggerFactory.getLogger(MyPageMapperTests.class);

    @Autowired
    private MyPageMapper myPageMapper;

    @Test
    public void testGetUser() {
        // 테스트용 데이터 ID (데이터베이스에 존재하는 ID 사용)
        String testId = "test@naver.com";
        // 메서드 호출
        UserVO user = myPageMapper.getUser(testId);
        log.info(user);
    }
}