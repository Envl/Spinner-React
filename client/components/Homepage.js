import React, {useState, useEffect} from 'react'

import {RequireLogin} from './firebase'
import DropDown from './DropDown'
import Items from './Items'
import HistoryPage from './HistoryPage'
import {FirebaseDataGlobal} from '../store'

const Sidebar = props => (
  <div className='sidebar'>
    {[
      {title: 'timeline'},
      {title: 'items', children: ['bought', 'on-shelf', 'sold', 'ongoing']},
      {title: 'profile'},
      {title: 'settings'},
    ].map(li => (
      <DropDown
        title={li.title}
        noPop={true}
        isOpen
        key={li.title}
        // onClick={evt => {
        //   switch (evt.target.innerHTML) {
        //     case 'bought':
        //       // show bought
        //       break
        //     case 'on-shelf':
        //       // on sale
        //       break
        //     case 'sold':
        //       // sold
        //       break
        //   }
        // }}
      >
        {li.children &&
          li.children.map(child => (
            <button onClick={() => props.onClick(child)} key={child}>
              {child}
            </button>
          ))}
      </DropDown>
    ))}
  </div>
)

const Homepage = props => {
  const [contentType, setContentType] = useState('on-shelf')
  // const {FirebaseData, setFirebaseData} = FirebaseDataGlobal.useContainer()
  const [myItems, setMyItems] = useState([])

  console.log('aaaaa', props.firebase)

  useEffect(() => {
    console.log('44444444444444444444')

    let tmp = []
    props.firebase.fs
      .collection('items')
      .where('ownerId', '==', props.firebase.auth.currentUser.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          tmp.push({...doc.data(), id: doc.id})
        })
        console.log('mmmmmmm', tmp)
        setMyItems(tmp)
        // setFirebaseData({myItems: tmp})
      })
  }, [])

  return (
    <div className='homepage-container'>
      <Sidebar onClick={setContentType} />
      <div className='content-panel'>
        <Items
          items={myItems}
          onDelete={id => {
            props.firebase.item(id).delete()
            props.firebase.allItem(id).delete()
            const tmp = myItems.filter(item => item.id != id)
            console.log('delete', id, tmp)
            setMyItems(tmp)
          }}
        />
        {myItems.length === 0 && <div>No item yet.</div>}
        {/* <HistoryPage firebase={props.firebase} /> */}
      </div>
    </div>
  )
}

export default RequireLogin(Homepage)
