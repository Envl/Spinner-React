const UploadPgae = props => {
  return (
    <div class='col-xs-6 col-sm-4 col-lg-3'>
      <article>
        <div class='info'>
          <span class='add-favorite'>
            <a href='javascript:void(0);' data-title='Add to favorites' data-title-added='Added to favorites list'>
              <i class='icon icon-heart' />
            </a>
          </span>
          <span>
            <a href='#productid1' class='mfp-open' data-title='Quick wiew'>
              <i class='icon icon-eye' />
            </a>
          </span>
        </div>
        <div class='btn btn-add'>
          <i class='icon icon-cart' />
        </div>
        <div class='figure-grid'>
          <span class='label label-warning'>New</span>
          <div class='image'>
            <a href='#productid1' class='mfp-open'>
              <img src='${item.photoUrls && item.photoUrls[0]}' alt='' width='360' />
            </a>
          </div>
          <div class='text'>
            <h2 class='title h4'>
              <a href='product.html'>${item.title}</a>
            </h2>
            <sup>SEK ${item.price}</sup>
            <span class='description clearfix'>${item.description}</span>
          </div>
        </div>
      </article>
    </div>
  )
}
