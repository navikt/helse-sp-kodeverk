import { useState } from 'react'

interface BekreftelsesModalProps {
    tittel: string
    melding: string
}

export const useBekreftelsesModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [modalProps, setModalProps] = useState<BekreftelsesModalProps | null>(null)
    const [resolvePromise, setResolvePromise] = useState<((value: boolean) => void) | null>(null)

    const visBekreftelsesmodal = (props: BekreftelsesModalProps): Promise<boolean> => {
        return new Promise((resolve) => {
            setModalProps(props)
            setIsOpen(true)
            setResolvePromise(() => resolve)
        })
    }

    const handleBekreft = () => {
        setIsOpen(false)
        resolvePromise?.(true)
    }

    const handleAvbryt = () => {
        setIsOpen(false)
        resolvePromise?.(false)
    }

    return {
        isOpen,
        modalProps,
        visBekreftelsesmodal,
        handleBekreft,
        handleAvbryt,
    }
}
