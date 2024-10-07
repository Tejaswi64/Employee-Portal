/*
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
  imports: [CommonModule, FormsModule]
})
export class UserInfoComponent implements OnInit {
  currentUser: any = null;
  editedUserInfo: any;
  isEditing: boolean = false;
  isAdmin: boolean = false; // Track if the logged-in user is an admin
  loggedInUserId: number | null = null; // Track the logged-in user ID

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Determine if the logged-in user is an admin
    this.isAdmin = this.authService.getUserRole() === 'admin'; 

    // Get the 'id' query parameter
    const userId = this.route.snapshot.queryParamMap.get('id');

    if (userId) { // If 'id' is present, fetch the specific user's info
      const id = +userId; // Convert to number
      this.currentUser = this.userService.getAllUsers().find(user => user.id === id);
      if (!this.currentUser) {
        // If no user found with the given ID, navigate back to dashboard or show an error
        console.error('User not found');
        this.router.navigate(['/dashboard']);
      }
      this.editedUserInfo = { ...this.currentUser }; // Initialize edited info with user info
    } else { // If 'id' is not present, assume it's the current user's info
      this.currentUser = this.authService.getCurrentUser();
      this.editedUserInfo = { ...this.currentUser };
    }

    // Get the logged-in user's ID for editing permissions
    this.loggedInUserId = this.authService.getCurrentUser()?.id;
  }

  editUserInfo() {
    // Allow editing only if the logged-in user is the same as current user
    if (this.isAdmin && this.loggedInUserId === this.currentUser.id) {
      this.isEditing = true; 
    } else if (!this.isAdmin) {
      this.isEditing = true; // Allow normal users to edit their own info
    }
  }

  saveUserInfo() {
    // Allow saving only if the logged-in user is the same as current user
    if ((this.isAdmin && this.loggedInUserId === this.currentUser.id) || !this.isAdmin) {
      this.userService.updateUserInfo(this.editedUserInfo);
      this.isEditing = false; 
      this.currentUser = { ...this.editedUserInfo }; 
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);  // Navigate back to the dashboard
  }
}
*/


import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
  imports: [CommonModule, FormsModule]
})
export class UserInfoComponent implements OnInit {
  currentUser: any = null;
  editedUserInfo: any;
  isEditing: boolean = false;
  isAdmin: boolean = false; // Track if the logged-in user is an admin
  loggedInUserId: number | null = null; // Track the logged-in user ID

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Determine if the logged-in user is an admin
    this.isAdmin = this.authService.getUserRole() === 'admin'; 

    // Get the 'id' query parameter
    const userId = this.route.snapshot.queryParamMap.get('id');

    if (userId) { // If 'id' is present, fetch the specific user's info
      const id = +userId; // Convert to number
      this.currentUser = this.userService.getAllUsers().find(user => user.id === id);
      if (!this.currentUser) {
        // If no user found with the given ID, navigate back to dashboard or show an error
        console.error('User not found');
        this.router.navigate(['/dashboard']);
      }
      this.editedUserInfo = { ...this.currentUser }; // Initialize edited info with user info
    } else { // If 'id' is not present, assume it's the current user's info
      this.currentUser = this.authService.getCurrentUser();
      this.editedUserInfo = { ...this.currentUser };
    }

    // Get the logged-in user's ID for editing permissions
    this.loggedInUserId = this.authService.getCurrentUser()?.id ?? null;
  }

  editUserInfo() {
    // Allow editing only if the logged-in user is the same as current user
    if (this.isAdmin && this.loggedInUserId === this.currentUser?.id) {
      this.isEditing = true; 
    } else if (!this.isAdmin) {
      this.isEditing = true; // Allow normal users to edit their own info
    }
  }

  saveUserInfo() {
    // Allow saving only if the logged-in user is the same as current user
    if ((this.isAdmin && this.loggedInUserId === this.currentUser?.id) || !this.isAdmin) {
      this.userService.updateUserInfo(this.editedUserInfo);
      this.isEditing = false; 
      this.currentUser = { ...this.editedUserInfo }; 
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);  // Navigate back to the dashboard
  }
}
