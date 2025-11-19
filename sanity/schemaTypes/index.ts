import { type SchemaTypeDefinition } from 'sanity'

import { industryType } from './industry'
import { expertiseType } from './expertise'
import { tagType } from './tag'
import { newsType } from './news'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [industryType, expertiseType, tagType, newsType],
}
