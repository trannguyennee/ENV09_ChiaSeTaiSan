package com.env09.quanlytaisan.controller;

import com.env09.quanlytaisan.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<String>> handleAllExceptions(Exception ex) {
        String msg = ex.getMessage();
        if (msg == null || msg.isBlank()) {
            msg = "Đã xảy ra lỗi nội bộ hệ thống. Vui lòng thử lại!";
        }
        // Chuẩn hóa thông báo lỗi thân thiện với người dùng
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.thatBai(msg));
    }
}
