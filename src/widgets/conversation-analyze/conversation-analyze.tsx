import SectionTitle from "@/components/section-title/section-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IAnalysisData } from "@/types/analyze";
import {
  CheckCircleIcon,
  KeyIcon,
  LightbulbIcon,
  ScrollTextIcon,
  ShieldAlertIcon,
  StarIcon,
} from "lucide-react"; // using lucide-react icons
import React from "react";

export default function ConversationAnalyze({
  analyzeData,
}: {
  analyzeData: IAnalysisData | null;
}) {
  if (!analyzeData) {
    return (
      <div className="flex flex-col">
        <SectionTitle title="Анализ разговора" />
        <p className="text-muted-foreground text-start text-lg font-medium">
          Завершите запись разговора, чтобы получить анализ
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <SectionTitle title="Анализ разговора" />

      <GlassCard
        icon={<StarIcon className="h-5 w-5 text-indigo-600" />}
        title="Рейтинг продавца"
      >
        <p className="text-2xl font-bold">{analyzeData.rating}</p>
      </GlassCard>

      <GlassCard
        icon={<KeyIcon className="h-5 w-5 text-green-600" />}
        title="Ключевые моменты"
      >
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-green-600">
              Успешные моменты
            </h3>
            <ul className="ml-6 list-disc space-y-2">
              {analyzeData.key_moments.successful_moments.map((moment, idx) => (
                <li key={idx}>{moment}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-red-600">
              Проблемные моменты
            </h3>
            <ul className="ml-6 list-disc space-y-2">
              {analyzeData.key_moments.problematic_moments.map(
                (moment, idx) => (
                  <li key={idx}>{moment}</li>
                ),
              )}
            </ul>
          </div>
        </div>
      </GlassCard>

      <GlassCard
        icon={<LightbulbIcon className="h-5 w-5 text-yellow-600" />}
        title="Анализ техник продаж"
      >
        <p className="leading-7">{analyzeData.sales_techniques_analysis}</p>
      </GlassCard>

      <GlassCard
        icon={<ShieldAlertIcon className="h-5 w-5 text-rose-600" />}
        title="Работа с возражениями"
      >
        <p className="leading-7">{analyzeData.objections_handling}</p>
      </GlassCard>

      <GlassCard
        icon={<CheckCircleIcon className="h-5 w-5 text-green-600" />}
        title="Рекомендации"
      >
        <ul className="ml-6 list-disc space-y-2">
          {analyzeData.recommendations.map((rec, idx) => (
            <li key={idx}>{rec}</li>
          ))}
        </ul>
      </GlassCard>

      <GlassCard
        icon={<ScrollTextIcon className="h-5 w-5 text-cyan-600" />}
        title="Итоговая рекомендация"
      >
        <p className="leading-7">{analyzeData.final_recommendation}</p>
      </GlassCard>
    </div>
  );
}

function GlassCard({
  title,
  children,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <Card className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-md">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        {icon}
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  );
}
