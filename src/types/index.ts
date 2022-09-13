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

export interface Subject {
  id: string
  name: string
}
export interface Grade {
  id: string
  name: string
}

export interface Period {
  id: string
  name: string
}
export interface Area {
  id: string
  name: string
  points: number
}
export interface Year {
  id: string
  value: number
  edges: {
    periods: Period[]
    areas: Area[]
  }
}

export interface Class {
  id: string
  parallel: string
  edges: {
    subject: Subject
    grade: Grade
    year: Omit<Year, 'edges'>
  }
}

// App
export interface InputState {
  value: string
  errorMsg: string
  isTouched: boolean
}
