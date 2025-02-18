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
          <br/>
          
          <p>
            I'm a <strong>Mobile and Web Developer</strong> passionate about building interactive and user-friendly applications. 
            Besides coding, I enjoy <strong>going to the gym</strong> and playing sports like <strong>basketball</strong> and <strong>football</strong>. 
            I’m also very <strong>family-oriented</strong> and love spending quality time with my loved ones. 
            Oh, and one more thing—I absolutely <strong>love cats</strong>! 🐱
          </p>
          <p>
            When I’m not coding or working on new projects, you’ll probably find me lifting weights, on the basketball court, 
            or chilling with my cat, <strong>Ar-Krung</strong>. I also enjoy <strong>hiking</strong> and <strong>running</strong> to stay active 
            and appreciate nature. I believe in continuous learning and growth, always striving to 
            improve my skills and contribute to innovative digital solutions.
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
