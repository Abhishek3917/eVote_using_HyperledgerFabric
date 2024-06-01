// data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private sharedData = {
    username: "username",
    password: "pass",
    first_name: "fname",
    last_name: "lname",
    email: "em",
    mob_no: "mob",
  }

  setSharedName(fname: string, lname: string){
    this.sharedData.first_name = fname;
    this.sharedData.last_name = lname;
  }

  setSharedMob(data: string){
    this.sharedData.mob_no = data;
  }
  

  setSharedCreds(uname: string, pass: string, email: string){
    this.sharedData.username = uname;
    this.sharedData.password = pass;
    this.sharedData.email = email;
  }

  getSharedData(){
    return this.sharedData;
  }

  getSharedData2(){
    return this.sharedData;
  }

  private loggedUser = {
    _id: "_id",
    username: "username",
    password: "pass",
    first_name: "fname",
    last_name: "lname",
    email: "em",
    mob_no: "mob",
    college: "NU",
    college_id: "NU",
    course: "NU",
    branch: "NU",
    year: 0,
    image: "image",
    votedElections: [] = ["election1"],
  }

  updateLoggedUserAcc(username: string){
    this.loggedUser.username = username;
  }

  setLoggedUser(data: any){
    this.loggedUser._id = data.user._id;
    this.loggedUser.username = data.user.username;
    this.loggedUser.password = data.user.password;
    this.loggedUser.first_name = data.user.first_name;
    this.loggedUser.last_name = data.user.last_name;
    this.loggedUser.email = data.user.email;
    this.loggedUser.mob_no = data.user.mob_no;
    this.loggedUser.college = data.user.college;
    this.loggedUser.course = data.user.course;
    this.loggedUser.branch = data.user.branch;
    this.loggedUser.year = data.user.year;
    this.loggedUser.image = data.user.image;
    this.loggedUser.votedElections = data.user.votedElections;
  } 

  getLoggedUser(){
    return this.loggedUser;
  }

  removeLoggedUser(){
    this.loggedUser.username = "username";
    this.loggedUser.password = "pass";
    this.loggedUser.first_name = "fname";
    this.loggedUser.last_name = "lname";
    this.loggedUser.email = "em";
    this.loggedUser.mob_no = "mob";
    this.loggedUser.college = "NU";
    this.loggedUser.college_id = "NU";
    this.loggedUser.course = "NU"
  }

  private sharedAdminData = {
    first_name: "fname",
    last_name: "lname",
    phone_no: "phone_no",
    email: "em",
    password: "pass",
    college_name: "college_name",
    city: "city",
    district: "district",
    country: "country",
    pincode: "pincode"
  }

  setAdmin(f_name: string, l_name: string, p_no: string, email: string, pass: string){
    this.sharedAdminData.first_name = f_name,
    this.sharedAdminData.last_name = l_name,
    this.sharedAdminData.phone_no = p_no,
    this.sharedAdminData.email = email,
    this.sharedAdminData.password = pass
  }

  setCollege(c_name: string, city: string, dist: string, count: string, pin: string){
    this.sharedAdminData.college_name = c_name;
    this.sharedAdminData.city = city;
    this.sharedAdminData.district = dist;
    this.sharedAdminData.country = count;
    this.sharedAdminData.pincode = pin;
  }

  getAdmin(){
    return this.sharedAdminData
  }

  private loggedAdmin = {
    _id: "_id",
    first_name: "fname",
    last_name: "lname",
    phone_no: "phone_no",
    email: "em",
    password: "pass",
    college_name: "college_name",
    city: "city",
    district: "district",
    country: "country",
    pincode: "pincode",
    courses: false,
  } 

  setLoggedAdmin(data: any){
    this.loggedAdmin._id = data._id;
    this.loggedAdmin.first_name = data.first_name;
    this.loggedAdmin.last_name = data.last_name;
    this.loggedAdmin.phone_no = data.phone_no;
    this.loggedAdmin.email = data.email;
    this.loggedAdmin.password = data.password;
    this.loggedAdmin.college_name = data.college_name;
    this.loggedAdmin.city = data.city;
    this.loggedAdmin.district = data.district;
    this.loggedAdmin.country = data.country;
    this.loggedAdmin.pincode = data.pincode;
    this.loggedAdmin.courses = data.coursesUpdated;
  } 

  removeLoggedAdmin(){
    this.loggedAdmin._id = "_id";
    this.loggedAdmin.first_name = "fname";
    this.loggedAdmin.last_name = "lname";
    this.loggedAdmin.phone_no = "phone_no";
    this.loggedAdmin.email = "em";
    this.loggedAdmin.password = "pass";
    this.loggedAdmin.college_name = "college_name";
    this.loggedAdmin.city = "city";
    this.loggedAdmin.district = "district";
    this.loggedAdmin.country = "country";
    this.loggedAdmin.pincode = "pincode";
    this.loggedAdmin.courses = false;
  }

  getLoggedAdmin(){
    return this.loggedAdmin;
  }

  private election_name = 'elecName';

  setElecName(elecName: string){
    this.election_name = elecName;
  }

  getElecName(){
    return this.election_name;
  }
}
