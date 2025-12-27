import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../components/Components';
import { useAuthStore } from '../stores';

// --- Splash Screen ---
export const Splash: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/onboarding'), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full bg-primary flex items-center justify-center">
      <div className="flex items-center gap-4 animate-bounce">
        <span className="text-white text-6xl font-bold tracking-tight">nectar</span>
      </div>
    </div>
  );
};

// --- Onboarding ---
export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full relative flex flex-col justify-end pb-12 px-8 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)' }}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center">
        <div className="mb-4 text-white text-5xl font-bold leading-tight">
          Welcome<br />to our store
        </div>
        <p className="text-gray-200 mb-8">Get your groceries in as fast as one hour</p>
        <Button fullWidth onClick={() => navigate('/login')}>Get Started</Button>
      </div>
    </div>
  );
};

// --- Login ---
export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuthStore((s) => s.login);

  const handleLogin = async () => {
    if (!email) return;
    await login(email);
    navigate('/otp');
  };

  return (
    <div className="min-h-screen bg-white p-6 pt-20 flex flex-col max-w-md mx-auto">
       <div className="flex justify-center mb-10">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M15.4857 7.72895L9.62312 2.76813C9.3361 2.52554 8.90796 2.5739 8.6798 2.87274L7.54516 4.35964C8.42841 4.70678 9.20819 5.28911 9.8091 6.06899C10.4216 6.86411 10.7497 7.82823 10.75 8.82895C10.7503 9.82967 10.4227 10.7941 9.81057 11.5896L14.0722 15.1963C16.9429 17.6253 21.242 17.2711 23.6709 14.4004C26.1002 11.5298 25.746 7.23075 22.8753 4.80145C20.9328 3.15764 18.2392 2.84478 16.0336 3.9189L15.4857 7.72895Z" fill="#53B175"/><path d="M0.938842 19.3248C3.0682 21.1265 6.22066 20.826 7.99427 18.6651L12.5714 13.2554C13.0645 12.6094 13.3283 11.8335 13.3281 11.0284C13.3278 10.2233 13.0637 9.44755 12.5709 8.80164C12.087 8.17387 11.4595 7.70517 10.7487 7.42588L0.279155 20.1044C0.470473 19.8805 0.692484 19.6192 0.938842 19.3248Z" fill="#F3603F"/></svg>
       </div>
       <h2 className="text-2xl font-bold text-dark mb-2">Loging</h2>
       <p className="text-graytext mb-10">Enter your email and password</p>

       <div className="space-y-6">
         <Input 
            label="Email" 
            placeholder="imshuvo97@gmail.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
         <Input 
            label="Password" 
            type={showPassword ? "text" : "password"} 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightIcon={
              !showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              )
            }
            onRightIconClick={() => setShowPassword(!showPassword)}
         />
       </div>
       
       <div className="flex justify-end mt-4 mb-8">
         <span className="text-sm text-dark cursor-pointer">Forgot Password?</span>
       </div>

       <Button onClick={handleLogin}>Log In</Button>

       <div className="mt-6 text-center text-sm font-semibold">
         Don't have an account? <span className="text-primary cursor-pointer" onClick={() => navigate('/signup')}>Signup</span>
       </div>
    </div>
  );
};

