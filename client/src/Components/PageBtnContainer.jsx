import { Link, useLocation, useNavigate } from "react-router-dom"
import Wrapper from "../assets/wrappers/PageBtnContainer"
import { useAllJobsContext } from "../pages/AllJobs"
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'

const PageBtnContainer = () => {
    const {data:{ currentPage, numOfPages }} = useAllJobsContext()
    const pages = Array.from({length: numOfPages}, (_, index)=>{
        return index+1;
    })
    const {search, pathname} = useLocation();
    const navigate = useNavigate();
    const handlePageChange = (pageNumber)=>{
        const searchParams = new URLSearchParams(search);
        searchParams.set('page', pageNumber);
        navigate(`${pathname}?${searchParams.toString()}`)
    }

    const addPageButton = ({pageNumber, activeClass})=>{
        return <button key={pageNumber} className={`btn page-btn ${activeClass && 'active'}`} onClick={()=>handlePageChange(pageNumber)} >{pageNumber}</button>
    }

    const renderPageButtons = ()=>{
        const pageButtons = [];

        pageButtons.push(addPageButton({pageNumber: 1, activeClass: currentPage === 1}));

        if(currentPage >3 ){
            pageButtons.push(<span className="page-btn dots" key='dots-1'>...</span>);
        }

        if(currentPage !== 1 && currentPage !==2){
            pageButtons.push(addPageButton({pageNumber: currentPage-1, activeClass: false }));
        }
        //current page
        if(currentPage !== 1 && currentPage !== numOfPages){
            pageButtons.push(addPageButton({pageNumber: currentPage, activeClass: true }));
        }

        if(currentPage !== numOfPages && currentPage !== numOfPages-1){
            pageButtons.push(addPageButton({pageNumber: currentPage+1, activeClass: false }));
        }
        if(currentPage < numOfPages-2 ){
            pageButtons.push(<span className="page-btn dots" key='dots+1'>...</span>);
        }

        pageButtons.push(addPageButton({pageNumber: numOfPages, activeClass: currentPage === numOfPages}));
        
        return pageButtons;
    }
    
  return (
    <Wrapper>
        <button className="btn prev-btn" onClick={()=>{
            let prevPage = currentPage-1;
            if(prevPage < 1) prevPage = numOfPages;
            handlePageChange(prevPage);
        }}>
            <HiChevronDoubleLeft/>
            prev
        </button>
        <div className="btn-container">
            {/* {pages.map((pageNumber)=>{
                // return <button key={pageNumber} className={`btn page-btn ${pageNumber === currentPage && 'active'}`} onClick={()=>handlePageChange(pageNumber)} >{pageNumber}</button>
            })} */}
            {renderPageButtons()}
        </div>
        <button className="btn next-btn" onClick={()=>{
            let nextPage = currentPage+1;
            if(nextPage > numOfPages) nextPage = 1;
            handlePageChange(nextPage);
        }}>
            next
            <HiChevronDoubleRight/>
        </button>
    </Wrapper>
  )
}
export default PageBtnContainer