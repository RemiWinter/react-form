import React, { useEffect, useRef, useState } from 'react'
import Input from './Input'

const FormNew = () => {

  const [formData, setFormData] = useState(
    [
      {
      inputType: "text",
      inputName: "Username",
      id: "username",
      name: "username",
      placeholder:"Enter a username",
      inputData: "Username"
      },
      {
      inputType: "email",
      inputName: "Email",
      id: "email",
      name: "email",
      placeholder:"Enter your email",
      inputData: "Email"
      },
      {
      inputType: "password",
      inputName: "Password",
      id: "password",
      name: "password",
      placeholder:"Enter a password",
      inputData: "Password"
      },
      {
      inputType: "password",
      inputName: "Confirm Password",
      id: "confirm",
      name: "confirmPassword",
      placeholder:"Confirm your password",
      inputData: "Password"
      },
      {
      inputType: "date",
      inputName: "Date Of Birth",
      id: "dob",
      name: "dob",
      placeholderSuffix:"Date Of Birth",
      inputData: "Date"
      },
      {
      inputType: "file",
      inputName: "Upload File",
      id: "file",
      name: "file",
      placeholderSuffix:"File",
      inputData: "File"
      }
    ]
  )

  let currentInput

  const form = useRef()

  let isFieldValid = [
    {field: 'username', isValid: false},
    {field: 'email', isValid: false},
    {field: 'password', isValid: false},
    {field: 'confirmPassword', isValid: false},
    {field: 'dob', isValid: false},
    {field: 'file', isValid: false},
  ]

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: ""
  }

  const [formValues, setFormValues] = useState(initialValues)

  const handleChange = (e) => {
    currentInput = e.target;
    const {name, value} = e.target;
    setFormValues({...formValues, [name]:value})
  }

    const validate = (field) => {
      const password = form.current[2];
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      let obj = isFieldValid.find(f => f.field===field.name);
    
      if (!field.value) {
        field.parentElement.classList.add('error');
        field.parentElement.classList.remove('valid');
        field.nextElementSibling.innerHTML = `${field.previousElementSibling.innerHTML} is required`;
        obj.isValid = false;
      }
  
      else if (field.name === 'confirmPassword' && field.value !== password.value) {
        field.parentElement.classList.add('error');
        field.parentElement.classList.remove('valid');
        field.nextElementSibling.innerHTML = `Passwords do not match`;
        obj.isValid = false;
      }
     
      else if (field.value.length < 4 && field.value.length > 0 && field.name !== 'email') {
        field.parentElement.classList.add('error');
        field.parentElement.classList.remove('valid');
        field.nextElementSibling.innerHTML = `${field.previousElementSibling.innerHTML} must contain at least 4 characters`;
        obj.isValid = false;
      }
    
      else if (field.name === 'email' && !regex.test(field.value)) {
        field.parentElement.classList.add('error');
        field.parentElement.classList.remove('valid');
        field.nextElementSibling.innerHTML = `Please enter a valid email`;
        obj.isValid = false;
      }
    
      else {
        field.parentElement.classList.add('valid');
        field.parentElement.classList.remove('error');
        obj.isValid = true;
      }
    }

  
  const handleFocusOut = (e) => {
    validate(e.target);
  }

  const isValid = (arr, valid) => {
    return arr.some(arrVal => valid === arrVal.isValid)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    for (let i=0; i<5; i++) {
      const input = form.current.childNodes[i].childNodes[1]
      validate(input)
    }
  
    if(!(isValid(isFieldValid, false))) {
      console.log(formValues);
      setFormValues(initialValues);
      form.current.reset()
  
      const forms = form.current.childNodes
      for (let i=0; i<forms.length; i++){
        forms[i].classList.remove('valid');
      }
    }
  }

  return (
    <div className="form-content">
      <h1>Sign Up</h1>
      <form action="#" ref={form} onSubmit={handleSubmit}>
        <Input formData={formData} handleChange={handleChange} handleFocusOut={handleFocusOut}/>
        <input className="submit-btn btn" type="submit" value="Sign Up"/>

      </form>
    </div>
  )
}

export default FormNew