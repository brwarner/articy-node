import {
  ArticyObjectProps,
  EnumDefinition,
  FeatureDefinition,
  ModelData,
  ObjectDefinition,
  TemplateProps,
} from './json';

type Language = Map<string, string>;

/**
 * Responsible for managing localization data loaded from the `.xslx` files exported alongside the Articy JSON.
 *
 * This class is automatically instantiated when creating a [[Database]]. Simply use [[Database.localization]].
 *
 * Note that this class can't load `.xlsx` files directly. Instead, it requires
 * a JSON object that maps localization IDs to strings. You can get this by loading the xlsx file
 * yourself using a library like [xlsx](https://www.npmjs.com/package/xlsx) or [exceljs](https://www.npmjs.com/package/exceljs)
 * or using our [articy-xlsx-loader](https://www.npmjs.com/package/articy-xlsx-loader) if you're using Webpack.
 *
 * Load the JSON data using [[load]] and set the active language with [[active]].
 *
 * The [[Database]] will automatically localize any objects returned by it using the [[active]] language, but you can also use [[get]] to manually localize a string.
 */
export class Localization {
  private readonly languages: Map<string, Language> = new Map();
  private activeLanguage: string | undefined;

  /** Returns the currently active language (ex. 'en') */
  public get active() {
    return this.activeLanguage;
  }

  /** Sets the active language. Will throw an exception if a localization file is not loaded for that language. */
  public set active(lang: string | undefined) {
    if (!lang || !this.languages.has(lang)) {
      throw new Error(
        `No language loaded called '${lang}' Can not set as active language.`
      );
    }

    this.activeLanguage = lang;
  }

  /**
   * Load a new langauge into the database.
   *
   * This method isn't capable of loading .xslx files directly. Instead, it requires
   * a JSON object that maps localization IDs to strings. You can get this by loading the xlsx file
   * yourself using a library like [xlsx](https://www.npmjs.com/package/xlsx) or [exceljs](https://www.npmjs.com/package/exceljs)
   * or using our [articy-xlsx-loader](https://www.npmjs.com/package/articy-xlsx-loader) if you're using Webpack.
   * @param language Language name (ex. 'en')
   * @param data Loaded localization data from an xlsx file.
   */
  public load(language: string, data: Record<string, string>) {
    // Create language map
    const map = new Map<string, string>();
    for (const key in data) {
      map.set(key, data[key]);
    }

    // Save
    this.languages.set(language, map);

    // Set active language if none set
    if (this.activeLanguage === undefined) {
      this.activeLanguage = language;
    }
  }

  /**
   * Localizes a string into a language
   * @param id Localization ID
   * @param language Language to localize into. If not set, use the current @see active language.
   * @returns Localized string
   */
  public get(id: string, language?: string): string | undefined {
    const lang = language ?? this.activeLanguage;
    if (!lang) {
      return undefined;
    }
    return this.languages.get(lang)?.get(id);
  }
}

const AutoLocalizedProperties = new Set([
  'Text',
  'DisplayName',
  'StageDirections',
]);

enum LocalizableObjectType {
  EnumDefinition,
  EnumValues,
  Definition,
  ArticyObject,
  ArticyObjectProperties,
  ArticyObjectTemplate,
  ArticyObjectFeature,
}

class LocalizationProxy implements ProxyHandler<object> {
  // Cache of properties to localize
  private readonly localizedProperties = new Map<
    string,
    FeatureDefinition | undefined
  >();

  private readonly subProxies = new Map<string | symbol, any>();

  constructor(
    private localization: Localization,
    private type: LocalizableObjectType,
    private definition?: ObjectDefinition | FeatureDefinition
  ) {
    // Cache definition settings
    if (definition) {
      // if this is a template, all features are localized
      if ('Template' in definition) {
        for (const feature of definition.Template.Features) {
          this.localizedProperties.set(feature.TechnicalName, feature);
        }
        // If it has properties, then all properties marked Localizable are localizable
      } else if ('Properties' in definition) {
        for (const prop of definition.Properties.filter(p => p.Localizable)) {
          this.localizedProperties.set(prop.Property, undefined);
        }
      }
    }
  }

