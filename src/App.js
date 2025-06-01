
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SuperAdminDashboard from "./SuperAdmin/js/SuperAdminDashboard.jsx";
import ContentManagement from "./SuperAdmin/js/ContentMgmt.jsx";
import BannerSection from "./SuperAdmin/js/BannerSection.jsx";
import DiseaseOutbreak from "./SuperAdmin/js/DiseaseOutbreak.jsx";
import FAQSection from "./SuperAdmin/js/FAQSection.jsx";
import ExpertiseMngt from "./SuperAdmin/js/ExpertiseMngt.jsx";
import Testimonial from "./SuperAdmin/js/Testimonial.jsx";
import VetAppointments from "./SuperAdmin/js/VetAppointments.jsx";
import MonthlyPayOut from "./SuperAdmin/js/MonthlyPayOut.jsx";
import RefundForm from "./SuperAdmin/js/RefundForm.jsx";


import Payout from "./SuperAdmin/js/Payout.jsx";

import AdminDashboard from "./Admin/js/AdminDashboard.jsx";
import ManageVet from "./Admin/js/ManageVet.jsx";


import VetDashboard from "./Vet/js/VetDashboard";
import Appointments from "./Vet/js/Appointments";
import MySchedule from "./Vet/js/MySchedule";
import PaymentLog from "./Vet/js/PaymentLog";
import Reviews from "./Vet/js/Reviews";
import VetProfile from './Vet/js/VetProfile';
import VetReviews from "./Vet/js/VetReviews";
import VetEditProfile from "./Vet/js/VetEditProfile";


import GuestUserpage from "./Client/js/GuestUserpage.js";
import SignupForm from './Client/js/SignupForm';
import OTPForm from './Client/js/OTPForm';
import Login from './Client/js/Login';
import ForgotPassword from './Client/js/Forgotpassword';
import ResetPassword from './Client/js/Resetpassword';
import Footer from './Client/js/Footer';
import VetRegister from './Client/js/VetRegister';
import Homepage from './Client/js/Homepage';
import AboutUs from './Client/js/AboutUs.js';
import Media from './Client/js/Media.js';
import Vets from './Client/js/Vets.js';
import VProfile from './Client/js/VProfile.js';
import Userprofile from './Client/js/Userprofile.js';
import Appointment from './Client/js/Appointment.js';
import PetRegister from './Client/js/PetRegister.js';
import Myappointment from './Client/js/Myappointment.js';
import Refund from './Client/js/Refund.js';
import Reschedule from './Client/js/Reschedule.js';
import ProtectedRoute from './ProtectedRoute.js';
import Booking from './Client/js/Booking.js';

import VetApp from './Admin/js/VetApp.jsx';
import Report from './Admin/js/Report.jsx';

import Loading from './Client/js/Loading.js';
import './App.css';

import React, { useState, useEffect } from 'react';
import OTPChange from './Client/js/OTPChange.js';

const AppWrapper = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // simulate loading for 1 second

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {loading && <Loading />}
      <Routes>
        <Route path="/client" element={<SignupForm />} />

      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      {/* <AppWrapper /> */}
      <Routes>
        {/* CLIENT */}

        <Route path="/" element={<GuestUserpage />} />
        <Route path="/client" element={<SignupForm />} />
        <Route path="/otp" element={<OTPForm />} />
        <Route path="/OTP-verification" element={<OTPChange />} />

        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/media" element={<Media />} />
        <Route path="/vets" element={<Vets />} />
        <Route path="/vprofile" element={<VProfile />} />
        <Route path="/VetRegistration" element={<VetRegister />} />

        <Route path="/appointment" element={<ProtectedRoute> <Appointment /> </ProtectedRoute>} />
        <Route path="/myappointment" element={<ProtectedRoute> <Myappointment /> </ProtectedRoute>} />
        <Route path="/refund" element={<ProtectedRoute> <Refund /> </ProtectedRoute>} />
        <Route path="/reschedule" element={<ProtectedRoute> <Reschedule /> </ProtectedRoute>} />
        <Route path="/homepage" element={<ProtectedRoute> <Homepage /> </ProtectedRoute>} />
        <Route path="/userprofile" element={<ProtectedRoute> <Userprofile /> </ProtectedRoute>} />
        <Route path="/petregister" element={<ProtectedRoute><PetRegister /></ProtectedRoute>} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/footer" element={<Footer />} />


        {/* SUPERADMIN */}

        <Route path="/SuperAdmindashboard" element={<SuperAdminDashboard />} />
        <Route path="/contentmgnt" element={<ContentManagement />}>
          <Route path="disease" element={<DiseaseOutbreak />} />
          <Route path="banner" element={<BannerSection />} />
          <Route path="faq" element={<FAQSection />} />
        </Route>
        <Route path="/expertiseMngt" element={<ExpertiseMngt />} />
        <Route path="/manageTestimonial" element={<Testimonial />} />
        <Route path="/refund-forms" element={<RefundForm />} />


        {/* EXPERTISE */}

        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/vetApplication" element={<VetApp />} />
        <Route path="/report" element={<Report />} />
        <Route path="/payout" element={<Payout />} />
        <Route path="/vet-appointments" element={<VetAppointments />} />
        <Route path="/monthlyPayout" element={<MonthlyPayOut />} />
        <Route path="/vetManage" element={<ManageVet />} />


        {/* VET DASHBOARD */}

        <Route path="/vetDashboard" element={<VetDashboard />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/MySchedule" element={<MySchedule />} />
        <Route path="/PaymentLog" element={<PaymentLog />} />
        <Route path="/VetReviews" element={<VetReviews />} />
        <Route path="/VetProfile" element={<VetProfile />} />
        <Route path="/VetEditProfile" element={<VetEditProfile />} />

      </Routes>
    </Router>
  );
}

export default App;
