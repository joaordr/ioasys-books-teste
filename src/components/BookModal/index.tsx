/* eslint-disable @next/next/no-img-element */
import ReactModal from 'react-modal';
import { ImQuotesLeft } from "react-icons/im";

import styles from './bookModal.module.scss';

interface ModalProps {
    book: any;
    isOpen: boolean;
    onRequestClose: () => void;
}

export default function BookModal({ book, isOpen, onRequestClose }: ModalProps) {
    if (book == null) {
        return <></>;
    }
    return (
        <>
            {isOpen && <button onClick={onRequestClose} className={styles.close}>x</button>}
            <ReactModal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                overlayClassName={styles.ReactModal__Overlay}
                className={styles.ReactModal__Content}
            >
                <div className={styles.container}>
                    <img src={book.imageUrl} alt="" />
                    <div className={styles.description}>
                        <div className={styles.header}>
                            <p><strong>{book.title}</strong></p>
                            <div className={styles.authors}>
                                {book.authors.map((author, i) => {
                                    return <p key={author}>{author}{i < book.authors.length - 1 ? ', ' : ''}</p>;
                                })}
                            </div>
                        </div>

                        <div className={styles.infos}>
                            <p className={styles.title}>INFORMAÇÕES</p>
                            <div>
                                <div>
                                    <p>Páginas</p>
                                    <p>Editora</p>
                                    <p>Publicação</p>
                                    <p>Idioma</p>
                                    <p>Titulo Original</p>
                                    <p>ISBN-10</p>
                                    <p>ISBN-13</p>
                                </div>
                                <div>
                                    <p>{book.pageCount} páginas</p>
                                    <p>{book.publisher}</p>
                                    <p>{book.published}</p>
                                    <p>{book.language}</p>
                                    <p>{book.title}</p>
                                    <p>{book.isbn10}</p>
                                    <p>{book.isbn13}</p>
                                </div>
                            </div>

                        </div>

                        <div className={styles.resenha}>
                            <p>RESENHA DA EDITORA</p>
                            <p><ImQuotesLeft /> {book.description}</p>
                        </div>

                    </div>
                </div>
            </ReactModal>
        </>

    )
}