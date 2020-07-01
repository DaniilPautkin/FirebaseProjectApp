// export type ProjectsType = {
//     projects: ProjectType[]
// }

export type ProjectType = {
    authorName: string
    title: string
    id: number
    content: string
    createdAt: any
}
//todo: remove any
export type NotificationType = {
    id: string
    content: string
    user: string
    time: any
}