package com.env09.quanlytaisan.dto;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;

    public ApiResponse() {}

    public ApiResponse(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public static <T> ApiResponse<T> thanhCong(String message, T data) {
        return new ApiResponse<>(true, message, data);
    }

    // Lỗi THROW từ stored procedure: chỉ giữ câu thông báo nghiệp vụ, bỏ tiền tố kỹ thuật của JDBC
    private static final Pattern LOI_SQL = Pattern.compile("error code \\[\\d+\\]; (.*)$", Pattern.DOTALL);

    public static <T> ApiResponse<T> thatBai(String message) {
        if (message != null) {
            Matcher m = LOI_SQL.matcher(message);
            if (m.find()) {
                message = m.group(1).trim();
            }
        }
        return new ApiResponse<>(false, message, null);
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public T getData() { return data; }
    public void setData(T data) { this.data = data; }
}
