export interface ErrorResponse {
    type: string
    title: string
    message: string
    status: number
    errors: any
    traceId: string
    details: string
}
