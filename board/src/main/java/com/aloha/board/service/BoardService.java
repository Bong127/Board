package com.aloha.board.service;

import com.aloha.board.domain.Boards;
import com.github.pagehelper.PageInfo;

public interface BoardService extends BaseService<Boards> {
    public PageInfo<Boards> list(int page, int size);
}
