import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Card } from "../Card";
import { fetchCards } from "../../api/api";

export function App() {
  const listInnerRef = useRef() // gets reference from scrollbar and does not re-render when updated
  const [currentPage, setCurrentPage] = useState(1) // 
  const [previousPage, setPreviousPage] = useState(0)
  const [cards, setCards] = useState([]) 
  const [lastPage, setLastPage] = useState(false) // default state is false toggle true if there are no more cards to fetch 
  const [searchByName, setSearchByName] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Rendering each card returned from the API
    const fetchPages = async () => {
      const response = await fetchCards(currentPage, searchByName, setLoading)
      if (!response.data.cards.length) {
        setLastPage(true)
        return
      }
      setPreviousPage(currentPage)
      setCards([...cards, ...response.data.cards])
    }
    // only load new data if previousPage and currentPage are not same, and we have not reached last page, or user is trying to search something
    if ((!lastPage && previousPage !== currentPage) || (searchByName !== '' && previousPage !== currentPage)) {
      setLoading(true)
      fetchPages()
    }
  }, [currentPage, cards, previousPage, lastPage, searchByName])

  const onScroll = () => {
    // on scroll function checks if we reached end of current scroll length, if so we ask api to give us next set of 20 cards to render
    if (listInnerRef.current) {
      const  { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if  (Math.floor(scrollTop + clientHeight) === scrollHeight || Math.ceil(scrollTop + clientHeight) === scrollHeight) {
        setCurrentPage(currentPage + 1)
      }
    }
  }

  return (
    <div className="App">
      <div className="Title">
        <h1>
          Elder Scrolls
        </h1>
      </div>
      <div className="SearchBar">
        <input 
        // This is a search bar which will request API after every input user enters
          style={{ width: "50%", height: "40px" }} 
          placeholder="Search" 
          onChange={({ target }) => {
            setSearchByName(target.value)
            setCurrentPage(1)
            setPreviousPage(0)
            setCards([])
          }}
        />
      </div>
      {cards.length > 0 && (
        <div 
          className="App-cardlist"
          role="list" 
          onScroll={onScroll}
          ref={listInnerRef}
          style={{overflowY: 'auto'}}
        >
          {cards && cards.map(card => Card(card))}
        </div>
        )
      }
      {
      // Loading spinner in implemented with the appropriate css with classname "loader"
      loading && (
        <div className="loader">
        <div><div></div><div></div></div>
        </div> 
        )
      }
    </div>
  );
   
}