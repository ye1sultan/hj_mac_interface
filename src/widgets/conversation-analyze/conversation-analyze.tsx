import SectionTitle from "@/components/section-title/section-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IAnalysisData } from "@/types/analyze";
import React from "react";

export default function ConversationAnalyze({
  analyzeData,
}: {
  analyzeData: IAnalysisData;
}) {
  return (
    <div className="space-y-4 p-4">
      <SectionTitle title="Анализ разговора" />
      <Card>
        <CardHeader>
          <CardTitle>Рейтинг продавца</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">{analyzeData.rating}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ключевые моменты</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="mb-2 text-lg font-medium">Успешные моменты</h3>
            <ul className="ml-6 list-disc space-y-2">
              {analyzeData.key_moments.successful_moments.map((moment, idx) => (
                <li key={idx}>{moment}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium">Проблемные моменты</h3>
            <ul className="ml-6 list-disc space-y-2">
              {analyzeData.key_moments.problematic_moments.map(
                (moment, idx) => (
                  <li key={idx}>{moment}</li>
                ),
              )}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Анализ техник продаж</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-7">{analyzeData.sales_techniques_analysis}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Работа с возражениями</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-7">{analyzeData.objections_handling}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Рекомендации</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="ml-6 list-disc space-y-2">
            {analyzeData.recommendations.map((rec, idx) => (
              <li key={idx}>{rec}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Итоговая рекомендация</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-7">{analyzeData.final_recommendation}</p>
        </CardContent>
      </Card>
    </div>
  );
}
