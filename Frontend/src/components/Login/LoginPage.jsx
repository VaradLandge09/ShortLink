import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import axios from 'axios'
import {host} from '../../globalVar'
import { AuthContext } from '../../contexts/AuthContext';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const {login} = useContext(AuthContext);

  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  })

  const handleValueChange = (e) => {
    const {name, value} = e.target;

    setUserForm({...userForm, [name]: value})
  }

  const submitForm = async (e) => {
    e.preventDefault()

    try {

      const {name, email, mobile, password} = userForm;

      if((!email || !password) || (!isLogin && (!name || !mobile))) {
        setMsg("Invalid details")
        return
      }

      let response;

      if(name) {
        response = await axios.post(`${host}/login`, userForm)
      } else {
        response = await axios.post(`${host}/login`, {email, password})
      }

      const {user} = response.data;
      console.log(user);
      login(user)
      setMsg("Login Successfull")
      navigate('/dashboard')
      
    } catch (error) {
      console.error(error.message || "Something went wrong");
    }
  }

  useEffect(() => {
    const text = location.state.formType;
    if(text === 'signUp') {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-600">
            {isLogin 
              ? 'Sign in to your account to continue' 
              : 'Sign up to get started with your account'
            }
          </p>
        </div>

        <div className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  name='name'
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={userForm.name}
                  onChange={handleValueChange}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                name='email'
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={userForm.email}
                onChange={handleValueChange}
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="number"
                  name='mobile'
                  placeholder="Enter your mobile number"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={userForm.mobile}
                  onChange={handleValueChange}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type={showPassword ? "text" : "password"}
                name='password'
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={userForm.password}
                onChange={handleValueChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium transition-all"
            onClick={submitForm}
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}