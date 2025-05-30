import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { wardAgeGenderWiseEconomicallyActivePopulation } from "@/server/db/schema/profile/economics/ward-age-gender-wise-economically-active-population";
import { eq, and, desc, sql } from "drizzle-orm";
import {
  wardAgeGenderWiseEconomicallyActivePopulationSchema,
  wardAgeGenderWiseEconomicallyActivePopulationFilterSchema,
  updateWardAgeGenderWiseEconomicallyActivePopulationSchema,
  EconomicallyActiveAgeGroupEnum,
  GenderEnum,
} from "./ward-age-gender-wise-economically-active-population.schema";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

// Get all ward-age-gender-wise economically active population data with optional filtering
export const getAllWardAgeGenderWiseEconomicallyActivePopulation =
  publicProcedure
    .input(wardAgeGenderWiseEconomicallyActivePopulationFilterSchema.optional())
    .query(async ({ ctx, input }) => {
      try {
        // Set UTF-8 encoding explicitly before running query
        await ctx.db.execute(sql`SET client_encoding = 'UTF8'`);

        // First try querying the main schema table
        let data: any[];
        try {
          // Build query with conditions
          const baseQuery = ctx.db
            .select()
            .from(wardAgeGenderWiseEconomicallyActivePopulation);

          let conditions = [];

          if (input?.wardNumber) {
            conditions.push(
              eq(
                wardAgeGenderWiseEconomicallyActivePopulation.wardNumber,
                input.wardNumber,
              ),
            );
          }

          if (input?.ageGroup) {
            conditions.push(
              eq(
                wardAgeGenderWiseEconomicallyActivePopulation.ageGroup,
                input.ageGroup,
              ),
            );
          }

          if (input?.gender) {
            conditions.push(
              eq(
                wardAgeGenderWiseEconomicallyActivePopulation.gender,
                input.gender,
              ),
            );
          }

          const queryWithFilters = conditions.length
            ? baseQuery.where(and(...conditions))
            : baseQuery;

          // Sort by ward number, age group, and gender
          data = await queryWithFilters.orderBy(
            wardAgeGenderWiseEconomicallyActivePopulation.wardNumber,
            wardAgeGenderWiseEconomicallyActivePopulation.ageGroup,
            wardAgeGenderWiseEconomicallyActivePopulation.gender,
          );
        } catch (err) {
          console.log("Failed to query main schema, trying ACME table:", err);
          data = [];
        }

        // If no data from main schema, try the ACME table
        if (!data || data.length === 0) {
          const acmeSql = sql`
          SELECT 
            id,
            ward_number,
            age_group,
            gender,
            population
          FROM 
            acme_ward_age_gender_wise_economically_active_population
          ORDER BY 
            ward_number, age_group, gender
        `;
          const acmeResult = await ctx.db.execute(acmeSql);

          if (
            acmeResult &&
            Array.isArray(acmeResult) &&
            acmeResult.length > 0
          ) {
            // Transform ACME data to match expected schema
            data = acmeResult.map((row) => ({
              id: row.id,
              wardNumber: parseInt(String(row.ward_number)),
              ageGroup: row.age_group,
              gender: row.gender,
              population: parseInt(String(row.population || "0")),
            }));

            // Apply filters if needed
            if (input?.wardNumber) {
              data = data.filter(
                (item) => item.wardNumber === input.wardNumber,
              );
            }

            if (input?.ageGroup) {
              data = data.filter((item) => item.ageGroup === input.ageGroup);
            }

            if (input?.gender) {
              data = data.filter((item) => item.gender === input.gender);
            }
          }
        }

        return data;
      } catch (error) {
        console.error(
          "Error fetching ward-age-gender-wise economically active population data:",
          error,
        );
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to retrieve data",
        });
      }
    });

