function Ratings (props) {
    const { rating, numReviews} = props;
  return (
    <div className="ratings">
        <span>
            <i className={rating>=1 ? 'fas fa-star': rating>= 0.5 ? 'fas fa-star-half': 'fas-fa-star'}></i>
        </span>
        <span>
            <i className={rating>=2 ? 'fas fa-star': rating>= 1.5 ? 'fas fa-star-half': 'fas-fa-star'}></i>
        </span>
        <span>
            <i className={rating>=3 ? 'fas fa-star': rating>= 2.5 ? 'fas fa-star-half': 'fas-fa-star'}></i>
        </span>
        <span>
            <i className={rating>=4 ? 'fas fa-star': rating>= 3.5 ? 'fas fa-star-half': 'fas-fa-star'}></i>
        </span>
        <span>
            <i className={rating>=5 ? 'fas fa-star': rating>= 4.5 ? 'fas fa-star-half': 'fas-fa-star'}></i>
        </span>
        <span>&nbsp;{numReviews} reviews </span>
    </div>
  )
}

export default Ratings