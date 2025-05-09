import { pgTable } from "../../../schema/basic";
import {
  integer,
  timestamp,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core";
import { wardWiseDemographicSummary } from "./ward-wise-demographic-summary";

// Define language type enum
export const languageTypeEnum = pgEnum("language_type", [
  "NEPALI",
  "LIMBU",
  "RAI",
  "HINDI",
  "NEWARI",
  "SHERPA",
  "TAMANG",
  "MAITHILI",
  "BHOJPURI",
  "THARU",
  "BAJJIKA",
  "MAGAR",
  "DOTELI",
  "URDU",
  "AWADI",
  "GURUNG",
  "BAITADELI",
  "AACHAMI",
  "BANTAWA",
  "RAJBANSHI",
  "CHAMLING",
  "BAJHANGI",
  "SANTHALI",
  "CHEPANG",
  "DANUWAR",
  "SUNUWAR",
  "MAGAHI",
  "URAUN",
  "KULUNG",
  "KHAM",
  "RAJASTHANI",
  "MAJHI",
  "THAMI",
  "BHUJEL",
  "BANGALA",
  "THULUNG",
  "YAKKHA",
  "DHIMAL",
  "TAJPURIYA",
  "ANGIKA",
  "SAMPANG",
  "KHALING",
  "YAMBULE",
  "KUMAL",
  "DARAI",
  "BAHING",
  "BAJURELI",
  "HYOLMO",
  "NACHIRING",
  "YAMPHU",
  "BOTE",
  "GHARE",
  "DUMI",
  "LAPCHA",
  "PUMA",
  "DUMANGLI",
  "DARCHULELI",
  "AATHPAHARIYA",
  "THAKALI",
  "JIREL",
  "MEWAHANG",
  "SYMBOLIC_LANGUAGE",
  "TIBETIAN",
  "MECHE",
  "CHANTYAL",
  "RAJI",
  "LOHARUNG",
  "CHINTANG",
  "GANGAI",
  "PAHARI",
  "DAILEKHI",
  "LHOPA",
  "DURA",
  "KOCHE",
  "CHILING",
  "ENGLISH",
  "JERO",
  "KHAS",
  "SANSKRIT",
  "DOLPALI",
  "HAYU",
  "TILUNG",
  "KOYI",
  "KISAN",
  "WALING",
  "MUSALMAN",
  "HIRAYANWI",
  "JUMLI",
  "PUNJABI",
  "LHOMI",
  "BELHARI",
  "ORIYA",
  "SONAHA",
  "SINDHI",
  "DADELDHURI",
  "BYANSI",
  "AASAMI",
  "KAHMCHI",
  "SAAM",
  "MANAGE",
  "DHULELI",
  "PHANGDUWALI",
  "SUREL",
  "MALPANDE",
  "CHINESE",
  "KHARIYA",
  "KURMALI",
  "BARAM",
  "LINGKHIM",
  "SADHANI",
  "KAGATE",
  "JONGKHA",
  "BANKARIYA",
  "KAIKE",
  "GADHWALI",
  "FRECHN",
  "MIJO",
  "KUKI",
  "KUSUNDA",
  "RUSSIAN",
  "SPANISH",
  "NAGAMIJ",
  "ARABI",
  "OTHER",
]);

export const wardWiseMotherTonguePopulation = pgTable("ward_wise_mother_tongue_population", {
  id: varchar("id", { length: 36 }).primaryKey(),

  // Reference to the ward entity through the demographic summary
  wardId: varchar("ward_id", { length: 36 })
    .notNull()
    .references(() => wardWiseDemographicSummary.id),
  
  // Language category 
  languageType: languageTypeEnum("language_type").notNull(),
  
  // Number of people speaking the specified language in the ward
  population: integer("population").notNull(),

  // Metadata
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
  createdAt: timestamp("created_at").defaultNow(),
});

export type WardWiseMotherTonguePopulation = typeof wardWiseMotherTonguePopulation.$inferSelect;
export type NewWardWiseMotherTonguePopulation = typeof wardWiseMotherTonguePopulation.$inferInsert;