import styles from './loader.module.css';

export default function Loader({ isLoading }) {
    if (!isLoading) {
        return <></>;
    }
    return (
        <div className={styles.lds_ring}><div></div><div></div><div></div></div>
    )
}