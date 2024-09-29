export interface Post{
  id?:number
  title?:string
  description?:string
  creationDate?:Date
  userName?:string
  likes?:number
  dislikes?:number
  comments?:Comment[]
}

export interface Comment{
  id?:number
  text?:string
  userName?:string
  creationDate?:Date
}
