import styles from "./LoadingUi.module.css";

type OrbitLoaderProps = {
  label?: string;
  size?: number; 
};

export default function LoadingUi({
  label = "loading",
  size = 190,
}: OrbitLoaderProps) {
  return (
    <div className={styles.page} style={{ width: size, height: size }}>
      <div className={styles.container}>
        <span className={styles.ring} />
        <span className={styles.ring} />
        <span className={styles.ring} />
        <span className={styles.ring} />
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
}