// Get data for a specific ward
export const getWardAgeGenderWiseEconomicallyActivePopulationByWard =
  publicProcedure
    .input(z.object({ wardNumber: z.number().int().positive() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db
        .select()
        .from(wardAgeGenderWiseEconomicallyActivePopulation)
        .where(
          eq(
            wardAgeGenderWiseEconomicallyActivePopulation.wardNumber,
            input.wardNumber,
          ),
        )
        .orderBy(
          wardAgeGenderWiseEconomicallyActivePopulation.ageGroup,
          wardAgeGenderWiseEconomicallyActivePopulation.gender,
        );

      return data;
    });

// Create a new ward-age-gender-wise economically active population entry
export const createWardAgeGenderWiseEconomicallyActivePopulation =
  protectedProcedure
    .input(wardAgeGenderWiseEconomicallyActivePopulationSchema)
    .mutation(async ({ ctx, input }) => {
      // Check if user has appropriate permissions
      if (ctx.user.role !== "superadmin") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message:
            "Only administrators can create ward-age-gender-wise economically active population data",
        });
      }

      // Check if entry already exists for this ward, age group, and gender
      const existing = await ctx.db
        .select({ id: wardAgeGenderWiseEconomicallyActivePopulation.id })
        .from(wardAgeGenderWiseEconomicallyActivePopulation)
        .where(
          and(
            eq(
              wardAgeGenderWiseEconomicallyActivePopulation.wardNumber,
              input.wardNumber,
            ),
            eq(
              wardAgeGenderWiseEconomicallyActivePopulation.ageGroup,
              input.ageGroup,
            ),
            eq(
              wardAgeGenderWiseEconomicallyActivePopulation.gender,
              input.gender,
            ),
          ),
        )
        .limit(1);

      if (existing.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: `Data for Ward Number ${input.wardNumber}, age group ${input.ageGroup}, and gender ${input.gender} already exists`,
        });
      }

      // Create new record
      await ctx.db
        .insert(wardAgeGenderWiseEconomicallyActivePopulation)
        .values({
          id: input.id || uuidv4(),
          wardNumber: input.wardNumber,
          ageGroup: input.ageGroup,
          gender: input.gender,
          population: input.population,
        });

      return { success: true };
    });

// Update an existing ward-age-gender-wise economically active population entry
export const updateWardAgeGenderWiseEconomicallyActivePopulation =
  protectedProcedure
    .input(updateWardAgeGenderWiseEconomicallyActivePopulationSchema)
    .mutation(async ({ ctx, input }) => {
      // Check if user has appropriate permissions
      if (ctx.user.role !== "superadmin") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message:
            "Only administrators can update ward-age-gender-wise economically active population data",
        });
      }

      if (!input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "ID is required for update",
        });
      }

      // Check if the record exists
      const existing = await ctx.db
        .select({ id: wardAgeGenderWiseEconomicallyActivePopulation.id })
        .from(wardAgeGenderWiseEconomicallyActivePopulation)
        .where(eq(wardAgeGenderWiseEconomicallyActivePopulation.id, input.id))
        .limit(1);

      if (existing.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Record with ID ${input.id} not found`,
        });
      }

      // Update the record
      await ctx.db
        .update(wardAgeGenderWiseEconomicallyActivePopulation)
        .set({
          wardNumber: input.wardNumber,
          ageGroup: input.ageGroup,
          gender: input.gender,
          population: input.population,
        })
        .where(eq(wardAgeGenderWiseEconomicallyActivePopulation.id, input.id));

      return { success: true };
    });

// Delete a ward-age-gender-wise economically active population entry
export const deleteWardAgeGenderWiseEconomicallyActivePopulation =
  protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Check if user has appropriate permissions
      if (ctx.user.role !== "superadmin") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message:
            "Only administrators can delete ward-age-gender-wise economically active population data",
        });
      }

      // Delete the record
      await ctx.db
        .delete(wardAgeGenderWiseEconomicallyActivePopulation)
        .where(eq(wardAgeGenderWiseEconomicallyActivePopulation.id, input.id));

      return { success: true };
    });

// Get summary statistics
export const getWardAgeGenderWiseEconomicallyActivePopulationSummary =
  publicProcedure.query(async ({ ctx }) => {
    try {
      // Get total counts by age group and gender across all wards
      const summarySql = sql`
        SELECT 
          age_group, 
          gender,
          SUM(population) as total_population
        FROM 
          ward_age_gender_wise_economically_active_population
        GROUP BY 
          age_group, gender
        ORDER BY 
          age_group, gender
      `;

      const summaryData = await ctx.db.execute(summarySql);

      return summaryData;
    } catch (error) {
      console.error(
        "Error in getWardAgeGenderWiseEconomicallyActivePopulationSummary:",
        error,
      );
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message:
          "Failed to retrieve ward-age-gender-wise economically active population summary",
      });
    }
  });

// Export the router with all procedures
export const wardAgeGenderWiseEconomicallyActivePopulationRouter =
  createTRPCRouter({
    getAll: getAllWardAgeGenderWiseEconomicallyActivePopulation,
    getByWard: getWardAgeGenderWiseEconomicallyActivePopulationByWard,
    create: createWardAgeGenderWiseEconomicallyActivePopulation,
    update: updateWardAgeGenderWiseEconomicallyActivePopulation,
    delete: deleteWardAgeGenderWiseEconomicallyActivePopulation,
    summary: getWardAgeGenderWiseEconomicallyActivePopulationSummary,
  });
