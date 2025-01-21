import './App.css';
import Upper from './header.jsx';
import Buttons from './button.jsx';
import profileImage from './assets/images/iconameeffy.jpg';

function App() {
  return (
    <>
      <div className="parent-class">
        <Upper />
        <div id="about" className="my-section">
          <h1>Hi, I’m Ar-Ameeff M. Adjarail ❤️</h1>
          <img className="profile-img" src={profileImage} alt="Ameeffy's Profile" />
          <p>A Mobile and Web Developer creating user-friendly and visually appealing digital solutions.</p>

          <Buttons />
        </div>
        <div id="works" className="works-section">
          <h2>My Works</h2>
          <p>Details about projects and work experience go here bruh lmao</p>
        </div>
        <footer id="contact" className="footer-section">
          <h3>
            Contact Me
          </h3>
          <p>
            <i className="fas fa-envelope"></i> Email: arameeff@gmail.com
          </p>
          <p>
            <i className="fas fa-phone"></i> Phone: +6399 2851 55692
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
