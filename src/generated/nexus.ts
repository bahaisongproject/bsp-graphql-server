/**
 * This file was automatically generated by GraphQL Nexus
 * Do not make changes to this file directly
 */





declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  ContributorWhereUniqueInput: { // input type
    contributor_id?: number | null; // Int
  }
  ExcerptWhereUniqueInput: { // input type
    excerpt_id?: number | null; // Int
  }
  LanguageWhereUniqueInput: { // input type
    language_id?: number | null; // Int
  }
  PerformanceWhereUniqueInput: { // input type
    performance_id?: number | null; // Int
  }
  SongWhereUniqueInput: { // input type
    slug?: string | null; // String
    song_id?: number | null; // Int
  }
  SourceWhereUniqueInput: { // input type
    source_id?: number | null; // Int
  }
  TagWhereUniqueInput: { // input type
    tag_id?: number | null; // Int
  }
}

export interface NexusGenEnums {
}

export interface NexusGenRootTypes {
  Contributor: { // root type
    contributor_id: number; // Int!
    contributor_name?: string | null; // String
    contributor_slug?: string | null; // String
    contributor_url?: string | null; // String
  }
  Excerpt: { // root type
    excerpt_id: number; // Int!
    excerpt_text?: string | null; // String
    excerpt_transliteration?: string | null; // String
  }
  Language: { // root type
    language_code?: string | null; // String
    language_id: number; // Int!
    language_name_en?: string | null; // String
    language_name_native?: string | null; // String
  }
  Performance: { // root type
    content_url?: string | null; // String
    main_performance?: string | null; // String
    performance_description?: string | null; // String
    performance_id: number; // Int!
    performance_prio?: number | null; // Int
    published?: string | null; // String
    soundcloud_id?: string | null; // String
    youtube_id?: string | null; // String
  }
  Query: {};
  Song: { // root type
    slug: string; // String!
    song_description?: string | null; // String
    song_id: number; // Int!
    title?: string | null; // String
  }
  Source: { // root type
    source_author?: string | null; // String
    source_description?: string | null; // String
    source_id: number; // Int!
  }
  Tag: { // root type
    tag_description?: string | null; // String
    tag_id: number; // Int!
    tag_name?: string | null; // String
    tag_slug?: string | null; // String
  }
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  ContributorWhereUniqueInput: NexusGenInputs['ContributorWhereUniqueInput'];
  ExcerptWhereUniqueInput: NexusGenInputs['ExcerptWhereUniqueInput'];
  LanguageWhereUniqueInput: NexusGenInputs['LanguageWhereUniqueInput'];
  PerformanceWhereUniqueInput: NexusGenInputs['PerformanceWhereUniqueInput'];
  SongWhereUniqueInput: NexusGenInputs['SongWhereUniqueInput'];
  SourceWhereUniqueInput: NexusGenInputs['SourceWhereUniqueInput'];
  TagWhereUniqueInput: NexusGenInputs['TagWhereUniqueInput'];
}

