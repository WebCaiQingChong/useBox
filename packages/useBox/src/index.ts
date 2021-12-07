/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type TypeBox from './types'
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { pureObject, isObject } from './utils'

function objectKeysChange(
  prevState: TypeBox.IAnyObject,
  nextState: TypeBox.IAnyObject,
): boolean {
  let change = false
  for (const key in nextState) {
    if (!Object.is(prevState[key], nextState[key])) {
      change = true
      break
    }
  }

  return change
}
function useEvents(
  config: TypeBox.IAnyObject,
  setState: React.Dispatch<React.SetStateAction<any>>,
  setError: React.Dispatch<React.SetStateAction<any>>,
  context: React.MutableRefObject<any>,
) {
  const events = useRef(pureObject())
  const [loading, setL] = useState(() => pureObject())
  const setLoading = useCallback(
    (nextLoading) => {
      if (objectKeysChange(loading, nextLoading)) {
        setL({ ...loading, ...nextLoading })
      } else {
        setL(loading)
      }
    },
    [loading],
  )
  function _setState(nextState: any): void {
    if (isObject(nextState)) {
      // shallowCompare
      setState((prevState: TypeBox.IAnyObject) => {
        if (objectKeysChange(prevState, nextState)) {
          return { ...prevState, ...nextState }
        } else {
          return prevState
        }
      })
    } else {
      setState(nextState)
    }
  }

  function _setError(err: any) {
    setError(err)
  }

  context.current.setState = _setState
  context.current.setError = _setError
  events.current.setState = _setState
  events.current.setError = _setError
  context.current.loading = loading
  for (const item in config) {
    // 判断是否是function
    const cur = config[item]
    if (typeof cur === 'function') {
      const curFunc = config[item]
      const warpFunc = function (
        this: React.MutableRefObject<any>,
        ...args: any
      ) {
        // 这里可针对所有的function 进行异常捕获
        let res: any
        try {
          res = curFunc.call(this, args)
          if (!(res instanceof Promise)) {
            return res
          }
        } catch (error) {
          console.log(error)
        }

        try {
          return new Promise((resolve) => {
            setLoading({
              [item]: true,
            })
            res.then(function (result: any) {
              setLoading({
                [item]: false,
              })
              resolve(result)
            })
          })
        } catch (error) {
          setLoading({
            [item]: false,
          })
          console.log(error)
        }
      }

      events.current[item] = warpFunc.bind(context.current)
      context.current[item] = warpFunc.bind(context.current)
    } else {
      // 非function类型的进行绑定
      if (item !== 'state') {
        // 过滤state
        context.current[item] = cur
      }
    }
  }

  return { events: events.current, loading }
}

/*
@params
*/

export default function useBox(
  options: TypeBox.IAnyObject,
  props: TypeBox.IAnyObject,
) {
  const { state: init = {} } = options
  const [state, setState] = useState(init)
  const [error, setError] = useState()
  const context = <React.MutableRefObject<any>>useRef({
    __mounted: false,
    __init: false,
    props,
  })

  // 将state绑定在context，以便在events中进行获取
  context.current.state = state
  context.current.error = error
  const { events, loading } = useEvents(options, setState, setError, context)

  // 初始化
  useEffect(() => {
    // 标记已挂载
    context.current.__mounted = true
    // 内置onload 类似componentDidMount 声明周期
    context.current?.onLoad?.()

    return function (): void {
      // 如果current还存在，则将__mounted状态标记为false
      context.current && (context.current.__mounted = false)
      // 重置error
      setError(undefined)
      // 执行unload方法,类似componentWillUnMount
      context.current?.onUnload?.()
    }
  }, [])

  // 更新props
  useEffect(() => {
    if (context.current.__mounted) {
      context.current.props = props
    }
  })

  return { state, events, loading, error }
}
