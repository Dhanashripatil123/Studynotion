import "./App.css"
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import NavbarLinks from "./components/common/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePasssword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contactus from "./pages/ContactUs";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashbord";
import Error from "./pages/Error";
import Settings from "./components/core/Dashboard/Settings/Setting"
import Cart from "./components/core/Dashboard/Cart";
import  EnrolledCourses from "./components/core/Dashboard/Settings/EnrolledCoures";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourses/AddCourses";
import MyCoursePage from "./components/core/Dashboard/AddCourses/Mycourse";
import ViewLecturePage from "./components/core/Dashboard/AddCourses/CourseBuilder/ViewLecturePage";
import { GrCatalog } from "react-icons/gr";
// import Catalog from "./pages/Catalog";
import CatalogByCategory from "./pages/CatalogByCategory";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetail from "./components/core/ViewCourse/VideoDetail";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";

function App() {
  const { user } = useSelector((state) => state.auth)

  return (

   
    <div className="w-full height-full min-h-screen bg-[#050d1a] flex flex-col font-inter">
      <NavbarLinks></NavbarLinks>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/ForgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/update-password/:token" element={<UpdatePasssword />}></Route>
        <Route path="/verify-email" element={<VerifyEmail />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={< Contactus />}></Route>
        <Route path='/catalog' element={<CatalogByCategory/>}></Route>
        <Route path='/catalog/:categoryId' element={<CatalogByCategory/>}></Route>
        <Route path='/course/:courseId' element={<CourseDetails/>}></Route>


        <Route element={
          <PrivateRoute>
          <Dashboard></Dashboard>
          </PrivateRoute>

        }>

          {/* When user navigates to /dashboard show Instructor dashboard by default */}
          <Route path="dashboard" element={<Instructor/>}></Route>

         
          <Route path="dashboard/my-profile" element={< MyProfile />}></Route>
          <Route path="dashboard/settings" element={< Settings />}></Route>
          <Route path="dashboard/add-course" element={<AddCourse></AddCourse>}></Route>
          <Route path="dashboard/view-lecture" element={<ViewLecturePage />}></Route>
          <Route path="dashboard/cart" element={<Cart></Cart>}></Route>
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses></EnrolledCourses>}></Route> 
          <Route path="dashboard/my-courses" element={<MyCoursePage></MyCoursePage>}></Route> 
         
          {
                    user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/cart" element={<Cart></Cart>}></Route>
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses></EnrolledCourses>}></Route> 
              </>
            )
           }

           {
                    user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/add-course" element={<AddCourse></AddCourse>}></Route>
                <Route path="dashboard/instructor" element={<Instructor/>}></Route>
                
              </>
            )
           }

          {/* View course (private) with nested lecture route */}
          <Route path="/view-course/:courseId" element={<PrivateRoute><ViewCourse /></PrivateRoute>}>
            <Route path="section/:sectionId/sub-section/:subsectionId" element={<VideoDetail />} />
            {/* accept 'subsection' (no hyphen) as well to match navigation from sidebar */}
            <Route path="section/:sectionId/subsection/:subsectionId" element={<VideoDetail />} />
          </Route>

        </Route>

        <Route path="*" element={<Error></Error>}></Route>

      </Routes>

    </div>
  );
}

export default App;
