package com.env09.quanlytaisan.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private XacThucInterceptor xacThucInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // Chỉ API đăng nhập là được gọi khi chưa có token
        registry.addInterceptor(xacThucInterceptor)
                .addPathPatterns("/api/**")
                .excludePathPatterns("/api/auth/login");
    }
}
