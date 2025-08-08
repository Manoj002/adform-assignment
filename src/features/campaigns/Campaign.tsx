import React from 'react'
import { useSelector } from 'react-redux'

const Campaign = () => {
    const { data } = useSelector(store => store.campaign)
  return (
    <div>Campaign {data}</div>
  )
}

export default Campaign