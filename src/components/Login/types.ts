
export interface Props {
  visible: boolean
}
export interface Emits {
  (event: "close"): void
}

export interface LoginInfo {
  username: string
  password: string
  code?: string
}
