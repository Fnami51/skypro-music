import Image from "next/image"
import styles from "./style_components/sidebar.module.css"
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getFirstSet, getSecondSet, getThirdSet } from "@/store/features/filterSlice";

export default function Collections() {
  const dispatch = useAppDispatch();


    return (
        <div className={styles.block}>
              <div className={styles.list}>
                <div className={styles.item}>
                  <button className={styles.link} onClick={() => dispatch(getFirstSet())}>
                    <Image
                      className={styles.img}
                      src="/img/playlist01.png"
                      alt="day's playlist"
                      width={250}
                      height={150}
                    />
                  </button>
                </div>
                <div className={styles.item}>
                  <button className={styles.link} onClick={() => dispatch(getSecondSet())}>
                    <Image
                      className={styles.img}
                      src="/img/playlist02.png"
                      alt="day's playlist"
                      width={250}
                      height={150}
                    />
                  </button>
                </div>
                <div className={styles.item}>
                  <button className={styles.link} onClick={() => dispatch(getThirdSet())}>
                    <Image
                      className={styles.img}
                      src="/img/playlist03.png"
                      alt="day's playlist"
                      width={250}
                      height={150}
                    />
                  </button>
                </div>
              </div>
            </div>
    )
}