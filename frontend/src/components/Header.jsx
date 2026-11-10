import './Header.css';

export default function Header({ onAdminClick }) {
  return (
    <header className="header">
      <div className="header__inner">
        <a href="#home" className="header__brand" aria-label="KL Fitness home">
          <span className="header__mark" aria-hidden="true">
            <svg viewBox="0 0 40 40">
              <path d="M20 3 5 8v11c0 9 6 15 15 18 9-3 15-9 15-18V8z" />
              <path d="M12 20h16M14 15v10M26 15v10" />
            </svg>
          </span>
          <span className="header__logo">KL <em>FITNESS</em></span>
        </a>

        <nav className="header__nav-links" aria-label="Main navigation">
          <a href="#home" className="header__link header__link--active" aria-current="page">
          Home
          </a>
          <a href="#plans" className="header__link">
          Plans
          </a>
          <a href="#contact" className="header__link">
          Contact
          </a>
          <button className="header__admin-link" type="button" onClick={onAdminClick}>
            Admin Login
          </button>
        </nav>
      </div>
    </header>
  );
}
