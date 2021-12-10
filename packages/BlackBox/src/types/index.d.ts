/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace TypeBox {
  type IAnyObject = Record<string, any>

  interface State<TState extends IAnyObject> {
    state: CheckState<TState>
  }

  // 实例内置属性【以下属性不对外暴露】
  interface InnerProperties<TOthers extends IAnyObject> {
    __mounted: boolean
    __init: boolean
    setLoading: (
      promiseName: Partial<{ [K in keyof PromiseName<TOthers>]: boolean }>,
    ) => void
  }

  // 实例内置并暴露的function
  interface InstanceMethods<TState extends IAnyObject> {
    setState: (
      state:
        | Partial<CheckState<TState>>
        | React.SetStateAction<CheckState<TState>>,
    ) => void
    setError: React.Dispatch<React.SetStateAction<IAnyObject | undefined>>
  }

  // 实例暴露的属性
  interface InstanceProperty<
    TOthers extends IAnyObject,
    TProps extends IAnyObject,
  > {
    error: any
    loading: Partial<{ [K in keyof PromiseName<TOthers>]: boolean }>
    props: TProps
  }
  // 实例
  type Instance<
    TState extends IAnyObject,
    TOthers extends IAnyObject,
    TProps extends IAnyObject,
  > = InstanceProperty<TOthers, TProps> &
    InstanceMethods<TState> &
    State<TState> &
    TOthers

  // 过滤option中的instance内置属性，以免出现覆盖
  type FilterInnerProperty<TOthers, InnerProperty> = {
    [K in keyof TOthers]: K extends keyof InnerProperty ? never : TOthers[K]
  }
  type Option<
    TState extends IAnyObject,
    TOthers extends IAnyObject,
    TProps extends IAnyObject,
  > = State<TState> &
    Partial<LifeTime> &
    FilterInnerProperty<
      TOthers,
      InnerProperties<TOthers> &
        InstanceMethods<TState> &
        InstanceProperty<TOthers, TProps>
    > &
    ThisType<Instance<TState, TOthers, TProps>>

  type FunctionObject = Record<string, (arg?: any) => any | any>
  interface LifeTime {
    onLoad(): void | Promise<void>
    onUnload(): void | Promise<void>
  }

  type MoreLifeTime = FunctionObject & LifeTime

  type FunctionType = (...args: any) => any

  // 获取对象内function name
  type GetFunctionName<T> = {
    [K in keyof T]: T[K] extends FunctionType ? K : never
  }[keyof T]

  // 获取对象内promise name
  type GetPromiseName<T extends FunctionObject> = {
    [K in keyof T]: ReturnType<T[K]> extends Promise<any> ? K : never
  }[keyof T]

  // 返回函数名称
  type FunctionName<T> = Pick<T, GetFunctionName<T>>

  // 返回promise名称
  type PromiseName<T> = Pick<T, GetPromiseName<FunctionName<T>>>

  // check state内部的值，将undifind,null,[]等进行修改，避免后续ts 类型不可修改
  type CheckState<T> = {
    [K in keyof T]: T[K] extends null | undefined
      ? any
      : T[K] extends never[]
      ? any[]
      : T[K] extends IAnyObject
      ? T[K] & IAnyObject
      : T[K]
  }
  // useBox内的实例方法
  type InstanceFunction<RState> = {
    setState: (
      state:
        | Partial<CheckState<RState>>
        | React.SetStateAction<CheckState<RState>>,
    ) => void
    setError: React.Dispatch<React.SetStateAction<IAnyObject | undefined>>
  }

  // 定义useEvents的Response
  type UseEventsResponse<ROthers, TState> = {
    events: FunctionName<ROthers> & InstanceMethods<TState>
    loading: Partial<{ [K in keyof PromiseName<ROthers>]: boolean }>
  }

  // useBox response
  type Response<RState extends IAnyObject, ROthers extends IAnyObject> = {
    state: CheckState<RState>
    error: IAnyObject | undefined
  } & UseEventsResponse<ROthers, RState>
}

export default TypeBox
