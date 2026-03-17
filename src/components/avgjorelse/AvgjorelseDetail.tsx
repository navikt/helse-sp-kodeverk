'use client'

import { Heading, Table, Tag } from '@navikt/ds-react'

import type { Avgjorelse } from '@/schemas/avgjorelse'

interface AvgjorelseDetailProps {
    avgjorelse: Avgjorelse
}

export const AvgjorelseDetail = ({ avgjorelse }: AvgjorelseDetailProps) => {
    return (
        <div className="space-y-6">
            <div>
                <Heading level="2" size="medium" className="mb-1">
                    {avgjorelse.beskrivelse}
                </Heading>
                <Tag variant="neutral" size="small">
                    {avgjorelse.kode.kode}
                </Tag>
            </div>

            <div>
                <Heading level="3" size="small" className="mb-3">
                    Alternativer
                </Heading>
                {avgjorelse.alternativer.length === 0 ? (
                    <p className="text-sm text-gray-500">Ingen alternativer registrert.</p>
                ) : (
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Kode</Table.HeaderCell>
                                <Table.HeaderCell>Beskrivelse</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {avgjorelse.alternativer.map((alternativ) => (
                                <Table.Row key={alternativ._key}>
                                    <Table.DataCell>
                                        <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm dark:bg-gray-800">
                                            {alternativ.kode}
                                        </code>
                                    </Table.DataCell>
                                    <Table.DataCell>{alternativ.beskrivelse}</Table.DataCell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                )}
            </div>
        </div>
    )
}
