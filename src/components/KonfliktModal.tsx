import { Alert, Button, Modal } from '@navikt/ds-react'

import { ProblemDetails } from '@/schemas/problemDetails'

interface KonfliktModalProps {
    isOpen: boolean
    onClose: () => void
    problem: ProblemDetails & {
        lastModifiedBy?: string
        lastModifiedAt?: string
        expectedVersion?: string
        currentVersion?: string
    }
}

export function KonfliktModal({ isOpen, onClose, problem }: KonfliktModalProps) {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            header={{
                heading: problem.title || 'Konflikt oppdaget',
            }}
        >
            <div className="space-y-4">
                <Alert variant="warning">
                    <p>{problem.detail}</p>
                </Alert>

                {problem.lastModifiedBy && problem.lastModifiedAt && (
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="mb-2 font-semibold">Siste endring:</h3>
                        <p>
                            <strong>Bruker:</strong> {problem.lastModifiedBy}
                        </p>
                        <p>
                            <strong>Tidspunkt:</strong> {new Date(problem.lastModifiedAt).toLocaleString('nb-NO')}
                        </p>
                    </div>
                )}

                <div className="flex justify-end space-x-2">
                    <Button variant="secondary" onClick={onClose}>
                        Lukk
                    </Button>
                    <Button onClick={onClose}>Hent nyeste versjon</Button>
                </div>
            </div>
        </Modal>
    )
}
