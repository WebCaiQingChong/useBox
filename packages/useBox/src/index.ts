import { useState, useRef } from 'react'

/*
 */

export default function useBox(options, props) {
  const { state = {} } = options
  const [cs, setSc] = useState({ ...state })
  return { state, events, loading, error }
}
