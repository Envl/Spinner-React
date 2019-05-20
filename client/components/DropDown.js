import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import './_DropDown.scss'

const DropDown = props => {
  const [isOpen, setIsOpen] = useState(props.isOpen ? true : false)

  let wrapperRef = useRef(null)

  const handleClickOutside = evt => {
    if (wrapperRef && !wrapperRef.current.contains(evt.target)) {
      setIsOpen(false)
    }
  }

  if (!props.noPop) {
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])
  }

  return (
    <div
      className={'dropdown ' + (isOpen ? 'list-open' : '')}
      ref={wrapperRef}
      onClick={evt => {
        props.onClick
        if (props.noPop) {
          return
        }
        setIsOpen(!isOpen)
      }}>
      <div
        className="dropdown-title"
        onClick={evt => {
          if (!props.noPop) {
            return
          }
          setIsOpen(!isOpen)
        }}>
        {props.title}
      </div>
      {props.children && (
        <div className={'dropdown-list ' + (props.noPop ? 'no-pop' : '')}>
          {isOpen && props.children}
        </div>
      )}
    </div>
  )
}
DropDown.propTypes = {
  title: PropTypes.object
}

export default DropDown
