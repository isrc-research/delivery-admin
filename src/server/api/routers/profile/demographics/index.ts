import { createTRPCRouter } from "@/server/api/trpc";
import { demographicSummaryRouter } from "./demographic-summary.procedure";
import { wardTimeSeriesRouter } from "./ward-time-series.procedure";
import { wardWiseDemographicSummaryRouter } from "./ward-wise-demographic-summary.procedure";
import { wardWiseCastePopulationRouter } from "./ward-wise-caste-population.procedure";
import { wardAgeWisePopulationRouter } from "./ward-age-wise-population.procedure";
import { wardWiseHouseHeadGenderRouter } from "./ward-wise-househead-gender.procedure";
import { wardWiseMotherTonguePopulationRouter } from "./ward-wise-mother-tongue-population.procedure";
import { wardWiseReligionPopulationRouter } from "./ward-wise-religion-population.procedure";
import { wardAgeWiseMaritalStatusRouter } from "./ward-age-wise-marital-status.procedure";
import { wardAgeGenderWiseMarriedAgeRouter } from "./ward-age-gender-wise-married-age.procedure";
import { wardAgeGenderWiseAbsenteeRouter } from "./ward-age-gender-wise-absentee.procedure";
import { wardWiseAbsenteeEducationalLevelRouter } from "./ward-wise-absentee-educational-level.procedure";
import { wardAgeGenderWiseEconomicallyActivePopulationRouter } from "../economics/ward-age-gender-wise-economically-active-population.procedure";
import { wardWiseEducationalLevelRouter } from "../education/ward-wise-educational-level.procedure";
import { wardWiseLiteracyStatusRouter } from "../education/ward-wise-literacy-status.procedure";
import { wardWiseMajorSubjectRouter } from "../education/ward-wise-major-subject.procedure";
import { wardWiseSchoolDropoutRouter } from "../education/ward-wise-school-dropout.procedure";

export const demographicsRouter = createTRPCRouter({
  summary: demographicSummaryRouter,
  wardTimeSeries: wardTimeSeriesRouter,
  wardWiseDemographicSummary: wardWiseDemographicSummaryRouter,
  wardAgeWisePopulation: wardAgeWisePopulationRouter,
  wardWiseCastePopulation: wardWiseCastePopulationRouter,
  wardWiseHouseHeadGender: wardWiseHouseHeadGenderRouter,
  wardWiseMotherTonguePopulation: wardWiseMotherTonguePopulationRouter,
  wardWiseReligionPopulation: wardWiseReligionPopulationRouter,
  wardAgeWiseMaritalStatus: wardAgeWiseMaritalStatusRouter,
  wardAgeGenderWiseMarriedAge: wardAgeGenderWiseMarriedAgeRouter,
  wardAgeGenderWiseAbsentee: wardAgeGenderWiseAbsenteeRouter,
  wardWiseAbsenteeEducationalLevel: wardWiseAbsenteeEducationalLevelRouter,
  wardWiseEducationalLevel: wardWiseEducationalLevelRouter,
  wardWiseLiteracyStatus: wardWiseLiteracyStatusRouter,
  wardAgeGenderWiseEconomicallyActivePopulation:
    wardAgeGenderWiseEconomicallyActivePopulationRouter,
  wardWiseMajorSubject: wardWiseMajorSubjectRouter,
  wardWiseSchoolDropout: wardWiseSchoolDropoutRouter,
});