  private makeProxy(
    prop: string | symbol,
    value: any,
    type: LocalizableObjectType,
    definition?: ObjectDefinition | FeatureDefinition
  ) {
    // Create proxy
    const newProxy = new Proxy(
      value,
      new LocalizationProxy(this.localization, type, definition)
    );

    // Cache it
    this.subProxies.set(prop, newProxy);

    // Return
    return newProxy;
  }

  get(target: object, prop: string | symbol, receiver: any): any {
    // Check subproxy cache
    const cached = this.subProxies.get(prop);
    if (cached) {
      return cached;
    }

    // Get value
    const value = Reflect.get(target, prop, receiver);

    // What we do depends on what kind of object this is
    switch (this.type) {
      case LocalizableObjectType.EnumDefinition:
        if (prop === 'DisplayNames') {
          return this.makeProxy(prop, value, LocalizableObjectType.EnumValues);
        }
        break;
      case LocalizableObjectType.EnumValues:
        return this.localization.get(value);
      case LocalizableObjectType.ArticyObject:
        if (prop === 'Properties') {
          return this.makeProxy(
            prop,
            value,
            LocalizableObjectType.ArticyObjectProperties,
            this.definition
          );
        } else if (prop === 'Template') {
          return this.makeProxy(
            prop,
            value,
            LocalizableObjectType.ArticyObjectTemplate,
            this.definition
          );
        }
        break;
      case LocalizableObjectType.ArticyObjectProperties:
        if (typeof prop === 'string' && AutoLocalizedProperties.has(prop)) {
          return this.localization.get(value);
        }
        break;
      case LocalizableObjectType.ArticyObjectTemplate:
        if (typeof prop !== 'string') {
          break;
        }

        // Find feature def
        const featureDef = this.localizedProperties.get(prop);
        if (!featureDef) {
          break;
        }

        // Create a proxy for that feature
        return this.makeProxy(
          prop,
          value,
          LocalizableObjectType.ArticyObjectFeature,
          featureDef
        );
      case LocalizableObjectType.ArticyObjectFeature:
        // Check if the property is localizable and if so localize it
        if (typeof prop === 'string' && this.localizedProperties.has(prop)) {
          return this.localization.get(value);
        }
        break;
      case LocalizableObjectType.Definition:
        // If it's a string
        if (typeof value === 'string' && value.startsWith('$')) {
          return this.localization.get(value);
        } else if (typeof value === 'object') {
          return this.makeProxy(prop, value, LocalizableObjectType.Definition);
        }
        break;
    }

    // No localization; return value
    return value;
  }
}

/**
 * Wraps a data object in a proxy that automatically localizes appropriate properties on get
 * @param object Data object to localize (can be a model definition, a property object, or a template properties object)
 * @param localization Localization provider
 * @param definition Definition
 * @returns object wrapped in a proxy
 */
export function LocalizeProperties<
  T extends ModelData | ArticyObjectProps | TemplateProps
>(object: T, localization: Localization, definition?: ObjectDefinition): T {
  if ('Type' in object) {
    return new Proxy(
      object,
      new LocalizationProxy(
        localization,
        LocalizableObjectType.ArticyObject,
        definition
      )
    ) as T;
  } else if ('Id' in object) {
    return new Proxy(
      object,
      new LocalizationProxy(
        localization,
        LocalizableObjectType.ArticyObjectProperties,
        definition
      )
    ) as T;
  } else {
    return new Proxy(
      object,
      new LocalizationProxy(
        localization,
        LocalizableObjectType.ArticyObjectTemplate,
        definition
      )
    ) as T;
  }
}

/**
 * Wraps a definition object in a proxy that automatically localizes appropriate properties on get
 * @param definition Definition object to localize (can be an enum or template type definition)
 * @param localization Localization provider
 * @returns definition wrapped in a proxy
 */
export function LocalizeDefinition<D extends EnumDefinition | ObjectDefinition>(
  definition: D,
  localization: Localization
): D {
  if ('DisplayNames' in definition) {
    return new Proxy(
      definition,
      new LocalizationProxy(localization, LocalizableObjectType.EnumDefinition)
    ) as D;
  } else {
    return new Proxy(
      definition,
      new LocalizationProxy(localization, LocalizableObjectType.Definition)
    ) as D;
  }
}
