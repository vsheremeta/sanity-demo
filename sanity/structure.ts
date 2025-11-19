import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Content Group
      S.listItem()
        .title('Content')
        .child(
          S.list()
            .title('Content')
            .items([
              S.documentTypeListItem('news').title('News'),
            ])
        ),
      
      // Categories Group
      S.listItem()
        .title('Categories')
        .child(
          S.list()
            .title('Categories')
            .items([
              S.documentTypeListItem('industry').title('Industries'),
              S.documentTypeListItem('expertise').title('Expertises'),
              S.documentTypeListItem('tag').title('Tags'),
            ])
        ),
      
      S.divider(),
      
      // All other document types
      ...S.documentTypeListItems().filter(
        (listItem) => !['news', 'industry', 'expertise', 'tag'].includes(listItem.getId() || '')
      ),
    ])
