package com.example.fribaStar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

@Configuration
@EnableWebSecurity
public class FribaConfigurationSecurity extends WebSecurityConfigurerAdapter {

	@Autowired
	private CustomAccessDeniedHandler accessDeniedHandler;
	
	@Autowired
	private RestAuthenticationEntryPoint restAuthenticationEntryPoint;
	
	@Autowired
	private MySaveRequestAwareAuthenticationSuccessHandler mySuccessHandler;
	
	private SimpleUrlAuthenticationFailureHandler myFailureHandler = new SimpleUrlAuthenticationFailureHandler();
	
	
	public FribaConfigurationSecurity()
	{
		super();
		SecurityContextHolder.setStrategyName(SecurityContextHolder.MODE_INHERITABLETHREADLOCAL);
	}
	
	
	@Override
	protected void configure(final AuthenticationManagerBuilder auth) throws Exception
	{
		//TODO: check here why on earth the encoder did not work!!!
		auth.inMemoryAuthentication()
			.withUser("admin").password(encoder().encode("12345")).roles("ADMIN");
	}
	
	
	@Bean
	public PasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception
	{
		http
			.csrf().disable()
			.exceptionHandling()
//			.accessDeniedHandler(accessDeniedHandler)
			.authenticationEntryPoint(restAuthenticationEntryPoint)
			.and()
			.authorizeRequests()
			.antMatchers("/test").authenticated()
			.and()
			.formLogin()
			.successHandler(mySuccessHandler)
			.failureHandler(myFailureHandler)
			.and()
			.logout();
	}	
}


