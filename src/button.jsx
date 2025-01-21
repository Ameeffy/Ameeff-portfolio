const Buttons = () => {
    const handleDownloadCV = () => {
      alert("Downloading CV HAHAHA");
    };
  
    const handleExplore = () => {
      alert("Exploring more!");
    };
  
    return (
      <div className="button-group">
        <button className="cv-button" onClick={handleDownloadCV}>
          Download CV
        </button>
        <button className="cv-button" onClick={handleExplore}>
          Explore More
        </button>
      </div>
    );
  };
  
  export default Buttons;
  