// --- Signup ---
export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-white p-6 pt-20 flex flex-col max-w-md mx-auto">
        <div className="flex justify-center mb-10">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M15.4857 7.72895L9.62312 2.76813C9.3361 2.52554 8.90796 2.5739 8.6798 2.87274L7.54516 4.35964C8.42841 4.70678 9.20819 5.28911 9.8091 6.06899C10.4216 6.86411 10.7497 7.82823 10.75 8.82895C10.7503 9.82967 10.4227 10.7941 9.81057 11.5896L14.0722 15.1963C16.9429 17.6253 21.242 17.2711 23.6709 14.4004C26.1002 11.5298 25.746 7.23075 22.8753 4.80145C20.9328 3.15764 18.2392 2.84478 16.0336 3.9189L15.4857 7.72895Z" fill="#53B175"/><path d="M0.938842 19.3248C3.0682 21.1265 6.22066 20.826 7.99427 18.6651L12.5714 13.2554C13.0645 12.6094 13.3283 11.8335 13.3281 11.0284C13.3278 10.2233 13.0637 9.44755 12.5709 8.80164C12.087 8.17387 11.4595 7.70517 10.7487 7.42588L0.279155 20.1044C0.470473 19.8805 0.692484 19.6192 0.938842 19.3248Z" fill="#F3603F"/></svg>
       </div>
       <h2 className="text-2xl font-bold text-dark mb-2">Sign Up</h2>
       <p className="text-graytext mb-10">Enter your credentials to continue</p>

       <div className="space-y-6">
         <Input label="Username" placeholder="Afsar Hossen Shuvo" />
         <Input label="Email" placeholder="imshuvo97@gmail.com" />
         <Input 
           label="Password" 
           type={showPassword ? "text" : "password"} 
           placeholder="••••••••" 
           rightIcon={
              !showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              )
           }
           onRightIconClick={() => setShowPassword(!showPassword)}
         />
       </div>
       
       <div className="mt-8 text-xs text-graytext leading-5 mb-8">
          By continuing you agree to our <span className="text-primary">Terms of Service</span><br/>
          and <span className="text-primary">Privacy Policy</span>.
       </div>

       <Button onClick={() => navigate('/login')}>Sign Up</Button>
       
       <div className="mt-6 text-center text-sm font-semibold">
         Already have an account? <span className="text-primary cursor-pointer" onClick={() => navigate('/login')}>Login</span>
       </div>
    </div>
  );
};

// --- OTP ---
export const OTP: React.FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  const handleVerify = () => {
    if (code === '1234') {
      navigate('/location');
    } else {
      alert('Invalid code. Please enter 1234');
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 pt-12 flex flex-col max-w-md mx-auto">
      <button onClick={() => navigate(-1)} className="mb-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <h2 className="text-2xl font-bold text-dark mb-8">Enter your 4-digit code</h2>
      <div className="mb-12">
        <label className="text-graytext text-sm">Code</label>
        <input 
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full text-3xl tracking-[1em] border-b border-gray-200 py-2 focus:outline-none focus:border-primary" 
          placeholder="- - - -" 
          maxLength={4} 
        />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-primary font-medium cursor-pointer">Resend Code</span>
        <button onClick={handleVerify} className="bg-primary rounded-full w-14 h-14 flex items-center justify-center text-white shadow-lg">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
};

// --- Location ---
export const LocationSelection: React.FC = () => {
  const navigate = useNavigate();
  const setLoc = useAuthStore(s => s.setLocation);
  const [zone, setZone] = useState('Banasree');
  const [area, setArea] = useState('');

  const handleSubmit = () => {
    const fullLocation = area ? `${zone}, ${area}` : zone;
    setLoc(fullLocation);
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center pt-20 max-w-md mx-auto">
       <img src="https://picsum.photos/200/200?random=map" alt="Map" className="w-48 mb-10 object-contain" />
       
       <h2 className="text-2xl font-bold text-dark mb-2">Select Your Location</h2>
       <p className="text-graytext text-center text-sm mb-12 px-4">Switch on your location to stay in tune with what's happening in your area</p>

       <div className="w-full space-y-6 mb-10">
          <div>
            <label className="text-graytext text-sm ml-1">Your Zone</label>
            <select 
              className="w-full border-b border-gray-200 py-3 bg-white text-dark focus:outline-none"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
            >
              <option value="Banasree">Banasree</option>
              <option value="Gulshan">Gulshan</option>
              <option value="Dhanmondi">Dhanmondi</option>
              <option value="Bashundhara">Bashundhara</option>
            </select>
          </div>
          <div>
            <label className="text-graytext text-sm ml-1">Your Area</label>
            <input 
              type="text" 
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Types of your area"
              className="w-full border-b border-gray-200 py-3 bg-white text-dark placeholder-gray-400 focus:outline-none"
            />
          </div>
       </div>

       <Button fullWidth onClick={handleSubmit}>Submit</Button>
    </div>
  );
};