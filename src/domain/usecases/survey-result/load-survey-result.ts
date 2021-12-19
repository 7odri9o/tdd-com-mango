import { SurveyResultModel } from '@/domain/models/survey-result'

export interface LoadSurveyResult {
  loadBySurveyId: (surveyId: string) => Promise<SurveyResultModel>
}
