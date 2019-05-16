import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import './_DropDown.scss'

const DropDown = props => {
  const [isOpen, setIsOpen] = useState(false)
  let wrapperRef = useRef(null)
  const handleClickOutside = evt => {
    if (wrapperRef && !wrapperRef.current.contains(evt.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      className={'dropdown ' + (isOpen ? 'list-open' : '')}
      onClick={() => setIsOpen(!isOpen)}
      ref={wrapperRef}>
      {props.title}
      <div className="dropdown-list">{isOpen && props.children}</div>
    </div>
  )
}
DropDown.propTypes = {
  title: PropTypes.object
}

export default DropDown
