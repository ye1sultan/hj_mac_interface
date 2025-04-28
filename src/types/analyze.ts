export interface IKeyMoments {
  successful_moments: string[];
  problematic_moments: string[];
}

export interface IAnalysisData {
  rating: string;
  key_moments: IKeyMoments;
  sales_techniques_analysis: string;
  objections_handling: string;
  recommendations: string[];
  final_recommendation: string;
}
