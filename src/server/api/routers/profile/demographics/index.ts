import { createTRPCRouter } from "@/server/api/trpc";
import { demographicSummaryRouter } from "./demographic-summary.procedure";
import { wardTimeSeriesRouter } from "./ward-time-series.procedure";
import { wardWiseDemographicSummaryRouter } from "./ward-wise-demographic-summary.procedure";
import { wardWiseCastePopulationRouter } from "./ward-wise-caste-population.procedure";
import { wardAgeWisePopulationRouter } from "./ward-age-wise-population.procedure";
import { wardWiseHouseHeadGenderRouter } from "./ward-wise-househead-gender.procedure";
import { wardWiseMotherTonguePopulationRouter } from "./ward-wise-mother-tongue-population.procedure";
import { wardWiseReligionPopulationRouter } from "./ward-wise-religion-population.procedure";
import { ageWiseMaritalStatusRouter } from "./age-wise-marital-status.procedure";
import { wardAgeGenderWiseMarriedAgeRouter } from "./ward-age-gender-wise-married-age.procedure";
import { wardAgeGenderWiseAbsenteeRouter } from "./ward-age-gender-wise-absentee.procedure";
import { wardWiseAbsenteeEducationalLevelRouter } from "./ward-wise-absentee-educational-level.procedure";
import {wardAgeGenderWiseEconomicallyActivePopulationRouter} from "../economics/ward-age-gender-wise-economically-active-population.procedure"

export const demographicsRouter = createTRPCRouter({
  summary: demographicSummaryRouter,
  wardTimeSeries: wardTimeSeriesRouter,
  wardWiseDemographicSummary: wardWiseDemographicSummaryRouter,
  wardAgeWisePopulation: wardAgeWisePopulationRouter,
  wardWiseCastePopulation: wardWiseCastePopulationRouter,
  wardWiseHouseHeadGender: wardWiseHouseHeadGenderRouter,
  wardWiseMotherTonguePopulation: wardWiseMotherTonguePopulationRouter,
  wardWiseReligionPopulation: wardWiseReligionPopulationRouter,
  ageWiseMaritalStatus: ageWiseMaritalStatusRouter,  
  wardAgeGenderWiseMarriedAge: wardAgeGenderWiseMarriedAgeRouter,  
  wardAgeGenderWiseAbsentee: wardAgeGenderWiseAbsenteeRouter,
  wardWiseAbsenteeEducationalLevel: wardWiseAbsenteeEducationalLevelRouter,
  wardAgeGenderWiseEconomicallyActivePopulation: wardAgeGenderWiseEconomicallyActivePopulationRouter,
});
