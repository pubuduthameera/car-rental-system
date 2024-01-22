import React from "react";
import "../../styles/sidebar.css";

const Sidebar = () => {
  return (
    <div className="profile_nav ">
      <ul className="links">
        {/* <li><a href="profile.php" style={{textDecoration:"none"}}>Profile Settings</a></li> */}
        {/* <li><a href="update-password.php" style={{textDecoration:"none"}}>Update Password</a></li> */}
        <li>
          <a href="/book" style={{ textDecoration: "none" }}>
            My Booking
          </a>
        </li>
        <li>
          <a href="/posttestermonial" style={{ textDecoration: "none" }}>
            Post a Testimonial
          </a>
        </li>
        <li>
          <a href="/mytestermonial" style={{ textDecoration: "none" }}>
            My Testimonials
          </a>
        </li>
        {/* <li><a href="logout.php" style={{textDecoration:"none"}}>Sign Out</a></li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
