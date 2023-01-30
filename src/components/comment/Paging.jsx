import Pagination from 'react-js-pagination';
export default function Paging({page, count, setPage}) {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={7}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      prevPageText='‹'
      nextPageText='›'
      onChange={setPage}
    />
  );
}
