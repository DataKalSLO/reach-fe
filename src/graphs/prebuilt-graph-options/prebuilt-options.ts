import { defenseOptions } from './dod-2018';
import { incomeInequalityOptions } from './income-inequality';
import { wagesOptions } from './real-mean-wages';
import { airportsOptions } from './airports';
import { collegeGraduatesOptions } from './college-graduates';
import { statsOfBusinessOptions } from './stats-of-business';
import { medianIncomeOptions } from './median-income';
import { highschoolOptions } from './percent-highschool';
import { milesTraveledOptions } from './miles-traveled';
import { medianListOptions } from './median-list-price';
import { medianSaleOptions } from './median-sale-price';
import { unemploymentInsuranceClaimOptions } from './NewUnemploymentInsurance';
import { CovidCasesOptions } from './SLOCovidCases';
import { CovidCasesByStatusOptions } from './SLOCovidCasesByStatus';
import { CovidCasesBycityOptions } from './SLOCovidCasesByCity';

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const dodGraphOptions = require('./DoDDrilldown2018.json');
export const defenseGraphOptions = defenseOptions;
export const incomeInequalityGraphOptions = incomeInequalityOptions;
export const wagesGraphOptions = wagesOptions;
export const airportsGraphOptions = airportsOptions;
export const collegeGraduatesGraphOptions = collegeGraduatesOptions;
export const statsOfBusinessGraphOptions = statsOfBusinessOptions;
export const medianIncomeGraphOptions = medianIncomeOptions;
export const highschoolGraphOptions = highschoolOptions;
export const milesTraveledGraphOptions = milesTraveledOptions;
export const medianListGraphOptions = medianListOptions;
export const medianSaleGraphOptions = medianSaleOptions;
export const unemploymentInsuranceClaimGraphOption = unemploymentInsuranceClaimOptions;
export const covidCasesGraphOptions = CovidCasesOptions;
export const covidCasesByStatusGraphOptions = CovidCasesByStatusOptions;
export const covidCasesByCityGraphOptions = CovidCasesBycityOptions;