export interface NexusGenFieldTypes {
  Contributor: { // field return type
    contributor_id: number; // Int!
    contributor_name: string | null; // String
    contributor_slug: string | null; // String
    contributor_url: string | null; // String
    performances: NexusGenRootTypes['Performance'][]; // [Performance!]!
    songs: NexusGenRootTypes['Song'][]; // [Song!]!
  }
  Excerpt: { // field return type
    excerpt_id: number; // Int!
    excerpt_text: string | null; // String
    excerpt_transliteration: string | null; // String
    language: NexusGenRootTypes['Language'] | null; // Language
    songs: NexusGenRootTypes['Song'][]; // [Song!]!
    source: NexusGenRootTypes['Source'] | null; // Source
  }
  Language: { // field return type
    excerpts: NexusGenRootTypes['Excerpt'][]; // [Excerpt!]!
    language_code: string | null; // String
    language_id: number; // Int!
    language_name_en: string | null; // String
    language_name_native: string | null; // String
    songs: NexusGenRootTypes['Song'][]; // [Song!]!
  }
  Performance: { // field return type
    content_url: string | null; // String
    contributors: NexusGenRootTypes['Contributor'][]; // [Contributor!]!
    main_performance: string | null; // String
    performance_description: string | null; // String
    performance_id: number; // Int!
    performance_prio: number | null; // Int
    published: string | null; // String
    song: NexusGenRootTypes['Song'] | null; // Song
    soundcloud_id: string | null; // String
    youtube_id: string | null; // String
  }
  Query: { // field return type
    contributor: NexusGenRootTypes['Contributor'] | null; // Contributor
    contributors: NexusGenRootTypes['Contributor'][]; // [Contributor!]!
    excerpt: NexusGenRootTypes['Excerpt'] | null; // Excerpt
    excerpts: NexusGenRootTypes['Excerpt'][]; // [Excerpt!]!
    language: NexusGenRootTypes['Language'] | null; // Language
    languages: NexusGenRootTypes['Language'][]; // [Language!]!
    performance: NexusGenRootTypes['Performance'] | null; // Performance
    performances: NexusGenRootTypes['Performance'][]; // [Performance!]!
    song: NexusGenRootTypes['Song'] | null; // Song
    songs: NexusGenRootTypes['Song'][]; // [Song!]!
    source: NexusGenRootTypes['Source'] | null; // Source
    sources: NexusGenRootTypes['Source'][]; // [Source!]!
    tag: NexusGenRootTypes['Tag'] | null; // Tag
    tags: NexusGenRootTypes['Tag'][]; // [Tag!]!
  }
  Song: { // field return type
    contributors: NexusGenRootTypes['Contributor'][]; // [Contributor!]!
    excerpts: NexusGenRootTypes['Excerpt'][]; // [Excerpt!]!
    languages: NexusGenRootTypes['Language'][]; // [Language!]!
    performances: NexusGenRootTypes['Performance'][]; // [Performance!]!
    slug: string; // String!
    song_description: string | null; // String
    song_id: number; // Int!
    sources: NexusGenRootTypes['Source'][]; // [Source!]!
    tags: NexusGenRootTypes['Tag'][]; // [Tag!]!
    title: string | null; // String
  }
  Source: { // field return type
    excerpts: NexusGenRootTypes['Excerpt'][]; // [Excerpt!]!
    songs: NexusGenRootTypes['Song'][]; // [Song!]!
    source_author: string | null; // String
    source_description: string | null; // String
    source_id: number; // Int!
  }
  Tag: { // field return type
    songs: NexusGenRootTypes['Song'][]; // [Song!]!
    tag_description: string | null; // String
    tag_id: number; // Int!
    tag_name: string | null; // String
    tag_slug: string | null; // String
  }
}

export interface NexusGenArgTypes {
  Query: {
    contributor: { // args
      where: NexusGenInputs['ContributorWhereUniqueInput']; // ContributorWhereUniqueInput!
    }
    excerpt: { // args
      where: NexusGenInputs['ExcerptWhereUniqueInput']; // ExcerptWhereUniqueInput!
    }
    language: { // args
      where: NexusGenInputs['LanguageWhereUniqueInput']; // LanguageWhereUniqueInput!
    }
    performance: { // args
      where: NexusGenInputs['PerformanceWhereUniqueInput']; // PerformanceWhereUniqueInput!
    }
    song: { // args
      where: NexusGenInputs['SongWhereUniqueInput']; // SongWhereUniqueInput!
    }
    source: { // args
      where: NexusGenInputs['SourceWhereUniqueInput']; // SourceWhereUniqueInput!
    }
    tag: { // args
      where: NexusGenInputs['TagWhereUniqueInput']; // TagWhereUniqueInput!
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Contributor" | "Excerpt" | "Language" | "Performance" | "Query" | "Song" | "Source" | "Tag";

export type NexusGenInputNames = "ContributorWhereUniqueInput" | "ExcerptWhereUniqueInput" | "LanguageWhereUniqueInput" | "PerformanceWhereUniqueInput" | "SongWhereUniqueInput" | "SourceWhereUniqueInput" | "TagWhereUniqueInput";

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}