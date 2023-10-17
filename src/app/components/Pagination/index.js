import styles from "./pagination.module.css";
import ReactPaginate from "react-paginate";

export default function Pagination({ onPageChange, pageCount }) {
  return (
    <div className={styles.pagination_wrapper}>
      <div className={styles.pagination_container}>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          onPageChange={onPageChange}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          activeLinkClassName={styles.activeClick}
          previousClassName={styles.prev}
          nextClassName={styles.next}
          className={styles.pagination}
          pageClassName={styles.pageNumber}
        />
      </div>
    </div>
  );
}
