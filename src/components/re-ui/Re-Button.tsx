import styles from "./FancyButton.module.css";

type SendButtonProps = {
  children?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
};

export default function SendButton({
  children = "Send",
  loading = false,
  disabled = false,
  onClick,
  type = "button",
}: SendButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`${styles.button} cursor-pointer`}
      aria-busy={loading}
    >
      <div className={styles.svgWrapper1}>
        <div className={styles.svgWrapper}>
          {loading ? (
            <span className={styles.spinner} />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                fill="currentColor"
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
              />
            </svg>
          )}
        </div>
      </div>

      <span className={styles.text}>{loading ? "Sending…" : children}</span>
    </button>
  );
}
