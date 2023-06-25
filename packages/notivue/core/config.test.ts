import { test, describe, expect } from 'vitest'

import { defaultConfig } from './config'
import { mergeDeep } from './utils'
import { defaultOptions } from './options'
import { CLASS_PREFIX as CX } from './constants'
import { filledIcons } from '../components/icons'
import { light } from '../styles/themes'

describe('Config Merge', () => {
   test('Returns default config', () => {
      expect(mergeDeep(defaultConfig, {})).toStrictEqual(defaultConfig)
   })

   test('Merges properties correctly', () => {
      const userConfig = {
         pauseOnHover: false,
         pauseOnTouch: false,
         position: 'bottom-center',
         teleportTo: 'html',
         class: 'CustomClass',
         theme: light,
         icons: filledIcons,
         options: {},
         animations: {
            enter: CX + 'enterCustom',
            leave: CX + 'leaveCustom',
         },
      } as const

      const result = mergeDeep(defaultConfig, userConfig)

      expect(result).toMatchObject(userConfig)

      expect(result.options).toStrictEqual(defaultOptions) // Default

      expect(result).toHaveProperty('animations', {
         enter: CX + 'enterCustom',
         leave: CX + 'leaveCustom',
         clearAll: CX + 'clearAll', // Default
      })

      expect(result.theme).toStrictEqual(light)
      expect(result.icons).toStrictEqual(filledIcons)
   })
})
