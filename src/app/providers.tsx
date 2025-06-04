'use client'

import React, { PropsWithChildren, ReactElement, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isBetween from 'dayjs/plugin/isBetween'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/nb'
import dayjs from 'dayjs'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(isBetween)
dayjs.extend(customParseFormat)
dayjs.locale('nb')

export function Providers({ children }: PropsWithChildren): ReactElement {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        /* Setting this to true causes the request to be immediately executed after initial
                           mount Even if the query had data hydrated from the server side render */
                        refetchOnMount: false,
                        refetchOnWindowFocus: false,
                    },
                },
            }),
    )

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
