export interface Municipio {
  id: number
  name: string
}

export interface Provincia {
  id: number
  name: string
}

export interface Departamento {
  id: number
  name: string
}

export interface School {
  id: number
  name: string
  lat: string
  lon: string
}

export interface Teacher {
  id: string
  name: string
  last_name: string
  email: string
  password: string
}

// App
export interface InputState {
  value: string
  errorMsg: string
  isTouched: boolean
}
