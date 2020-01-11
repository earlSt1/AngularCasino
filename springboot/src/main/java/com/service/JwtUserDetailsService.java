package com.service;

import java.util.ArrayList;

import com.model.user.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {
	@Autowired
	private UserRepository userRepository;

	public void createUser(String username, String password, String email){
		com.model.user.User u  = new com.model.user.User();
		u.setUsername(username);
		u.setPassword(new BCryptPasswordEncoder().encode(password));
		u.setEmail(email);
		
		userRepository.save(u);
	}
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		com.model.user.User u = userRepository.findByUsername(username);
		if (u != null){
			return new User(u.getUsername(),u.getPassword(),new ArrayList<>());
		//}
		
		//TODO Link with data source
		//if ("javainuse".equals(username)) {
		//	return new User("javainuse", "$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6",
		//			new ArrayList<>());
		} else {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
	}
}