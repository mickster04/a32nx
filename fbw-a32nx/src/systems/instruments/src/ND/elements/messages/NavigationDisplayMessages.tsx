// Copyright (c) 2021-2023 FlyByWire Simulations
//
// SPDX-License-Identifier: GPL-3.0

import { useSimVar } from '@flybywiresim/fbw-sdk';
import React, { FC } from 'react';
import { EfisNdMode } from '@shared/NavigationDisplay';

export interface NavigationDisplayMessagesProps {
    adirsAlign: boolean,
    mode: EfisNdMode,
    modeChangeShown: boolean,
    rangeChangeShown: boolean,
}

export const NavigationDisplayMessages: FC<NavigationDisplayMessagesProps> = ({ adirsAlign, mode, modeChangeShown, rangeChangeShown }) => {
    // Do not show general messages in ROSE VOR/ILS or ANF (latter is not in neo)
    const modeValidForGeneralMessages = (mode !== EfisNdMode.ROSE_VOR && mode !== EfisNdMode.ROSE_ILS) && (adirsAlign || mode === EfisNdMode.PLAN);

    const [tcasState] = useSimVar('L:A32NX_TCAS_STATE', 'Enum', 200);

    return (
        <>
            <text
                x={384}
                y={320}
                className="Green"
                textAnchor="middle"
                fontSize={31}
                visibility={(modeChangeShown && !rangeChangeShown && modeValidForGeneralMessages) ? 'visible' : 'hidden'}
            >
                MODE CHANGE
            </text>
            <text
                x={384}
                y={320}
                className="Green"
                textAnchor="middle"
                fontSize={31}
                visibility={(rangeChangeShown && modeValidForGeneralMessages) ? 'visible' : 'hidden'}
            >
                RANGE CHANGE
            </text>
            { tcasState === 2 && (mode === EfisNdMode.PLAN || mode === EfisNdMode.ROSE_ILS || mode === EfisNdMode.ROSE_VOR) && !modeChangeShown && !rangeChangeShown
            && (
                <text
                    x={384}
                    y={320}
                    className="Amber"
                    textAnchor="middle"
                    fontSize={31}
                >
                    TCAS: CHANGE MODE
                </text>
            )}
            { tcasState === 3 && (mode === EfisNdMode.PLAN || mode === EfisNdMode.ROSE_ILS || mode === EfisNdMode.ROSE_VOR) && !modeChangeShown && !rangeChangeShown
            && (
                <text
                    x={384}
                    y={320}
                    className="Red"
                    textAnchor="middle"
                    fontSize={31}
                >
                    TCAS: CHANGE MODE
                </text>
            )}
        </>
    );
};
