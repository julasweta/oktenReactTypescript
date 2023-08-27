export interface IPageInterface<DATA> {
    total_items:number
    total_pages:number
    next: string
    prev:string
    items:DATA[]
}