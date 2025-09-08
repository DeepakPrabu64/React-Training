import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import'./style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const [showPass, setShowPass] = useState(false);
  
  const [errors, setErrors] = useState({
    name: '',
    email: ''
  });
  
  const [borderColors, setBorderColors] = useState({
    name: '',
    email: ''
  });

  const validateName = (name) => {
    if (name.trim() === '') {
      return { isValid: false, message: 'Name is required' };
    }
    if (name.trim().length < 3) {
      return { isValid: false, message: 'Name must be at least 3 characters' };
    }
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      return { isValid: false, message: 'Name should only contain letters and spaces' };
    }
    return { isValid: true, message: '' };
  };

  const validateEmail = (email) => {
    if (email.trim() === '') {
      return { isValid: false, message: 'Email is required' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, message: 'Please enter a valid email address' };
    }
    return { isValid: true, message: '' };
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'name') {
      const validation = validateName(value);
      setErrors(prev => ({ ...prev, name: validation.message }));
      setBorderColors(prev => ({ 
        ...prev, name: value.trim() === '' ? '#dc3545' : validation.isValid ? '#28a745' : '#dc3545' 
      }));
    }
    
    if (field === 'email') {
      const validation = validateEmail(value);
      setErrors(prev => ({ ...prev, email: validation.message }));
      setBorderColors(prev => ({ 
        ...prev, email: value.trim() === '' ? '#dc3545' : validation.isValid ? '#28a745' : '#dc3545' 
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const nameValidation = validateName(formData.name);
    const emailValidation = validateEmail(formData.email);
    const isPasswordValid = formData.password.trim() !== '';
    
    if (nameValidation.isValid && emailValidation.isValid && isPasswordValid) {
      alert('Form submitted successfully! All fields are valid.');
    } 
  };

  return (
    <div className='full-container'>
    <div className="form-container d-flex align-items-center justify-content-center p-4">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card  shadow-lg border-0">
              <div className="card-body  p-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-bold">
                      <i className="fas fa-user me-2"></i>
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      style={{ 
                        borderColor: borderColors.name || '#ced4da',
                        borderWidth: '2px'
                      }}
                    />
                    {errors.name && (
                      <div className="text-danger mt-1">
                        <small>
                          <i className="fas fa-exclamation-triangle me-1"></i>
                          {errors.name}
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-bold"> 
                      <i className="fas fa-envelope me-2"></i>
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email address"
                      style={{ 
                        borderColor: borderColors.email || '#ced4da',
                        borderWidth: '2px'
                      }}
                    />
                    {errors.email && (
                      <div className="text-danger mt-1">
                        <small>
                          <i className="fas fa-exclamation-triangle me-1"></i>
                          {errors.email}
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-bold">
                      <i className="fas fa-lock me-2"></i>
                      Password
                    </label>
                    <div className="input-group">
                      <input
                        type={showPass ? 'text' : 'password'}
                        className="form-control form-control-lg"
                        id="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPass(!showPass)}
                      >
                        <i className={`fas ${showPass ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Form;