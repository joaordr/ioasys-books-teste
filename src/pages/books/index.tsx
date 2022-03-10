/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect, useState } from 'react';
import Head from 'next/head';

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BookModal from '../../components/BookModal';

import Card from '../../components/Card';
import Header from '../../components/Header';
import { AuthContext } from '../../contexts/AuthContext';
import { apiAuth } from '../../services/apiAuth';

import styles from './books.module.scss';

export default function Books() {
    const { signOut, isAuthenticated } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [activePage, setActivePage] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const api = apiAuth();

    async function fetchBooks() {
        try {
            api.get(`/books?page=${activePage}&amount=12`).then(response => {
                setBooks(response.data.data);
                setTotalPages(Math.ceil(response.data.totalPages));
            });
        } catch (error) {
            console.error(error);
            signOut;
        }
    }

    useEffect(() => {
        fetchBooks();
    }, [activePage])

    function handleNextPage() {
        if (activePage < totalPages) {
            setActivePage(activePage + 1);
        }
    }

    function handlePreviosPage() {
        if (activePage > 1) {
            setActivePage(activePage - 1);
        }
    }

    function handleModalOpen(book) {
        setSelectedBook(book);
        setIsModalOpen(true);
    }

    function onRequestModalClose() {
        setIsModalOpen(false);
    }

    return (
        <>
            <Head>
                <title>Books</title>
            </Head>
            <div className={styles.container}>
                <Header />
                <div className={styles.content}>
                    {books.map(book => {
                        return <Card book={book} handleModalOpen={handleModalOpen} key={book.id} />
                    })}
                </div>
                <div className={styles.pagination}>
                    <button onClick={handlePreviosPage} disabled={activePage === 1 ? true : false}><IoIosArrowBack /></button>
                    <p>Página <strong>{activePage}</strong> de <strong>{totalPages}</strong></p>
                    <button onClick={handlePreviosPage} disabled={activePage === 1 ? true : false}><IoIosArrowBack /></button>
                    <button onClick={handleNextPage} disabled={activePage === totalPages ? true : false}><IoIosArrowForward /></button>
                </div>

            </div>


            <BookModal book={selectedBook} isOpen={isModalOpen} onRequestClose={onRequestModalClose} />
        </>

    )
}