import Image from "next/image"
import styles from "./style_components/header.module.css"

export default function Header() {
    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>
              <Image 
                className={styles.image}
                src="/img/logo.png" 
                alt={"Логотип"} 
                width={114} 
                height={17}/>
            </div>
            <div className={styles.burger}>
              <span className={styles.burgerLine}></span>
              <span className={styles.burgerLine}></span>
              <span className={styles.burgerLine}></span>
            </div>
            <div className={styles.menu}>
              <ul className={styles.list}>
                <li className={styles.item}>
                  <a href="#" className={styles.link}>Главное</a>
                </li>
                <li className={styles.item}>
                  <a href="#" className={styles.link}>Мой плейлист</a>
                </li>
                <li className={styles.item}>
                  <a href="../signin.html" className={styles.link}>Войти</a>
                </li>
              </ul>
            </div>
          </nav>
    )
}