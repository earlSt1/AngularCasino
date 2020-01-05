package com;

import java.util.Arrays;

import com.config.JwtAuthenticationEntryPoint;
import com.config.JwtRequestFilter;
import com.service.JwtUserDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@SpringBootApplication
public class SecurityApplication {


  @Configuration
  @Order(SecurityProperties.BASIC_AUTH_ORDER-2)
  @EnableWebSecurity
  @EnableGlobalMethodSecurity(prePostEnabled = true)
  protected static class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;
    @Override
    protected void configure(HttpSecurity http) throws Exception {
      http//disable()
        //.httpBasic()
     //.and()
        /*.authorizeRequests()
          .antMatchers("/index.html", "/", "/home", "/login").permitAll()
          .anyRequest().authenticated()
          .and().csrf()
        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());*/
        
        // dont authenticate this particular request
        .authorizeRequests()
        .antMatchers("/authenticate").permitAll()  
        .anyRequest().authenticated().
				  
				// all other requests need to be authenticated
        
      and().cors().and().csrf()
      // For STATELESS we can disable CSRF
      .disable().
      //.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()).and().
				// make sure we use stateless session; session won't be used to
				// store user's state.
        exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).
      and().
        sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      ;
      
      http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
      
    }
    
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
      return super.authenticationManagerBean();
    }
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
      // configure AuthenticationManager so that it knows from where to load
      // user for matching credentials
      // Use BCryptPasswordEncoder
      auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
      return new BCryptPasswordEncoder();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
  }
  public static void main(String[] args) {
    SpringApplication.run(SecurityApplication.class, args);
  }
}