import {createBrowserRouter, Navigate} from "react-router-dom";
/****  student route ******/

import StudentLogin from "./views/student/StudentLogin.jsx";
import StudentDashboard from "./views/student/StudentDashboard.jsx";
import StudentProfile from "./views/student/profiles/StudentProfile.jsx";
import EditStudentProfile from "./views/student/profiles/EditProfile.jsx";

/****  staff route ******/

import AdminDashboard from "./views/staff/AdminDashboard.jsx";
import Login from "./views/staff/Login.jsx";
import SignupStaff from "./views/staff/SignupStaff.jsx";
import SignupStudent from "./views/staff/SignupStudent.jsx";
import AdminProfile from "./views/staff/profiles/AdminProfile.jsx";
import EditProfile from "./views/staff/profiles/EditProfile.jsx";
import Student from "./views/staff/Student.jsx";
import Staff from "./views/staff/Staff.jsx";

/****  super Admin route ******/
import Users from "./views/admin/Users.jsx";
import UserForm from "./views/admin/UserForm.jsx";
import Sport from "./views/admin/Sport.jsx";
import SportForm from "./views/admin/SportForm.jsx";



import NotFound from "./views/NotFound.jsx";
// import Dashboard from "./views/Dashboard.jsx";

import EditUserForm from "./views/user/EditUserForm.jsx";
import PasswordReset from "./views/PasswordReset.jsx";
import ResetForm from "./views/ResetForm.jsx";
// import LandingPage from "./views/LandingPage.jsx";

//components
import GuestAuthLayout from "./components/GuestAuthLayout.jsx";
import AdminAuthLayout  from "./components/AdminAuthLayout.jsx";
import DefaultAdminLayout from "./components/DefautAdminLayout.jsx";
import DefaultStudentLayout from "./components/DefaultStudentLayout.jsx";

import HomeLayout from "./components/HomeLayout.jsx";

const router = createBrowserRouter([
    {
        path:'/',
        element:<GuestAuthLayout />,
        children:[ 
            {
                path:'',
                element:<Navigate to="/student-login"/>
            },
            {
                path:'/student-login',
                element:<StudentLogin />
            },
            // {
            //     path:'/student-signup',
            //     element:<SignupStudent />
            // },
            {
                path:'/password-reset',
                element:<PasswordReset />
            },
            {
                path:'/password/reset',
                element:<ResetForm />
            },
            
        ]
    },
    
    {
    path:'/',
    element:<AdminAuthLayout />,
    children:[ 
        {
            path:'/admin',
            element:<Navigate to="/login"/>
        },
       
        {
            path:'/login',
            element:<Login />
        },
        // {
        //     path:'/signup-staff',
        //     element:<SignupStaff />
        // },
        {
            path:'/password-reset',
            element:<PasswordReset />
        },
        {
            path:'/password/reset',
            element:<ResetForm />
        },
    ]
},

    // {
    //     path:'/',
    //     element:<HomeLayout />,
    //     children:[
    //         {
    //             path:'',
    //             element:<Navigate to="/home "/>
                
    //         },
        
    //         {
    //             path:'/home',
    //             element:<LandingPage/>
    //         },
    //     ]
    // },

    {
        path:'/',
        element:<DefaultAdminLayout />,
        children:[

            {
               path:'/',
               element:<Navigate to="/dashboard" />
            },
            {
                path:'/dashboard',
                element:<AdminDashboard />
            },
            {
                path:'/admin-profile',
                element:<AdminProfile />
            },
            {
                path:'/profiles',
                element:<EditProfile key="profileCreate"/>
            },
            {
                path:'/profiles/:id',
                element:<EditProfile key="profileUpdate"/>
            },
            {
                path:'/staffs',
                element:<Staff />
            },
            {
                path:'/add-staff',
                element:<SignupStaff />
            },
            {
                path:'/add-student',
                element:<SignupStudent />
            },
             {
                path:'/students',
                element:<Student />
            },
           
            {
                path:'/users/:id',
                element:<EditUserForm key="userUpdate"/>
            },
            {
                path:'/all-users/:id',
                element:<UserForm key="userUpdate"/>
            },
            {
                path:'/results',
                element:<Sport />
            },
            {
                path:'/results/',
                element:<SportForm key="sportCreate"/>
            },
            {
                path:'/sports/:id',
                element:<SportForm key="sportUpdate"/>
            },

        ]
    },
    {
        path:'/',
        element:<DefaultStudentLayout />,
        children:[

            {
               path:'/',
               element:<Navigate to="/dashboard" />
            },
            {
                path:'/student-dashboard',
                element:<StudentDashboard />
            },
            {
                path:'/student-profile',
                element:<StudentProfile />
            },
            {
                path:'/profile-edit/:id',
                element:<EditStudentProfile key="profileUpdate"/>
            },
            {
                path:'/profile-edits',
                element:<EditStudentProfile key="profileCreate"/>
            },
            // {
            //     path:'/all-users/:id',
            //     element:<UserForm key="userUpdate"/>
            // },
            // {
            //     path:'/sports',
            //     element:<Sport />
            // },
            // {
            //     path:'/sports/new',
            //     element:<SportForm key="sportCreate"/>
            // },
            // {
            //     path:'/sports/:id',
            //     element:<SportForm key="sportUpdate"/>
            // },

        ]
    },
    //  {
    //     path:'/user',
    //     element:<UserDashBoard />,
    //     children:[
    //         {
    //             path:'/dashboard',
    //             element:<Navigate to="/dashboard" />
    //         },
    //         {
    //             path:'/dashboard',
    //             element:<Dashboard />
    //         },
    //         {
    //             path:'/users/:id',
    //             element:<EditUserForm key="userUpdate"/>
    //         },
        
    //     ]
    // },

    {
       
    },
  
    // {
    //     path:'/',
    //     element:<GuestLayouth />,
    //     children:[
           
    //         {
    //             path:'/dashboard',
    //             element:<Dashboard />
    //         },
    //         {
    //             path:'/users/:id',
    //             element:<EditUserForm key="userUpdate"/>
    //         },
          
    //     ]
    // },
  
    {
        path:'*',
        element:<NotFound />
    },



])

export default router;