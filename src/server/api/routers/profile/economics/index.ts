import { createTRPCRouter } from "@/server/api/trpc";
import {wardAgeGenderWiseEconomicallyActivePopulationRouter} from "./ward-age-gender-wise-economically-active-population.procedure"
import { wardWiseMajorOccupationRouter } from "./ward-wise-major-occupation.procedure";
import { wardTimeWiseHouseholdChoresRouter } from "./ward-time-wise-household-chores.procedure";
import { wardWiseHouseholdIncomeSourceRouter } from "./ward-wise-household-income-source.procedure";
import { wardWiseRemittanceExpensesRouter } from "./ward-wise-remittance-expenses.procedure";
import { wardWiseAnnualIncomeSustenanceRouter } from "./ward-wise-annual-income-sustenance.procedure";
import { wardWiseHouseholdsOnLoanRouter } from "./ward-wise-households-on-loan.procedure";
import { wardWiseHouseholdsLoanUseRouter } from "./ward-wise-households-loan-use.procedure";
import {wardWiseTrainedPopulationRouter} from "./ward-wise-trained-population.procedure"
import { wardWiseMajorSkillsRouter } from "./ward-wise-major-skills.procedure";
import {exportedProductsRouter} from "./exported-products.procedure"
import { importedProductsRouter } from "./imported-products.procedure";
import { wardWiseHouseholdLandPossessionsRouter } from "./ward-wise-household-land-possessions.procedure";

export const economicsRouter = createTRPCRouter({
  wardAgeGenderWiseEconomicallyActivePopulation: wardAgeGenderWiseEconomicallyActivePopulationRouter,
  wardWiseMajorOccupation: wardWiseMajorOccupationRouter,
  wardTimeWiseHouseholdChores: wardTimeWiseHouseholdChoresRouter,
  wardWiseHouseholdIncomeSource: wardWiseHouseholdIncomeSourceRouter,
  wardWiseRemittanceExpenses: wardWiseRemittanceExpensesRouter,
  wardWiseAnnualIncomeSustenance: wardWiseAnnualIncomeSustenanceRouter,
  wardWiseHouseholdsOnLoan: wardWiseHouseholdsOnLoanRouter,
  wardWiseHouseholdsLoanUse: wardWiseHouseholdsLoanUseRouter,
  wardWiseTrainedPopulation: wardWiseTrainedPopulationRouter,
  wardWiseMajorSkills: wardWiseMajorSkillsRouter,
  importedProducts: importedProductsRouter,
  exportedProducts: exportedProductsRouter,
  wardWiseHouseholdLandPossessions: wardWiseHouseholdLandPossessionsRouter
});


