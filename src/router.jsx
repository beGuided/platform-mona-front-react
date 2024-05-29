import {createBrowserRouter, Navigate} from "react-router-dom";
/****  student route ******/

import StudentLogin from "./views/student/StudentLogin.jsx";
import StudentDashboard from "./views/student/StudentDashboard.jsx";
import StudentProfile from "./views/student/profiles/StudentProfile.jsx";
import UpdateStudentProfile from "./views/student/profiles/EditProfile.jsx";
// import UpdateStudentProfile from "./views/Profile.jsx";

/****  staff route ******/

import AdminDashboard from "./views/staff/AdminDashboard.jsx";
import Login from "./views/staff/Login.jsx";
import Department from "./views/staff/department/Department.jsx";
import EditDepartment from "./views/staff/department/EditDepartment.jsx";
import SignupStaff from "./views/staff/manageUser/SignupStaff.jsx";
import SignupStudent from "./views/staff/manageUser/SignupStudent.jsx";
import AdminProfile from "./views/staff/profiles/AdminProfile.jsx";
import EditProfile from "./views/staff/profiles/EditProfile.jsx";
import Student from "./views/staff/manageUser/Student.jsx";
import Staff from "./views/staff/manageUser/Staff.jsx";
import Semester from "./views/staff/semester/Semester.jsx";
import EditSemester from "./views/staff/semester/EditSemester.jsx";
import Course from "./views/staff/course/Course.jsx";
import EditCourse from "./views/staff/course/EditCourse.jsx";
import Result from "./views/staff/result/Result.jsx";
import EditResult from "./views/staff/result/EditResult.jsx";


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
                path:'/departments',
                element:<Department key="department"/>
            },
            {
                path:'/add-department',
                element:<EditDepartment key="addeDepartment"/>
            },
            {
                path:'/departments/:id',
                element:<EditDepartment key="editDepartment"/>
            },
            {
                path:'/semesters',
                element:<Semester key="semester"/>
            },
            {
                path:'/add-semester',
                element:<EditSemester key="addeSemester"/>
            },
            {
                path:'/semesters/:id',
                element:<EditSemester key="editSemester"/>
            },
            {
                path:'/courses',
                element:<Course key="course"/>
            },
            {
                path:'/add-course',
                element:<EditCourse key="addeCourse"/>
            },
            {
                path:'/courses/:id',
                element:<EditCourse key="editCourse"/>
            },
            {
                path:'/results',
                element:<Result key="Result"/>
            },
            {
                path:'/add-result',
                element:<EditResult key="addeResult"/>
            },
            {
                path:'/results/:id',
                element:<EditResult key="editCourse"/>
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
                path:'/edit-student/:id',
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
            // {
            //     path:'/results',
            //     element:<Sport />
            // },
            // {
            //     path:'/results/',
            //     element:<SportForm key="sportCreate"/>
            // },
            // {
            //     path:'/sports/:id',
            //     element:<SportForm key="sportUpdate"/>
            // },

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
                path:'/update-profile/:id',
                element:<UpdateStudentProfile key="profileUpdate"/>
            },
            {
                path:'/create-profile',
                element:<UpdateStudentProfile key="profileCreate"/>
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