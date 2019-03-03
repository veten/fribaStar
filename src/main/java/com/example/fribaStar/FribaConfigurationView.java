package com.example.fribaStar;

import java.util.Map;
import java.util.Map.Entry;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@ComponentScan
public class FribaConfigurationView extends WebMvcConfigurerAdapter 
{	
	//See WebMvcAutoConfiguration addResourceHandlers for reference 
	//See WebMvcConfigurationSupport for @EnableWebMvc configuration
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {		
		registry
			.addResourceHandler("*.js")
			.addResourceLocations("classpath:/static/js/src/","classpath:/static/js/lib/");
		registry
			.addResourceHandler("*.html")
			.addResourceLocations("classpath:/static/html/");						
	}
			
	@Override
	public void configureViewResolvers(ViewResolverRegistry registry) {
		registry.jsp(" ", ".html");        	        
    }	
	
	
//	@Override
//	public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
//		configurer
//			.favorPathExtension(true)
//			.favorParameter(true)
//			.ignoreAcceptHeader(true);
//	}
	
}
