import { useState } from "react";
import "./App.css";
import { SearchBar } from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultsList";
import { BirthdayForm } from "./components/BirthdayPopup";
import { RegistrationForm } from "./components/RegistrationForm";
import { Certificate } from "./components/Certificate";
import { LandingPage } from "./components/LandingPage";

function App() {
  const [results, setResults] = useState([]);
  const [showBirthdayForm, setShowBirthdayForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [birthday, setBirthday] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleResultClick = (user) => {
    setSelectedUser(user);
    setShowBirthdayForm(true);
  };

  const handleAgeError = () => {
    setShowBirthdayForm(false);
  };

  const handleAgeSuccess = (userBirthday) => {
    setShowBirthdayForm(false);
    setShowRegistrationForm(true);
    setBirthday(userBirthday);
  };

  const handleRegistrationSubmit =  (formData) => {
    const user = {
      ...selectedUser,
      birthday: birthday,
      age: new Date().getFullYear() - new Date(birthday).getFullYear(),
      ...formData
    };
    setSelectedUser(user);
    setShowRegistrationForm(false);
    setShowCertificate(true);
  };

  const handleBackToSearch = () => {
    setShowCertificate(false);
    setResults([]);
    setSelectedUser(null);
    setBirthday("");
    setShowSearch(true);
  }

  const handleNavigateToSearch = () => {
    setShowSearch(true);
  }


  return (
    <div className="App">
      {(showBirthdayForm || showRegistrationForm || showCertificate) && (
        <div className="overlay"></div>
      )}
      {!showSearch ? (
        <LandingPage onNavigateToSearch={handleNavigateToSearch } />
      ) : (
        <div className="search-bar-container">
          <SearchBar setResults={setResults} />
          {results && results.length > 0 && (
            <SearchResultsList results={results} handleResultClick={handleResultClick} />
          )}
          {showBirthdayForm && (
            <BirthdayForm
              onAgeSuccess={(birthday) => handleAgeSuccess(birthday)}
              onAgeError={handleAgeError}
            />
          )}
          {showRegistrationForm && (
            <RegistrationForm onSubmit={handleRegistrationSubmit} />
          )}
          {showCertificate && (
            <Certificate user={selectedUser} onBackToSearch={handleBackToSearch} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
