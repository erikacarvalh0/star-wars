import { createContext } from 'react';

import { iMainContext } from '../interfaces';

export const MainContext = createContext<iMainContext>({} as iMainContext)