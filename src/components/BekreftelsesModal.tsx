import { Modal, Button, Alert } from '@navikt/ds-react'
import { ModalBody, ModalFooter } from '@navikt/ds-react/Modal'

interface BekreftelsesModalProps {
    isOpen: boolean
    tittel: string
    melding: string
    onBekreft: () => void
    onAvbryt: () => void
}

export const BekreftelsesModal = ({ isOpen, tittel, melding, onBekreft, onAvbryt }: BekreftelsesModalProps) => {
    return (
        <Modal
            open={isOpen}
            onClose={onAvbryt}
            aria-label={tittel}
            header={{
                heading: tittel,
            }}
        >
            <ModalBody>
                <Alert variant="warning">{melding}</Alert>
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" onClick={onAvbryt}>
                    Avbryt
                </Button>
                <Button variant="danger" onClick={onBekreft}>
                    Bekreft
                </Button>
            </ModalFooter>
        </Modal>
    )
}
