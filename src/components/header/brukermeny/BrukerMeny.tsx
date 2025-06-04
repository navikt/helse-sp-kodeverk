'use client'

import { BodyShort, Detail, Dropdown, Skeleton, Spacer } from '@navikt/ds-react'
import { LeaveIcon } from '@navikt/aksel-icons'
import React, { ReactElement } from 'react'
import { InternalHeaderUserButton } from '@navikt/ds-react/InternalHeader'
import {
    DropdownMenu,
    DropdownMenuDivider,
    DropdownMenuList,
    DropdownMenuListItem,
    DropdownToggle,
} from '@navikt/ds-react/Dropdown'

import { useBrukerinfo } from '@hooks/queries/useBrukerinfo'

export function BrukerMeny(): ReactElement {
    const { data: brukerinfo, isLoading } = useBrukerinfo()
    const laster = !brukerinfo || isLoading
    return (
        <Dropdown>
            {laster && <Skeleton className="m-2" variant="rectangle" width={180} height={40} />}
            {!laster && (
                <>
                    <InternalHeaderUserButton as={DropdownToggle} name={brukerinfo.navn} />
                    <DropdownMenu>
                        <dl>
                            <BodyShort as="dt" size="small">
                                {brukerinfo.navn}
                            </BodyShort>
                            <Detail as="dd">{brukerinfo.navIdent}</Detail>
                        </dl>
                        <DropdownMenuDivider />
                        <DropdownMenuList>
                            <DropdownMenuListItem as="a" href="/oauth2/logout">
                                Logg ut <Spacer /> <LeaveIcon aria-hidden fontSize="1.5rem" />
                            </DropdownMenuListItem>
                        </DropdownMenuList>
                    </DropdownMenu>
                </>
            )}
        </Dropdown>
    )
}
