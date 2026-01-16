
import odnoclassniki from "../../assets/ok.svg";
import vk from "../../assets/vk.svg";
import youtube from "../../assets/youtube.svg";
import telegram from "../../assets/telegram.svg";
import "./footer.css";

function Footer() {
  return (
    <div className="footer">
      <ul className="footer__links">
      <li className="footer__links-item">
          <a href="https://vk.com/alena_schepina" className="footer__links-link" target="_blank">
            <img src={vk} className="footer__links-img" alt="vk" />
          </a>
        </li>

        <li className="footer__links-item">
          <a href="https://youtube.com" className="footer__links-link" target="_blank">
            <img src={youtube} className="footer__links-img" alt="youtube" />
          </a>
        </li>

        <li className="footer__links-item">
          <a href="#" className="footer__links-link" target="_blank">
            <img src={odnoclassniki} className="footer__links-img" alt="ok" />
          </a>
        </li>

        <li className="footer__links-item">
          <a href="https://t.me/alenaschepina" className="footer__links-link" target="_blank">
            <img src={telegram} className="footer__links-img" alt="telegram" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
