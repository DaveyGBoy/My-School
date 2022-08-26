export interface Me {
  _id: string;
  firstName: string;
  middlName: string;
  lastName: string;
  email: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface SigninForm {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  cpassword: string;
}

export interface Faculty {
  _id: string;
  groupName: string;
}

export interface Department {
  _id: string;
  depName: string;
}
