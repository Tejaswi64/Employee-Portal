
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private userService: UserService) {}

  // Login function to authenticate user credentials
  login(email: string, password: string): boolean {
    const user = this.userService.authenticate(email, password);
    return user !== null; // Return true if login is successful
  }

  // Signup function to register a new user
  signup(
    name: string,
    email: string,
    password: string,
    position: string,
    phone: string,
    address: string,
    payRate: number
  ): boolean {
    // Check if the user already exists
    const existingUser = this.userService.getUserByEmail(email);
    if (existingUser) {
      return false; // User already exists
    }

    // Create the new user object
    const newUser: User = {
      id: this.userService.getNextUserId(), // Get the next user ID
      name: name,
      email: email,
      password: password,
      role: 'user', // Default role
      position: position,
      phone: phone,
      address: address,
      payRate: payRate,
    };

    // Add the new user
    this.userService.addUser(newUser);
    return true; // Signup successful
  }

  // Get the currently logged-in user's information
  getCurrentUser() {
    return this.userService.getUserInfo();
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.userService.getUserInfo() !== null;
  }

  // Get the logged-in user's role
  getUserRole(): string {
    return this.userService.getUserRole() || ''; // Provide a default value if undefined
  }

  updatePassword(newPassword: string): void {
      const currentUser = this.getCurrentUser();
      if (currentUser) {

        currentUser.password = newPassword;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        console.log('Password updated successfully!');
      }
  }
    

  // Logout function
  logout() {
    this.userService['currentUser'] = null; // Clear logged-in user
  }

  verifyPassword(savedPassword: string, enteredPassword: string): boolean {
    // Implement the logic to verify if the entered password matches the saved one.
    // If hashing is involved, hash the entered password and compare.
    return savedPassword === enteredPassword; // Adjust for hashing if needed.
  }
  
}
