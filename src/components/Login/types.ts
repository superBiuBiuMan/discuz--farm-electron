
export interface Props {
  visible: boolean
}
export interface Emits {
  (event: "close",data:boolean): void
}

export interface LoginInfo {
  username: string
  password: string
  code?: string
}
