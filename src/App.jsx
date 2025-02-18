import './App.css';
import Upper from './hero.jsx';
import Buttons from './button.jsx';
import profileImage from './assets/images/iconameeffy.jpg';


function App() {
  return (
    <>
      <div className="parent-class">
        <Upper />
        
        <div id="home" className="my-section">
          <h1>Hi, I’m Ar-Ameeff M. Adjarail ❤️</h1>
          <img className="profile-img" src={profileImage} alt="Ameeffy's Profile" />
          <p>A Mobile and Web Developer creating user-friendly and visually appealing digital solutions.</p>
          <Buttons />
        </div>

        <div id="about" className="about-section">
        <h2>About Me</h2>

          <p>
          I specialize in <strong>Node.js, JavaScript, CSS, and React Native</strong>, with experience working with <strong>MySQL databases</strong>. 
          My passion lies in developing scalable and efficient web and mobile applications that enhance user experiences.
          </p>

          <p>
           Outside of coding, I enjoy staying active, engaging in sports, and exploring new challenges. 
           I have a strong interest in technology and continuous learning, always looking for ways to improve and innovate.
          </p>
        </div>

        <div id="works" className="works-section">
          <h2>My Works</h2>
          <br/>
          <p>Details about projects and work experience go here bruh lmao</p>
        </div>

        <footer id="contact" className="footer-section">
          <h3>Contact Me</h3>
          <br/>
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
