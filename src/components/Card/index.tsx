/* eslint-disable @next/next/no-img-element */
import styles from './card.module.scss';

export default function Card({ book, handleModalOpen }) {
    return (
        <div className={styles.container} onClick={() => handleModalOpen(book)}>
            <img src={book.imageUrl} alt="" />
            <div className={styles.description}>
                <div className={styles.header}>
                    <p><strong>{book.title}</strong></p>
                    <div className={styles.authors}>
                        {book.authors.map((author, i) => {
                            return i < 2 ? <p key={author}>{author}</p> : null;
                        })}
                    </div>
                </div>
                <div className={styles.footer}>
                    <p>{book.pageCount} Páginas</p>
                    <p>{book.publisher}</p>
                    <p>Publicado em {book.published}</p>
                </div>
            </div>
        </div>
    )
}