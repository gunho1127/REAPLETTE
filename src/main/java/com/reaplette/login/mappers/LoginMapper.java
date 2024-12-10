package com.reaplette.login.mappers;

import com.reaplette.domain.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Map;


@Mapper
public interface LoginMapper {

    // 이메일로 사용자 정보 조회
    UserVO getUserById(@Param("id") String id);

    // 비밀번호 검증
    boolean validatePassword(@Param("id") String id, @Param("pw") String pw);

    int updatePassword(UserVO user);

    //인증 코드 업데이트
    int updateVerificationCode(Map<String, Object> params);

    boolean isNaver(String id);
}
