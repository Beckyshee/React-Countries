import './Header.scss'
import moon from '../assets/icons8-moon-50.png'

const Header = () => {
  return (
    <div>
      <header>
        <div>
          <h1>Where in the world?</h1>
              </div>
              <div className="mode">
                  <button><img src={moon} alt="mode" /><span>Dark Mode</span></button>
              </div>
      </header>
    </div>
  );
}

export default Header