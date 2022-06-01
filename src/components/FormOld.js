import { useEffect, useRef, useState } from "react"


const FormOld = () => {
const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  dob: ""
}

const form = useRef();
const username = useRef()
const email = useRef()
const password = useRef()
const confirmPassword = useRef()
const dob = useRef()
const [formValues, setFormValues] = useState(initialValues)
let isFieldValid = [
  {field: 'username', isValid: false},
  {field: 'email', isValid: false},
  {field: 'password', isValid: false},
  {field: 'confirmPassword', isValid: false},
  {field: 'dob', isValid: false},
]

const handleChange = (e) => {
  const {name, value} = e.target;
  setFormValues({...formValues, [name]:value})
}

const isValid = (arr, valid) => {
  return arr.some(arrVal => valid === arrVal.isValid)
}

const handleSubmit = (e) => {
  e.preventDefault();

  for (let i=0; i<5; i++) {
    const input = document.querySelectorAll('input')[i]
    validate(input)
  }

  if(!(isValid(isFieldValid, false))) {
    console.log(formValues);
    setFormValues(initialValues);
    form.current.reset()

    const forms = document.querySelectorAll('.form-validation')
    for (let i=0; i<forms.length; i++){
      forms[i].classList.remove('valid');
    }
  }
}

const handleFocusOut = (e) => {
  validate(e.target);
}

const validate = (field) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  let obj = isFieldValid.find(f => f.field===field.name);

  if (!field.value) {
    field.parentElement.classList.add('error');
    field.parentElement.classList.remove('valid');
    field.nextElementSibling.innerHTML = `${field.previousElementSibling.innerHTML} is required`;
    obj.isValid = false;
  }
  else if (field.name === 'confirmPassword' && field.value !== password.current.value) {
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

// const formData = [
//   {
//   inputType: "text",
//   id: "username",
//   name: "username",
//   placeholderSuffix:"username"
//   },
//   {
//   inputType: "email",
//   id: "email",
//   name: "email",
//   placeholderSuffix:"email"
//   },
//   {
//   inputType: "password",
//   id: "password",
//   name: "password",
//   placeholderSuffix:"password"
//   },
//   {
//   inputType: "password",
//   id: "confirm",
//   name: "confirmPassword",
//   placeholderSuffix:"password"
//   },
//   {
//   inputType: "date",
//   id: "dob",
//   name: "dob",
//   placeholderSuffix:"Date Of Birth"
//   },
//   {
//   inputType: "file",
//   id: "file",
//   name: "file",
//   placeholderSuffix:"file"
//   }
  
// ]

}

  return (
    <div className="form-content">
      <h1>Sign Up</h1>
      <form ref={form} onSubmit={handleSubmit} action="#">
        <div className="username form-validation">
          <label htmlFor="username">Username</label>
          <input ref={username} onChange={handleChange} onBlur={handleFocusOut} type="text" name="username" id="username" placeholder="Enter a username"/>
          <p>Error</p>
        </div>
        <div className="email form-validation">
          <label htmlFor="email">Email</label>
          <input ref={email}  onChange={handleChange} onBlur={handleFocusOut} type="email" name="email" id="email" placeholder="Enter your email"/>
          <p>Error</p>
        </div>
        <div className="password form-validation">
          <label htmlFor="password">Password</label>
          <input ref={password} onChange={handleChange} onBlur={handleFocusOut} type="password" name="password" id="password" placeholder="Enter your password"/>
          <p>Error</p>
        </div>
        <div className="confirm-password form-validation">
          <label htmlFor="confirm">Confirm Password</label>
          <p className="hide">Password</p>
          <input ref={confirmPassword} onChange={handleChange} onBlur={handleFocusOut} type="password" id="confirm" placeholder="Confirm your password" name="confirmPassword"/>
          <p>Error</p>
        </div>
        <div className="dob form-validation">
          <label htmlFor="dob">Date Of Birth</label>
          <input ref={dob} onChange={handleChange} onBlur={handleFocusOut} name="dob"  type="date" id="dob" placeholder="Enter your date of birth"/>
          <p>Error</p>
        </div>
        <div className="file">
          <label htmlFor="file">Upload Documents</label>
          <input type="file" id="file" name="file"/>
        </div>

        <input className="submit-btn btn" type="submit" value="Sign Up"/>

      </form>
    </div>
  )
}

export default FormOld