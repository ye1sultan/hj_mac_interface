import { IAnalysisData } from "@/types/analyze";

interface IBackendResponse {
  success: boolean;
  data: {
    agent_type: string;
    message: string;
    metadata: {
      session_id: string;
      user_id: string;
    };
  };
  error: any;
}

export function formatAnalysis(
  response: IBackendResponse,
): IAnalysisData | null {
  if (!response.success || !response.data || !response.data.message) {
    console.error("Invalid backend response:", response);
    return null;
  }

  try {
    const parsedMessage = JSON.parse(response.data.message);

    const analysis = parsedMessage.analysis;

    if (!analysis) {
      console.error("No analysis found in parsed message:", parsedMessage);
      return null;
    }

    const formattedData: IAnalysisData = {
      rating: analysis.rating || "",
      key_moments: {
        successful_moments: analysis.key_moments?.successful_moments || [],
        problematic_moments: analysis.key_moments?.problematic_moments || [],
      },
      sales_techniques_analysis: analysis.sales_techniques_analysis || "",
      objections_handling: analysis.objections_handling || "",
      recommendations: analysis.recommendations || [],
      final_recommendation: analysis.final_recommendation || "",
    };

    return formattedData;
  } catch (error) {
    console.error("Failed to parse analysis message:", error);
    return null;
  }
}
