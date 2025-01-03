package com.reaplette.search.mappers;

import com.reaplette.domain.FollowVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface FollowerMapper {
  FollowVO searchFollow(Map<String, String> param);
  Integer insertFollow(Map<String, String> param);
  Integer deleteFollow(Map<String, String> param);
}
