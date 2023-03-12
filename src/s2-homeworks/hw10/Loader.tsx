import s from './Loader.module.css'
import preloader from "./preloader.svg"


// export const Loader = () => <div className={s.loader}/>
export const Loader = () => <img src={preloader} alt="image" className={s.loader}/>
