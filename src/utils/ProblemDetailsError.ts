import type { ProblemDetails } from '@/schemas/problemDetails'

export class ProblemDetailsError extends Error {
    public readonly problem: ProblemDetails

    constructor(problem: ProblemDetails) {
        super(problem.title ?? `HTTP ${problem.status}`)
        this.name = 'ProblemDetailsError'
        this.problem = problem
    }
}
