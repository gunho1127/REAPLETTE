package com.reaplette.signup.mappers;

import com.reaplette.domain.PreferenceVO;
import com.reaplette.domain.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface SignUpMapper {

    // 활동명 중복 확인
    int checkUsernameDuplicate(@Param("username") String username);

    // 사용자 정보 저장
    int insertUser(UserVO user);

    // 선호 카테고리 저장
    void insertPreference(PreferenceVO preference);

}
