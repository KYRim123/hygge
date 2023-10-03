import style from "./loading.module.css";
export default function Loading() {
  return (
    <div className={style.wrapperLoading}>
      <div className={style.loadingComponent}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
